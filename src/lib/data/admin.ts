import { createClient } from "@/lib/supabase/server";
import { DEMO_ORDERS, type Order } from "./orders";

export interface EmployeeRequestItem {
  id: string;
  user_id: string;
  applicant_name: string;
  applicant_email: string;
  portfolio_url?: string | null;
  resume_url?: string | null;
  skills: string[];
  cover_note: string;
  status: "pending" | "approved" | "rejected";
  rejection_reason?: string | null;
  created_at: string;
}

export interface EmployeeAdminItem {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  designation: string;
  availability_status: "available" | "busy" | "unavailable";
  is_published: boolean;
  is_featured: boolean;
  display_order: number;
  status: "active" | "suspended";
  created_at: string;
}

export interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  service_title?: string | null;
  message: string;
  is_handled: boolean;
  handled_at?: string | null;
  created_at: string;
}

export interface WaitlistEntryItem {
  id: string;
  full_name: string;
  email: string;
  company_or_project?: string | null;
  interest_details: string;
  is_handled: boolean;
  created_at: string;
}

export interface AuditLogItem {
  id: string;
  actor_id?: string | null;
  actor_name?: string | null;
  actor_email?: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  metadata: Record<string, any>;
  created_at: string;
}

// Fallback demo data clearly labelled
export const DEMO_EMPLOYEE_REQUESTS: EmployeeRequestItem[] = [
  {
    id: "req-001",
    user_id: "user-applicant-1",
    applicant_name: "Dinesh Pandian [Demo]",
    applicant_email: "dinesh.pandian@student.tce.edu",
    portfolio_url: "https://github.com/dinesh-pandian",
    resume_url: "https://drive.google.com/dinesh-cv.pdf",
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Node.js"],
    cover_note:
      "3rd-year ECE student at Thiagarajar College of Engineering, Madurai. Built 2 freelance landing pages and contributed to open source React projects. Excited to join Orvane Works' web engineering division.",
    status: "pending",
    created_at: "2026-10-22T14:30:00Z",
  },
  {
    id: "req-002",
    user_id: "user-applicant-2",
    applicant_name: "Kavitha Selvam [Demo]",
    applicant_email: "kavitha.motion@student.annauniv.edu",
    portfolio_url: "https://behance.net/kavithaselvam",
    skills: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Sound Design"],
    cover_note:
      "Passionate video editor and colorist specializing in 9:16 high-retention reel edits and YouTube storytelling. Seeking to join Orvane's video team.",
    status: "pending",
    created_at: "2026-10-23T08:15:00Z",
  },
];

export const DEMO_ADMIN_EMPLOYEES: EmployeeAdminItem[] = [
  {
    id: "emp-001",
    user_id: "70000000-0000-0000-0000-000000000001",
    full_name: "Karthik Rajan",
    email: "karthik@orvane.studio",
    designation: "Lead Full-Stack Engineer & Founder",
    availability_status: "available",
    is_published: true,
    is_featured: true,
    display_order: 1,
    status: "active",
    created_at: "2026-09-01T00:00:00Z",
  },
  {
    id: "emp-002",
    user_id: "70000000-0000-0000-0000-000000000002",
    full_name: "Ananya Raman",
    email: "ananya@orvane.studio",
    designation: "Motion Designer & Video Lead",
    availability_status: "busy",
    is_published: true,
    is_featured: true,
    display_order: 2,
    status: "active",
    created_at: "2026-09-05T00:00:00Z",
  },
  {
    id: "emp-003",
    user_id: "70000000-0000-0000-0000-000000000003",
    full_name: "Siddharth Muthu",
    email: "siddharth@orvane.studio",
    designation: "Brand Strategist & Content Lead",
    availability_status: "available",
    is_published: true,
    is_featured: false,
    display_order: 3,
    status: "active",
    created_at: "2026-09-10T00:00:00Z",
  },
];

