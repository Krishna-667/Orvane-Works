"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Clock,
  PackageCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { updateEmployeeOrderProgressAction } from "@/app/actions/employee";
import type { OrderStatus } from "@/lib/data/orders";

interface StatusUpdaterProps {
  orderId: string;
  orderNumber: string;
  currentStatus: OrderStatus;
}

export function StatusUpdater({
  orderId,
  orderNumber,
  currentStatus,
}: StatusUpdaterProps) {
  const [status, setStatus] = useState<"in_progress" | "awaiting_feedback" | "delivered">(
    currentStatus === "delivered"
      ? "delivered"
      : currentStatus === "awaiting_feedback"
      ? "awaiting_feedback"
      : "in_progress"
  );
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await updateEmployeeOrderProgressAction(
        orderId,
        orderNumber,
        status,
        notes
      );
      if (res.success) {
        setSuccessMessage("Project milestone status updated successfully!");
        setNotes("");
      } else {
        setErrorMessage(res.error || "Failed to advance status.");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-vermilion" />
            Update Milestone Progress
          </CardTitle>
          <Badge variant="outline" className="capitalize text-xs">
            Current: {currentStatus.replace("_", " ")}
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Permitted transitions for specialist leads: In Progress, Awaiting Feedback, Delivered.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {successMessage && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs">
              {errorMessage}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Milestone Status
            </label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as "in_progress" | "awaiting_feedback" | "delivered"
                )
              }
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="in_progress">In Progress (Engineering underway)</option>
              <option value="awaiting_feedback">
                Awaiting Feedback (Preview shared with client)
              </option>
              <option value="delivered">
                Delivered (All master files uploaded)
              </option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Progress Notes for Client
            </label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Completed initial design components. Shared Figma staging link for review."
              rows={3}
              className="text-xs resize-none"
            />
            <p className="text-[10px] text-muted-foreground">
              Notes are emailed directly to the client and appended to the timeline audit trail.
            </p>
          </div>

          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              disabled={isSubmitting}
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-vermilion-700 dark:hover:bg-vermilion-500 font-medium text-xs gap-1.5"
            >
              {isSubmitting ? "Advancing..." : "Update Status"}
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
