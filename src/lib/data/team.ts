import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  description: string;
  display_order: number;
}

export interface TeamMember {
  id: string;
  user_id: string;
  slug: string;
  name: string;
  avatar_url?: string;
  designation: string; // Position or role at Orvane
  bio: string;
  availability_status: "available" | "busy" | "unavailable";
  is_featured: boolean;
  display_order: number;
  is_published: boolean;
  specializations: string[];
  experience: ExperienceEntry[];
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  selected_projects?: {
    title: string;
    slug: string;
    thumbnail_url: string;
  }[];
}

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "70000000-0000-0000-0000-000000000001",
    user_id: "user-1",
    slug: "karthik-rajan",
    name: "Karthik Rajan",
    avatar_url: "/team/karthik-rajan.jpg",
    designation: "Lead Full-Stack Engineer & Founder",
    bio: "Final-year Computer Science engineering student in Madurai. Specializing in Next.js App Router architectures, PostgreSQL RLS security models, and high-performance Web APIs.",
    availability_status: "available",
    is_featured: true,
    display_order: 1,
    is_published: true,
    specializations: ["Next.js & React", "TypeScript", "PostgreSQL & RLS", "System Design"],
    experience: [
      {
        id: "exp-1",
        role: "Lead Full-Stack Engineer",
        organization: "Orvane Works",
        start_date: "2024-01-01",
        end_date: null,
        is_current: true,
        description:
          "Architected production web platforms for local businesses in Tamil Nadu with strict WCAG 2.2 AA accessibility and 90+ mobile Lighthouse scores.",
        display_order: 1,
      },
      {
        id: "exp-2",
        role: "Web Engineering Intern",
        organization: "Madurai Tech Labs [Demo]",
        start_date: "2023-06-01",
        end_date: "2023-12-01",
        is_current: false,
        description:
          "Built internal REST API microservices and automated database migration pipelines using Node.js and PostgreSQL.",
        display_order: 2,
      },
    ],
    github_url: "https://github.com/karthik-orvane",
    linkedin_url: "https://linkedin.com/in/karthik-rajan-demo",
    website_url: "https://karthik.dev",
    selected_projects: [
      {
        title: "Meenakshi Heritage Sweets Web Platform [Demo]",
        slug: "meenakshi-heritage-sweets",
        thumbnail_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "70000000-0000-0000-0000-000000000002",
    user_id: "user-2",
    slug: "ananya-raman",
    name: "Ananya Raman",
    avatar_url: "/team/ananya-raman.jpg",
    designation: "Motion Designer & Lead Video Editor",
    bio: "ECE engineering student specializing in narrative video pacing, DaVinci Resolve color pipelines, and high-retention short-form motion typography for Instagram and YouTube.",
    availability_status: "available",
    is_featured: true,
    display_order: 2,
    is_published: true,
    specializations: ["Video Editing & DaVinci", "Motion Graphics", "Sound Design", "Short-form Reels"],
    experience: [
      {
        id: "exp-3",
        role: "Motion Designer & Video Lead",
        organization: "Orvane Works",
        start_date: "2024-02-01",
        end_date: null,
        is_current: true,
        description:
          "Edited over 60+ vertical reels and brand commercials reaching 500K+ organic impressions for healthcare and retail clients across Madurai.",
        display_order: 1,
      },
      {
        id: "exp-4",
        role: "Visual Media Secretary",
        organization: "College Engineering Media Club",
        start_date: "2023-01-01",
        end_date: "2024-01-01",
        is_current: false,
        description:
          "Directed official college symposium after-movies and multi-camera live video streaming setups.",
        display_order: 2,
      },
    ],
    github_url: "https://github.com/ananya-media",
    linkedin_url: "https://linkedin.com/in/ananya-raman-demo",
    selected_projects: [
      {
        title: "Apollo Clinic Health Awareness Reels Campaign [Demo]",
        slug: "apollo-clinic-reels",
        thumbnail_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "70000000-0000-0000-0000-000000000003",
    user_id: "user-3",
    slug: "siddharth-muthu",
    name: "Siddharth Muthu",
    avatar_url: "/team/siddharth-muthu.jpg",
    designation: "Brand Strategist & UI/UX Specialist",
    bio: "Mechanical engineering student with deep passion for digital typography, design systems, and visual branding. Creator of Orvane Works' cream and vermilion design token architecture.",
    availability_status: "busy",
    is_featured: true,
    display_order: 3,
    is_published: true,
    specializations: ["Design Systems", "UI/UX & Figma", "Brand Visual Identity", "Copywriting"],
    experience: [
      {
        id: "exp-5",
        role: "Brand & UI Designer",
        organization: "Orvane Works",
        start_date: "2024-03-01",
        end_date: null,
        is_current: true,
        description:
          "Created complete visual identities, design tokens, and modular social carousel systems for organic food brands and education startups.",
        display_order: 1,
      },
    ],
    linkedin_url: "https://linkedin.com/in/siddharth-muthu-demo",
    website_url: "https://siddharth.design",
    selected_projects: [
      {
        title: "Vedic Roots Organic Brand Identity & Carousels [Demo]",
        slug: "vedic-roots-brand",
        thumbnail_url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80",
      },
    ],
  },
];

// Cache team data — 5-minute TTL, tag: "public-content"
export const getTeamMembers = unstable_cache(
  async (): Promise<TeamMember[]> => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("employee_profiles")
        .select("*, profiles(full_name, avatar_url)")
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      if (!error && data && data.length > 0) {
        // Map Supabase rows to TeamMember type
        return data.map((d: any) => ({
          ...d,
          name: d.profiles?.full_name || "Orvane Works Specialist",
          avatar_url: d.profiles?.avatar_url || DEFAULT_TEAM_MEMBERS[0].avatar_url,
          specializations: DEFAULT_TEAM_MEMBERS[0].specializations,
          experience: DEFAULT_TEAM_MEMBERS[0].experience,
        }));
      }
    } catch {}
    return DEFAULT_TEAM_MEMBERS;
  },
  ["team-members-list"],
  { tags: ["public-content"], revalidate: 300 }
);

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  const members = await getTeamMembers();
  return members.find((m) => m.slug === slug) || null;
}
