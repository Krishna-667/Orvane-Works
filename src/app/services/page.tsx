import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Code2, Video, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServices, getPackages } from "@/lib/data/content";
import { formatINR } from "@/lib/utils";

export const metadata = {
  title: "Studio Services",
  description:
    "Explore our modular engineering, video editing, and content creation services in Madurai, Tamil Nadu.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const [services, packages] = await Promise.all([getServices(), getPackages()]);

  return (
    <div className="container py-12 md:py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <Badge variant="accent">Studio Capabilities</Badge>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Modular digital craft, engineered for growth.
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Our studio services are completely data-driven. From modern Next.js
          web applications to high-retention vertical reels, explore our
          disciplines and transparent starting pricing.
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-12">
        {services.map((svc) => {
          const servicePackages = packages.filter((p) => p.service_id === svc.id);

          return (
            <div
              key={svc.id}
              id={svc.slug}
              className="rounded-2xl border border-border bg-card p-6 sm:p-10 space-y-8"
            >
              {/* Service Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-border">
                <div className="space-y-3 max-w-2xl">
                  <div className="w-12 h-12 rounded-xl bg-vermilion-50 dark:bg-vermilion-950 flex items-center justify-center text-primary border border-vermilion-200 dark:border-vermilion-900">
                    {svc.icon_name === "Code2" && <Code2 className="w-6 h-6" />}
                    {svc.icon_name === "Video" && <Video className="w-6 h-6" />}
                    {svc.icon_name === "Sparkles" && <Sparkles className="w-6 h-6" />}
                    {svc.icon_name !== "Code2" &&
                      svc.icon_name !== "Video" &&
                      svc.icon_name !== "Sparkles" && <Sparkles className="w-6 h-6" />}
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                    {svc.title}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {svc.full_description}
                  </p>
                </div>

                <div className="shrink-0 flex flex-col gap-2">
                  <Link href={`/services/${svc.slug}`}>
                    <Button variant="outline" size="sm" className="w-full gap-1.5">
                      Service Deep Dive
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/dashboard/orders/new?service=${svc.slug}`}>
                    <Button size="sm" className="w-full font-semibold">
                      Request Quote
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Associated Packages */}
              {servicePackages.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                    Popular Packages for {svc.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {servicePackages.map((pkg) => (
                      <Card
                        key={pkg.id}
                        className={`border ${
                          pkg.is_popular
                            ? "border-primary/50 shadow-md bg-vermilion-50/20 dark:bg-vermilion-950/20"
                            : "border-border"
                        }`}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{pkg.name}</CardTitle>
                            {pkg.is_popular && (
                              <Badge variant="accent">Popular</Badge>
                            )}
                          </div>
                          <div className="pt-2">
                            <span className="text-2xl font-bold text-foreground">
                              {formatINR(pkg.price_inr)}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">
                              • ~{pkg.delivery_time_days} days delivery
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
                            href={`/dashboard/orders/new?service=${svc.slug}&package=${pkg.slug}`}
                            className="w-full"
                          >
                            <Button
                              variant={pkg.is_popular ? "default" : "outline"}
                              size="sm"
                              className="w-full font-semibold"
                            >
                              Choose Package
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
