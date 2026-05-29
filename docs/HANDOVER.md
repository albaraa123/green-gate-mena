# Green Gate MENA — Handover & Pre-Launch Checklist

This document covers everything that must be done before the site goes live.

---

## 1. Content That Must Be Replaced

### Team Members (`src/data/team.ts`)
All 6 team members are placeholders. Replace with real names, roles, countries, and bios before launch. See `docs/CONTENT_GUIDE.md` for photo specs.

### Partner Logos
Partner logo images do not exist yet. The `logo` field in `src/data/partners.ts` points to `/images/partners/*.svg`. Either:
- Add real SVG logo files to `public/images/partners/`
- Or replace the text-placeholder cells in `PartnersSection.tsx` and the About page with `<Image>` tags

### Contact Email
The contact page shows `hello@greengate-mena.org`. Update this in `src/app/[locale]/contact/page.tsx` and in the API routes once a real email is set up.

### Social Handle
Twitter/X card uses `@GreenGateMENA`. Update in `src/app/[locale]/layout.tsx` → `twitter.site` if the handle differs.

---

## 2. Environment Variables

Set these on your hosting platform (Vercel, etc.):

```env
NEXT_PUBLIC_SITE_URL=https://greengate-mena.org
```

---

## 3. API Routes — Wire to Real Services

All 5 API routes currently log to console and return `{ ok: true }`. Before launch:

| Route | What to wire |
| ----- | ------------ |
| `/api/newsletter` | Mailchimp / ConvertKit / Resend list |
| `/api/contact` | Resend / SendGrid → `hello@greengate-mena.org` |
| `/api/opportunities/submit` | Email notification + Airtable / Notion DB |
| `/api/directory/submit` | Email notification + review queue |
| `/api/get-involved` | CRM / Mailchimp tag by pathway |

See the comment `// REPLACE WITH: Resend email to ADMIN_EMAIL` in each route file.

---

## 4. Data → CMS Migration

All data is currently in static TypeScript files under `src/data/`. Each file has a comment at the top:

```ts
// REPLACE WITH: CMS API CALL — see docs/CMS_INTEGRATION.md
```

See `docs/CMS_INTEGRATION.md` for the full migration plan.

---

## 5. Domain & DNS

- Point `greengate-mena.org` to your Vercel project
- Ensure `www` redirects to apex (or vice versa)
- Set `NEXT_PUBLIC_SITE_URL` to the final domain before deploying

---

## 6. Analytics

No analytics are wired yet. Recommended options:
- **Vercel Analytics** — zero-config, privacy-friendly
- **Plausible** — open source, GDPR compliant, good for MENA audience
- Add the script in `src/app/[locale]/layout.tsx` inside `<head>`

---

## 7. Final Checks Before Go-Live

- [ ] All team placeholder names replaced
- [ ] Partner logos added to `public/images/partners/`
- [ ] Contact email confirmed and API route wired
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain
- [ ] Run `npm run build` — must be 0 errors
- [ ] Verify `/en/sitemap.xml` resolves correctly
- [ ] Test RTL layout at `/ar` on mobile
- [ ] Test all 5 form submissions (newsletter, contact, opportunity submit, directory join, get-involved)
- [ ] Set up error monitoring (Sentry recommended)
- [ ] Configure Vercel preview branch protection
