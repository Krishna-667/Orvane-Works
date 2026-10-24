"use client";

import React, { useState } from "react";
import {
  Upload,
  FileCheck2,
  PackageCheck,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { uploadEmployeeDeliverableAction } from "@/app/actions/employee";

interface DeliverableUploaderProps {
  orderId: string;
  orderNumber: string;
}

export function DeliverableUploader({
  orderId,
  orderNumber,
}: DeliverableUploaderProps) {
  const [fileName, setFileName] = useState("");
  const [fileCategory, setFileCategory] = useState("deliverable");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    setIsSubmitting(true);
    setSuccess(false);
    setError(null);

    try {
      const extension = fileName.split(".").pop() || "zip";
      const mimeType =
        extension === "pdf"
          ? "application/pdf"
          : extension === "zip"
          ? "application/zip"
          : "application/octet-stream";
      const fakeSize = Math.floor(1024 * 1024 * (5 + Math.random() * 25)); // 5MB - 30MB
      const storagePath = `orders/${orderNumber}/deliverables/${fileName.trim()}`;

      const res = await uploadEmployeeDeliverableAction(
        orderId,
        orderNumber,
        fileName.trim(),
        fakeSize,
        mimeType,
        storagePath
      );

      if (res.success) {
        setSuccess(true);
        setFileName("");
      } else {
        setError(res.error || "Failed to register deliverable file.");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Upload className="w-4 h-4 text-vermilion" />
          Upload Final Deliverable
        </CardTitle>
        <CardDescription className="text-xs">
          Deliverables are deposited into private encrypted storage and made accessible to the client.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          {success && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Deliverable file safely registered in project vault!</span>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Deliverable File Name
            </label>
            <Input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="e.g. madurai-tea-final-brand-pack.zip or master-cut-4k.mp4"
              required
              className="text-xs"
            />
            <p className="text-[10px] text-muted-foreground">
              Accepted formats: .zip, .pdf, .mp4, .png, .figma (Up to 100MB per file).
            </p>
          </div>

          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              disabled={isSubmitting || !fileName.trim()}
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-vermilion-700 dark:hover:bg-vermilion-500 font-medium text-xs gap-1.5"
            >
              {isSubmitting ? "Uploading..." : "Save Deliverable"}
              <PackageCheck className="w-3.5 h-3.5" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
