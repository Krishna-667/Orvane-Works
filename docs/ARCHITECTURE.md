# Orvane System Architecture

## Overview
Orvane is an engineering-first digital studio platform built with Next.js App Router, strict TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, and Supabase Postgres with Row Level Security (RLS).

## Data Layers
1. **Application Layer**:
   - Next.js 14 (App Router) with Server Components and Server Actions.
   - Zero-secrets client exposure: all sensitive operations (mutations, admin actions, Resend emails) are isolated server-side.
   - Dynamic caching and on-demand ISR (`revalidatePath`, `revalidateTag`) ensuring sub-second response times for public visitors while immediately synchronizing admin CMS updates.

2. **Persistence & Security Layer (Supabase)**:
   - PostgreSQL with Row Level Security enforced on 100% of tables.
   - Roles: `client`, `pending_employee`, `employee`, `admin`.
   - Role escalation is strictly governed by admin-only server handlers and verified via Postgres RLS functions (`is_admin()`, `current_user_role()`).
   - File storage segregated into public buckets (avatars, portfolio) and private buckets with time-limited signed URLs (deliverables, client briefs).

3. **Spam & Abuse Defense**:
   - Cloudflare Turnstile token validation on all public forms (Contact, Waitlist, Team Application).
   - Database-backed sliding-window rate limiter via `check_rate_limit()` Postgres RPC function.

4. **Localization (i18n)**:
   - Typed dictionary store architecture (`src/lib/i18n/`) designed for seamless Tamil (`ta-IN`) addition.
