import { createClient } from "@/lib/supabase/server";

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  icon_name: string;
  is_active: boolean;
  display_order: number;
}

export interface PackageItem {
  id: string;
  service_id: string;
  name: string;
  slug: string;
  price_inr: number;
  delivery_time_days: number;
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  display_order: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  service_id?: string;
  service_title?: string;
  client_name: string;
  thumbnail_url: string;
  gallery_urls: string[];
  challenge: string;
  solution: string;
  outcome_metrics: Record<string, string>;
  project_url?: string;
  is_featured: boolean;
  display_order: number;
}

export interface TestimonialItem {
  id: string;
  client_name: string;
  client_role_company: string;
  avatar_url?: string;
  rating: number;
  content: string;
  is_featured: boolean;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  display_order: number;
}

// Fallback seed catalog (strictly labelled as demo placeholders)
export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    slug: "web-development",
    title: "Web Design & Development",
    short_description:
      "High-conversion, accessible web apps and marketing sites built on Next.js, strict TypeScript, and Supabase.",
    full_description:
      "Full-stack engineering for businesses in Madurai and across India. We specialize in fast-loading, mobile-first architectures with strict WCAG 2.2 accessibility, custom design tokens, private client dashboards, and sub-100ms response times.",
    icon_name: "Code2",
    is_active: true,
    display_order: 1,
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    slug: "video-editing",
    title: "Video Editing & Reels",
    short_description:
      "Story-driven short-form reels, brand commercials, and high-retention YouTube edits.",
    full_description:
      "Engineered visual pacing for higher audience retention. Complete sound design, professional color grading, motion graphics, and subtitles formatted for Instagram, YouTube Shorts, and LinkedIn campaigns.",
    icon_name: "Video",
    is_active: true,
    display_order: 2,
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    slug: "content-creation",
    title: "Content & Brand Assets",
    short_description:
      "Strategic social media carousels, visual branding guidelines, and digital marketing materials.",
    full_description:
      "Strategic brand communication crafted for ambitious Tamil Nadu leaders and remote businesses. Comprehensive typography palettes, layout systems, educational carousels, and visual collateral.",
    icon_name: "Sparkles",
    is_active: true,
    display_order: 3,
  },
];

export const DEFAULT_PACKAGES: PackageItem[] = [
  {
    id: "10000000-0000-0000-0000-000000000001",
    service_id: "00000000-0000-0000-0000-000000000001",
    name: "Starter Studio Website [Demo]",
    slug: "starter-website",
    price_inr: 24999,
    delivery_time_days: 7,
    features: [
      "Up to 4 custom responsive pages",
      "Mobile-first 360px layout",
      "Lighthouse 90+ score guarantee",
      "WhatsApp click-to-chat integration",
      "SEO & Open Graph metadata",
    ],
    is_popular: false,
    is_active: true,
    display_order: 1,
  },
  {
    id: "10000000-0000-0000-0000-000000000002",
    service_id: "00000000-0000-0000-0000-000000000001",
    name: "Growth Web Platform [Demo]",
    slug: "growth-platform",
    price_inr: 49999,
    delivery_time_days: 14,
    features: [
      "Up to 10 pages + Client portal",
      "Database-driven content CMS",
      "Turnstile spam-protected forms",
      "Automated transactional emails",
      "Private deliverable storage bucket",
      "30 days post-launch support",
    ],
    is_popular: true,
    is_active: true,
    display_order: 2,
  },
  {
    id: "10000000-0000-0000-0000-000000000003",
    service_id: "00000000-0000-0000-0000-000000000002",
    name: "Reels Creator Sprint [Demo]",
    slug: "reels-sprint",
    price_inr: 14999,
    delivery_time_days: 5,
    features: [
      "8 Short-form Reels / Shorts",
      "Sound design & audio mastering",
      "High-retention captions & pacing",
      "4K Vertical export",
      "2 rounds of revisions included",
    ],
    is_popular: true,
    is_active: true,
    display_order: 1,
  },
  {
    id: "10000000-0000-0000-0000-000000000004",
    service_id: "00000000-0000-0000-0000-000000000003",
    name: "Brand Identity Essentials [Demo]",
    slug: "brand-identity-essentials",
    price_inr: 18999,
    delivery_time_days: 10,
    features: [
      "Logo mark & icon system",
      "Typography & color design tokens",
      "10 Editable social carousel templates",
      "Business cards & letterheads",
      "Complete vector raw files handoff",
    ],
    is_popular: false,
    is_active: true,
    display_order: 1,
  },
];

