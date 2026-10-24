import { createClient } from "@/lib/supabase/server";

// ── Types ─────────────────────────────────────────────────────────────────────

export type PaymentMethod = "upi" | "bank_transfer" | "cash" | "other";
export type PaymentType = "advance" | "balance" | "full";

export interface OrderPayment {
  id: string;
  order_id: string;
  amount_inr: number;
  payment_type: PaymentType;
  method: PaymentMethod;
  reference_utr?: string | null;
  date_received: string; // ISO date
  notes?: string | null;
  recorded_by: string;
  provider: string;
  voided_at?: string | null;
  void_reason?: string | null;
  created_at: string;
}

/** Summary of payments for an order — used in both admin and client views */
export interface PaymentSummary {
  quote_amount: number | null;
  total_paid: number;
  balance_due: number;
  /** Derived status label for display */
  status: "Unpaid" | "Advance Received" | "Partially Paid" | "Paid in Full" | "Refunded";
  payments: OrderPayment[];
}

// ── Payment status calculation (pure — tested independently) ─────────────────

/**
 * Derive a human-readable payment status from quote amount and non-voided
 * payment records. Pure function — no I/O, so it's easy to unit test.
 */
export function calculatePaymentStatus(
  quoteAmountInr: number | null | undefined,
  payments: Pick<OrderPayment, "amount_inr" | "voided_at">[]
): PaymentSummary["status"] {
  const active = payments.filter((p) => !p.voided_at);
  const totalPaid = active.reduce((sum, p) => sum + p.amount_inr, 0);

  if (totalPaid === 0) return "Unpaid";
  if (!quoteAmountInr || quoteAmountInr === 0) return "Advance Received";
  if (totalPaid >= quoteAmountInr) return "Paid in Full";
  // Advance convention: <= 60% of quote
  if (totalPaid <= quoteAmountInr * 0.6) return "Advance Received";
  return "Partially Paid";
}

// ── Data fetchers ─────────────────────────────────────────────────────────────

/**
 * Fetch all non-voided payments for an order (admin view includes all columns).
 * Called server-side in admin pages only.
 */
export async function getOrderPayments(orderId: string): Promise<OrderPayment[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("order_payments")
      .select("*")
      .eq("order_id", orderId)
      .order("date_received", { ascending: true });

    if (error) {
      console.warn("[Payments] Fetch error:", error.message);
      return [];
    }
    return (data as OrderPayment[]) || [];
  } catch {
    return [];
  }
}

/**
 * Fetch a payment summary for an order.
 * Client-visible: returns amounts and status but the UI deliberately hides
 * reference_utr and admin notes — enforced at the component level.
 */
export async function getOrderPaymentSummary(
  orderId: string,
  quoteAmountInr: number | null | undefined
): Promise<PaymentSummary> {
  const payments = await getOrderPayments(orderId);
  const active = payments.filter((p) => !p.voided_at);
  const totalPaid = active.reduce((sum, p) => sum + p.amount_inr, 0);
  const balance = Math.max(0, (quoteAmountInr ?? 0) - totalPaid);
  const status = calculatePaymentStatus(quoteAmountInr, payments);

  return {
    quote_amount: quoteAmountInr ?? null,
    total_paid: totalPaid,
    balance_due: balance,
    status,
    payments,
  };
}
