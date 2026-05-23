# Green Gate MENA — Website Design Spec
**Date:** 2026-05-23  
**Status:** Approved by user  
**Project:** Full website build for Green Gate MENA (youth-led climate platform, 22 MENA countries)

---

## 1. Project Summary

Green Gate MENA is a youth-led social enterprise building the first comprehensive green ecosystem platform for the MENA region. The website serves four audiences simultaneously: youth seeking opportunities, NGOs/funders seeking partners, institutions seeking program design services, and media/government seeking credibility signals.

**Positioning:** "The MENA Region's Gateway to Green Opportunities."

**Traction numbers to use throughout:** 500+ community members · 40,000+ social media followers · 22 MENA countries · 180+ GreenX 2025 participants.

---

## 2. Confirmed Design Decisions

### 2.1 Color System (Logo-derived — CONFIRMED)
The actual logo SVG files use `#00796b` and `#4caf50`. The full Tailwind palette is remapped from these:

```ts
colors: {
  teal: {
    900: '#003d35',   // darkest bg (footer, dark sections)
    800: '#00574d',   // primary dark (headings on light bg)
    700: '#00796b',   // PRIMARY BRAND (buttons, links, accents) — matches logo
    500: '#26a69a',   // mid tone
    300: '#80cbc4',   // light accent
    100: '#e0f2f1',   // very light tint
  },
  leaf:       '#4caf50',   // secondary green — matches logo
  lime:       '#c6e94a',   // primary accent (CTA highlights, underlines)
  turquoise:  '#5fcbc1',   // water/GreenX theme
  sand: {
    100: '#f6efe1',
    200: '#ecdfc4',
    300: '#d9c79f',
  },
  terracotta:      '#c66a3a',
  'terracotta-soft': '#e89272',
  ink:        '#0f1a14',
  'ink-soft': '#3a4a40',
  paper:      '#fbf8f1',
  'paper-warm': '#f4ecdc',
}
```

**Usage rules:**
- `teal-700/800/900` for headings, buttons, dark surfaces
- `paper` and `paper-warm` for section backgrounds (never pure white)
- `lime` for CTA highlights, keyword underlines, and the lime accent button style
- `leaf` for secondary accents and icon fills
- `turquoise` exclusively for water/GreenX-themed content

### 2.2 Typography (CONFIRMED)
- **Display (headings):** Fraunces — serif, optical italic for accent words
- **Body:** Manrope — clean, modern sans-serif
- **Labels/eyebrows:** JetBrains Mono — uppercase, letter-spaced
- **Arabic:** Thmanyah — from the project's `/Thmanyah-Font-Family (1).zip` asset (self-hosted, premium)

**Type scale:**
- H1: `clamp(2.6rem, 7vw, 6rem)`, Fraunces weight 400, optical-size 144, letter-spacing -0.015em
- H2: `clamp(2rem, 4.5vw, 3.6rem)`, Fraunces weight 500
- H3: `clamp(1.4rem, 2.4vw, 2rem)`, Fraunces weight 500
- Body: 16px, Manrope, line-height 1.55
- Eyebrows: JetBrains Mono, 0.72rem, uppercase, 0.18em letter-spacing

**Italic Fraunces** used as accent in every major heading (brand signature).

### 2.3 Build Approach (CONFIRMED)
Phase-by-phase with explicit check-ins. Phases:
1. Foundation (Next.js + Tailwind + i18n + UI primitives + layout)
2. Data Layer (TypeScript data files + types + Zod schemas)
3. Homepage (all 12 sections)
4. Core Functional Pages (Opportunities Hub + Detail + Submit + Directory)
5. Institutional Pages (About, Mission, Programs, GreenX, Partners, Services, Impact)
6. Content Pages (Community, Resources, News, Contact, Join)
7. Forms & API Routes
8. Legal & SEO
9. Polish (a11y + perf pass)
10. Final delivery + docs

---

## 3. Technical Architecture

