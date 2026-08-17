# YCLIENTS Club Audit

Russian-language online audit questionnaires for a tennis and padel club. The application provides separate shareable forms for management, reception, CRM/membership, finance, and IT/YCLIENTS, plus a password-protected response dashboard and CSV export.

## Stack

- Next.js
- Supabase PostgreSQL through the server-side REST API
- Deployable to Vercel or any Node.js host

## Local setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in its SQL editor.
3. Copy `.env.example` to `.env.local` and add the server-only credentials.
4. Run `npm install` and `npm run dev`.

Do not expose `SUPABASE_SERVICE_ROLE_KEY` in browser code or commit `.env.local`.

## Shareable routes

- `/form/management`
- `/form/reception`
- `/form/crm`
- `/form/finance`
- `/form/technology`
- `/admin` for collected responses and CSV export

## Deployment

Create the same three environment variables on the hosting provider, deploy, test one submission, and confirm it appears on `/admin` before sharing links.

