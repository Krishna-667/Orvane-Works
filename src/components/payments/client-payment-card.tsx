import { CreditCard, CheckCircle2, Clock, IndianRupee } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PaymentSummary } from "@/lib/data/payments";
import { formatINR } from "@/lib/utils";

interface ClientPaymentCardProps {
  summary: PaymentSummary;
  /** Payment instructions from admin (e.g. UPI ID, bank details) */
  paymentInstructions?: string | null;
}

const STATUS_CONFIG: Record<
  PaymentSummary["status"],
  { label: string; colour: string; icon: React.ReactNode }
> = {
  Unpaid: {
    label: "Awaiting Payment",
    colour: "text-muted-foreground",
    icon: <Clock className="w-4 h-4 text-muted-foreground" />,
  },
  "Advance Received": {
    label: "Advance Received",
    colour: "text-amber-600 dark:text-amber-400",
    icon: <CreditCard className="w-4 h-4 text-amber-500" />,
  },
  "Partially Paid": {
    label: "Partially Paid",
    colour: "text-amber-600 dark:text-amber-400",
    icon: <CreditCard className="w-4 h-4 text-amber-500" />,
  },
  "Paid in Full": {
    label: "Paid in Full ✓",
    colour: "text-emerald-600 dark:text-emerald-400",
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
  },
  Refunded: {
    label: "Refunded",
    colour: "text-muted-foreground",
    icon: <Clock className="w-4 h-4 text-muted-foreground" />,
  },
};

const METHOD_LABELS: Record<string, string> = {
  upi: "UPI",
  bank_transfer: "Bank Transfer",
  cash: "Cash",
  other: "Other",
};

const TYPE_LABELS: Record<string, string> = {
  advance: "Advance",
  balance: "Balance",
  full: "Full Payment",
};

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function ClientPaymentCard({
  summary,
  paymentInstructions,
}: ClientPaymentCardProps) {
  const config = STATUS_CONFIG[summary.status];
  const activePayments = summary.payments.filter((p) => !p.voided_at);

  return (
    <Card className="border-border">
      <CardHeader className="pb-3 border-b border-border/80">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-vermilion" />
            Payment Status
          </CardTitle>
          <Badge
            variant="outline"
            className={`text-[10px] font-semibold uppercase ${config.colour}`}
          >
            {config.label}
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Payments are manually recorded by our team after each transfer is confirmed.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Financial Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-muted/30 border border-border/60">
            <p className="text-[11px] text-muted-foreground mb-1">Quote Total</p>
            <p className="text-sm font-bold text-foreground">
              {summary.quote_amount ? formatINR(summary.quote_amount) : "Pending Quote"}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-[11px] text-muted-foreground mb-1">Amount Received</p>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {formatINR(summary.total_paid)}
            </p>
          </div>
        </div>

        {summary.balance_due > 0 && (
          <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Balance Due:</p>
            <p className="text-sm font-bold text-amber-600 dark:text-amber-400">
              {formatINR(summary.balance_due)}
            </p>
          </div>
        )}

        {/* Payment history (amounts + method shown; UTR/notes hidden from client) */}
        {activePayments.length > 0 && (
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Your Payments
            </p>
            {activePayments.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-card border border-border/60 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {formatINR(p.amount_inr)}
                    </span>
                    <Badge variant="secondary" className="text-[10px] py-0">
                      {TYPE_LABELS[p.payment_type] || p.payment_type}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    {METHOD_LABELS[p.method] || p.method} • {formatDate(p.date_received)}
                  </p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              </div>
            ))}
          </div>
        )}

        {/* How to Pay instructions */}
        {summary.status !== "Paid in Full" && (
          <div className="p-4 rounded-lg bg-muted/20 border border-border/60 space-y-2">
            <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-vermilion" />
              How to Pay
            </h4>
            {paymentInstructions ? (
              <p className="text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
                {paymentInstructions}
              </p>
            ) : (
              <div className="text-xs text-muted-foreground space-y-1">
                <p>
                  Please transfer via <strong>UPI or Bank Transfer</strong> and share the
                  transaction reference with your assigned lead via the message thread below.
                </p>
                <p>
                  Our team will confirm receipt and update your payment status within 2–4
                  business hours.
                </p>
              </div>
            )}
            <p className="text-[11px] text-muted-foreground/70 italic">
              No payment is charged until you formally accept our quote.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