### 3.1 Stack
- **Framework:** Next.js 14+ App Router (TypeScript strict mode)
- **Styling:** Tailwind CSS 3.4+ with custom design system
- **UI primitives:** Custom-built; Radix UI only for Dialogs, Dropdowns, Tabs
- **Icons:** Lucide React
- **Animations:** Framer Motion (sparingly — respect `prefers-reduced-motion`)
- **Forms:** React Hook Form + Zod
- **i18n:** next-intl with `/en/...` and `/ar/...` routes
- **Data:** Local TypeScript files in `/src/data/` (CMS-migratable)
- **Deployment:** Vercel (zero-config)

### 3.2 Folder Structure
Top-level:
```
green-gate-mena/
├── src/
│   ├── app/[locale]/         ← All pages (i18n root)
│   ├── components/           ← layout/, home/, opportunities/, directory/, forms/, ui/, icons/
│   ├── data/                 ← *.ts data files (30+ opportunities, 20+ profiles, etc.)
│   ├── content/en/ + ar/     ← Copy as TS files
│   ├── lib/                  ← utils, seo, analytics, validations
│   ├── hooks/                ← useScrollReveal, useMediaQuery
│   ├── i18n/                 ← config + middleware
│   └── types/                ← TypeScript interfaces
├── public/
│   ├── logo/                 ← Real SVGs from logos/svg/ (copied in)
│   ├── fonts/                ← Self-hosted Thmanyah + next/font Google fonts
│   └── images/
├── docs/
│   ├── HANDOVER.md
│   ├── CONTENT_GUIDE.md
│   ├── CMS_INTEGRATION.md
│   └── DEPLOYMENT.md
└── README.md
```

### 3.3 Data Layer Architecture
Each data file exports a typed array + interface. Every import is annotated:
```ts
// REPLACE WITH: CMS API CALL — see docs/CMS_INTEGRATION.md
```
Data files: `opportunities.ts` (30+ items) · `directory.ts` (20+ profiles) · `programs.ts` · `stories.ts` · `resources.ts` · `news.ts` · `partners.ts` · `team.ts` · `countries.ts` · `themes.ts` · `stats.ts`

### 3.4 i18n Architecture
- next-intl with locales `['en', 'ar']`, default `en`
- `dir="rtl"` applied to `<html>` for Arabic routes
- Tailwind logical properties throughout (`ms-*`, `me-*`, `ps-*`, `pe-*`) for automatic RTL mirroring
- Homepage, navigation, footer, and CTAs fully translated to Arabic
- All other pages: English content with `// TODO: Arabic translation` markers
- `<LanguageSwitcher />` component in header (prominent on mobile)

### 3.5 API Routes (scaffolded)
All routes in `/src/app/api/`:
- `newsletter/route.ts`
- `contact/route.ts`
- `opportunities/submit/route.ts`
- `partner-inquiry/route.ts`
- `volunteer/route.ts`
- `directory/submit/route.ts`

Each route: validates input (Zod), logs `[FORM SUBMISSION]` to console, returns success. Comments mark where Resend/Mailchimp connect in production.

---

## 4. Pages — Full List (21+)

| Route | Purpose |
|---|---|
| `/` | Homepage (12 sections) |
| `/about` | About Green Gate MENA |
| `/about/mission-vision` | Vision, values, Theory of Change diagram |
| `/opportunities` | Hub with filters (country, type, theme, format, deadline, etc.) |
| `/opportunities/[slug]` | Opportunity detail template |
| `/opportunities/submit` | 4-step submission form |
| `/directory` | Network Directory with filters |
| `/directory/join` | Directory submission form |
| `/programs` | Programs overview |
| `/programs/greenx-2025` | GreenX case study (funder-facing) |
| `/community` | Youth community hub |
| `/partners` | For institutional partners |
| `/services` | Agency & program design services |
| `/impact` | Impact metrics + timeline |
| `/resources` | Resource library |
| `/resources/[slug]` | Resource detail |
| `/news` | News & press |
| `/news/[slug]` | Article detail |
| `/contact` | Contact + FAQ |
| `/join` | Join hub (5 entry points) |
| `/privacy`, `/terms`, `/community-guidelines`, `/cookies`, `/accessibility` | Legal |

