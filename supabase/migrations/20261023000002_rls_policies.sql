-- Orvane Studio Database Schema
-- Row Level Security (RLS) Policies & Helper Functions

-- Helper functions for RLS
create or replace function public.current_user_role()
returns user_role
language sql
security definer
stable
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select coalesce(
    (select role = 'admin' from public.profiles where id = auth.uid()),
    false
  );
$$;

create or replace function public.is_employee()
returns boolean
language sql
security definer
stable
as $$
  select coalesce(
    (select role in ('employee', 'admin') from public.profiles where id = auth.uid()),
    false
  );
$$;

-- Enable RLS on every table
alter table public.profiles enable row level security;
alter table public.employee_requests enable row level security;
alter table public.employee_profiles enable row level security;
alter table public.specializations enable row level security;
alter table public.employee_specializations enable row level security;
alter table public.experience_entries enable row level security;
alter table public.services enable row level security;
alter table public.packages enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.project_collaborators enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.orders enable row level security;
alter table public.order_assignments enable row level security;
alter table public.order_events enable row level security;
alter table public.order_messages enable row level security;
alter table public.order_files enable row level security;
alter table public.contact_messages enable row level security;
alter table public.waitlist_entries enable row level security;
alter table public.site_settings enable row level security;
alter table public.audit_log enable row level security;
alter table public.notifications enable row level security;
alter table public.rate_limits enable row level security;

-- 1. PROFILES RLS
create policy "Public can read approved published employee profiles"
  on public.profiles for select
  using (
    id in (
      select user_id from public.employee_profiles where is_published = true
    )
  );

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins can read all profiles"
  on public.profiles for select
  using (public.is_admin());

create policy "Users can update own non-sensitive profile info"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and role = (select role from public.profiles where id = auth.uid())
    and status = (select status from public.profiles where id = auth.uid())
  );

create policy "Admins can update all profiles"
  on public.profiles for update
  using (public.is_admin());

-- 2. EMPLOYEE REQUESTS RLS
create policy "Applicants can read own request"
  on public.employee_requests for select
  using (auth.uid() = user_id);

create policy "Admins can read all requests"
  on public.employee_requests for select
  using (public.is_admin());

create policy "Admins can update employee requests"
  on public.employee_requests for update
  using (public.is_admin());

-- 3. EMPLOYEE PROFILES RLS
create policy "Public can view published employee profiles"
  on public.employee_profiles for select
  using (is_published = true);

create policy "Employees can read own profile"
  on public.employee_profiles for select
  using (auth.uid() = user_id);

create policy "Employees can update own profile"
  on public.employee_profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Admins can manage all employee profiles"
  on public.employee_profiles for all
  using (public.is_admin());

-- 4. SERVICES & PACKAGES (Public read active, admin write)
create policy "Public can view active services"
  on public.services for select
  using (is_active = true or public.is_admin());

create policy "Admins manage services"
  on public.services for all
  using (public.is_admin());

create policy "Public can view active packages"
  on public.packages for select
  using (is_active = true or public.is_admin());

create policy "Admins manage packages"
  on public.packages for all
  using (public.is_admin());

-- 5. ORDERS RLS
create policy "Clients can view own orders"
  on public.orders for select
  using (auth.uid() = client_id);

create policy "Assigned employees can view orders"
  on public.orders for select
  using (
    exists (
      select 1 from public.order_assignments
      where order_id = public.orders.id and employee_id = auth.uid()
    )
  );

create policy "Admins can view all orders"
  on public.orders for select
  using (public.is_admin());

create policy "Clients can create orders"
  on public.orders for insert
  with check (auth.uid() = client_id);

create policy "Employees can update status on assigned orders"
  on public.orders for update
  using (
    exists (
      select 1 from public.order_assignments
      where order_id = public.orders.id and employee_id = auth.uid()
    )
  );

create policy "Admins can manage all orders"
  on public.orders for all
  using (public.is_admin());

-- 6. ORDER MESSAGES RLS
create policy "Order participants can read messages"
  on public.order_messages for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_id
      and (
        o.client_id = auth.uid()
        or exists (
          select 1 from public.order_assignments oa
          where oa.order_id = o.id and oa.employee_id = auth.uid()
        )
      )
    )
    or public.is_admin()
  );

create policy "Order participants can send messages"
  on public.order_messages for insert
  with check (
    auth.uid() = sender_id
    and (
      exists (
        select 1 from public.orders o
        where o.id = order_id
        and (
          o.client_id = auth.uid()
          or exists (
            select 1 from public.order_assignments oa
            where oa.order_id = o.id and oa.employee_id = auth.uid()
          )
        )
      )
      or public.is_admin()
    )
  );

-- 7. ORDER FILES RLS
create policy "Order participants can view files"
  on public.order_files for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_id
      and (
        o.client_id = auth.uid()
        or exists (
          select 1 from public.order_assignments oa
          where oa.order_id = o.id and oa.employee_id = auth.uid()
        )
      )
    )
    or public.is_admin()
  );

create policy "Order participants can upload files"
  on public.order_files for insert
  with check (
    auth.uid() = uploader_id
    and (
      exists (
        select 1 from public.orders o
        where o.id = order_id
        and (
          o.client_id = auth.uid()
          or exists (
            select 1 from public.order_assignments oa
            where oa.order_id = o.id and oa.employee_id = auth.uid()
          )
        )
      )
      or public.is_admin()
    )
  );

-- 8. CONTACT & WAITLIST (Public insert, admin read/manage)
create policy "Anyone can submit contact message"
  on public.contact_messages for insert
  with check (true);

create policy "Admins read and update contact messages"
  on public.contact_messages for all
  using (public.is_admin());

create policy "Anyone can join waitlist"
  on public.waitlist_entries for insert
  with check (true);

create policy "Admins read and update waitlist entries"
  on public.waitlist_entries for all
  using (public.is_admin());

-- 9. AUDIT LOG (Admin read only)
create policy "Admins can view audit log"
  on public.audit_log for select
  using (public.is_admin());
