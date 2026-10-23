import { createClient } from "@/lib/supabase/server";
import { canAccessAdminArea, canAccessEmployeeArea, type UserProfile } from "./roles";

export class AuthError extends Error {
  constructor(message: string, public code: string = "UNAUTHORIZED") {
    super(message);
    this.name = "AuthError";
  }
}

/**
 * Require any authenticated user
 */
export async function requireAuth(): Promise<{ user: any; profile: UserProfile }> {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new AuthError("Authentication required.", "UNAUTHENTICATED");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    throw new AuthError("User profile record not found.", "PROFILE_NOT_FOUND");
  }

  if (profile.status === "suspended") {
    throw new AuthError("Account has been suspended.", "ACCOUNT_SUSPENDED");
  }

  return { user, profile };
}

/**
 * Require client access
 */
export async function requireClient(): Promise<{ user: any; profile: UserProfile }> {
  const { user, profile } = await requireAuth();
  if (profile.role === "pending_employee") {
    throw new AuthError("Application pending approval.", "PENDING_APPROVAL");
  }
  return { user, profile };
}

/**
 * Require approved employee or admin access
 */
export async function requireEmployee(): Promise<{ user: any; profile: UserProfile }> {
  const { user, profile } = await requireAuth();

  if (!canAccessEmployeeArea(profile.role, profile.status)) {
    throw new AuthError("Access denied: Approved employee privileges required.", "FORBIDDEN");
  }

  return { user, profile };
}

/**
 * Require studio administrator access
 */
export async function requireAdmin(): Promise<{ user: any; profile: UserProfile }> {
  const { user, profile } = await requireAuth();

  if (!canAccessAdminArea(profile.role, profile.status)) {
    throw new AuthError("Access denied: Administrator privileges required.", "FORBIDDEN");
  }

  return { user, profile };
}
