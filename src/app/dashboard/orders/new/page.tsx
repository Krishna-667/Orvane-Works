import React, { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServices, getPackages } from "@/lib/data/content";
import { getTeamMembers } from "@/lib/data/team";
import { OrderForm } from "./order-form";

export const metadata = {
  title: "New Project Request — Orvane Client Portal",
  description:
    "Submit a new web development, video editing, or content design brief to Orvane Studio.",
};

export default async function NewOrderPage() {
  const [services, packages, teamMembers] = await Promise.all([
    getServices(),
    getPackages(),
    getTeamMembers(),
  ]);

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      {/* Navigation header */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="gap-2 text-xs">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Client Portal
          </Button>
        </Link>
        <span className="text-xs text-muted-foreground font-mono">
          Stage 1 / Brief Submission
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          New Project Request
        </h1>
        <p className="text-sm text-muted-foreground">
          Provide your specifications, budget range, and timeline. Our student founders will review your scope and provide a formal quote within 24 hours.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="py-16 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-vermilion" />
            <p className="text-xs text-muted-foreground mt-2">
              Loading service options &amp; team availability...
            </p>
          </div>
        }
      >
        <OrderForm
          services={services}
          packages={packages}
          teamMembers={teamMembers}
        />
      </Suspense>
    </div>
  );
}
