"use client";

import React, { useState } from "react";
import {
  Inbox,
  Mail,
  Cpu,
  CheckCircle2,
  Phone,
  MessageSquare,
  Clock,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  toggleContactHandledAction,
  toggleWaitlistHandledAction,
} from "@/app/actions/admin";
import { formatDate } from "@/lib/utils";
import type { ContactMessageItem, WaitlistEntryItem } from "@/lib/data/admin";

interface InboxClientProps {
  initialContactMessages: ContactMessageItem[];
  initialWaitlistEntries: WaitlistEntryItem[];
}

export function InboxClient({
  initialContactMessages,
  initialWaitlistEntries,
}: InboxClientProps) {
  const [tab, setTab] = useState<"contact" | "waitlist">("contact");
  const [contactMessages, setContactMessages] = useState<ContactMessageItem[]>(
    initialContactMessages
  );
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntryItem[]>(
    initialWaitlistEntries
  );

  const unhandledContact = contactMessages.filter((c) => !c.is_handled).length;
  const unhandledWaitlist = waitlistEntries.filter((w) => !w.is_handled).length;

  const handleToggleContact = async (msg: ContactMessageItem) => {
    const nextState = !msg.is_handled;
    setContactMessages((prev) =>
      prev.map((c) => (c.id === msg.id ? { ...c, is_handled: nextState } : c))
    );
    try {
      await toggleContactHandledAction(msg.id, nextState);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleWaitlist = async (entry: WaitlistEntryItem) => {
    const nextState = !entry.is_handled;
    setWaitlistEntries((prev) =>
      prev.map((w) => (w.id === entry.id ? { ...w, is_handled: nextState } : w))
    );
    try {
      await toggleWaitlistHandledAction(entry.id, nextState);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setTab("contact")}
          className={`flex items-center gap-2 pb-3 px-4 text-xs font-semibold border-b-2 transition-all ${
            tab === "contact"
              ? "border-vermilion text-vermilion"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Contact Inquiries ({contactMessages.length})</span>
          {unhandledContact > 0 && (
            <Badge variant="destructive" className="text-[10px] h-4 px-1.5">
              {unhandledContact} new
            </Badge>
          )}
        </button>

        <button
          onClick={() => setTab("waitlist")}
          className={`flex items-center gap-2 pb-3 px-4 text-xs font-semibold border-b-2 transition-all ${
            tab === "waitlist"
              ? "border-vermilion text-vermilion"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Hardware &amp; IoT Waitlist ({waitlistEntries.length})</span>
          {unhandledWaitlist > 0 && (
            <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
              {unhandledWaitlist} new
            </Badge>
          )}
        </button>
      </div>

      {/* Tab 1: Contact Inquiries */}
      {tab === "contact" && (
        <Card className="border-border">
          <CardHeader className="pb-3 border-b border-border/80">
            <CardTitle className="text-base flex items-center gap-2">
              <Mail className="w-4 h-4 text-vermilion" />
              General &amp; Service Inquiries
            </CardTitle>
            <CardDescription className="text-xs">
              Messages received via public /contact form. Mark &ldquo;Handled&rdquo; once your team has followed up.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {contactMessages.length === 0 ? (
                <div className="py-12 text-center text-xs text-muted-foreground">
                  No contact messages received yet.
                </div>
              ) : (
                contactMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-colors ${
                      msg.is_handled ? "opacity-60 bg-muted/10" : "bg-card"
                    }`}
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-sm text-foreground">
                          {msg.name}
                        </span>
                        <Badge variant="outline" className="text-[10px]">
                          {msg.service_title || "General"}
                        </Badge>
                        <span className="text-[11px] text-muted-foreground">
                          • {formatDate(msg.created_at)}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <a
                          href={`mailto:${msg.email}`}
                          className="hover:text-vermilion flex items-center gap-1 font-mono"
                        >
                          <Mail className="w-3 h-3" />
                          {msg.email}
                        </a>
                        {msg.phone && (
                          <a
                            href={`tel:${msg.phone}`}
                            className="hover:text-vermilion flex items-center gap-1 font-mono"
                          >
                            <Phone className="w-3 h-3" />
                            {msg.phone}
                          </a>
                        )}
                      </div>

                      <div className="p-3 rounded-lg bg-muted/30 border border-border/60 text-xs text-foreground/90 whitespace-pre-line leading-relaxed max-w-3xl">
                        {msg.message}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2 pt-1">
                      <label className="flex items-center gap-2 text-xs font-medium cursor-pointer p-2 rounded hover:bg-muted/30">
                        <input
                          type="checkbox"
                          checked={msg.is_handled}
                          onChange={() => handleToggleContact(msg)}
                          className="rounded border-input text-vermilion focus:ring-vermilion"
                        />
                        <span>{msg.is_handled ? "Handled" : "Mark Handled"}</span>
                      </label>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 2: Hardware & IoT Waitlist */}
      {tab === "waitlist" && (
        <Card className="border-border">
          <CardHeader className="pb-3 border-b border-border/80">
            <CardTitle className="text-base flex items-center gap-2">
              <Cpu className="w-4 h-4 text-vermilion" />
              Hardware &amp; IoT Pilot Interest
            </CardTitle>
            <CardDescription className="text-xs">
              Registrations from ambitious clients interested in Orvane&apos;s upcoming hardware and IoT division.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {waitlistEntries.length === 0 ? (
                <div className="py-12 text-center text-xs text-muted-foreground">
                  No waitlist entries registered yet.
                </div>
              ) : (
                waitlistEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className={`p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-colors ${
                      entry.is_handled ? "opacity-60 bg-muted/10" : "bg-card"
                    }`}
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-sm text-foreground">
                          {entry.full_name}
                        </span>
                        {entry.company_or_project && (
                          <Badge variant="secondary" className="text-[10px]">
                            {entry.company_or_project}
                          </Badge>
                        )}
                        <span className="text-[11px] text-muted-foreground">
                          • {formatDate(entry.created_at)}
                        </span>
                      </div>

                      <a
                        href={`mailto:${entry.email}`}
                        className="text-xs text-muted-foreground hover:text-vermilion font-mono block"
                      >
                        {entry.email}
                      </a>

                      <div className="p-3 rounded-lg bg-muted/30 border border-border/60 text-xs text-foreground/90 whitespace-pre-line leading-relaxed max-w-3xl">
                        {entry.interest_details}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2 pt-1">
                      <label className="flex items-center gap-2 text-xs font-medium cursor-pointer p-2 rounded hover:bg-muted/30">
                        <input
                          type="checkbox"
                          checked={entry.is_handled}
                          onChange={() => handleToggleWaitlist(entry)}
                          className="rounded border-input text-vermilion focus:ring-vermilion"
                        />
                        <span>{entry.is_handled ? "Handled" : "Mark Handled"}</span>
                      </label>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
