"use client";

import React from "react";
import {
  Check,
  Clock,
  Send,
  Eye,
  FileCheck2,
  ThumbsUp,
  Sparkles,
  PackageCheck,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/lib/data/orders";

interface StatusTimelineProps {
  currentStatus: OrderStatus;
  className?: string;
}

const TIMELINE_STEPS: {
  key: OrderStatus;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: "submitted", label: "Submitted", icon: Send },
  { key: "in_review", label: "In Review", icon: Eye },
  { key: "quote_sent", label: "Quote Sent", icon: FileCheck2 },
  { key: "accepted", label: "Accepted", icon: ThumbsUp },
  { key: "in_progress", label: "In Progress", icon: Sparkles },
  { key: "awaiting_feedback", label: "Feedback", icon: Clock },
  { key: "delivered", label: "Delivered", icon: PackageCheck },
  { key: "closed", label: "Closed", icon: Check },
];

export function StatusTimeline({ currentStatus, className }: StatusTimelineProps) {
  if (currentStatus === "cancelled") {
    return (
      <div className={cn("p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-3 text-destructive", className)}>
        <XCircle className="w-5 h-5 shrink-0" />
        <div>
          <p className="font-semibold text-sm">Order Cancelled</p>
          <p className="text-xs text-muted-foreground">This project was cancelled or archived.</p>
        </div>
      </div>
    );
  }

  const currentIndex = TIMELINE_STEPS.findIndex((s) => s.key === currentStatus);

  return (
    <div className={cn("w-full py-4", className)}>
      {/* Mobile Vertical / Tablet+ Horizontal Stepper */}
      <div className="relative">
        {/* Desktop timeline track */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 relative z-10">
          {TIMELINE_STEPS.map((step, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isPending = idx > currentIndex;
            const Icon = step.icon;

            return (
              <div
                key={step.key}
                className="flex flex-col items-center text-center group"
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-200 text-xs font-semibold shadow-sm",
                    isCompleted &&
                      "bg-primary text-primary-foreground border-primary",
                    isCurrent &&
                      "bg-primary text-primary-foreground border-primary ring-4 ring-primary/20 animate-pulse",
                    isPending &&
                      "bg-background text-muted-foreground border-border"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                <div className="mt-2 space-y-0.5">
                  <p
                    className={cn(
                      "text-xs font-medium leading-tight",
                      isCurrent && "font-bold text-vermilion",
                      isCompleted && "text-foreground",
                      isPending && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {isCurrent ? "Active Step" : isCompleted ? "Completed" : "Upcoming"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
