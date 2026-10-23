import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type OrderStatus =
  | "submitted"
  | "in_review"
  | "quote_sent"
  | "accepted"
  | "in_progress"
  | "awaiting_feedback"
  | "delivered"
  | "closed"
  | "cancelled";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  submitted: {
    label: "Submitted",
    className:
      "bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800",
  },
  in_review: {
    label: "In Review",
    className:
      "bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800",
  },
  quote_sent: {
    label: "Quote Ready",
    className:
      "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  },
  accepted: {
    label: "Quote Accepted",
    className:
      "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  },
  in_progress: {
    label: "In Progress",
    className:
      "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  },
  awaiting_feedback: {
    label: "Awaiting Feedback",
    className:
      "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800",
  },
  delivered: {
    label: "Delivered",
    className:
      "bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800",
  },
  closed: {
    label: "Closed",
    className:
      "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  },
  cancelled: {
    label: "Cancelled",
    className:
      "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
  },
};

export interface StatusChipProps {
  status: OrderStatus;
  className?: string;
}

export function StatusChip({ status, className }: StatusChipProps) {
  const config = STATUS_CONFIG[status] || {
    label: status,
    className: "bg-muted text-muted-foreground",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium capitalize text-xs tracking-wide px-2.5 py-0.5 rounded-full border",
        config.className,
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {config.label}
    </Badge>
  );
}
