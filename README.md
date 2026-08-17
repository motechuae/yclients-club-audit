# YCLIENTS Club Audit

Russian-language online audit questionnaires for a tennis and padel club. The static application provides separate shareable forms for management, reception, CRM/membership, finance, and IT/YCLIENTS. Responses are stored in Supabase and reviewed/exported from its Table Editor.

## Stack

- Static HTML, CSS, and JavaScript in `docs/`
- GitHub Pages
- Supabase PostgreSQL and Data API

## Local setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in its SQL editor.
3. Put the Supabase project URL and publishable key in `docs/app.js`.
4. Configure GitHub Pages to publish from the `docs` directory on `main`.

The publishable key is intentionally visible and is restricted by Row Level Security. Never put a Supabase secret or service-role key in this repository.

## Shareable routes

- `?form=management`
- `?form=reception`
- `?form=crm`
- `?form=finance`
- `?form=technology`

## Deployment

Enable GitHub Pages for `main` / `docs`, test one submission, and confirm it appears in Supabase Table Editor before sharing links.
