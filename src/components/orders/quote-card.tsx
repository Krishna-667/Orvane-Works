"use client";

import React, { useState } from "react";
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  IndianRupee,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { acceptQuoteAction } from "@/app/actions/orders";
import { formatINR } from "@/lib/utils";
import type { Order } from "@/lib/data/orders";

interface QuoteCardProps {
  order: Order;
}

export function QuoteCard({ order }: QuoteCardProps) {
  const [isAccepting, setIsAccepting] = useState(false);
  const [accepted, setAccepted] = useState(order.status === "accepted" || order.status === "in_progress" || order.status === "awaiting_feedback" || order.status === "delivered" || order.status === "closed");

  const handleAccept = async () => {
    setIsAccepting(true);
    try {
      const res = await acceptQuoteAction(order.order_number);
      if (res.success) {
        setAccepted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAccepting(false);
    }
  };

  const paymentBadges: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
    unbilled: { label: "Unbilled", variant: "outline" },
    quote_pending: { label: "Quote Pending", variant: "secondary" },
    invoiced: { label: "Invoiced", variant: "secondary" },
    partially_paid: { label: "50% Advance Paid", variant: "default" },
    paid_in_full: { label: "Paid in Full", variant: "default" },
    refunded: { label: "Refunded", variant: "destructive" },
  };

  const badgeConfig = paymentBadges[order.payment_status] || {
    label: order.payment_status,
    variant: "outline",
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-vermilion" />
              Studio Quote &amp; Financials
            </CardTitle>
            <Badge variant={badgeConfig.variant} className="text-xs">
              {badgeConfig.label}
            </Badge>
          </div>
          <CardDescription className="text-xs">
            Official commercial proposal issued by Orvane founders.
          </CardDescription>
        </div>

        {order.quote_amount_inr && (
          <div className="text-right">
            <span className="text-[11px] text-muted-foreground block">
              Agreed Investment
            </span>
            <span className="font-display text-2xl font-bold text-foreground">
              {formatINR(order.quote_amount_inr)}
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4 pt-1">
        {order.quote_amount_inr ? (
          <>
            <div className="p-3.5 rounded-lg bg-muted/40 border border-border text-xs space-y-1.5">
              <span className="font-semibold text-foreground block">
                Quote Terms &amp; Deliverable Milestones
              </span>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {order.quote_terms ||
                  "50% milestone advance upon acceptance. Remaining 50% payable upon staging delivery and sign-off."}
              </p>
            </div>

            {/* Accept quote action if in quote_sent status */}
            {order.status === "quote_sent" && !accepted && (
              <div className="p-4 rounded-lg bg-vermilion/5 border border-vermilion/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-semibold text-sm text-foreground">
                    Accept this quote to begin engineering
                  </p>
                  <p className="text-xs text-muted-foreground">
                    By accepting, you authorize the Orvane student team to commence project setup and milestone scheduling.
                  </p>
                </div>
                <Button
                  onClick={handleAccept}
                  disabled={isAccepting}
                  className="bg-vermilion hover:bg-vermilion/90 text-white gap-2 font-semibold shrink-0"
                >
                  {isAccepting ? (
                    "Confirming..."
                  ) : (
                    <>
                      <span>Accept Quote</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {accepted && (
              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium pt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Quote accepted. Project milestones are active.</span>
              </div>
            )}
          </>
        ) : (
          <div className="p-6 text-center rounded-lg bg-muted/30 border border-dashed border-border space-y-2">
            <Clock className="w-6 h-6 text-muted-foreground mx-auto" />
            <h4 className="font-semibold text-sm text-foreground">
              Quote in Review
            </h4>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Our engineering leads are evaluating your project requirements and scope. You will receive an official itemized quote here within 24 hours.
            </p>
          </div>
        )}

        <div className="text-[11px] text-muted-foreground border-t border-border/60 pt-3 flex items-center justify-between">
          <span>Payment Gateway: UPI / Bank Transfer (Razorpay integration prepared)</span>
          <span>Currency: INR (₹)</span>
        </div>
      </CardContent>
    </Card>
  );
}