export const DEMO_CONTACT_MESSAGES: ContactMessageItem[] = [
  {
    id: "msg-001",
    name: "Dr. Murali Sundaram",
    email: "murali@maduraieyeclinic.example",
    phone: "+91 98421 23456",
    service_title: "Web Design & Development",
    message:
      "We want to build a modern appointment booking portal for our eye clinic in KK Nagar, Madurai. Needs Tamil & English support and WhatsApp notifications.",
    is_handled: false,
    created_at: "2026-10-23T06:30:00Z",
  },
  {
    id: "msg-002",
    name: "Bala Murugan",
    email: "bala@pandiantextiles.example",
    phone: "+91 94431 88990",
    service_title: "Video Editing & Reels",
    message:
      "We need 10 festive reels produced for our Deepavali textile collection showroom in South Masi Street.",
    is_handled: true,
    handled_at: "2026-10-22T18:00:00Z",
    created_at: "2026-10-22T11:20:00Z",
  },
];

export const DEMO_WAITLIST: WaitlistEntryItem[] = [
  {
    id: "wt-001",
    full_name: "Ramesh Kannan",
    email: "ramesh@kannanfarms.example",
    company_or_project: "Smart Agro Madurai",
    interest_details:
      "Interested in solar-powered soil moisture telemetry sensors and GSM automated pump starters for farmland in Usilampatti.",
    is_handled: false,
    created_at: "2026-10-21T15:45:00Z",
  },
  {
    id: "wt-002",
    full_name: "Selvi Priya",
    email: "selvi@ecowash.example",
    company_or_project: "EcoWash Automation",
    interest_details:
      "Looking for ESP32-based coin and UPI operated water dispensation controllers for our laundromat startup.",
    is_handled: false,
    created_at: "2026-10-22T09:10:00Z",
  },
];

export const DEMO_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: "aud-001",
    actor_id: "admin-id",
    actor_name: "Karthik Rajan",
    actor_email: "karthik@orvane.studio",
    action: "ORDER_CREATED",
    entity_type: "orders",
    entity_id: "ORV-2026-0001",
    metadata: { service: "Web Design & Development", budget: 24999 },
    created_at: "2026-10-18T10:30:00Z",
  },
  {
    id: "aud-002",
    actor_id: "admin-id",
    actor_name: "Karthik Rajan",
    actor_email: "karthik@orvane.studio",
    action: "QUOTE_ISSUED",
    entity_type: "orders",
    entity_id: "ORV-2026-0001",
    metadata: { quote_amount_inr: 24999, payment_terms: "50% advance" },
    created_at: "2026-10-19T09:15:00Z",
  },
  {
    id: "aud-003",
    actor_id: "admin-id",
    actor_name: "Karthik Rajan",
    actor_email: "karthik@orvane.studio",
    action: "ORDER_ASSIGNED",
    entity_type: "orders",
    entity_id: "ORV-2026-0001",
    metadata: { employee_name: "Priya Sundaram" },
    created_at: "2026-10-20T10:00:00Z",
  },
  {
    id: "aud-004",
    actor_id: "admin-id",
    actor_name: "Karthik Rajan",
    actor_email: "karthik@orvane.studio",
    action: "EMPLOYEE_APPLICATION_SUBMITTED",
    entity_type: "employee_request",
    entity_id: "user-applicant-1",
    metadata: { applicant_name: "Dinesh Pandian" },
    created_at: "2026-10-22T14:30:00Z",
  },
];

/**
 * Fetch employee requests pending founder review
 */
export async function getEmployeeRequests(): Promise<EmployeeRequestItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("employee_requests")
      .select(`
        *,
        applicant:user_id (full_name, email)
      `)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return DEMO_EMPLOYEE_REQUESTS;
    }

    return data.map((d: any) => ({
      id: d.id,
      user_id: d.user_id,
      applicant_name: d.applicant?.full_name || "Applicant",
      applicant_email: d.applicant?.email || "applicant@example.com",
      portfolio_url: d.portfolio_url,
      resume_url: d.resume_url,
      skills: d.skills || [],
      cover_note: d.cover_note,
      status: d.status,
      rejection_reason: d.rejection_reason,
      created_at: d.created_at,
    }));
  } catch {
    return DEMO_EMPLOYEE_REQUESTS;
  }
}

