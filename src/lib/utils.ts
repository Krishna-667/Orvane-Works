import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format Indian Rupee currency standard: ₹1,50,000
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format standard date
 */
export function formatDate(dateStr: string | Date): string {
  const d = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

/**
 * Format preferred contact method with proper brand casing (e.g. WhatsApp)
 */
export function formatContactMethod(method?: string | null): string {
  if (!method) return "WhatsApp";
  const lower = method.toLowerCase();
  if (lower === "whatsapp") return "WhatsApp";
  if (lower === "email") return "Email";
  if (lower === "phone") return "Phone Call";
  return method;
}
