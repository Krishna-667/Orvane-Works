import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, TrendingUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPortfolioProjects, getProjectBySlug } from "@/lib/data/content";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Case Study Not Found" };

  return {
    title: `${project.title} | Case Study`,
    description: project.challenge,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  return (
    <div className="container py-12 md:py-16 space-y-16">
      {/* Back Link */}
      <div>
        <Link
          href="/portfolio"
          className="text-xs font-semibold text-muted-foreground hover:text-primary inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all case studies
        </Link>
      </div>

      {/* Case Study Header */}
      <div className="max-w-4xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{project.service_title || "Studio Service"}</Badge>
          <Badge variant="outline">{project.client_name}</Badge>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
          {project.title}
        </h1>
        {project.project_url && (
          <div className="pt-2">
            <a
              href={project.project_url}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-primary inline-flex items-center gap-1.5 hover:underline"
            >
              <span>Visit live project</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* Hero Media */}
      <div className="relative rounded-2xl overflow-hidden border border-border aspect-video w-full max-w-5xl bg-muted">
        <Image
          src={project.thumbnail_url}
          alt={project.title}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1200px"
          className="object-cover"
        />
      </div>

      {/* Outcome Metrics Strip */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 max-w-5xl">
        <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>Measurable Outcomes & Impact</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Object.entries(project.outcome_metrics).map(([key, value]) => (
            <div key={key} className="space-y-1 border-l-2 border-primary pl-4">
              <span className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                {value}
              </span>
              <p className="text-xs text-muted-foreground font-medium">{key}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Challenge & Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 space-y-3">
          <h3 className="font-display text-xl font-bold text-foreground">
            The Challenge
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.challenge}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 space-y-3">
          <h3 className="font-display text-xl font-bold text-foreground">
            The Studio Solution
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Closing Call to Action */}
      <div className="rounded-2xl border border-dashed border-border p-8 md:p-12 text-center max-w-3xl mx-auto space-y-4">
        <h3 className="font-display text-2xl font-bold text-foreground">
          Ready to achieve similar results for your business?
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Submit your project requirements today. Our student specialists in
          Madurai review briefs and issue itemized quotes within 24 hours.
        </p>
        <div className="pt-2">
          <Link href="/dashboard/orders/new">
            <Button size="lg" className="font-semibold gap-2">
              Start a project like this
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
