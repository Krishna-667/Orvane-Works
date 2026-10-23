import React from "react";
import Link from "next/link";
import { ArrowLeft, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllOrdersAdmin } from "@/lib/data/admin";
import { OrdersClient } from "./orders-client";

export const metadata = {
  title: "Global Orders Management — Orvane Admin",
  description:
    "Filter orders by status, assign student engineering leads, issue quotes, and update payment terms.",
};

export default async function AdminOrdersPage() {
  const orders = await getAllOrdersAdmin();

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
          Founder Governance / Orders
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <FolderKanban className="w-7 h-7 text-vermilion" />
          Global Order Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Track project milestones, assign student leads, issue official quotes, record payment statuses, and maintain internal notes.
        </p>
      </div>

      <OrdersClient initialOrders={orders} />
    </div>
  );
}
