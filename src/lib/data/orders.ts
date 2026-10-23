import { createClient } from "@/lib/supabase/server";
import { DEFAULT_SERVICES, DEFAULT_PACKAGES } from "./content";

export type OrderStatus =
  | "submitted"
  | "in_review"
  | "quote_sent"
  | "accepted"
  | "in_progress"
  | "awaiting_feedback"
  | "delivered"
  | "closed"
  | "cancelled";

export type PaymentStatus =
  | "unbilled"
  | "quote_pending"
  | "invoiced"
  | "partially_paid"
  | "paid_in_full"
  | "refunded";

export interface Order {
  id: string;
  order_number: string;
  client_id: string;
  client_name?: string;
  client_email?: string;
  service_id: string;
  service_title: string;
  package_id?: string | null;
  package_name?: string | null;
  preferred_employee_id?: string | null;
  preferred_employee_name?: string | null;
  title: string;
  project_brief: string;
  budget_min_inr: number;
  budget_max_inr: number;
  target_deadline: string;
  preferred_contact_method: "whatsapp" | "email" | "phone";
  status: OrderStatus;
  quote_amount_inr?: number | null;
  quote_terms?: string | null;
  payment_status: PaymentStatus;
  internal_notes?: string | null;
  reference_links?: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderMessage {
  id: string;
  order_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: "client" | "employee" | "admin";
  content: string;
  attachments?: any[];
  is_read?: boolean;
  created_at: string;
}

export interface OrderFile {
  id: string;
  order_id: string;
  uploader_id: string;
  uploader_name?: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  storage_path: string;
  file_category: "client_reference" | "deliverable" | "invoice" | "feedback";
  is_deliverable: boolean;
  created_at: string;
}

export interface OrderEvent {
  id: string;
  order_id: string;
  actor_id?: string;
  actor_name?: string;
  event_type: string;
  previous_value?: string;
  new_value: string;
  notes?: string;
  created_at: string;
}

// Fallback demo data clearly labelled for preview & testing
export const DEMO_ORDERS: Order[] = [
  {
    id: "d0000001-0000-0000-0000-000000000001",
    order_number: "ORV-2026-0001",
    client_id: "client-demo-id",
    client_name: "Karthik Raja",
    client_email: "karthik@maduraitea.example",
    service_id: "00000000-0000-0000-0000-000000000001",
    service_title: "Web Design & Development",
    package_id: "p0000001-0000-0000-0000-000000000001",
    package_name: "Starter Brand Website",
    preferred_employee_id: "00000000-0000-0000-0000-000000000101",
    preferred_employee_name: "Priya Sundaram",
    title: "Starter Brand Website [Demo]",
    project_brief:
      "We need a responsive 5-page digital presence for our heritage tea shop near Meenakshi Amman Temple. Must include a digital menu, WhatsApp ordering button, and local Madurai SEO schema.",
    budget_min_inr: 20000,
    budget_max_inr: 30000,
    target_deadline: "2026-11-15",
    preferred_contact_method: "whatsapp",
    status: "in_progress",
    quote_amount_inr: 24999,
    quote_terms: "50% advance upon project acceptance, 50% on final production deployment. Includes 30 days of post-launch maintenance.",
    payment_status: "partially_paid",
    reference_links: "https://instagram.com/maduraiteatales\nhttps://bluebottlecoffee.com",
    created_at: "2026-10-18T10:30:00Z",
    updated_at: "2026-10-22T14:15:00Z",
  },
  {
    id: "d0000002-0000-0000-0000-000000000002",
    order_number: "ORV-2026-0002",
    client_id: "client-demo-id",
    client_name: "Karthik Raja",
    client_email: "karthik@maduraitea.example",
    service_id: "00000000-0000-0000-0000-000000000002",
    service_title: "Video Editing & Reels",
    package_id: "p0000001-0000-0000-0000-000000000003",
    package_name: "Reels Starter Pack (5 Reels)",
    preferred_employee_id: "00000000-0000-0000-0000-000000000102",
    preferred_employee_name: "Arun Kumar",
    title: "Diwali Festive Reels Campaign [Demo]",
    project_brief:
      "5 cinematic 9:16 reels showcasing the brewing tradition and behind-the-scenes packaging of our Diwali gift hampers. Captions in Tamil & English.",
    budget_min_inr: 8000,
    budget_max_inr: 12000,
    target_deadline: "2026-10-20",
    preferred_contact_method: "email",
    status: "delivered",
    quote_amount_inr: 9999,
    quote_terms: "100% billed upon master delivery. High-res ProRes 422 files included.",
    payment_status: "paid_in_full",
    created_at: "2026-10-05T09:00:00Z",
    updated_at: "2026-10-20T17:00:00Z",
  },
];

export const DEMO_MESSAGES: Record<string, OrderMessage[]> = {
  "ORV-2026-0001": [
    {
      id: "m1",
      order_id: "d0000001-0000-0000-0000-000000000001",
      sender_id: "client-demo-id",
      sender_name: "Karthik Raja",
      sender_role: "client",
      content: "Vanakkam team! We uploaded the raw photographs and high-res logo vector to the reference files section.",
      created_at: "2026-10-18T11:00:00Z",
    },
    {
      id: "m2",
      order_id: "d0000001-0000-0000-0000-000000000001",
      sender_id: "00000000-0000-0000-0000-000000000101",
      sender_name: "Priya Sundaram",
      sender_role: "employee",
      content: "Received! The logo marks are crisp. We are completing the responsive wireframes on Figma right now and will upload the design preview link tomorrow.",
      created_at: "2026-10-18T14:20:00Z",
    },
    {
      id: "m3",
      order_id: "d0000001-0000-0000-0000-000000000001",
      sender_id: "00000000-0000-0000-0000-000000000101",
      sender_name: "Priya Sundaram",
      sender_role: "employee",
      content: "Wireframes and mobile layout have been approved. We have moved the order into 'In Progress' and started coding the Next.js frontend.",
      created_at: "2026-10-22T10:15:00Z",
    },
  ],
  "ORV-2026-0002": [
    {
      id: "m2-1",
      order_id: "d0000002-0000-0000-0000-000000000002",
      sender_id: "00000000-0000-0000-0000-000000000102",
      sender_name: "Arun Kumar",
      sender_role: "employee",
      content: "All 5 reels have been finalized with color grade, sound design, and animated typography. Deliverables are available in the files tab!",
      created_at: "2026-10-20T16:50:00Z",
    },
  ],
};

export const DEMO_FILES: Record<string, OrderFile[]> = {
  "ORV-2026-0001": [
    {
      id: "f1",
      order_id: "d0000001-0000-0000-0000-000000000001",
      uploader_id: "client-demo-id",
      uploader_name: "Karthik Raja",
      file_name: "madurai-tea-brand-assets.zip",
      file_size: 14200000,
      mime_type: "application/zip",
      storage_path: "orders/ORV-2026-0001/references/madurai-tea-brand-assets.zip",
      file_category: "client_reference",
      is_deliverable: false,
      created_at: "2026-10-18T10:45:00Z",
    },
    {
      id: "f2",
      order_id: "d0000001-0000-0000-0000-000000000001",
      uploader_id: "00000000-0000-0000-0000-000000000101",
      uploader_name: "Priya Sundaram",
      file_name: "wireframe-prototype-v1.pdf",
      file_size: 4500000,
      mime_type: "application/pdf",
      storage_path: "orders/ORV-2026-0001/deliverables/wireframe-prototype-v1.pdf",
      file_category: "deliverable",
      is_deliverable: true,
      created_at: "2026-10-20T15:30:00Z",
    },
  ],
  "ORV-2026-0002": [
    {
      id: "f2-1",
      order_id: "d0000002-0000-0000-0000-000000000002",
      uploader_id: "00000000-0000-0000-0000-000000000102",
      uploader_name: "Arun Kumar",
      file_name: "diwali-reels-masters-prores.zip",
      file_size: 89000000,
      mime_type: "application/zip",
      storage_path: "orders/ORV-2026-0002/deliverables/diwali-reels-masters-prores.zip",
      file_category: "deliverable",
      is_deliverable: true,
      created_at: "2026-10-20T16:45:00Z",
    },
  ],
};

export const DEMO_EVENTS: Record<string, OrderEvent[]> = {
  "ORV-2026-0001": [
    {
      id: "e1",
      order_id: "d0000001-0000-0000-0000-000000000001",
      event_type: "STATUS_CHANGE",
      new_value: "submitted",
      notes: "Project brief submitted by client.",
      created_at: "2026-10-18T10:30:00Z",
    },
    {
      id: "e2",
      order_id: "d0000001-0000-0000-0000-000000000001",
      event_type: "QUOTE_ISSUED",
      previous_value: "in_review",
      new_value: "quote_sent",
      notes: "Studio quote issued for ₹24,999 with 50% milestone advance.",
      created_at: "2026-10-19T09:15:00Z",
    },
    {
      id: "e3",
      order_id: "d0000001-0000-0000-0000-000000000001",
      event_type: "STATUS_CHANGE",
      previous_value: "quote_sent",
      new_value: "accepted",
      notes: "Client accepted official quote.",
      created_at: "2026-10-19T14:00:00Z",
    },
    {
      id: "e4",
      order_id: "d0000001-0000-0000-0000-000000000001",
      event_type: "STATUS_CHANGE",
      previous_value: "accepted",
      new_value: "in_progress",
      notes: "Advance confirmed; student engineering lead assigned.",
      created_at: "2026-10-20T10:00:00Z",
    },
  ],
  "ORV-2026-0002": [
    {
      id: "e2-1",
      order_id: "d0000002-0000-0000-0000-000000000002",
      event_type: "STATUS_CHANGE",
      new_value: "submitted",
      created_at: "2026-10-05T09:00:00Z",
    },
    {
      id: "e2-2",
      order_id: "d0000002-0000-0000-0000-000000000002",
      event_type: "STATUS_CHANGE",
      new_value: "delivered",
      notes: "All 5 4K 9:16 master reels uploaded and shared.",
      created_at: "2026-10-20T17:00:00Z",
    },
  ],
};

/**
 * Fetch all orders for a client
 */
export async function getClientOrders(clientId?: string): Promise<Order[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        services (title),
        packages (name),
        preferred_profile:preferred_employee_id (full_name)
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
    }));
  } catch {
    return DEMO_ORDERS;
  }
}

