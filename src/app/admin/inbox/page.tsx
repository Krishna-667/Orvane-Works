import React from "react";
import Link from "next/link";
import { ArrowLeft, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAdminInbox } from "@/lib/data/admin";
import { SITE_CONFIG } from "@/lib/constants/site";
import { InboxClient } from "./inbox-client";

export const metadata = {
  title: `Studio Inbox — ${SITE_CONFIG.name} Admin`,
  description: "Manage incoming contact inquiries and hardware pilot waitlist registrations.",
};

export default async function AdminInboxPage() {
  const { contactMessages, waitlistEntries } = await getAdminInbox();

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
          Founder Governance / Enquiries
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Inbox className="w-7 h-7 text-vermilion" />
          Studio Inbox &amp; Inquiries
        </h1>
        <p className="text-sm text-muted-foreground">
          Track inbound leads from businesses across Madurai, client questions, and upcoming hardware pilot waitlist applications.
        </p>
      </div>

      <InboxClient
        initialContactMessages={contactMessages}
        initialWaitlistEntries={waitlistEntries}
      />
    </div>
  );
}
