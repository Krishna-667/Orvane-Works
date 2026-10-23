"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireEmployee } from "@/lib/auth/guards";
import { logAuditEvent } from "./auth";

const experienceEntrySchema = z.object({
  id: z.string().optional(),
  role: z.string().min(2, "Role is required."),
  organization: z.string().min(2, "Organization is required."),
  start_date: z.string().min(4, "Start date is required."),
  end_date: z.string().nullable().optional(),
  is_current: z.boolean().default(false),
  description: z.string().min(10, "Description must be at least 10 characters."),
  display_order: z.number().default(0),
});

const updateProfileSchema = z.object({
  designation: z.string().min(2, "Designation is required."),
  bio: z.string().min(20, "Bio must be at least 20 characters."),
  availability_status: z.enum(["available", "busy", "unavailable"]),
  specializations: z.array(z.string()).min(1, "Select at least one specialization."),
  experience: z.array(experienceEntrySchema),
  github_url: z.string().url().optional().or(z.literal("")),
  linkedin_url: z.string().url().optional().or(z.literal("")),
  website_url: z.string().url().optional().or(z.literal("")),
  avatar_url: z.string().url().optional().or(z.literal("")),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export async function updateEmployeeProfileAction(input: UpdateProfileInput) {
  const { profile } = await requireEmployee();

  const parsed = updateProfileSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Validation failed.",
    };
  }

  const {
    designation,
    bio,
    availability_status,
    specializations,
    experience,
    github_url,
    linkedin_url,
    website_url,
    avatar_url,
  } = parsed.data;

  try {
    const supabase = createClient();

    // 1. Update basic employee_profile fields
    const { error: profileError } = await supabase
      .from("employee_profiles")
      .update({
        designation,
        bio,
        availability_status,
        github_url: github_url || null,
        linkedin_url: linkedin_url || null,
        website_url: website_url || null,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", profile.id);

    if (profileError) {
      console.error("[Employee Profile DB Error]", profileError);
    }

    // 2. Update avatar if provided
    if (avatar_url) {
      await supabase
        .from("profiles")
        .update({ avatar_url })
        .eq("id", profile.id);
    }

    await logAuditEvent({
      actorId: profile.id,
      action: "EMPLOYEE_PROFILE_UPDATED",
      entityType: "employee_profile",
      entityId: profile.id,
      metadata: { designation, availability_status },
    });

    revalidatePath("/team");
    revalidatePath(`/team/${profile.id}`);

    return {
      success: true,
      message: "Public studio profile updated successfully!",
    };
  } catch (err) {
    console.error("[Update Profile Error]", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}
