import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Video,
  Sparkles,
  Cpu,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
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
import { StatusChip } from "@/components/ui/status-chip";
import { SITE_CONFIG } from "@/lib/constants/site";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 lg:pt-28 pb-10">
        <div className="container relative z-10 flex flex-col items-start gap-6 max-w-4xl">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-vermilion-200 bg-vermilion-50 px-3.5 py-1 text-xs font-semibold text-vermilion-800 dark:border-vermilion-900 dark:bg-vermilion-950 dark:text-vermilion-300">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Madurai, Tamil Nadu • Student Engineering Studio</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08]">
            We craft digital products that make local brands{" "}
            <span className="text-primary underline decoration-vermilion-300/60 underline-offset-8">
              impossible to ignore.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Founded by engineering students in Madurai. We build high-conversion
            websites, cinematic videos, and strategic brand content for businesses
            across Tamil Nadu and remote clients worldwide.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
            <Link href={SITE_CONFIG.links.contact}>
              <Button size="lg" className="gap-2 w-full sm:w-auto font-semibold">
                Start a project
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href={SITE_CONFIG.links.portfolio}>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto font-medium"
              >
                Explore selected work
              </Button>
            </Link>
          </div>

          {/* Value Props Strip */}
          <div className="pt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-muted-foreground border-t border-border/80 w-full">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              No corporate overhead
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-emerald-600" />
              24-hour brief turnaround
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Transparent pricing in INR (₹)
            </span>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION (Driven by dynamic data architecture) */}
      <section className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <Badge variant="accent" className="mb-2">
              Capabilities
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Studio Services
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mt-1 max-w-xl">
              Every service is driven dynamically from our database catalogue,
              enabling modular expansion as our studio scales.
            </p>
          </div>
          <Link
            href="/services"
            className="text-sm font-semibold text-primary inline-flex items-center gap-1 hover:underline underline-offset-4"
          >
            All services & packages
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service 1: Web Development */}
          <Card className="hover:border-primary/50 transition-colors flex flex-col justify-between">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-vermilion-50 dark:bg-vermilion-950 flex items-center justify-center text-primary mb-4 border border-vermilion-200 dark:border-vermilion-900">
                <Code2 className="w-6 h-6" />
              </div>
              <CardTitle>Web Design & Development</CardTitle>
              <CardDescription>
                Fast, responsive web apps and websites built on Next.js,
                TypeScript, and Supabase. Optimized for 90+ mobile Lighthouse
                performance.
              </CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
              <Link
                href="/services/web-development"
                className="text-xs font-semibold text-primary inline-flex items-center gap-1 hover:underline"
              >
                Learn more & view packages
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </CardFooter>
          </Card>

          {/* Service 2: Video Editing */}
          <Card className="hover:border-primary/50 transition-colors flex flex-col justify-between">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-vermilion-50 dark:bg-vermilion-950 flex items-center justify-center text-primary mb-4 border border-vermilion-200 dark:border-vermilion-900">
                <Video className="w-6 h-6" />
              </div>
              <CardTitle>Video Editing & Motion</CardTitle>
              <CardDescription>
                High-retention Instagram reels, YouTube videos, and brand
                commercials. Color grading, sound design, and custom captions.
              </CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
              <Link
                href="/services/video-editing"
                className="text-xs font-semibold text-primary inline-flex items-center gap-1 hover:underline"
              >
                Learn more & view packages
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </CardFooter>
          </Card>

          {/* Service 3: Content Creation */}
          <Card className="hover:border-primary/50 transition-colors flex flex-col justify-between">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-vermilion-50 dark:bg-vermilion-950 flex items-center justify-center text-primary mb-4 border border-vermilion-200 dark:border-vermilion-900">
                <Sparkles className="w-6 h-6" />
              </div>
              <CardTitle>Content & Brand Assets</CardTitle>
              <CardDescription>
                Engaging social media carousels, visual branding guidelines,
                custom vector graphics, and digital marketing materials.
              </CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
              <Link
                href="/services/content-creation"
                className="text-xs font-semibold text-primary inline-flex items-center gap-1 hover:underline"
              >
                Learn more & view packages
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Coming Soon Teaser: Hardware & IoT */}
        <div className="mt-6 rounded-xl border border-dashed border-border p-6 bg-card/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm text-foreground">
                  Hardware & IoT Prototypes
                </h4>
                <Badge variant="accent" className="text-[10px] py-0">
                  Coming soon
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Microcontroller firmware, sensor telemetry, and automation
                engineering by student specialists.
              </p>
            </div>
          </div>
          <Link href="/hardware">
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              Join the waitlist
            </Button>
          </Link>
        </div>
      </section>

      {/* 3. WORKFLOW PROCESS */}
      <section className="container py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-2">
            The Method
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            How We Work
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mt-2">
            A straightforward process with direct creator communication and zero
            corporate telephone game.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: "01",
              title: "Discover & Quote",
              desc: "Submit your requirements. We analyze your scope and issue a fixed, transparent quote in INR (₹) within 24 hours.",
            },
            {
              num: "02",
              title: "Design & Iterate",
              desc: "We build live clickable prototypes and staging previews so you can test before final sign-off.",
            },
            {
              num: "03",
              title: "Refine with Team",
              desc: "Direct communication with assigned student specialists. Fast revisions with no middle managers.",
            },
            {
              num: "04",
              title: "Deliver & Launch",
              desc: "Full code and asset transfer, deployment to your domain, and ongoing technical support.",
            },
          ].map((step) => (
            <div
              key={step.num}
              className="relative rounded-xl border border-border bg-card p-6 flex flex-col gap-3"
            >
              <span className="font-display text-3xl font-bold text-primary/30">
                {step.num}
              </span>
              <h3 className="font-semibold text-base text-foreground">
                {step.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WORK & CLIENT STATUS PREVIEW */}
      <section className="container">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <Badge variant="accent">Client Experience</Badge>
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              Transparent project timelines, from brief to delivery.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every client gets a dedicated dashboard with real-time status chips,
              deliverable files stored securely with signed download links, and
              direct chat with their assigned creators.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <StatusChip status="submitted" />
              <StatusChip status="in_review" />
              <StatusChip status="quote_sent" />
              <StatusChip status="in_progress" />
              <StatusChip status="delivered" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLOSING CALL TO ACTION */}
      <section className="container">
        <div className="rounded-2xl bg-gradient-to-br from-vermilion-900 to-vermilion-950 text-white p-8 md:p-14 text-center flex flex-col items-center gap-6 shadow-xl">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold max-w-2xl leading-tight">
            Have a project in mind? Let&apos;s build it right.
          </h2>
          <p className="text-vermilion-100 max-w-xl text-sm md:text-base leading-relaxed">
            Whether you run a clinic in Madurai, a growing restaurant in Tamil
            Nadu, or an ambitious remote startup, we are ready to partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href={SITE_CONFIG.links.contact}>
              <Button
                size="lg"
                className="bg-white text-ink-950 hover:bg-cream-100 font-semibold"
              >
                Send project details
              </Button>
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                SITE_CONFIG.whatsappDefaultMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 font-medium"
              >
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
