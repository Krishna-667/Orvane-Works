-- Phase D: Manual Payments System
-- Creates the order_payments table for admin-recorded manual transactions
-- (UPI / Bank Transfer / Cash) with client-visible read-only view.
-- Reversible: see DROP section at the bottom (commented out).

-- ── Enums ────────────────────────────────────────────────────────────────────

do $$ begin
  create type payment_method as enum ('upi', 'bank_transfer', 'cash', 'other');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type payment_type as enum ('advance', 'balance', 'full');
exception
  when duplicate_object then null;
end $$;

-- ── Table ─────────────────────────────────────────────────────────────────────

create table if not exists public.order_payments (
  id              uuid         primary key default gen_random_uuid(),
  order_id        uuid         not null references public.orders(id) on delete cascade,
  amount_inr      numeric(12,2) not null check (amount_inr > 0),
  -- "advance" = 50% upfront, "balance" = remaining, "full" = single payment
  payment_type    payment_type not null default 'advance',
  method          payment_method not null default 'upi',
  -- UTR / transaction reference supplied by client; nullable if cash
  reference_utr   text,
  date_received   date         not null default current_date,
  notes           text,
  -- The admin who recorded this payment
  recorded_by     uuid         not null references public.profiles(id),
  -- provider is always 'manual' in v1; reserved for Razorpay later
  provider        text         not null default 'manual',
  -- Soft-delete for voided entries; hard data is preserved for audit
  voided_at       timestamptz,
  void_reason     text,
  created_at      timestamptz  not null default now()
);

-- Index for fast per-order lookups
create index if not exists idx_order_payments_order_id
  on public.order_payments(order_id);

-- Index so voided payments are easy to filter
create index if not exists idx_order_payments_voided
  on public.order_payments(order_id) where voided_at is null;

-- ── Row Level Security ────────────────────────────────────────────────────────

alter table public.order_payments enable row level security;

-- Clients can see payments for their own orders (no amounts shown in client UI,
-- enforced in the application layer — but RLS allows the select).
create policy "Clients can view own order payments"
  on public.order_payments for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_id
        and o.client_id = auth.uid()
    )
  );

-- Employees can view payment status only — the application layer hides
-- amount/reference columns. RLS grants read access to assigned orders.
create policy "Assigned employees can view payment status"
  on public.order_payments for select
  using (
    exists (
      select 1 from public.order_assignments oa
      where oa.order_id = order_id
        and oa.employee_id = auth.uid()
    )
  );

-- Only admins can insert, update, or delete payment records
create policy "Admins can manage all payments"
  on public.order_payments for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role = 'admin'
    )
  );

-- ── Helper: auto-update orders.payment_status after payment changes ───────────
-- Computes aggregate from non-voided payments and updates the parent order.

create or replace function public.sync_order_payment_status()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order_id      uuid;
  v_quote_amount  numeric;
  v_total_paid    numeric;
  v_new_status    payment_status;
begin
  -- Determine which order to update
  v_order_id := coalesce(new.order_id, old.order_id);

  -- Get quote amount for this order
  select quote_amount_inr into v_quote_amount
  from public.orders
  where id = v_order_id;

  -- Sum non-voided payments
  select coalesce(sum(amount_inr), 0) into v_total_paid
  from public.order_payments
  where order_id = v_order_id
    and voided_at is null;

  -- Derive the new payment_status
  if v_quote_amount is null or v_quote_amount = 0 then
    v_new_status := 'invoiced';
  elsif v_total_paid = 0 then
    v_new_status := 'invoiced';
  elsif v_total_paid >= v_quote_amount then
    v_new_status := 'paid_in_full';
  else
    v_new_status := 'partially_paid';
  end if;

  -- Write back to orders table
  update public.orders
  set payment_status = v_new_status,
      updated_at = now()
  where id = v_order_id;

  return new;
end;
$$;

-- Trigger fires after any insert / update / delete on order_payments
drop trigger if exists trg_sync_order_payment_status on public.order_payments;
create trigger trg_sync_order_payment_status
  after insert or update or delete
  on public.order_payments
  for each row
  execute function public.sync_order_payment_status();

-- ── Rollback (commented out — run manually to revert) ─────────────────────────
-- drop trigger if exists trg_sync_order_payment_status on public.order_payments;
-- drop function if exists public.sync_order_payment_status();
-- drop table if exists public.order_payments;
-- drop type if exists payment_method;
-- drop type if exists payment_type;
