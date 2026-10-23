-- Orvane Studio Database Schema
-- Auth Triggers and Role Protection

-- Function to handle new user registration in Supabase Auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role user_role := 'client';
  v_status user_status := 'active';
  v_requested_role text;
begin
  -- Inspect raw_user_meta_data for initial registration intent
  v_requested_role := new.raw_user_meta_data->>'requested_role';
  
  -- Security Rule: Users can ONLY ever be initialized as 'client' or 'pending_employee'
  -- Nobody can self-sign into employee or admin access.
  if v_requested_role = 'pending_employee' then
    v_role := 'pending_employee';
    v_status := 'pending';
  else
    v_role := 'client';
    v_status := 'active';
  end if;

  insert into public.profiles (
    id,
    email,
    full_name,
    phone,
    role,
    status
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'phone',
    v_role,
    v_status
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Trigger on auth.users table
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Trigger to prevent non-admins from changing role or status
create or replace function public.enforce_profile_role_integrity()
returns trigger
language plpgsql
security definer
as $$
begin
  -- If role or status is being modified
  if (new.role <> old.role) or (new.status <> old.status) then
    -- Check if current authenticated actor is an admin
    if not public.is_admin() then
      raise exception 'Unauthorized: Only an administrator can update user roles or account status.';
    end if;
  end if;

  new.updated_at := clock_timestamp();
  return new;
end;
$$;

drop trigger if exists on_profile_role_update on public.profiles;
create trigger on_profile_role_update
  before update on public.profiles
  for each row execute function public.enforce_profile_role_integrity();