/**
 * Fetch all employees for admin management
 */
export async function getAllEmployeesAdmin(): Promise<EmployeeAdminItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("employee_profiles")
      .select(`
        *,
        profile:user_id (full_name, email, status)
      `)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEMO_ADMIN_EMPLOYEES;
    }

    return data.map((d: any) => ({
      id: d.id,
      user_id: d.user_id,
      full_name: d.profile?.full_name || "Specialist",
      email: d.profile?.email || "",
      designation: d.designation,
      availability_status: d.availability_status,
      is_published: d.is_published,
      is_featured: d.is_featured,
      display_order: d.display_order,
      status: d.profile?.status || "active",
      created_at: d.created_at,
    }));
  } catch {
    return DEMO_ADMIN_EMPLOYEES;
  }
}

/**
 * Fetch all studio orders with internal notes for admin
 */
export async function getAllOrdersAdmin(): Promise<Order[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        services (title),
        packages (name),
        preferred_profile:preferred_employee_id (full_name),
        client_profile:client_id (full_name, email)
      `)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return DEMO_ORDERS;
    }

    return data.map((row: any) => ({
      ...row,
      service_title: row.services?.title || "Custom Service",
      package_name: row.packages?.name || null,
      preferred_employee_name: row.preferred_profile?.full_name || null,
      client_name: row.client_profile?.full_name || "Client",
      client_email: row.client_profile?.email || "",
    }));
  } catch {
    return DEMO_ORDERS;
  }
}

/**
 * Fetch contact enquiries & hardware waitlist
 */
export async function getAdminInbox(): Promise<{
  contactMessages: ContactMessageItem[];
  waitlistEntries: WaitlistEntryItem[];
}> {
  try {
    const supabase = createClient();
    const [contactRes, waitlistRes] = await Promise.all([
      supabase
        .from("contact_messages")
        .select("*, services(title)")
        .order("created_at", { ascending: false }),
      supabase
        .from("waitlist_entries")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

    const contactMessages: ContactMessageItem[] =
      contactRes.data && contactRes.data.length > 0
        ? contactRes.data.map((c: any) => ({
            id: c.id,
            name: c.name,
            email: c.email,
            phone: c.phone,
            service_title: c.services?.title,
            message: c.message,
            is_handled: c.is_handled,
            handled_at: c.handled_at,
            created_at: c.created_at,
          }))
        : DEMO_CONTACT_MESSAGES;

    const waitlistEntries: WaitlistEntryItem[] =
      waitlistRes.data && waitlistRes.data.length > 0
        ? waitlistRes.data
        : DEMO_WAITLIST;

    return { contactMessages, waitlistEntries };
  } catch {
    return {
      contactMessages: DEMO_CONTACT_MESSAGES,
      waitlistEntries: DEMO_WAITLIST,
    };
  }
}

/**
 * Fetch audit logs
 */
export async function getAuditLogs(): Promise<AuditLogItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("audit_log")
      .select(`
        *,
        actor:actor_id (full_name, email)
      `)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error || !data || data.length === 0) {
      return DEMO_AUDIT_LOGS;
    }

    return data.map((d: any) => ({
      id: d.id,
      actor_id: d.actor_id,
      actor_name: d.actor?.full_name || "System Admin",
      actor_email: d.actor?.email,
      action: d.action,
      entity_type: d.entity_type,
      entity_id: d.entity_id,
      metadata: d.metadata || {},
      created_at: d.created_at,
    }));
  } catch {
    return DEMO_AUDIT_LOGS;
  }
}
