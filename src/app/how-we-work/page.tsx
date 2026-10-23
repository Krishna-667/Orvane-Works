import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, ShieldAlert, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "How We Work",
  description:
    "Our transparent 4-step workflow, communication standards, and deliverable commitments at Orvane Studio.",
};

export default function HowWeWorkPage() {
  const steps = [
    {
      num: "01",
      title: "Discover & Quote",
      timeline: "Within 24 Hours",
      details: [
        "You submit your brief with budget range in ₹ and deadline",
        "A student technical lead assesses scope and feasibility",
        "We issue a transparent, itemized quote with clear milestones",
        "Zero obligation until you accept the formal quote",
      ],
    },
    {
      num: "02",
      title: "Design & Build",
      timeline: "Days 2 - 10",
      details: [
        "We scaffold your product using strict design tokens",
        "You receive live staging links and preview cuts",
        "Client dashboard tracks real-time progress chips",
        "Async updates via WhatsApp or project message thread",
      ],
    },
    {
      num: "03",
      title: "Refine & Polish",
      timeline: "Days 10 - 14",
      details: [
        "Collaborate directly with the creators building your assets",
        "Included revision rounds to fine-tune copy, styling, and motion",
        "Performance audit: Lighthouse 90+ mobile check & WCAG testing",
      ],
    },
    {
      num: "04",
      title: "Deliver & Support",
      timeline: "Launch Day + 30 Days",
      details: [
        "Deliverables uploaded to secure private vault with signed links",
        "DNS configuration and production deployment to Vercel/Netlify",
        "Handoff of all vector assets, project code, and documentation",
        "30 days of post-launch bug fixing and check-in support",
      ],
    },
  ];

  return (
    <div className="container py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <Badge variant="accent">Process & Standards</Badge>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          How we turn your brief into production craft.
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          No corporate layers, no vague timelines, and no unexpected invoices.
          Here is exactly what you can expect when you partner with Orvane.
        </p>
      </div>

      {/* 4 Steps Timeline */}
      <div className="space-y-8">
        {steps.map((step) => (
          <div
            key={step.num}
            className="rounded-2xl border border-border bg-card p-6 sm:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start"
          >
            <div className="shrink-0 flex items-center md:flex-col gap-3">
              <span className="font-display text-4xl sm:text-5xl font-bold text-primary/30">
                {step.num}
              </span>
              <Badge variant="secondary" className="text-xs">
                {step.timeline}
              </Badge>
            </div>

            <div className="space-y-4 flex-1">
              <h2 className="font-display text-2xl font-bold text-foreground">
                {step.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-muted-foreground">
                {step.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Communication Commitment */}
      <div className="rounded-2xl border border-border bg-card p-8 md:p-12 space-y-4 max-w-4xl mx-auto text-center">
        <h3 className="font-display text-2xl font-bold text-foreground">
          Direct Creator Communication
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Every client gets a dedicated thread inside our client portal and a
          direct WhatsApp contact channel with their assigned student lead.
        </p>
        <div className="pt-2">
          <Link href="/dashboard/orders/new">
            <Button size="lg" className="font-semibold gap-2">
              Start your project now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
