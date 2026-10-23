import React from "react";
import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAuditLogs } from "@/lib/data/admin";
import { AuditClient } from "./audit-client";

export const metadata = {
  title: "Audit Log Explorer — Orvane Admin",
  description:
    "Chronological, tamper-evident log of all studio administrative operations.",
};

export default async function AdminAuditPage() {
  const logs = await getAuditLogs();

  return (
    <div className="container py-8 space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <Link href="/admin">
          <Button variant="ghost" size="sm" className="gap-2 text-xs">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Admin Overview
          </Button>
        </Link>
        <span className="text-xs font-mono text-muted-foreground">
          Founder Governance / Security
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Activity className="w-7 h-7 text-vermilion" />
          Audit Trail &amp; System Event Logs
        </h1>
        <p className="text-sm text-muted-foreground">
          Tamper-evident record of all administrative operations, employee approvals, quote issuances, and project status transitions.
        </p>
      </div>

      <AuditClient initialLogs={logs} />
    </div>
  );
}