export const DEFAULT_PORTFOLIO: PortfolioProject[] = [
  {
    id: "40000000-0000-0000-0000-000000000001",
    title: "Meenakshi Heritage Sweets Web Platform [Demo]",
    slug: "meenakshi-heritage-sweets",
    service_id: "00000000-0000-0000-0000-000000000001",
    service_title: "Web Design & Development",
    client_name: "Meenakshi Sweets [Demo]",
    thumbnail_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    gallery_urls: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
    ],
    challenge:
      "A renowned local confectionary brand in Madurai needed a digital storefront that reflected their 40-year heritage while loading instantly on 4G mobile devices.",
    solution:
      "Engineered an App Router Next.js architecture with cream/ink design tokens, on-demand revalidation, and direct WhatsApp click-to-order flow.",
    outcome_metrics: {
      "Mobile Lighthouse": "98/100",
      "WhatsApp Inquiries": "+180% [Demo]",
      "Page Load Time": "0.7s on mobile",
    },
    project_url: "https://example.com/demo-project",
    is_featured: true,
    display_order: 1,
  },
  {
    id: "40000000-0000-0000-0000-000000000002",
    title: "Apollo Clinic Health Awareness Reels Campaign [Demo]",
    slug: "apollo-clinic-reels",
    service_id: "00000000-0000-0000-0000-000000000002",
    service_title: "Video Editing & Reels",
    client_name: "Apollo Clinic Madurai [Demo]",
    thumbnail_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    gallery_urls: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    ],
    challenge:
      "Medical concepts needed to be simplified into engaging 45-second vertical videos for regional patient education.",
    solution:
      "Designed dynamic motion typography in Tamil and English, paired with medical animation overlays and crisp pacing.",
    outcome_metrics: {
      "Total Organic Views": "340K+ [Demo]",
      "Average Retention Rate": "74%",
      "Appointment Inquiries": "+45% [Demo]",
    },
    project_url: "https://example.com/demo-video",
    is_featured: true,
    display_order: 2,
  },
  {
    id: "40000000-0000-0000-0000-000000000003",
    title: "Vedic Roots Organic Brand Identity & Carousels [Demo]",
    slug: "vedic-roots-brand",
    service_id: "00000000-0000-0000-0000-000000000003",
    service_title: "Content & Brand Assets",
    client_name: "Vedic Roots Farms [Demo]",
    thumbnail_url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80",
    gallery_urls: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80",
    ],
    challenge:
      "Organic farm-to-table cooperative required brand identity and educational carousel templates to market directly to urban consumers.",
    solution:
      "Crafted an earthy visual language, custom typography pairings, packaging mockups, and a library of 15 modular social templates.",
    outcome_metrics: {
      "Engagement Rate": "8.4% [Demo]",
      "Brand Recall": "Top-tier [Demo]",
    },
    project_url: "https://example.com/demo-brand",
    is_featured: true,
    display_order: 3,
  },
];

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "50000000-0000-0000-0000-000000000001",
    client_name: "S. Murugan [Demo]",
    client_role_company: "Managing Director, Meenakshi Sweets [Demo]",
    rating: 5,
    content:
      "Orvane's student team delivered faster and with significantly cleaner code than traditional agencies. Our customers in Madurai love the WhatsApp ordering flow.",
    is_featured: true,
  },
  {
    id: "50000000-0000-0000-0000-000000000002",
    client_name: "Dr. K. Arulraj [Demo]",
    client_role_company: "Head Physician, Clinic Centre [Demo]",
    rating: 5,
    content:
      "The reels they edited for our wellness clinic achieved phenomenal reach across Madurai and Trichy. Professional, timely, and very respectful communication.",
    is_featured: true,
  },
  {
    id: "50000000-0000-0000-0000-000000000003",
    client_name: "Pooja Sundaram [Demo]",
    client_role_company: "Co-Founder, Chennai Tech Startup [Demo]",
    rating: 5,
    content:
      "Finding an engineering studio that understands design tokens, sub-second latency, and clean typography in Tamil Nadu was refreshing. Highly recommended.",
    is_featured: true,
  },
];

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: "60000000-0000-0000-0000-000000000001",
    category: "General",
    question: "Who works on my project at Orvane?",
    answer:
      "Your project is built directly by vetted engineering students and specialists in Madurai. An experienced student lead supervises quality and delivery, giving you top-tier craft without corporate markup.",
    display_order: 1,
  },
  {
    id: "60000000-0000-0000-0000-000000000002",
    category: "Services",
    question: "Can I request custom work outside the pre-set packages?",
    answer:
      "Absolutely. Our packages represent starting points. You can submit a custom project brief with your exact budget range in INR (₹) and target deadline.",
    display_order: 2,
  },
  {
    id: "60000000-0000-0000-0000-000000000003",
    category: "Billing",
    question: "How do payments work in Version 1?",
    answer:
      "We issue an itemized quote upon reviewing your scope. In Version 1, payments are made securely via Bank Transfer or UPI and recorded with status receipts inside your Client Portal. Razorpay integration is on our roadmap.",
    display_order: 3,
  },
  {
    id: "60000000-0000-0000-0000-000000000004",
    category: "Hardware",
    question: "When will Hardware & IoT projects be available?",
    answer:
      "Our student R&D team is currently developing custom IoT telemetry firmware and test benches. Join our waitlist to be notified when client intake begins.",
    display_order: 4,
  },
];

// Content Fetchers with Supabase + Fallback
export async function getServices(): Promise<ServiceItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data as ServiceItem[];
    }
  } catch {}
  return DEFAULT_SERVICES;
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const services = await getServices();
  return services.find((s) => s.slug === slug) || null;
}

export async function getPackages(): Promise<PackageItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data as PackageItem[];
    }
  } catch {}
  return DEFAULT_PACKAGES;
}

export async function getPackagesByService(serviceId: string): Promise<PackageItem[]> {
  const packages = await getPackages();
  return packages.filter((p) => p.service_id === serviceId);
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("*, services(title)")
      .order("display_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((d: any) => ({
        ...d,
        service_title: d.services?.title,
      })) as PortfolioProject[];
    }
  } catch {}
  return DEFAULT_PORTFOLIO;
}

export async function getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  const projects = await getPortfolioProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_approved", true)
      .order("display_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data as TestimonialItem[];
    }
  } catch {}
  return DEFAULT_TESTIMONIALS;
}

export async function getFaqs(): Promise<FaqItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data as FaqItem[];
    }
  } catch {}
  return DEFAULT_FAQS;
}
