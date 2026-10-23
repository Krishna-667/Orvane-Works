import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPackages, getServices } from "@/lib/data/content";
import { formatINR } from "@/lib/utils";

export const metadata = {
  title: "Pricing Packages",
  description:
    "Transparent freelance studio packages starting in Indian Rupees (₹). Web development, video editing, and content creation.",
};

export const revalidate = 60;

export default async function PackagesPage() {
  const [packages, services] = await Promise.all([getPackages(), getServices()]);

  const serviceMap = new Map(services.map((s) => [s.id, s]));

  return (
    <div className="container py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <Badge variant="accent">Transparent Pricing</Badge>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Studio Packages (Starting from ₹)
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Predictable scopes designed for small businesses, coaching centres,
          clinics, and startups in Madurai and across Tamil Nadu. Custom project
          scopes also quoted within 24 hours.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const service = serviceMap.get(pkg.service_id);

          return (
            <Card
              key={pkg.id}
              className={`flex flex-col justify-between ${
                pkg.is_popular
                  ? "border-primary/50 shadow-md bg-vermilion-50/20 dark:bg-vermilion-950/20"
                  : "border-border"
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>{service?.title || "Studio Service"}</span>
                  {pkg.is_popular && <Badge variant="accent">Popular</Badge>}
                </div>
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <div className="pt-3">
                  <span className="text-3xl font-bold text-foreground">
                    {formatINR(pkg.price_inr)}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    • ~{pkg.delivery_time_days} days delivery
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-2.5 text-xs text-muted-foreground border-t border-border/40 pt-4">
                {pkg.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </CardContent>

              <CardFooter className="pt-0 border-t border-border/40 p-6">
                <Link
                  href={`/dashboard/orders/new?service=${service?.slug || ""}&package=${pkg.slug}`}
                  className="w-full"
                >
                  <Button
                    variant={pkg.is_popular ? "default" : "outline"}
                    className="w-full gap-2 font-semibold"
                  >
                    Select Package
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Custom Quote Strip */}
      <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center max-w-2xl mx-auto space-y-4">
        <h3 className="font-display text-xl font-bold text-foreground">
          Need a tailored scope or enterprise sprint?
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          We quote custom full-stack web applications, multi-camera commercials,
          and brand design systems within 24 hours in Indian Rupees (₹).
        </p>
        <Link href="/dashboard/orders/new">
          <Button size="lg" className="font-semibold">
            Request Custom Quote
          </Button>
        </Link>
      </div>
    </div>
  );
}
