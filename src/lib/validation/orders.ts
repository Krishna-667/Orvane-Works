import { z } from "zod";

export const createOrderSchema = z
  .object({
    service_id: z.string().uuid("Please select a valid service."),
    package_id: z.string().uuid().optional().or(z.literal("")),
    preferred_employee_id: z.string().uuid().optional().or(z.literal("")),
    title: z
      .string()
      .min(3, "Project title must be at least 3 characters.")
      .max(120, "Project title cannot exceed 120 characters."),
    project_brief: z
      .string()
      .min(20, "Please provide a detailed brief of at least 20 characters so our team can accurately quote.")
      .max(5000, "Brief must be within 5,000 characters."),
    budget_min_inr: z.coerce
      .number()
      .min(1000, "Minimum budget starts from ₹1,000."),
    budget_max_inr: z.coerce
      .number()
      .min(1000, "Maximum budget must be at least ₹1,000."),
    target_deadline: z.string().refine((val) => {
      const d = new Date(val);
      return !isNaN(d.getTime());
    }, "Please provide a valid completion deadline date."),
    preferred_contact_method: z.enum(["whatsapp", "email", "phone"], {
      errorMap: () => ({ message: "Select a valid contact method." }),
    }),
    reference_links: z.string().optional().or(z.literal("")),
  })
  .refine((data) => data.budget_max_inr >= data.budget_min_inr, {
    message: "Maximum budget cannot be less than minimum budget.",
    path: ["budget_max_inr"],
  });

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const postMessageSchema = z.object({
  order_id: z.string().uuid("Invalid order ID."),
  content: z
    .string()
    .min(1, "Message cannot be empty.")
    .max(3000, "Message cannot exceed 3,000 characters."),
});

export type PostMessageInput = z.infer<typeof postMessageSchema>;

export const submitReviewSchema = z.object({
  order_id: z.string().uuid("Invalid order ID."),
  rating: z.coerce.number().min(1).max(5),
  content: z
    .string()
    .min(10, "Review must be at least 10 characters.")
    .max(1000, "Review cannot exceed 1,000 characters."),
  client_role_company: z
    .string()
    .min(2, "Please share your role and company or business name.")
    .max(100, "Role & company cannot exceed 100 characters."),
});

export type SubmitReviewInput = z.infer<typeof submitReviewSchema>;

export const clientSettingsSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters."),
  phone: z.string().optional().or(z.literal("")),
  company_name: z.string().optional().or(z.literal("")),
  notify_order_updates: z.boolean().default(true),
  notify_messages: z.boolean().default(true),
});

export type ClientSettingsInput = z.infer<typeof clientSettingsSchema>;
