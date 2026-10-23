import React from "react";
import Link from "next/link";
import { ArrowLeft, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServices, getTestimonials, getFaqs } from "@/lib/data/content";
import { ContentClient } from "./content-client";

export const metadata = {
  title: "Content CMS & Settings — Orvane Admin",
  description:
    "Moderate client reviews, manage dynamic services catalog, and configure studio contact coordinates.",
};

export default async function AdminContentPage() {
  const [services, testimonials, faqs] = await Promise.all([
    getServices(),
    getTestimonials(),
    getFaqs(),
  ]);

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
          Founder Governance / CMS
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <FileSpreadsheet className="w-7 h-7 text-vermilion" />
          Content CMS &amp; Studio Configurations
        </h1>
        <p className="text-sm text-muted-foreground">
          Moderate client testimonials, review dynamic service categories, and update studio brand coordinates across all public pages.
        </p>
      </div>

      <ContentClient
        initialServices={services}
        initialTestimonials={testimonials}
        initialFaqs={faqs}
      />
    </div>
  );
}
