import { describe, it, expect } from "vitest";
import { calculatePaymentStatus } from "@/lib/data/payments";
import type { OrderPayment } from "@/lib/data/payments";

// Helper: build a minimal payment mock
function payment(
  amount: number,
  voided = false
): Pick<OrderPayment, "amount_inr" | "voided_at"> {
  return {
    amount_inr: amount,
    voided_at: voided ? new Date().toISOString() : null,
  };
}

describe("calculatePaymentStatus", () => {
  it("returns Unpaid when no payments exist", () => {
    expect(calculatePaymentStatus(50000, [])).toBe("Unpaid");
  });

  it("returns Unpaid when all payments are voided", () => {
    expect(
      calculatePaymentStatus(50000, [payment(10000, true), payment(5000, true)])
    ).toBe("Unpaid");
  });

  it("returns Advance Received when total paid ≤ 60% of quote", () => {
    // 25000 is 50% of 50000
    expect(
      calculatePaymentStatus(50000, [payment(25000)])
    ).toBe("Advance Received");
  });

  it("returns Partially Paid when paid > 60% but < 100%", () => {
    // 35000 is 70% of 50000
    expect(
      calculatePaymentStatus(50000, [payment(35000)])
    ).toBe("Partially Paid");
  });

  it("returns Paid in Full when total_paid >= quote", () => {
    expect(
      calculatePaymentStatus(50000, [payment(25000), payment(25000)])
    ).toBe("Paid in Full");
  });

  it("returns Paid in Full when overpaid", () => {
    expect(
      calculatePaymentStatus(50000, [payment(60000)])
    ).toBe("Paid in Full");
  });

  it("correctly ignores voided payments in the total", () => {
    // 50000 payment voided + 25000 active = 25000 paid (50% of 50000)
    expect(
      calculatePaymentStatus(50000, [payment(50000, true), payment(25000)])
    ).toBe("Advance Received");
  });

  it("returns Advance Received when quote is null/zero and some payment exists", () => {
    expect(calculatePaymentStatus(null, [payment(5000)])).toBe(
      "Advance Received"
    );
    expect(calculatePaymentStatus(0, [payment(5000)])).toBe("Advance Received");
  });

  it("handles multiple active payments summed correctly for Paid in Full", () => {
    expect(
      calculatePaymentStatus(30000, [
        payment(10000),
        payment(10000),
        payment(10000),
      ])
    ).toBe("Paid in Full");
  });

  it("treats exactly 60% as Advance Received boundary", () => {
    // 30000 is exactly 60% of 50000 → Advance Received
    expect(calculatePaymentStatus(50000, [payment(30000)])).toBe(
      "Advance Received"
    );
  });

  it("treats 60.01% as Partially Paid", () => {
    // 30001 > 30000 (60% of 50000)
    expect(calculatePaymentStatus(50000, [payment(30001)])).toBe(
      "Partially Paid"
    );
  });
});
