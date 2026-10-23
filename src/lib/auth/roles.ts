export type UserRole = "client" | "pending_employee" | "employee" | "admin";
export type UserStatus = "active" | "pending" | "suspended" | "rejected";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string | null;
  avatar_url?: string | null;
  role: UserRole;
  status: UserStatus;
  created_at?: string;
  updated_at?: string;
}

/**
 * Determine redirect route based on role and account status
 */
export function getPostLoginRedirect(profile: { role: UserRole; status: UserStatus }): string {
  // If account is suspended or rejected
  if (profile.status === "suspended") {
    return "/login?error=account_suspended";
  }
  if (profile.status === "rejected") {
    return "/login?error=application_rejected";
  }

  // Pending employee applicants MUST be routed to awaiting approval
  if (profile.role === "pending_employee" || profile.status === "pending") {
    return "/awaiting-approval";
  }

  // Admin access
  if (profile.role === "admin") {
    return "/admin";
  }

  // Employee access
  if (profile.role === "employee") {
    return "/employee";
  }

  // Default client dashboard
  return "/dashboard";
}

/**
 * Check if a role can access employee resources
 */
export function canAccessEmployeeArea(role: UserRole, status: UserStatus): boolean {
  if (status !== "active") return false;
  return role === "employee" || role === "admin";
}

/**
 * Check if a role can access admin resources
 */
export function canAccessAdminArea(role: UserRole, status: UserStatus): boolean {
  if (status !== "active") return false;
  return role === "admin";
}

/**
 * Allowed status transitions for employees on assigned orders
 */
export const ALLOWED_EMPLOYEE_STATUS_TRANSITIONS: Record<string, string[]> = {
  accepted: ["in_progress"],
  in_progress: ["awaiting_feedback", "delivered"],
  awaiting_feedback: ["in_progress", "delivered"],
};

export function canEmployeeTransitionOrderStatus(
  currentStatus: string,
  targetStatus: string
): boolean {
  const allowed = ALLOWED_EMPLOYEE_STATUS_TRANSITIONS[currentStatus];
  return Boolean(allowed && allowed.includes(targetStatus));
}