---

## 5. Homepage Section Architecture

Sections in render order:
1. **Hero** — Eyebrow pulse · H1 with italic + lime underline · two CTAs · mini stats · MENA map card with floating opportunity cards
2. **Trust Bar** — dark teal-900 · 4 animated counters
3. **Problem Section** — paper-warm bg · 3 problem cards (numbered)
4. **Pillars Section** — 3 pillar cards (sand/dark/sage backgrounds)
5. **Opportunities Preview** — filter chips + 6-card grid
6. **GreenX Spotlight** — dark teal bg · stats row · water ripple visual
7. **Community Section** — interactive MENA map with 11+ animated pins
8. **Partners Section** — institutional CTA with tag grid
9. **Resources Preview** — asymmetric grid (1 featured + 2 standard)
10. **Youth Stories** — 3 testimonials from diverse MENA names
11. **Final CTA** — dark teal · "Your green journey starts at the gate."
12. **Footer** — 4 columns + newsletter + language toggle

---

## 6. Visual Signature Elements

Brand fingerprints used throughout:
1. Italic Fraunces accent words in every major heading
2. Lime underline behind key words (skewed -6deg CSS)
3. Paper grain texture overlay (SVG noise, 35% opacity, multiply blend)
4. Stylized MENA map SVG as recurring motif (geometric, pulsing pins)
5. Floating opportunity cards in hero (Framer Motion)
6. Animated number counters (IntersectionObserver)
7. Water ripple animations for GreenX sections
8. Dashed connection lines for network/ecosystem visuals
9. Color-coded type badges: Fellowship=teal · Grant=amber · Event=terracotta · Competition=turquoise · Internship=purple · Volunteer=soft red

---

## 7. Accessibility & Performance Targets

- Lighthouse Accessibility: 95+
- Lighthouse Performance: 90+
- All images via `next/image` with proper sizing
- Server components by default; `'use client'` only when necessary
- WCAG AA color contrast on all text
- Keyboard navigable; visible focus rings (teal/lime)
- Skip-to-content link
- ARIA labels on icon-only buttons
- `prefers-reduced-motion` respected

---

## 8. SEO

- Unique `<title>` + `<meta description>` per page
- Open Graph + Twitter Card
- JSON-LD: Organization (home) · Event (GreenX) · Article (news) · JobPosting (opportunities)
- Dynamic `sitemap.ts` + `robots.txt`
- Dynamic OG images via `next/og`

**Target keywords:** MENA climate opportunities · MENA youth climate platform · climate fellowships MENA · environmental grants for youth · green careers MENA

---

## 9. Existing Assets

Assets already in the project directory to integrate:
- **Logos:** `/logos/svg/` — 10 SVG variants (horizontal/vertical, color/dark/light/white). Copy to `/public/logo/`.
- **Font:** `Thmanyah-Font-Family (1).zip` — extract and self-host in `/public/fonts/thmanyah/` for Arabic locale.

---

## 10. Known Constraints & Placeholders

Items that require real content before launch (documented in `CONTENT_GUIDE.md`):
- Team photos and bios
- GreenX 2025 photography
- Partner/funder logos
- Real opportunity data (30+ samples provided as seed data)
- Privacy policy and legal pages need lawyer review
- Admin email addresses (currently `hello@greengate-mena.org` placeholder)
- Analytics IDs (GA4 + optional Hotjar/PostHog)

---

## 11. Phase 2 Roadmap (out of scope for this build)

- Member accounts + authentication
- Live directory submission approval flow + admin dashboard
- Opportunity recommendation engine (by country + interest tags)
- Arabic content for all pages beyond homepage/nav/footer
- CMS integration (Sanity recommended)
- Mobile app (React Native)
