-- Phase D addendum: site_settings RLS policies + payment_instructions seed
-- Adds missing RLS policies for site_settings table and seeds default
-- payment instructions for the ClientPaymentCard.

-- ── RLS Policies for site_settings ───────────────────────────────────────────

-- Anyone (including anonymous visitors) can read public settings
create policy "Anyone can read site settings"
  on public.site_settings for select
  using (true);

-- Only admins can write site settings
create policy "Admins can manage site settings"
  on public.site_settings for all
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

-- ── Seed: default payment instructions ───────────────────────────────────────
-- Admin can update the text via Admin → Content → Site Settings.

insert into public.site_settings (key, value, updated_at)
values (
  'payment_instructions',
  '"Please transfer the agreed amount via UPI or Bank Transfer and share the transaction reference (UTR number) with your assigned project lead via the message thread below.\n\nOur team will confirm receipt and update your payment status within 2–4 business hours.\n\nFor UPI: Use our UPI ID — contact your project lead for the current UPI ID.\nFor Bank Transfer: Request bank details from your project lead via WhatsApp or the message thread."'::jsonb,
  now()
)
on conflict (key) do nothing;
