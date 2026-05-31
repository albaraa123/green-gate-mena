# Green Gate MENA — Handover & Pre-Launch Checklist

This document covers everything that must be done before the site goes live.

---

## 1. Supabase Setup (Required — site won't work without this)

### Database Schema
Run the full schema SQL in Supabase Dashboard → SQL Editor. The SQL is in `docs/superpowers/plans/2026-05-28-admin-panel.md` → Task 2.

Additionally, run this for site settings:
```sql
create table if not exists site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);
alter table site_settings enable row level security;
create policy "Public read" on site_settings for select using (true);
create policy "Auth write" on site_settings for all using (auth.role() = 'authenticated');
```

### Admin Users
In Supabase Dashboard → Authentication → Users → "Invite user" — add admin email addresses.

### Storage Bucket
Create a public storage bucket named `media` in Supabase Dashboard → Storage. Enable public access. This is used for image uploads in the admin panel.

---

## 2. Environment Variables

Set these on your hosting platform (Vercel → Settings → Environment Variables):

```env
NEXT_PUBLIC_SITE_URL=https://greengate-mena.org
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=your-resend-key
ADMIN_EMAIL=hello@greengate-mena.org
```

---

## 3. Content to Add via Admin Panel

All content is managed through `/admin` (requires Supabase auth):

| Section | Admin URL | Notes |
| ------- | --------- | ----- |
| Opportunities | `/admin/opportunities` | Add real opportunities |
| Events | `/admin/events` | Add upcoming events |
| Resources | `/admin/resources` | Add knowledge resources |
| Directory | `/admin/directory` | Add climate organizations |
| Partners | `/admin/partners` | Add partner logos |
| Team | `/admin/team` | Replace placeholder team members |
| Stories | `/admin/stories` | Add youth impact stories |
| Hero Image | `/admin/settings` | Upload homepage hero background |

---

## 4. API Routes — Wire to Real Services

| Route | What to wire |
| ----- | ------------ |
| `/api/newsletter` | Resend / Mailchimp list |
| `/api/contact` | Resend → `hello@greengate-mena.org` |
| `/api/opportunities/submit` | Email notification |
| `/api/directory/submit` | Email notification + auto-creates directory_profiles entry |
| `/api/get-involved` | CRM tag by pathway |

See `// REPLACE WITH:` comments in each route file.

---

## 5. Contact Email

The contact page and API routes use `hello@greengate-mena.org`. Update in:
- `src/app/[locale]/contact/page.tsx`
- `src/app/api/contact/route.ts`

---

## 6. Domain & DNS

- Point `greengate-mena.org` to your Vercel project
- Ensure `www` redirects to apex (or vice versa)
- Set `NEXT_PUBLIC_SITE_URL` to the final domain

---

## 7. Analytics

No analytics wired yet. Recommended:
- **Vercel Analytics** — zero-config, privacy-friendly
- **Plausible** — GDPR compliant

Add script in `src/app/[locale]/layout.tsx` inside `<head>`.

---

## 8. Final Checks Before Go-Live

- [ ] Supabase schema created (all tables + site_settings)
- [ ] Admin users invited and passwords set
- [ ] Storage bucket `media` created as public
- [ ] All env vars set in Vercel
- [ ] Add real content via `/admin` (team, partners, opportunities)
- [ ] Upload hero background image via `/admin/settings`
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain
- [ ] Run `npm run build` — must be 0 errors
- [ ] Verify `/sitemap.xml` resolves correctly
- [ ] Test RTL layout at `/ar` on mobile
- [ ] Test all form submissions (newsletter, contact, opportunity submit, directory join, get-involved)
- [ ] Set up error monitoring (Sentry recommended)
- [ ] Configure Vercel preview branch protection
