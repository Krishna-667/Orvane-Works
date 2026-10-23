import Link from "next/link";
import { ArrowRight, Code2, Cpu, MapPin, Users, HeartHandshake, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "About the Studio",
  description:
    "The story of Orvane: a student-founded freelance digital studio in Madurai, Tamil Nadu, India.",
};

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <Badge variant="accent">Our Origins</Badge>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Student engineers with professional precision.
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Orvane was founded in Madurai by engineering students who saw small
          businesses and growing clinics struggling with bloated agency fees and
          broken templates. We decided to build a studio driven by clean code,
          honest pricing in INR (₹), and genuine local partnership.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-vermilion-50 dark:bg-vermilion-950 flex items-center justify-center text-primary mb-3">
              <Code2 className="w-5 h-5" />
            </div>
            <CardTitle className="text-lg">Engineering Rigor</CardTitle>
          </CardHeader>
          <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            We write strict TypeScript, enforce Row Level Security on every
            Postgres table, and optimize assets so public pages hit a 90+ mobile
            Lighthouse score on 4G networks.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-vermilion-50 dark:bg-vermilion-950 flex items-center justify-center text-primary mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <CardTitle className="text-lg">Madurai Roots</CardTitle>
          </CardHeader>
          <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Headquartered in Madurai, Tamil Nadu. We understand regional consumer
            behavior, WhatsApp-driven ordering, and bilingual (Tamil & English)
            communication needs.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-vermilion-50 dark:bg-vermilion-950 flex items-center justify-center text-primary mb-3">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <CardTitle className="text-lg">Transparent Partnership</CardTitle>
          </CardHeader>
          <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Zero corporate telephone game. Clients chat directly with assigned
            student specialists, test clickable previews, and receive itemized
            quotes with no surprise line items.
          </CardContent>
        </Card>
      </div>

      {/* Story Section */}
      <div className="rounded-2xl border border-border bg-card p-8 md:p-12 space-y-6 max-w-4xl">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
          Why engineering students?
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <p>
            Traditional agencies often rely on bloated WordPress themes,
            unmaintained plugins, and layers of account managers that inflate
            costs and slow down delivery.
          </p>
          <p>
            As engineering students, we spend our days studying systems
            architecture, modern frameworks, and design tokens. When you hire
            Orvane, you get hungry, skilled developers and creators who treat
            your project with craft and personal accountability.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap gap-4 border-t border-border">
          <Link href="/team">
            <Button variant="outline" className="gap-2">
              <Users className="w-4 h-4" />
              Meet the Student Team
            </Button>
          </Link>
          <Link href="/contact">
            <Button className="gap-2 font-semibold">
              Start a Conversation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
