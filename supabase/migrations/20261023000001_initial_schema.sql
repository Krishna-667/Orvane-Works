-- Orvane Studio Database Schema
-- Initial Schema Migration

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Enums
do $$ begin
  create type user_role as enum ('client', 'pending_employee', 'employee', 'admin');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type user_status as enum ('active', 'pending', 'suspended', 'rejected');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type request_status as enum ('pending', 'approved', 'rejected');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type availability_status as enum ('available', 'busy', 'unavailable');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type order_status as enum (
    'submitted',
    'in_review',
    'quote_sent',
    'accepted',
    'in_progress',
    'awaiting_feedback',
    'delivered',
    'closed',
    'cancelled'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type payment_status as enum (
    'unbilled',
    'quote_pending',
    'invoiced',
    'partially_paid',
    'paid_in_full',
    'refunded'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type file_category as enum (
    'client_reference',
    'deliverable',
    'invoice',
    'feedback'
  );
exception
  when duplicate_object then null;
end $$;

-- 1. PROFILES (linked to auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null,
  phone text,
  avatar_url text,
  role user_role not null default 'client',
  status user_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. EMPLOYEE REQUESTS ("Join our team" applications)
create table if not exists public.employee_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  portfolio_url text,
  resume_url text,
  skills text[] not null default '{}',
  cover_note text not null,
  status request_status not null default 'pending',
  reviewed_by uuid references public.profiles(id),
  rejection_reason text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

-- 3. EMPLOYEE PROFILES (Public profiles of approved team members)
create table if not exists public.employee_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  slug text not null unique,
  designation text not null,
  bio text not null,
  availability_status availability_status not null default 'available',
  is_featured boolean not null default false,
  display_order integer not null default 0,
  is_published boolean not null default true,
  github_url text,
  linkedin_url text,
  twitter_url text,
  website_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. SPECIALIZATIONS & JUNCTION
create table if not exists public.specializations (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table if not exists public.employee_specializations (
  employee_profile_id uuid not null references public.employee_profiles(id) on delete cascade,
  specialization_id uuid not null references public.specializations(id) on delete cascade,
  primary key (employee_profile_id, specialization_id)
);

-- 5. EXPERIENCE ENTRIES
create table if not exists public.experience_entries (
  id uuid primary key default gen_random_uuid(),
  employee_profile_id uuid not null references public.employee_profiles(id) on delete cascade,
  role text not null,
  organization text not null,
  start_date date not null,
  end_date date,
  is_current boolean not null default false,
  description text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 6. SERVICES (Data-driven, expandable catalog)
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text not null,
  full_description text not null,
  icon_name text not null,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 7. PACKAGES ("Starting from ₹")
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  name text not null,
  slug text not null unique,
  price_inr numeric(10,2) not null,
  delivery_time_days integer not null,
  features jsonb not null default '[]'::jsonb,
  is_popular boolean not null default false,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 8. PORTFOLIO PROJECTS
create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  service_id uuid references public.services(id) on delete set null,
  client_name text not null,
  thumbnail_url text not null,
  gallery_urls text[] not null default '{}',
  challenge text not null,
  solution text not null,
  outcome_metrics jsonb not null default '{}'::jsonb,
  project_url text,
  is_featured boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.project_collaborators (
  project_id uuid not null references public.portfolio_projects(id) on delete cascade,
  employee_profile_id uuid not null references public.employee_profiles(id) on delete cascade,
  primary key (project_id, employee_profile_id)
);

-- 9. TESTIMONIALS
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_role_company text not null,
  avatar_url text,
  rating smallint not null check (rating between 1 and 5) default 5,
  content text not null,
  service_id uuid references public.services(id) on delete set null,
  is_approved boolean not null default false,
  is_featured boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 10. FAQS
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  question text not null,
  answer text not null,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 11. ORDERS
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  client_id uuid not null references public.profiles(id),
  service_id uuid not null references public.services(id),
  package_id uuid references public.packages(id),
  preferred_employee_id uuid references public.profiles(id),
  title text not null,
  project_brief text not null,
  budget_min_inr numeric(10,2) not null,
  budget_max_inr numeric(10,2) not null,
  target_deadline date not null,
  preferred_contact_method text not null default 'whatsapp',
  status order_status not null default 'submitted',
  quote_amount_inr numeric(10,2),
  quote_terms text,
  payment_status payment_status not null default 'unbilled',
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 12. ORDER ASSIGNMENTS
create table if not exists public.order_assignments (
  order_id uuid not null references public.orders(id) on delete cascade,
  employee_id uuid not null references public.profiles(id) on delete cascade,
  assigned_by uuid not null references public.profiles(id),
  assigned_at timestamptz not null default now(),
  primary key (order_id, employee_id)
);

-- 13. ORDER EVENTS (Timeline audit trail)
create table if not exists public.order_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  actor_id uuid references public.profiles(id),
  event_type text not null,
  previous_value text,
  new_value text not null,
  notes text,
  is_internal_only boolean not null default false,
  created_at timestamptz not null default now()
);

-- 14. ORDER MESSAGES
create table if not exists public.order_messages (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  content text not null,
  attachments jsonb not null default '[]'::jsonb,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- 15. ORDER FILES
create table if not exists public.order_files (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  uploader_id uuid not null references public.profiles(id),
  file_name text not null,
  file_size bigint not null,
  mime_type text not null,
  storage_path text not null,
  file_category file_category not null default 'client_reference',
  is_deliverable boolean not null default false,
  created_at timestamptz not null default now()
);

-- 16. CONTACT MESSAGES
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service_id uuid references public.services(id),
  message text not null,
  is_handled boolean not null default false,
  handled_by uuid references public.profiles(id),
  handled_at timestamptz,
  ip_hash text not null,
  created_at timestamptz not null default now()
);

-- 17. WAITLIST ENTRIES (Hardware & IoT)
create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text not null,
  company_or_project text,
  interest_details text not null,
  is_handled boolean not null default false,
  created_at timestamptz not null default now()
);

-- 18. SITE SETTINGS
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

-- 19. AUDIT LOG (Tamper-evident record of admin and employee actions)
create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  action text not null,
  entity_type text not null,
  entity_id text not null,
  metadata jsonb not null default '{}'::jsonb,
  ip_address text,
  created_at timestamptz not null default now()
);

-- 20. NOTIFICATIONS
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  message text not null,
  link text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- 21. RATE LIMITS (Sliding-window counter table)
create table if not exists public.rate_limits (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  counter integer not null default 1,
  window_start timestamptz not null default now(),
  expires_at timestamptz not null
);

create index if not exists idx_rate_limits_key_expires on public.rate_limits(key, expires_at);
