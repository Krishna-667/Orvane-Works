#!/usr/bin/env node
/**
 * Orvane Studio - First Administrator Bootstrap Script
 *
 * Usage:
 *   node scripts/create-admin.mjs <admin-email>
 *
 * Requirements:
 *   NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be defined
 *   in .env.local or the active environment.
 */

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Load environment variables from .env.local if present
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^['"]|['"]$/g, "");
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const targetEmail = process.argv[2] || process.env.ADMIN_EMAIL || "admin@orvane.studio";

if (!supabaseUrl || !serviceRoleKey) {
  console.error("\x1b[31m[Error]\x1b[0m Missing Supabase credentials.");
  console.error("Please configure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
  console.error("Alternatively, run the SQL script in Supabase SQL Editor: supabase/create-first-admin.sql\n");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function bootstrapAdmin() {
  console.log(`\x1b[36m[Orvane Bootstrap]\x1b[0m Looking up account for: ${targetEmail}...`);

  // Query profile
  const { data: profile, error: fetchError } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, status")
    .eq("email", targetEmail)
    .maybeSingle();

  if (fetchError) {
    console.error("\x1b[31m[Error]\x1b[0m Failed to query profiles table:", fetchError.message);
    process.exit(1);
  }

  if (!profile) {
    console.error(`\x1b[31m[Error]\x1b[0m No user profile found for email: ${targetEmail}`);
    console.error("1. Please register on the web application first (e.g., http://localhost:3000/login).");
    console.error(`2. Then re-run this script: node scripts/create-admin.mjs ${targetEmail}\n`);
    process.exit(1);
  }

  if (profile.role === "admin") {
    console.log(`\x1b[32m[Success]\x1b[0m ${targetEmail} is already an Administrator.`);
    return;
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      role: "admin",
      status: "active",
      updated_at: new Date().toISOString(),
    })
    .eq("id", profile.id);

  if (updateError) {
    console.error("\x1b[31m[Error]\x1b[0m Could not promote user via API:", updateError.message);
    console.error("If blocked by trigger 'on_profile_role_update', please run supabase/create-first-admin.sql in Supabase SQL Editor.");
    process.exit(1);
  }

  console.log(`\x1b[32m[Success]\x1b[0m User ${targetEmail} (${profile.id}) has been promoted to Administrator!`);
  console.log("You can now sign in and access the Admin Governance Deck at /admin.");
}

bootstrapAdmin().catch((err) => {
  console.error("\x1b[31m[Fatal]\x1b[0m", err);
  process.exit(1);
});
