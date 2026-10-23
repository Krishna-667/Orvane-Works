"use client";

import React, { useState } from "react";
import {
  FileSpreadsheet,
  Star,
  CheckCircle2,
  Eye,
  EyeOff,
  Settings,
  Sparkles,
  HelpCircle,
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
import { moderateTestimonialAction } from "@/app/actions/admin";
import { SITE_CONFIG } from "@/lib/constants/site";
import type { ServiceItem, TestimonialItem, FaqItem } from "@/lib/data/content";

interface ContentClientProps {
  initialServices: ServiceItem[];
  initialTestimonials: TestimonialItem[];
  initialFaqs: FaqItem[];
}

export function ContentClient({
  initialServices,
  initialTestimonials,
  initialFaqs,
}: ContentClientProps) {
  const [activeTab, setActiveTab] = useState<"testimonials" | "services" | "settings">(
    "testimonials"
  );
  const [testimonials, setTestimonials] = useState<
    (TestimonialItem & { is_approved?: boolean })[]
  >(
    initialTestimonials.map((t) => ({
      ...t,
      is_approved: true, // Default seeds are approved
    }))
  );

  const handleToggleApprove = async (id: string, current: boolean, featured: boolean) => {
    const nextApproved = !current;
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_approved: nextApproved } : t))
    );
    try {
      await moderateTestimonialAction(id, nextApproved, featured);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleFeatured = async (id: string, approved: boolean, current: boolean) => {
    const nextFeatured = !current;
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_featured: nextFeatured } : t))
    );
    try {
      await moderateTestimonialAction(id, approved, nextFeatured);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("testimonials")}
          className={`flex items-center gap-2 pb-3 px-4 text-xs font-semibold border-b-2 transition-all ${
            activeTab === "testimonials"
              ? "border-vermilion text-vermilion"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Testimonial Moderation ({testimonials.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("services")}
          className={`flex items-center gap-2 pb-3 px-4 text-xs font-semibold border-b-2 transition-all ${
            activeTab === "services"
              ? "border-vermilion text-vermilion"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Services Catalog ({initialServices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 pb-3 px-4 text-xs font-semibold border-b-2 transition-all ${
            activeTab === "settings"
              ? "border-vermilion text-vermilion"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Site Settings &amp; Social Coordinates</span>
        </button>
      </div>

      {/* TAB 1: Testimonials Moderation */}
      {activeTab === "testimonials" && (
        <Card className="border-border">
          <CardHeader className="pb-3 border-b border-border/80">
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              Client Testimonials Moderation Deck
            </CardTitle>
            <CardDescription className="text-xs">
              Reviews submitted by clients upon order completion. Moderated reviews appear publicly on the Orvane homepage and /testimonials.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {testimonials.map((test) => (
                <div
                  key={test.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-muted/10 transition-colors"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-sm text-foreground">
                        {test.client_name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({test.client_role_company})
                      </span>
                      <div className="flex items-center gap-0.5 ml-2">
                        {[...Array(test.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 text-amber-500 fill-amber-500"
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-foreground/90 italic bg-muted/20 p-3 rounded-lg border border-border/60 max-w-3xl">
                      &ldquo;{test.content}&rdquo;
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-1">
                    <Button
                      size="sm"
                      variant={test.is_approved ? "outline" : "default"}
                      onClick={() =>
                        handleToggleApprove(
                          test.id,
                          !!test.is_approved,
                          test.is_featured
                        )
                      }
                      className="text-xs h-8"
                    >
                      {test.is_approved ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5 mr-1" />
                          Hide from Public
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          Approve Review
                        </>
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        handleToggleFeatured(
                          test.id,
                          !!test.is_approved,
                          test.is_featured
                        )
                      }
                      className="text-xs h-7 text-muted-foreground"
                    >
                      {test.is_featured ? "★ Featured on Home" : "☆ Feature on Home"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 2: Dynamic Services Catalog */}
      {activeTab === "services" && (
        <Card className="border-border">
          <CardHeader className="pb-3 border-b border-border/80">
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-vermilion" />
              Dynamic Studio Service Catalog
            </CardTitle>
            <CardDescription className="text-xs">
              Services are purely data-driven. Services configured here automatically propagate across the site, order form, and filters.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {initialServices.map((svc) => (
                <div
                  key={svc.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground">
                        {svc.title}
                      </span>
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {svc.slug}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px]">
                        Order #{svc.display_order}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground max-w-2xl">
                      {svc.short_description}
                    </p>
                  </div>

                  <Badge variant="default" className="text-xs shrink-0 bg-emerald-600">
                    Active Catalog Entry
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 3: Site Settings & Social Coordinates */}
      {activeTab === "settings" && (
        <Card className="border-border">
          <CardHeader className="pb-3 border-b border-border/80">
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="w-4 h-4 text-vermilion" />
              Studio Coordinates &amp; Social Links
            </CardTitle>
            <CardDescription className="text-xs">
              Key contact parameters shown in the header, footer, and floating WhatsApp trigger.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="font-semibold text-muted-foreground block">
                  Studio Locality &amp; Address
                </span>
                <p className="font-medium text-foreground">{SITE_CONFIG.address}</p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-muted-foreground block">
                  Official Email Inbox
                </span>
                <p className="font-mono text-foreground">{SITE_CONFIG.email}</p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-muted-foreground block">
                  WhatsApp Helpline Number
                </span>
                <p className="font-mono text-foreground">+{SITE_CONFIG.whatsappNumber}</p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-muted-foreground block">
                  Social Channels
                </span>
                <p className="text-muted-foreground">
                  Instagram: {SITE_CONFIG.socials.instagram} <br />
                  LinkedIn: {SITE_CONFIG.socials.linkedin}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
