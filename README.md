# Green Gate MENA

The MENA region's gateway to climate and environmental opportunities — connecting youth, NGOs, consultants, and businesses across 22 Arab countries.

## Tech Stack

- **Next.js 16.2.6** — App Router, TypeScript strict mode
- **next-intl v4.12** — EN/AR bilingual, RTL support
- **Tailwind CSS v3.4** — Custom design system
- **Supabase** — PostgreSQL database + auth + storage
- **Framer Motion v12** — Hero animations
- **Zod v4** — API validation

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # fill in Supabase keys
npm run dev        # http://localhost:3000
```

The dev server starts on port 3000. The site auto-redirects to `/en` or `/ar` based on the browser's Accept-Language header.

## Environment Variables

Create `.env.local` (copy from `.env.local.example`):

```env
NEXT_PUBLIC_SITE_URL=https://greengate-mena.org
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=your-resend-key
ADMIN_EMAIL=hello@greengate-mena.org
```

| Variable                        | Required | Description |
| ------------------------------- | -------- | ----------- |
| `NEXT_PUBLIC_SITE_URL`          | No       | Base URL for sitemap/OG. Defaults to `https://greengate-mena.org` |
| `NEXT_PUBLIC_SUPABASE_URL`      | Yes      | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes      | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY`     | Yes      | Supabase service role key (server-only) |
| `RESEND_API_KEY`                | No       | Resend API key for email |
| `ADMIN_EMAIL`                   | No       | Email for form notifications |

## Project Structure

```
src/
  app/
    [locale]/           # All pages — EN + AR
      page.tsx          # Homepage
      about/
      contact/
      impact/
      knowledge/[slug]/
      ecosystem/
        opportunities/[slug]/
        directory/
        events/
      services/{youth,ngos,consultants,businesses}/
      get-involved/{youth,ngos,consultants,partners}/
    admin/              # Admin panel (/admin/login, dashboard, CRUD pages)
    api/                # API routes (newsletter, contact, forms)
    sitemap.ts          # Auto-generated sitemap
    robots.ts           # robots.txt
    opengraph-image.tsx # Default OG image (next/og)
  components/
    layout/             # Header, Footer, LanguageSwitcher, MobileMenu
    ui/                 # Design system: Button, Badge, Card, Input, Select…
    home/               # 10 homepage section components
    ecosystem/          # Opportunity, Directory, Event cards + filter bars
    knowledge/          # Knowledge filters
    get-involved/       # Shared GetInvolvedForm
  data/                 # Static data files (empty — data served from Supabase)
  lib/
    supabase/           # server.ts, client.ts, queries.ts
    utils.ts            # cn(), formatDeadline()
  i18n/                 # next-intl routing, navigation, request config
  types/                # All shared TypeScript interfaces
messages/
  en.json               # English translations
  ar.json               # Arabic translations
```

## Available Scripts

```bash
npm run dev        # Development server (Turbopack)
npm run build      # Production build — verifies TypeScript + generates 130 pages
npm run start      # Production server
npm run lint       # ESLint
```

## Key Conventions

- **Server components by default.** Add `'use client'` only for interactive UI.
- **Navigation via `@/i18n/navigation`.** Never import from `next/navigation` or `next-intl/navigation` directly.
- **`params` and `searchParams` are Promises in Next.js 16.** Always `await` before use.
- **Tailwind logical properties** (`ms-*`, `me-*`, `ps-*`, `pe-*`) for RTL throughout.
- **All live data** is served from Supabase via `src/lib/supabase/queries.ts`. The `src/data/` files are empty stubs.
- **`Select` component** takes `options: { value, label }[]` — not children `<option>` elements.

## Localization

Both `messages/en.json` and `messages/ar.json` must be updated when adding new translation keys. The middleware (`src/proxy.ts`) handles locale detection.

## Documentation

- [`docs/HANDOVER.md`](docs/HANDOVER.md) — Pre-launch checklist and what needs real content
- [`docs/CMS_INTEGRATION.md`](docs/CMS_INTEGRATION.md) — How to connect a headless CMS
- [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md) — Content requirements before launch
