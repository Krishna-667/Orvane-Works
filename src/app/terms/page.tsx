import { FileCheck2, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/constants/site";

export const metadata = {
  title: `Terms of Service (Draft) | ${SITE_CONFIG.name}`,
  description:
    `Client terms and conditions of service for ${SITE_CONFIG.name}. Marked draft, needs lawyer review.`,
};

export default function TermsPage() {
  return (
    <div className="container py-12 md:py-16 max-w-4xl space-y-10">
      {/* Notice Banner */}
      <div className="rounded-xl border border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/60 p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          <strong className="block font-semibold mb-0.5">
            Legal Status: Draft, Needs Lawyer Review
          </strong>
          These terms govern the commissioning and delivery of freelance
          services provided by {SITE_CONFIG.name} in Madurai, Tamil Nadu, India.
        </div>
      </div>

      <div className="space-y-3">
        <Badge variant="accent">Legal Agreement</Badge>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Terms of Service
        </h1>
        <p className="text-xs text-muted-foreground">
          Last Updated: October 2026 • Madurai, Tamil Nadu
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-muted-foreground space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">
            1. Services & Commissioning
          </h2>
          <p>
            {SITE_CONFIG.name} provides freelance digital design, full-stack web
            development, video editing, and brand asset production. All work is
            initiated via an agreed project brief and formal quote issued in Indian
            Rupees (₹).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">
            2. Intellectual Property & Deliverables
          </h2>
          <p>
            Upon full settlement of the agreed quote amount, all custom code,
            compiled assets, and design files produced specifically for the client
            are assigned to the client. {SITE_CONFIG.name} retains the right to display the
            delivered work in its public portfolio and case studies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">
            3. Invoicing & Currency
          </h2>
          <p>
            All fees are quoted and invoiced in Indian Rupees (₹). Payments in
            Version 1 are accepted via Bank Wire Transfer (NEFT/RTGS/IMPS) or UPI
            and recorded within the Client Portal.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">
            4. Revisions & Acceptance
          </h2>
          <p>
            Each package includes the agreed number of revision rounds. Any
            substantial additions to project scope outside the original brief
            require an updated quote.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">
            5. Jurisdiction & Dispute Resolution
          </h2>
          <p>
            These terms are governed by the laws of India. Any legal dispute
            arising from or in connection with our services shall be subject to the
            exclusive jurisdiction of the courts in Madurai, Tamil Nadu.
          </p>
        </section>
      </div>
    </div>
  );
}
