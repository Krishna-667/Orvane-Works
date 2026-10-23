-- Orvane Studio Database Schema
-- Database-backed Sliding-Window Rate Limiting RPC

create or replace function public.check_rate_limit(
  p_key text,
  p_max_requests integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
as $$
declare
  v_count integer;
  v_now timestamptz := clock_timestamp();
  v_expires_at timestamptz := v_now + (p_window_seconds || ' seconds')::interval;
begin
  -- Periodic cleanup of expired rate limits
  delete from public.rate_limits
  where expires_at < v_now - interval '1 minute';

  -- Fetch current limit counter
  select counter into v_count
  from public.rate_limits
  where key = p_key and expires_at > v_now
  for update;

  if found then
    if v_count >= p_max_requests then
      return false; -- Rate limit exceeded
    end if;

    update public.rate_limits
    set counter = counter + 1
    where key = p_key and expires_at > v_now;

    return true; -- Allowed
  else
    insert into public.rate_limits (key, counter, window_start, expires_at)
    values (p_key, 1, v_now, v_expires_at)
    on conflict do nothing;

    return true; -- Allowed
  end if;
end;
$$;
