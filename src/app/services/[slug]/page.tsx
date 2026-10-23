import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Clock, Code2, Video, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { getServices, getServiceBySlug, getPackagesByService } from "@/lib/data/content";
import { formatINR } from "@/lib/utils";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const service = await getServiceBySlug(params.slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: service.title,
    description: service.short_description,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const service = await getServiceBySlug(params.slug);
  if (!service) {
    notFound();
  }

  const packages = await getPackagesByService(service.id);

  return (
    <div className="container py-12 md:py-16 space-y-16">
      {/* Back Link */}
      <div>
        <Link
          href="/services"
          className="text-xs font-semibold text-muted-foreground hover:text-primary inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all studio services
        </Link>
      </div>

      {/* Service Header */}
      <div className="max-w-3xl space-y-4">
        <Badge variant="accent">Specialized Discipline</Badge>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          {service.title}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {service.full_description}
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Link href={`/dashboard/orders/new?service=${service.slug}`}>
            <Button size="lg" className="gap-2 font-semibold shadow-sm">
              Start a project in {service.title}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Ask a question
            </Button>
          </Link>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Available Packages & Scope
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Standard tiers starting from fixed rates in INR (₹). Custom scopes
            are also available.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`flex flex-col justify-between ${
                pkg.is_popular
                  ? "border-primary/50 shadow-md bg-vermilion-50/20 dark:bg-vermilion-950/20"
                  : "border-border"
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  {pkg.is_popular && <Badge variant="accent">Popular</Badge>}
                </div>
                <div className="pt-2">
                  <span className="text-2xl font-bold text-foreground">
                    {formatINR(pkg.price_inr)}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    • ~{pkg.delivery_time_days} days
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-muted-foreground">
                {pkg.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-0">
                <Link
                  href={`/dashboard/orders/new?service=${service.slug}&package=${pkg.slug}`}
                  className="w-full"
                >
                  <Button
                    variant={pkg.is_popular ? "default" : "outline"}
                    className="w-full font-semibold"
                  >
                    Select this Package
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Why Orvane Section */}
      <div className="rounded-2xl border border-border bg-card p-8 md:p-12 space-y-6">
        <h3 className="font-display text-2xl font-bold">
          Why work with Orvane for {service.title}?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Clock className="w-5 h-5 text-primary" />
            <h4 className="font-semibold text-sm">Direct Student Creator</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              You communicate directly with the student lead writing your code
              or editing your video timeline.
            </p>
          </div>
          <div className="space-y-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h4 className="font-semibold text-sm">Zero Bloat Guarantee</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every deliverable is lean, responsive, and checked against WCAG 2.2
              accessibility and Lighthouse 90+ mobile standards.
            </p>
          </div>
          <div className="space-y-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-sm">Clear INR Pricing</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Transparent milestone estimates with no hidden agency markups or
              surprise hourly charges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