/**
 * Fetch a single order by order number (e.g. ORV-2026-0001)
 */
export async function getOrderByNumber(
  orderNumber: string
): Promise<Order | null> {
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
      .eq("order_number", orderNumber)
      .single();

    if (error || !data) {
      const demo = DEMO_ORDERS.find((o) => o.order_number === orderNumber);
      return demo || null;
    }

    return {
      ...data,
      service_title: data.services?.title || "Custom Service",
      package_name: data.packages?.name || null,
      preferred_employee_name: data.preferred_profile?.full_name || null,
      client_name: data.client_profile?.full_name,
      client_email: data.client_profile?.email,
    };
  } catch {
    const demo = DEMO_ORDERS.find((o) => o.order_number === orderNumber);
    return demo || null;
  }
}

/**
 * Fetch messages for an order
 */
export async function getOrderMessages(
  orderNumber: string,
  orderId?: string
): Promise<OrderMessage[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("order_messages")
      .select(`
        *,
        sender:sender_id (full_name, role)
      `)
      .eq("order_id", orderId)
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEMO_MESSAGES[orderNumber] || [];
    }

    return data.map((msg: any) => ({
      id: msg.id,
      order_id: msg.order_id,
      sender_id: msg.sender_id,
      sender_name: msg.sender?.full_name || "Team Member",
      sender_role: msg.sender?.role || "employee",
      content: msg.content,
      attachments: msg.attachments || [],
      is_read: msg.is_read,
      created_at: msg.created_at,
    }));
  } catch {
    return DEMO_MESSAGES[orderNumber] || [];
  }
}

/**
 * Fetch files for an order
 */
export async function getOrderFiles(
  orderNumber: string,
  orderId?: string
): Promise<OrderFile[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("order_files")
      .select(`
        *,
        uploader:uploader_id (full_name)
      `)
      .eq("order_id", orderId)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return DEMO_FILES[orderNumber] || [];
    }

    return data.map((f: any) => ({
      ...f,
      uploader_name: f.uploader?.full_name || "Team",
    }));
  } catch {
    return DEMO_FILES[orderNumber] || [];
  }
}

/**
 * Fetch timeline events for an order
 */
export async function getOrderEvents(
  orderNumber: string,
  orderId?: string
): Promise<OrderEvent[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("order_events")
      .select(`
        *,
        actor:actor_id (full_name)
      `)
      .eq("order_id", orderId)
      .eq("is_internal_only", false)
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEMO_EVENTS[orderNumber] || [];
    }

    return data.map((ev: any) => ({
      ...ev,
      actor_name: ev.actor?.full_name,
    }));
  } catch {
    return DEMO_EVENTS[orderNumber] || [];
  }
}
