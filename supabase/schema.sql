create extension if not exists pgcrypto;

create table if not exists public.audit_responses (
  id uuid primary key default gen_random_uuid(),
  form_id text not null,
  respondent_name text not null,
  respondent_role text,
  club_tenure text,
  answers jsonb not null,
  submitted_at timestamptz not null default now(),
  user_agent text
);

alter table public.audit_responses enable row level security;

-- There are intentionally no public policies. The application API writes and
-- reads with the server-only service role key. Never expose that key to browsers.
create index if not exists audit_responses_form_id_idx
  on public.audit_responses (form_id);
create index if not exists audit_responses_submitted_at_idx
  on public.audit_responses (submitted_at desc);

