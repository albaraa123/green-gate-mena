# Green Gate MENA — Full Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete Green Gate MENA website — a Next.js 14 platform with 21+ pages, full teal design system, EN/AR i18n, Opportunity Hub, Network Directory, and all supporting forms and API routes.

**Architecture:** Phase-by-phase with check-ins after each phase. Data lives in `/src/data/*.ts` files annotated `// REPLACE WITH: CMS API CALL` for future migration. Server components by default; `'use client'` only for interactivity. Arabic locale uses Thmanyah font (self-hosted from the project's zip asset) and `dir="rtl"`.

**Tech Stack:** Next.js 14 App Router · TypeScript strict · Tailwind CSS 3.4 · next-intl · Framer Motion · React Hook Form + Zod · Lucide React · Radix UI (Dialog/Dropdown/Tabs only) · Fraunces + Manrope + JetBrains Mono (EN) · Thmanyah (AR)

**Spec:** `docs/superpowers/specs/2026-05-23-green-gate-mena-design.md`

---

## Sitemap (Updated — from user-approved sitemap image)

| Route | Purpose |
|-------|---------|  
| `/` | Home — mission statement, impact counters, CTA |
| `/about` | About Us — story, team, values, partners |
| `/services` | Services overview (audience-segmented) |
| `/services/youth` | For Youth — fellowships, capacity-building, mentorship |
| `/services/ngos` | For NGOs — program design, partnerships, grants support |
| `/services/consultants` | For Consultants — network, project pipeline, collaboration |
| `/services/businesses` | For Businesses — ESG partnerships, talent, sponsorships |
| `/ecosystem` | Ecosystem Hub overview |
| `/ecosystem/opportunities` | Opportunities — filterable listing + detail pages |
| `/ecosystem/opportunities/[slug]` | Opportunity detail |
| `/ecosystem/opportunities/submit` | Submit an opportunity (4-step form) |
| `/ecosystem/directory` | Network Directory (filterable profiles) |
| `/ecosystem/directory/join` | Join the directory form |
| `/ecosystem/events` | Events listing + detail |
| `/knowledge` | Knowledge & Blog — articles, resources |
| `/knowledge/[slug]` | Article/resource detail |
| `/impact` | Impact & Stories — metrics, timeline, testimonials |
| `/get-involved` | Get Involved hub (4 pathways) |
| `/get-involved/youth` | Join as Youth |
| `/get-involved/ngos` | List your NGO |
| `/get-involved/consultants` | Be a Consultant |
| `/get-involved/partners` | Partner with Us |
| `/contact` | Contact us + FAQ |
| `/privacy`, `/terms`, `/accessibility` | Legal |

---

## Phase Overview (check-in after each)

| Phase | Deliverable |
|-------|-------------|
| **1** | Next.js scaffold + Tailwind design system + fonts + i18n + UI primitives + layout |
| **2** | Data layer: TS types + 30+ opportunities + 20+ directory profiles + all seed data |
| **3** | Homepage: all 12 sections assembled and animated |
| **4** | Ecosystem Hub: Opportunities (list + detail + submit) + Directory (list + join) + Events |
| **5** | About · Services (4 audience pages) · Impact & Stories |
| **6** | Knowledge & Blog · Get Involved (4 pathways) · Contact |
| **7** | All forms wired to API routes with full Zod validation |
| **8** | Legal pages + full SEO (metadata, JSON-LD, OG images, sitemap) |
| **9** | Accessibility audit + performance pass |
| **10** | All /docs written + `npm run build` clean + delivery summary |

---

## Phase 1: Foundation

### Phase 1 — File Map

```
green-gate-mena/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
├── postcss.config.js
├── .env.local.example
├── .gitignore
├── messages/
│   ├── en.json
│   └── ar.json
├── public/
│   ├── logo/             ← copy all 10 SVGs from logos/svg/
│   │   └── README.md
│   ├── fonts/
│   │   └── thmanyah/     ← extracted from Thmanyah-Font-Family (1).zip
│   ├── favicon.ico
│   └── robots.txt
└── src/
    ├── app/
    │   ├── globals.css
    │   └── [locale]/
    │       ├── layout.tsx
    │       └── page.tsx
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── MobileMenu.tsx
    │   │   ├── LanguageSwitcher.tsx
    │   │   └── NewsletterSignup.tsx
    │   └── ui/
    │       ├── Button.tsx
    │       ├── Badge.tsx
    │       ├── Card.tsx
    │       ├── Container.tsx
    │       ├── Input.tsx
    │       ├── Select.tsx
    │       ├── Textarea.tsx
    │       ├── Checkbox.tsx
    │       ├── SectionHeader.tsx
    │       ├── Eyebrow.tsx
    │       └── AnimatedCounter.tsx
    ├── i18n/
    │   ├── config.ts
    │   └── middleware.ts
    ├── lib/
    │   └── utils.ts
    └── types/
        └── index.ts
```

---

### Task 1.1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.js`, `.gitignore`, `.env.local.example`

- [ ] **Run `create-next-app` with exact flags**

```bash
cd "c:/Users/albar/OneDrive/سطح المكتب/green-gate-mena"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
```

When prompted: answer **Yes** to all defaults. This creates the scaffold in the existing directory.

- [ ] **Verify scaffold created cleanly**

```bash
npm run dev
```

Expected: server starts on `http://localhost:3000`. Stop with Ctrl+C.

- [ ] **Enable TypeScript strict mode** — edit `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "module": "esnext",
    "moduleDetection": "force",
    "resolveJsonModule": true,
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Create `.env.local.example`**:

```
# Analytics (add real IDs before launch)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email service (Resend — add before forms go live)
RESEND_API_KEY=re_xxxxxxxxxxxx
ADMIN_EMAIL=hello@greengate-mena.org

# Site URL
NEXT_PUBLIC_SITE_URL=https://greengate-mena.org
```

- [ ] **Update `.gitignore`** — ensure it includes `.env.local` (create-next-app does this by default; verify).

- [ ] **Commit**

```bash
git init
git add .
git commit -m "chore: initialize Next.js 14 project with TypeScript strict"
```

---

### Task 1.2: Install All Dependencies

**Files:** `package.json`

- [ ] **Install all required packages**

```bash
npm install next-intl framer-motion lucide-react @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs @radix-ui/react-slot react-hook-form @hookform/resolvers zod clsx tailwind-merge
```

- [ ] **Install dev dependencies**

```bash
npm install -D @types/node
```

- [ ] **Verify no peer-dep warnings** — run `npm ls` and check the output. Ignore `UNMET OPTIONAL PEER` for `react@19` packages (Next.js 14 uses React 18).

- [ ] **Confirm `package.json` has these in `dependencies`:**
  - `next`, `react`, `react-dom`, `next-intl`, `framer-motion`, `lucide-react`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-tabs`, `@radix-ui/react-slot`, `react-hook-form`, `@hookform/resolvers`, `zod`, `clsx`, `tailwind-merge`

- [ ] **Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install all project dependencies"
```

---

### Task 1.3: Configure Tailwind Design System

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Replace `tailwind.config.ts` entirely** with the full design system:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          900: '#003d35',
          800: '#00574d',
          700: '#00796b',
          600: '#00897b',
          500: '#26a69a',
          300: '#80cbc4',
          100: '#e0f2f1',
        },
        leaf: '#4caf50',
        lime: '#c6e94a',
        turquoise: '#5fcbc1',
        sand: {
          100: '#f6efe1',
          200: '#ecdfc4',
          300: '#d9c79f',
        },
        terracotta: '#c66a3a',
        'terracotta-soft': '#e89272',
        ink: '#0f1a14',
        'ink-soft': '#3a4a40',
        paper: '#fbf8f1',
        'paper-warm': '#f4ecdc',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-manrope)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
        arabic: ['var(--font-thmanyah)', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.6rem, 7vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-lg': ['clamp(2rem, 4.5vw, 3.6rem)', { lineHeight: '1.1' }],
        'display-md': ['clamp(1.4rem, 2.4vw, 2rem)', { lineHeight: '1.2' }],
        'eyebrow': ['0.72rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      maxWidth: {
        container: '1320px',
      },
      spacing: {
        'section': 'clamp(70px, 10vw, 140px)',
        'gutter': 'clamp(20px, 4vw, 56px)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-up': 'float-up 0.6s ease-out forwards',
        'ripple': 'ripple 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'float-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ripple': {
          '0%': { transform: 'scale(1)', opacity: '0.4' },
          '50%': { transform: 'scale(1.08)', opacity: '0.2' },
          '100%': { transform: 'scale(1)', opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Verify Tailwind picks up the new config** — run `npm run dev`, open browser, inspect any element to see Tailwind classes applied. Stop dev server.

- [ ] **Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: configure Tailwind design system with teal palette and typography scale"
```

---

### Task 1.4: Set Up Fonts

**Files:**
- Create: `public/fonts/thmanyah/` (extracted font files)
- Modify: `src/app/[locale]/layout.tsx` (font variables, once created in Task 1.8)
- Modify: `next.config.mjs`
- Modify: `src/app/globals.css`

- [ ] **Extract Thmanyah font** — open PowerShell and run:

```powershell
Expand-Archive -Path "c:\Users\albar\OneDrive\سطح المكتب\green-gate-mena\Thmanyah-Font-Family (1).zip" -DestinationPath "c:\Users\albar\OneDrive\سطح المكتب\green-gate-mena\thmanyah-extracted" -Force
```

Then inspect what was extracted:
```powershell
Get-ChildItem "c:\Users\albar\OneDrive\سطح المكتب\green-gate-mena\thmanyah-extracted" -Recurse | Where-Object { $_.Extension -match '\.(ttf|otf|woff|woff2)' } | Select-Object FullName
```

Note the font file names and weights available. Create `public/fonts/thmanyah/` and copy the relevant files there (at minimum: Regular, Medium/SemiBold, Bold weights). Also copy any Italic variants if present.

```powershell
New-Item -ItemType Directory -Force -Path "c:\Users\albar\OneDrive\سطح المكتب\green-gate-mena\public\fonts\thmanyah"
# Copy the font files found above — adjust paths based on extraction results:
Copy-Item "c:\Users\albar\OneDrive\سطح المكتب\green-gate-mena\thmanyah-extracted\*\*.woff2" -Destination "c:\Users\albar\OneDrive\سطح المكتب\green-gate-mena\public\fonts\thmanyah\" -Recurse
# If no woff2, copy ttf/otf:
Copy-Item "c:\Users\albar\OneDrive\سطح المكتب\green-gate-mena\thmanyah-extracted\*\*.ttf" -Destination "c:\Users\albar\OneDrive\سطح المكتب\green-gate-mena\public\fonts\thmanyah\" -Recurse
```

- [ ] **Update `next.config.mjs`** to allow self-hosted font path:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
}

export default nextConfig
```

- [ ] **Add `@font-face` declarations to `src/app/globals.css`** (add after Tailwind directives — actual font filenames depend on what was extracted in step above; update accordingly):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Thmanyah — Arabic display font (self-hosted) */
/* NOTE: Update filenames below to match what was extracted from Thmanyah-Font-Family.zip */
@font-face {
  font-family: 'Thmanyah';
  src: url('/fonts/thmanyah/Thmanyah-Regular.woff2') format('woff2'),
       url('/fonts/thmanyah/Thmanyah-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Thmanyah';
  src: url('/fonts/thmanyah/Thmanyah-Medium.woff2') format('woff2'),
       url('/fonts/thmanyah/Thmanyah-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Thmanyah';
  src: url('/fonts/thmanyah/Thmanyah-Bold.woff2') format('woff2'),
       url('/fonts/thmanyah/Thmanyah-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

**Important:** After extracting, check the actual filenames and adjust the `src` URLs above to match.

- [ ] **Commit**

```bash
git add public/fonts/ src/app/globals.css next.config.mjs
git commit -m "feat: add Thmanyah self-hosted Arabic font"
```

---

### Task 1.5: Configure next-intl

**Files:**
- Create: `src/i18n/config.ts`
- Create: `src/i18n/middleware.ts` (actually `src/middleware.ts` — next-intl requires this at src root)
- Create: `messages/en.json`
- Create: `messages/ar.json`
- Modify: `next.config.mjs`

- [ ] **Create `src/i18n/config.ts`**:

```typescript
export const locales = ['en', 'ar'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
}

export const localeDirections: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ar: 'rtl',
}
```

- [ ] **Create `src/middleware.ts`** (at `src/` root, NOT inside `src/i18n/`):

```typescript
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from '@/i18n/config'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
})

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
```

- [ ] **Update `next.config.mjs`** to wire next-intl plugin:

```javascript
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
}

export default withNextIntl(nextConfig)
```

- [ ] **Create `src/i18n/request.ts`** (next-intl v3+ requires this):

```typescript
import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale } from './config'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
```

- [ ] **Create `messages/en.json`** with all navigation, footer, and CTA copy:

```json
{
  "nav": {
    "opportunities": "Opportunities",
    "community": "Community",
    "programs": "Programs",
    "partners": "Partners",
    "impact": "Impact",
    "resources": "Resources",
    "about": "About",
    "contact": "Contact",
    "joinUs": "Join Us",
    "languageLabel": "العربية"
  },
  "footer": {
    "tagline": "The MENA Region's gateway to climate & environmental opportunities. Building the green ecosystem for 22 countries.",
    "newsletter": {
      "placeholder": "Your email address",
      "button": "Subscribe",
      "label": "Get green opportunities in your inbox"
    },
    "columns": {
      "explore": "Explore",
      "engage": "Engage",
      "about": "About"
    },
    "links": {
      "opportunities": "Opportunities",
      "community": "Community",
      "programs": "Programs",
      "directory": "Directory",
      "resources": "Resources",
      "joinUs": "Join Us",
      "submitOpportunity": "Submit Opportunity",
      "volunteer": "Volunteer",
      "partners": "Partners",
      "media": "Media",
      "ourStory": "Our Story",
      "mission": "Mission",
      "impact": "Impact",
      "greenX": "GreenX",
      "contact": "Contact"
    },
    "legal": {
      "copyright": "© 2025 Green Gate MENA. All rights reserved.",
      "privacy": "Privacy",
      "terms": "Terms",
      "guidelines": "Community Guidelines"
    }
  },
  "common": {
    "exploreOpportunities": "Explore Opportunities",
    "joinCommunity": "Join the Community",
    "browseAll": "Browse All Opportunities",
    "learnMore": "Learn More",
    "viewCaseStudy": "View GreenX Case Study",
    "partnerWithUs": "Partner With Us",
    "submitOpportunity": "Submit an Opportunity",
    "joinGreenGate": "Join Green Gate",
    "loading": "Loading...",
    "readMore": "Read More",
    "back": "Back",
    "close": "Close",
    "open": "Open"
  },
  "hero": {
    "eyebrow": "Now serving 22 MENA countries",
    "h1Part1": "The MENA Region's",
    "h1Italic": "Gateway",
    "h1Part2": "to",
    "h1Highlight": "Green",
    "h1Part3": "Opportunities.",
    "subhead": "Green Gate MENA connects youth with climate opportunities, environmental networks, and programs across the Arab region and beyond — one trusted regional platform, built by youth, for youth.",
    "stat1": "500+",
    "stat1Label": "Youth Members",
    "stat2": "40K+",
    "stat2Label": "Followers",
    "stat3": "180+",
    "stat3Label": "GreenX Participants"
  }
}
```

- [ ] **Create `messages/ar.json`** with Arabic translations:

```json
{
  "nav": {
    "opportunities": "الفرص",
    "community": "المجتمع",
    "programs": "البرامج",
    "partners": "الشركاء",
    "impact": "الأثر",
    "resources": "الموارد",
    "about": "عن المنصة",
    "contact": "تواصل معنا",
    "joinUs": "انضم إلينا",
    "languageLabel": "English"
  },
  "footer": {
    "tagline": "بوابة منطقة الشرق الأوسط وشمال أفريقيا للفرص المناخية والبيئية. نبني المنظومة الخضراء لـ 22 دولة.",
    "newsletter": {
      "placeholder": "بريدك الإلكتروني",
      "button": "اشترك",
      "label": "احصل على فرص خضراء في بريدك"
    },
    "columns": {
      "explore": "استكشف",
      "engage": "شارك",
      "about": "عن المنصة"
    },
    "links": {
      "opportunities": "الفرص",
      "community": "المجتمع",
      "programs": "البرامج",
      "directory": "الدليل",
      "resources": "الموارد",
      "joinUs": "انضم إلينا",
      "submitOpportunity": "أضف فرصة",
      "volunteer": "تطوع",
      "partners": "الشركاء",
      "media": "الإعلام",
      "ourStory": "قصتنا",
      "mission": "رسالتنا",
      "impact": "أثرنا",
      "greenX": "GreenX",
      "contact": "تواصل معنا"
    },
    "legal": {
      "copyright": "© 2025 Green Gate MENA. جميع الحقوق محفوظة.",
      "privacy": "الخصوصية",
      "terms": "الشروط",
      "guidelines": "إرشادات المجتمع"
    }
  },
  "common": {
    "exploreOpportunities": "استكشف الفرص",
    "joinCommunity": "انضم إلى المجتمع",
    "browseAll": "تصفح جميع الفرص",
    "learnMore": "اعرف أكثر",
    "viewCaseStudy": "عرض دراسة حالة GreenX",
    "partnerWithUs": "شاركنا",
    "submitOpportunity": "أضف فرصة",
    "joinGreenGate": "انضم إلى Green Gate",
    "loading": "جاري التحميل...",
    "readMore": "اقرأ المزيد",
    "back": "رجوع",
    "close": "إغلاق",
    "open": "فتح"
  },
  "hero": {
    "eyebrow": "نخدم الآن 22 دولة في منطقة الشرق الأوسط وشمال أفريقيا",
    "h1Part1": "بوابة منطقة الشرق الأوسط وشمال أفريقيا",
    "h1Italic": "نحو",
    "h1Part2": "الفرص",
    "h1Highlight": "الخضراء",
    "h1Part3": "",
    "subhead": "تربط Green Gate MENA الشباب بالفرص المناخية والشبكات البيئية والبرامج عبر المنطقة العربية — منصة إقليمية موثوقة واحدة، بُنيت من الشباب وللشباب.",
    "stat1": "+500",
    "stat1Label": "عضو في المجتمع",
    "stat2": "+40K",
    "stat2Label": "متابع",
    "stat3": "+180",
    "stat3Label": "مشارك في GreenX"
  }
}
```

- [ ] **Verify** by running `npm run build`. Expected: completes without error (may show warnings about missing pages — that's fine).

- [ ] **Commit**

```bash
git add src/i18n/ src/middleware.ts messages/ next.config.mjs
git commit -m "feat: configure next-intl with EN/AR locales and full message files"
```

---

### Task 1.6: Global CSS & Base Styles

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Replace `src/app/globals.css`** completely:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── Thmanyah (Arabic, self-hosted) ─────────────────────────── */
/* IMPORTANT: Update filenames to match extracted files from Thmanyah zip */
@font-face {
  font-family: 'Thmanyah';
  src: url('/fonts/thmanyah/Thmanyah-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Thmanyah';
  src: url('/fonts/thmanyah/Thmanyah-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Thmanyah';
  src: url('/fonts/thmanyah/Thmanyah-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Thmanyah';
  src: url('/fonts/thmanyah/Thmanyah-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* ── Base layer ─────────────────────────────────────────────── */
@layer base {
  :root {
    --font-fraunces: 'Fraunces';
    --font-manrope: 'Manrope';
    --font-jetbrains: 'JetBrains Mono';
    --font-thmanyah: 'Thmanyah';
  }

  * {
    @apply border-border;
  }

  html {
    @apply bg-paper text-ink;
    font-family: var(--font-manrope), system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Arabic locale body uses Thmanyah */
  html[dir='rtl'] {
    font-family: var(--font-thmanyah), 'Thmanyah', sans-serif;
  }

  body {
    @apply font-body leading-relaxed;
    min-height: 100dvh;
  }

  /* Paper grain texture overlay — applied on body */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.035;
    mix-blend-mode: multiply;
    pointer-events: none;
    z-index: 9999;
  }

  /* Headings use Fraunces by default */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-fraunces), Georgia, serif;
    @apply font-display leading-tight;
  }

  html[dir='rtl'] h1,
  html[dir='rtl'] h2,
  html[dir='rtl'] h3,
  html[dir='rtl'] h4,
  html[dir='rtl'] h5,
  html[dir='rtl'] h6 {
    font-family: var(--font-thmanyah), sans-serif;
  }

  /* Skip to content */
  .skip-to-content {
    @apply sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50
           focus:px-4 focus:py-2 focus:bg-teal-700 focus:text-white focus:rounded-lg
           focus:outline-none focus:ring-2 focus:ring-lime;
  }

  /* Focus ring */
  :focus-visible {
    @apply outline-none ring-2 ring-teal-700 ring-offset-2 ring-offset-paper;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

/* ── Utility layer ───────────────────────────────────────────── */
@layer utilities {
  /* Lime underline highlight on heading words */
  .lime-underline {
    position: relative;
    display: inline;
  }
  .lime-underline::after {
    content: '';
    position: absolute;
    left: -2px;
    right: -2px;
    bottom: 1px;
    height: 0.4em;
    background-color: #c6e94a;
    opacity: 0.55;
    z-index: -1;
    transform: skewX(-6deg);
    border-radius: 2px;
  }

  /* Text clamp utilities */
  .text-display-xl {
    font-size: clamp(2.6rem, 7vw, 6rem);
    line-height: 1.05;
    letter-spacing: -0.015em;
  }
  .text-display-lg {
    font-size: clamp(2rem, 4.5vw, 3.6rem);
    line-height: 1.1;
  }
  .text-display-md {
    font-size: clamp(1.4rem, 2.4vw, 2rem);
    line-height: 1.2;
  }

  /* Section padding */
  .section-py {
    padding-top: clamp(70px, 10vw, 140px);
    padding-bottom: clamp(70px, 10vw, 140px);
  }

  /* Container gutter */
  .container-px {
    padding-left: clamp(20px, 4vw, 56px);
    padding-right: clamp(20px, 4vw, 56px);
  }
}
```

- [ ] **Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add global styles with grain texture, focus rings, and utility classes"
```

---

### Task 1.7: Shared TypeScript Types

**Files:**
- Create: `src/types/index.ts`

- [ ] **Create `src/types/index.ts`** with shared utility types (data-specific types come in Phase 2):

```typescript
export type Locale = 'en' | 'ar'

export type Direction = 'ltr' | 'rtl'

export type OpportunityType =
  | 'fellowship'
  | 'grant'
  | 'internship'
  | 'competition'
  | 'event'
  | 'training'
  | 'volunteer'
  | 'job'

export type Theme =
  | 'climate'
  | 'water'
  | 'biodiversity'
  | 'energy'
  | 'circular-economy'
  | 'sustainability'
  | 'policy'
  | 'research'
  | 'esg'

export type Country =
  | 'algeria'
  | 'bahrain'
  | 'comoros'
  | 'djibouti'
  | 'egypt'
  | 'iraq'
  | 'jordan'
  | 'kuwait'
  | 'lebanon'
  | 'libya'
  | 'mauritania'
  | 'morocco'
  | 'oman'
  | 'palestine'
  | 'qatar'
  | 'saudi-arabia'
  | 'somalia'
  | 'sudan'
  | 'syria'
  | 'tunisia'
  | 'uae'
  | 'yemen'

export type Language = 'en' | 'ar' | 'fr' | 'other'

export type CompensationType = 'paid' | 'unpaid' | 'stipend'

export type Format = 'online' | 'in-person' | 'hybrid'

export type ProfileType =
  | 'youth-leader'
  | 'consultant'
  | 'expert'
  | 'organization'
  | 'project-lead'
  | 'activist'

// Badge color mapping for opportunity types
export const OPPORTUNITY_TYPE_COLORS: Record<OpportunityType, string> = {
  fellowship: 'bg-teal-100 text-teal-800',
  grant: 'bg-amber-100 text-amber-800',
  internship: 'bg-purple-100 text-purple-800',
  competition: 'bg-cyan-100 text-cyan-800',
  event: 'bg-orange-100 text-orange-900',
  training: 'bg-blue-100 text-blue-800',
  volunteer: 'bg-rose-100 text-rose-800',
  job: 'bg-emerald-100 text-emerald-800',
}

// Human-readable labels
export const OPPORTUNITY_TYPE_LABELS: Record<OpportunityType, string> = {
  fellowship: 'Fellowship',
  grant: 'Grant',
  internship: 'Internship',
  competition: 'Competition',
  event: 'Event',
  training: 'Training',
  volunteer: 'Volunteer',
  job: 'Job',
}

export const COUNTRY_NAMES: Record<Country, string> = {
  algeria: 'Algeria',
  bahrain: 'Bahrain',
  comoros: 'Comoros',
  djibouti: 'Djibouti',
  egypt: 'Egypt',
  iraq: 'Iraq',
  jordan: 'Jordan',
  kuwait: 'Kuwait',
  lebanon: 'Lebanon',
  libya: 'Libya',
  mauritania: 'Mauritania',
  morocco: 'Morocco',
  oman: 'Oman',
  palestine: 'Palestine',
  qatar: 'Qatar',
  'saudi-arabia': 'Saudi Arabia',
  somalia: 'Somalia',
  sudan: 'Sudan',
  syria: 'Syria',
  tunisia: 'Tunisia',
  uae: 'UAE',
  yemen: 'Yemen',
}

export const COUNTRY_FLAGS: Record<Country, string> = {
  algeria: '🇩🇿', bahrain: '🇧🇭', comoros: '🇰🇲', djibouti: '🇩🇯',
  egypt: '🇪🇬', iraq: '🇮🇶', jordan: '🇯🇴', kuwait: '🇰🇼',
  lebanon: '🇱🇧', libya: '🇱🇾', mauritania: '🇲🇷', morocco: '🇲🇦',
  oman: '🇴🇲', palestine: '🇵🇸', qatar: '🇶🇦', 'saudi-arabia': '🇸🇦',
  somalia: '🇸🇴', sudan: '🇸🇩', syria: '🇸🇾', tunisia: '🇹🇳',
  uae: '🇦🇪', yemen: '🇾🇪',
}
```

- [ ] **Run TypeScript check**:

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Commit**

```bash
git add src/types/
git commit -m "feat: add shared TypeScript types for opportunities, countries, themes"
```

---

### Task 1.8: Locale Layout (fonts + providers)

**Files:**
- Create: `src/app/[locale]/layout.tsx`
- Delete: `src/app/layout.tsx` (the root layout created by create-next-app; the locale layout replaces it)

- [ ] **Create `src/app/[locale]/layout.tsx`**:

```typescript
import type { Metadata } from 'next'
import { Fraunces, Manrope, JetBrains_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, localeDirections, type Locale } from '@/i18n/config'
import '@/app/globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: {
      default: 'Green Gate MENA — Climate & Environmental Opportunities for MENA Youth',
      template: '%s | Green Gate MENA',
    },
    description:
      'Green Gate MENA is the MENA region\'s gateway to climate and environmental opportunities, connecting youth with fellowships, grants, internships, and programs across 22 countries.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://greengate-mena.org'),
    alternates: {
      canonical: '/',
      languages: { en: '/en', ar: '/ar' },
    },
    openGraph: {
      siteName: 'Green Gate MENA',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()
  const dir = localeDirections[locale as Locale]

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

- [ ] **Delete the root `src/app/layout.tsx`** created by create-next-app (the locale layout replaces it):

```bash
rm src/app/layout.tsx
# Also delete src/app/page.tsx if it exists — locale layout takes over routing
rm src/app/page.tsx
```

- [ ] **Create a minimal `src/app/[locale]/page.tsx`** (skeleton — will be filled in Phase 3):

```typescript
export default function HomePage() {
  return (
    <main id="main-content">
      <p className="p-8 font-body text-ink">
        Green Gate MENA — Phase 1 Scaffold
      </p>
    </main>
  )
}
```

- [ ] **Verify dev server works**:

```bash
npm run dev
```

Open `http://localhost:3000` — should redirect to `http://localhost:3000/en`. You should see "Green Gate MENA — Phase 1 Scaffold". Check `http://localhost:3000/ar` also works.

- [ ] **Commit**

```bash
git add src/app/
git commit -m "feat: locale layout with next/font (Fraunces, Manrope, JetBrains Mono) and NextIntl provider"
```

---

### Task 1.9: Copy Logo Assets

**Files:**
- Create: `public/logo/` (10 SVG files)
- Create: `public/logo/README.md`

- [ ] **Copy all logo SVGs** from the existing `logos/svg/` folder:

```powershell
New-Item -ItemType Directory -Force -Path "c:\Users\albar\OneDrive\سطح المكتب\green-gate-mena\public\logo"
Copy-Item "c:\Users\albar\OneDrive\سطح المكتب\green-gate-mena\logos\svg\*" -Destination "c:\Users\albar\OneDrive\سطح المكتب\green-gate-mena\public\logo\" -Force
```

- [ ] **Create `public/logo/README.md`**:

```markdown
# Logo Files

These SVG logo files are the real production logos for Green Gate MENA.

## Available Variants

| File | Use When |
|------|----------|
| `logo-horizontal-color.svg` | Light backgrounds, default |
| `logo-horizontal-dark-bg.svg` | Dark/teal backgrounds (e.g. footer, hero) |
| `logo-horizontal-light-bg.svg` | Light backgrounds |
| `logo-horizontal-white.svg` | Dark backgrounds where full white is needed |
| `logo-mark-color.svg` | Square/icon contexts (favicon, avatar) |
| `logo-mark-mono-dark.svg` | Monochrome contexts |
| `logo-vertical-color.svg` | Tall/portrait contexts |
| `logo-vertical-dark-bg.svg` | Dark vertical contexts |
| `logo-vertical-light-bg.svg` | Light vertical contexts |
| `logo-vertical-white.svg` | White version vertical |

## In Code

Use Next.js `<Image>` component:
```tsx
import Image from 'next/image'
<Image src="/logo/logo-horizontal-color.svg" alt="Green Gate MENA" width={180} height={40} />
```

For the dark header/footer, use `logo-horizontal-dark-bg.svg`.
```

- [ ] **Create a placeholder `public/favicon.ico`** — copy the color logo mark and use it, or create a minimal 32x32 placeholder. For now, a placeholder is fine; replace before launch.

- [ ] **Commit**

```bash
git add public/logo/ public/favicon.ico
git commit -m "feat: add production logo SVGs to public/logo/"
```

---

### Task 1.10: `lib/utils.ts`

**Files:**
- Create: `src/lib/utils.ts`

- [ ] **Create `src/lib/utils.ts`**:

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function formatDeadline(isoDate: string): string {
  const date = new Date(isoDate)
  const now = new Date()
  const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return 'Closed'
  if (diffDays === 0) return 'Closes today'
  if (diffDays === 1) return 'Closes tomorrow'
  if (diffDays <= 7) return `${diffDays} days left`
  if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks left`

  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}
```

- [ ] **Run TypeScript check**:

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Commit**

```bash
git add src/lib/utils.ts
git commit -m "feat: add utility functions (cn, formatDeadline, slugify, truncate)"
```

---

### Task 1.11: UI Primitive — Button

**Files:**
- Create: `src/components/ui/Button.tsx`

- [ ] **Create `src/components/ui/Button.tsx`**:

```typescript
'use client'

import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'outline' | 'lime' | 'ghost' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** When true, renders as the child element (e.g. <Link>) instead of <button>. Uses @radix-ui/react-slot. */
  asChild?: boolean
  loading?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-teal-800 text-white hover:bg-teal-900 focus-visible:ring-teal-700 shadow-sm',
  outline:
    'border-2 border-teal-700 text-teal-700 hover:bg-teal-100 focus-visible:ring-teal-700',
  lime:
    'bg-lime text-ink hover:bg-lime/90 focus-visible:ring-teal-700 font-bold shadow-sm',
  ghost:
    'text-teal-700 hover:bg-teal-100 focus-visible:ring-teal-700',
  link:
    'text-teal-700 underline-offset-4 hover:underline focus-visible:ring-teal-700 p-0 h-auto',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-5 text-sm gap-2',
  lg: 'h-12 px-7 text-base gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, loading, disabled, children, ...props }, ref) => {
    // When asChild=true, Slot merges all props onto the single child element (e.g. <Link>)
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        disabled={!asChild ? (disabled || loading) : undefined}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-semibold',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          variant !== 'link' && sizes[size],
          className,
        )}
        {...props}
      >
        {loading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </Comp>
    )
  },
)

Button.displayName = 'Button'
```

- [ ] **Commit**

```bash
git add src/components/ui/Button.tsx
git commit -m "feat: Button component with primary/outline/lime/ghost/link variants"
```

---

### Task 1.12: UI Primitive — Badge

**Files:**
- Create: `src/components/ui/Badge.tsx`

- [ ] **Create `src/components/ui/Badge.tsx`**:

```typescript
import { cn } from '@/lib/utils'
import { OPPORTUNITY_TYPE_COLORS, type OpportunityType } from '@/types'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'type'
  opportunityType?: OpportunityType
  className?: string
}

export function Badge({ children, variant = 'default', opportunityType, className }: BadgeProps) {
  const colorClass = opportunityType
    ? OPPORTUNITY_TYPE_COLORS[opportunityType]
    : 'bg-teal-100 text-teal-800'

  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-2 py-0.5',
        'text-[0.68rem] font-bold uppercase tracking-wide',
        colorClass,
        className,
      )}
    >
      {children}
    </span>
  )
}
```

- [ ] **Commit**

```bash
git add src/components/ui/Badge.tsx
git commit -m "feat: Badge component with opportunity type color mapping"
```

---

### Task 1.13: UI Primitives — Container, Card, Eyebrow, SectionHeader

**Files:**
- Create: `src/components/ui/Container.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Eyebrow.tsx`
- Create: `src/components/ui/SectionHeader.tsx`

- [ ] **Create `src/components/ui/Container.tsx`**:

```typescript
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full max-w-container container-px', className)}>
      {children}
    </Tag>
  )
}
```

- [ ] **Create `src/components/ui/Card.tsx`**:

```typescript
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  hover?: boolean
}

export function Card({ children, className, as: Tag = 'div', hover = false }: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-2xl bg-paper border border-ink/8 overflow-hidden',
        hover && 'transition-shadow duration-200 hover:shadow-md',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
```

- [ ] **Create `src/components/ui/Eyebrow.tsx`**:

```typescript
import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: React.ReactNode
  className?: string
  pulse?: boolean
}

export function Eyebrow({ children, className, pulse = false }: EyebrowProps) {
  return (
    <p
      className={cn(
        'font-mono text-eyebrow uppercase tracking-[0.18em] text-teal-700',
        'flex items-center gap-2',
        className,
      )}
    >
      {pulse && (
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 rounded-full bg-leaf animate-pulse-dot"
        />
      )}
      {children}
    </p>
  )
}
```

- [ ] **Create `src/components/ui/SectionHeader.tsx`**:

```typescript
import { cn } from '@/lib/utils'
import { Eyebrow } from './Eyebrow'

interface SectionHeaderProps {
  eyebrow?: string
  eyebrowPulse?: boolean
  heading: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
  headingClassName?: string
  descriptionClassName?: string
  inverted?: boolean
}

export function SectionHeader({
  eyebrow,
  eyebrowPulse,
  heading,
  description,
  align = 'left',
  className,
  headingClassName,
  descriptionClassName,
  inverted = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-14',
        align === 'center' && 'text-center',
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow
          pulse={eyebrowPulse}
          className={cn(
            'mb-4',
            inverted && 'text-teal-300',
            align === 'center' && 'justify-center',
          )}
        >
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          'text-display-lg font-display font-medium',
          inverted ? 'text-white' : 'text-ink',
          description ? 'mb-5' : '',
          headingClassName,
        )}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={cn(
            'text-base leading-relaxed max-w-2xl',
            inverted ? 'text-teal-300' : 'text-ink-soft',
            align === 'center' && 'mx-auto',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
```

- [ ] **Run type check**: `npx tsc --noEmit`

- [ ] **Commit**

```bash
git add src/components/ui/Container.tsx src/components/ui/Card.tsx src/components/ui/Eyebrow.tsx src/components/ui/SectionHeader.tsx
git commit -m "feat: Container, Card, Eyebrow, SectionHeader UI primitives"
```

---

### Task 1.14: UI Primitives — Form Elements

**Files:**
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/Select.tsx`
- Create: `src/components/ui/Textarea.tsx`
- Create: `src/components/ui/Checkbox.tsx`

- [ ] **Create `src/components/ui/Input.tsx`**:

```typescript
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-semibold text-ink">
            {label}
            {props.required && <span className="ms-1 text-terracotta" aria-hidden>*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-11 w-full rounded-lg border border-ink/20 bg-paper px-4 text-sm text-ink',
            'placeholder:text-ink-soft/60',
            'focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-terracotta focus:ring-terracotta',
            className,
          )}
          {...props}
        />
        {hint && !error && <p className="text-xs text-ink-soft">{hint}</p>}
        {error && (
          <p role="alert" className="text-xs text-terracotta font-medium">
            {error}
          </p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'
```

- [ ] **Create `src/components/ui/Textarea.tsx`**:

```typescript
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  maxCharacters?: number
  currentLength?: number
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, maxCharacters, currentLength, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-semibold text-ink">
            {label}
            {props.required && <span className="ms-1 text-terracotta" aria-hidden>*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'min-h-[120px] w-full rounded-lg border border-ink/20 bg-paper px-4 py-3 text-sm text-ink',
            'placeholder:text-ink-soft/60 resize-y',
            'focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent',
            'disabled:opacity-50',
            error && 'border-terracotta focus:ring-terracotta',
            className,
          )}
          {...props}
        />
        <div className="flex justify-between">
          <div>
            {hint && !error && <p className="text-xs text-ink-soft">{hint}</p>}
            {error && <p role="alert" className="text-xs text-terracotta font-medium">{error}</p>}
          </div>
          {maxCharacters && (
            <p className={cn('text-xs', currentLength && currentLength > maxCharacters ? 'text-terracotta' : 'text-ink-soft')}>
              {currentLength ?? 0}/{maxCharacters}
            </p>
          )}
        </div>
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'
```

- [ ] **Create `src/components/ui/Select.tsx`**:

```typescript
import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-semibold text-ink">
            {label}
            {props.required && <span className="ms-1 text-terracotta" aria-hidden>*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            className={cn(
              'h-11 w-full appearance-none rounded-lg border border-ink/20 bg-paper',
              'pe-10 ps-4 text-sm text-ink',
              'focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent',
              'disabled:opacity-50',
              error && 'border-terracotta',
              className,
            )}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft"
            aria-hidden
          />
        </div>
        {error && <p role="alert" className="text-xs text-terracotta font-medium">{error}</p>}
      </div>
    )
  },
)
Select.displayName = 'Select'
```

- [ ] **Create `src/components/ui/Checkbox.tsx`**:

```typescript
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? String(label).toLowerCase().replace(/\s+/g, '-').slice(0, 30)
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="flex items-start gap-3 cursor-pointer group">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            className={cn(
              'mt-0.5 h-4 w-4 flex-shrink-0 rounded border border-ink/30',
              'text-teal-700 focus:ring-2 focus:ring-teal-700 focus:ring-offset-2',
              'cursor-pointer',
              className,
            )}
            {...props}
          />
          <span className="text-sm text-ink-soft group-hover:text-ink transition-colors">
            {label}
          </span>
        </label>
        {error && <p role="alert" className="text-xs text-terracotta font-medium ms-7">{error}</p>}
      </div>
    )
  },
)
Checkbox.displayName = 'Checkbox'
```

- [ ] **Run type check**: `npx tsc --noEmit`

- [ ] **Commit**

```bash
git add src/components/ui/Input.tsx src/components/ui/Select.tsx src/components/ui/Textarea.tsx src/components/ui/Checkbox.tsx
git commit -m "feat: form UI primitives (Input, Select, Textarea, Checkbox) with error states"
```

---

### Task 1.15: UI Primitive — AnimatedCounter

**Files:**
- Create: `src/components/ui/AnimatedCounter.tsx`

- [ ] **Create `src/components/ui/AnimatedCounter.tsx`**:

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  valueClassName?: string
  labelClassName?: string
  label?: string
}

export function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2000,
  className,
  valueClassName,
  labelClassName,
  label,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setCount(target)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStarted, target])

  useEffect(() => {
    if (!hasStarted) return

    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [hasStarted, target, duration])

  return (
    <div ref={ref} className={cn('flex flex-col', className)}>
      <span className={cn('font-display font-bold tabular-nums', valueClassName)}>
        {prefix}{count.toLocaleString()}{suffix}
      </span>
      {label && (
        <span className={cn('text-sm mt-1', labelClassName)}>
          {label}
        </span>
      )}
    </div>
  )
}
```

- [ ] **Commit**

```bash
git add src/components/ui/AnimatedCounter.tsx
git commit -m "feat: AnimatedCounter with IntersectionObserver and eased animation"
```

---

### Task 1.16: Layout — LanguageSwitcher

**Files:**
- Create: `src/components/layout/LanguageSwitcher.tsx`

- [ ] **Create `src/components/layout/LanguageSwitcher.tsx`**:

```typescript
'use client'

import { useLocale } from 'next-intl'
// Use next-intl's router (not next/navigation) so locale switching is handled correctly
import { useRouter, usePathname } from 'next-intl/navigation'
import { Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  className?: string
  inverted?: boolean
}

export function LanguageSwitcher({ className, inverted = false }: LanguageSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const otherLocale = locale === 'en' ? 'ar' : 'en'
  const label = locale === 'en' ? 'العربية' : 'English'

  function switchLocale() {
    // next-intl router.push accepts a locale option — no manual path manipulation needed
    router.push(pathname, { locale: otherLocale })
  }

  return (
    <button
      onClick={switchLocale}
      aria-label={`Switch to ${otherLocale === 'ar' ? 'Arabic' : 'English'}`}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5',
        'text-sm font-medium transition-colors',
        inverted
          ? 'border-white/30 text-white hover:bg-white/10'
          : 'border-teal-700/30 text-teal-700 hover:bg-teal-100',
        className,
      )}
    >
      <Globe className="h-3.5 w-3.5" aria-hidden />
      {label}
    </button>
  )
}
```

- [ ] **Commit**

```bash
git add src/components/layout/LanguageSwitcher.tsx
git commit -m "feat: LanguageSwitcher component with locale routing"
```

---

### Task 1.17: Layout — Header & MobileMenu

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/MobileMenu.tsx`

- [ ] **Create `src/components/layout/MobileMenu.tsx`** first (Header depends on it):

```typescript
'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { X } from 'lucide-react'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Button } from '@/components/ui/Button'

const NAV_LINKS = [
  { href: '/opportunities', key: 'opportunities' },
  { href: '/community', key: 'community' },
  { href: '/programs', key: 'programs' },
  { href: '/partners', key: 'partners' },
  { href: '/impact', key: 'impact' },
  { href: '/resources', key: 'resources' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const locale = useLocale()
  const t = useTranslations('nav')

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-teal-900"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="flex items-center justify-between p-6">
        <Link href={`/${locale}`} onClick={onClose}>
          <Image
            src="/logo/logo-horizontal-white.svg"
            alt="Green Gate MENA"
            width={160}
            height={36}
            priority
          />
        </Link>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="rounded-lg p-2 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-6 pt-4">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.key}
            href={`/${locale}${link.href}`}
            onClick={onClose}
            className="py-3 text-xl font-semibold text-white/80 hover:text-white border-b border-white/10 transition-colors"
          >
            {t(link.key)}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-4 p-6">
        <LanguageSwitcher inverted className="self-start" />
        <Button
          variant="lime"
          size="lg"
          className="w-full"
          onClick={onClose}
          asChild
        >
          <Link href={`/${locale}/join`}>{t('joinUs')}</Link>
        </Button>
      </div>
    </div>
  )
}
```

- [ ] **Create `src/components/layout/Header.tsx`**:

```typescript
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileMenu } from './MobileMenu'
import { Button } from '@/components/ui/Button'

const NAV_LINKS = [
  { href: '/opportunities', key: 'opportunities' },
  { href: '/community', key: 'community' },
  { href: '/programs', key: 'programs' },
  { href: '/partners', key: 'partners' },
  { href: '/impact', key: 'impact' },
  { href: '/resources', key: 'resources' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const

export function Header() {
  const locale = useLocale()
  const t = useTranslations('nav')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-200',
          scrolled
            ? 'bg-paper/95 backdrop-blur-sm border-b border-ink/8 shadow-sm'
            : 'bg-paper border-b border-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-container items-center gap-6 container-px">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0">
            <Image
              src="/logo/logo-horizontal-color.svg"
              alt="Green Gate MENA"
              width={160}
              height={36}
              priority
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex flex-1 items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href}`}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium text-ink-soft',
                  'hover:bg-teal-100 hover:text-teal-800 transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700',
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 ms-auto">
            <LanguageSwitcher className="hidden sm:flex" />
            <Button
              variant="primary"
              size="sm"
              className="hidden lg:inline-flex"
              asChild
            >
              <Link href={`/${locale}/join`}>{t('joinUs')} →</Link>
            </Button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={cn(
                'lg:hidden rounded-lg p-2 text-ink-soft hover:bg-teal-100',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700',
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
```

- [ ] **Run type check**: `npx tsc --noEmit`

- [ ] **Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/MobileMenu.tsx
git commit -m "feat: Header with sticky scroll behavior + MobileMenu full-screen overlay"
```

---

### Task 1.18: Layout — NewsletterSignup & Footer

**Files:**
- Create: `src/components/layout/NewsletterSignup.tsx`
- Create: `src/components/layout/Footer.tsx`

- [ ] **Create `src/components/layout/NewsletterSignup.tsx`**:

```typescript
'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NewsletterSignupProps {
  className?: string
  inverted?: boolean
}

export function NewsletterSignup({ className, inverted = false }: NewsletterSignupProps) {
  const t = useTranslations('footer.newsletter')
  const [email, setValue] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={cn('flex items-center gap-2 text-sm', inverted ? 'text-teal-300' : 'text-teal-700', className)}>
        <Check className="h-4 w-4" />
        <span>You're subscribed! Look out for green opportunities.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex gap-2', className)}>
      <label htmlFor="newsletter-email" className="sr-only">
        {t('label')}
      </label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t('placeholder')}
        required
        className={cn(
          'h-10 flex-1 rounded-lg border px-4 text-sm',
          'focus:outline-none focus:ring-2 focus:ring-teal-700',
          inverted
            ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50'
            : 'bg-paper border-ink/20 text-ink placeholder:text-ink-soft/60',
        )}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        aria-label={t('button')}
        className={cn(
          'h-10 rounded-lg px-4 text-sm font-semibold transition-colors',
          'disabled:opacity-60',
          inverted
            ? 'bg-teal-700 text-white hover:bg-teal-600'
            : 'bg-teal-800 text-white hover:bg-teal-900',
        )}
      >
        {status === 'loading' ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <ArrowRight className="h-4 w-4" />
        )}
      </button>
      {status === 'error' && (
        <p role="alert" className="text-xs text-terracotta-soft mt-1">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
```

- [ ] **Create `src/components/layout/Footer.tsx`**:

```typescript
import Image from 'next/image'
import Link from 'next/link'
// Footer is a Server Component — use next-intl server APIs (no 'use client' needed)
import { getLocale, getTranslations } from 'next-intl/server'
import { NewsletterSignup } from './NewsletterSignup'
import { LanguageSwitcher } from './LanguageSwitcher'

export async function Footer() {
  const locale = await getLocale()
  const t = await getTranslations('footer')

  return (
    <footer className="bg-teal-900" aria-label="Site footer">
      <div className="mx-auto max-w-container container-px">
        {/* Main columns */}
        <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="inline-block mb-4">
              <Image
                src="/logo/logo-horizontal-white.svg"
                alt="Green Gate MENA"
                width={160}
                height={36}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-teal-300/80 mb-5">
              {t('tagline')}
            </p>
            <NewsletterSignup inverted />
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-mono text-eyebrow uppercase tracking-[0.18em] text-teal-400 mb-5">
              {t('columns.explore')}
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                ['opportunities', '/opportunities'],
                ['community', '/community'],
                ['programs', '/programs'],
                ['directory', '/directory'],
                ['resources', '/resources'],
              ].map(([key, href]) => (
                <li key={key}>
                  <Link
                    href={`/${locale}${href}`}
                    className="text-sm text-teal-300/70 hover:text-white transition-colors"
                  >
                    {t(`links.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Engage */}
          <div>
            <h3 className="font-mono text-eyebrow uppercase tracking-[0.18em] text-teal-400 mb-5">
              {t('columns.engage')}
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                ['joinUs', '/join'],
                ['submitOpportunity', '/opportunities/submit'],
                ['volunteer', '/join'],
                ['partners', '/partners'],
                ['media', '/news'],
              ].map(([key, href]) => (
                <li key={key}>
                  <Link
                    href={`/${locale}${href}`}
                    className="text-sm text-teal-300/70 hover:text-white transition-colors"
                  >
                    {t(`links.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-mono text-eyebrow uppercase tracking-[0.18em] text-teal-400 mb-5">
              {t('columns.about')}
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                ['ourStory', '/about'],
                ['mission', '/about/mission-vision'],
                ['impact', '/impact'],
                ['greenX', '/programs/greenx-2025'],
                ['contact', '/contact'],
              ].map(([key, href]) => (
                <li key={key}>
                  <Link
                    href={`/${locale}${href}`}
                    className="text-sm text-teal-300/70 hover:text-white transition-colors"
                  >
                    {t(`links.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-teal-400/60">{t('legal.copyright')}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {[
              ['privacy', '/privacy'],
              ['terms', '/terms'],
              ['guidelines', '/community-guidelines'],
            ].map(([key, href]) => (
              <Link
                key={key}
                href={`/${locale}${href}`}
                className="text-xs text-teal-400/60 hover:text-teal-300 transition-colors"
              >
                {t(`legal.${key}`)}
              </Link>
            ))}
          </div>
          <LanguageSwitcher inverted />
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Run type check**: `npx tsc --noEmit`

- [ ] **Commit**

```bash
git add src/components/layout/Footer.tsx src/components/layout/NewsletterSignup.tsx
git commit -m "feat: Footer (4-column, newsletter, language toggle) and NewsletterSignup component"
```

---

### Task 1.19: Wire Header + Footer into Locale Layout

**Files:**
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Update `src/app/[locale]/layout.tsx`** to include Header and Footer:

```typescript
// Add these imports at the top:
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

// Replace the body content:
<body>
  <a href="#main-content" className="skip-to-content">
    Skip to main content
  </a>
  <NextIntlClientProvider messages={messages}>
    <Header />
    <main id="main-content">
      {children}
    </main>
    <Footer />
  </NextIntlClientProvider>
</body>
```

- [ ] **Verify in browser**:

```bash
npm run dev
```

Open `http://localhost:3000/en`. You should see:
- Header with logo + nav links + Join Us button
- "Green Gate MENA — Phase 1 Scaffold" body text
- Footer with 4 columns and newsletter signup

Open `http://localhost:3000/ar`. You should see the same layout with Arabic nav labels and RTL direction.

- [ ] **Commit**

```bash
git add src/app/[locale]/layout.tsx
git commit -m "feat: wire Header and Footer into locale layout"
```

---

### Task 1.20: Create robots.txt and API Placeholder Routes

**Files:**
- Create: `public/robots.txt`
- Create: `src/app/api/newsletter/route.ts`
- Create: `src/app/api/contact/route.ts`

- [ ] **Create `public/robots.txt`**:

```
User-agent: *
Allow: /

Sitemap: https://greengate-mena.org/sitemap.xml
```

- [ ] **Create `src/app/api/newsletter/route.ts`** (placeholder, fully wired in Phase 7):

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// TODO: Connect to Mailchimp or Resend in production. See docs/CMS_INTEGRATION.md
const schema = z.object({
  email: z.string().email('Invalid email address'),
  country: z.string().optional(),
  interests: z.array(z.string()).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    console.log('[FORM SUBMISSION] Newsletter signup:', data)

    return NextResponse.json({ success: true, message: 'Subscribed successfully.' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 })
    }
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 })
  }
}
```

- [ ] **Create `src/app/api/contact/route.ts`** (placeholder):

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// TODO: Connect to Resend email service in production. See docs/CMS_INTEGRATION.md
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
  inquiryType: z.enum(['general', 'partnership', 'media', 'other']),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    console.log('[FORM SUBMISSION] Contact form:', data)

    return NextResponse.json({ success: true, message: 'Message received. We\'ll be in touch within 48 hours.' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 })
    }
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 })
  }
}
```

- [ ] **Commit**

```bash
git add public/robots.txt src/app/api/
git commit -m "feat: robots.txt and newsletter/contact API route placeholders with Zod validation"
```

---

### Task 1.21: Phase 1 Build Verification & Check-in

- [ ] **Run full TypeScript check**:

```bash
npx tsc --noEmit
```

Expected: **zero errors**.

- [ ] **Run production build**:

```bash
npm run build
```

Expected: builds successfully. May show warnings about missing pages (not yet created) — these are fine.

- [ ] **Run dev server and verify all routes**:

```bash
npm run dev
```

Verify:
- `http://localhost:3000/en` → redirects, shows Header + Footer + skeleton body
- `http://localhost:3000/ar` → shows Arabic nav labels, `dir="rtl"` on html
- Language switcher switches between EN/AR
- Mobile hamburger menu opens and closes
- Newsletter signup form POSTs to `/api/newsletter` and shows success

- [ ] **Check console** for any errors or warnings. Address any TypeScript errors before check-in.

- [ ] **Final Phase 1 commit**:

```bash
git add .
git commit -m "feat: Phase 1 complete — Next.js foundation, design system, UI primitives, layout"
```

---

## ✅ Phase 1 Check-in

**Deliver:** Show the running dev server at `http://localhost:3000/en` and `/ar`.

**Confirm before proceeding to Phase 2:**
- [ ] TypeScript compiles with zero errors
- [ ] EN + AR routes work
- [ ] Header and Footer render correctly
- [ ] Language switcher works
- [ ] Mobile menu works
- [ ] `npm run build` passes

---

## Phase 2: Data Layer

> Full task details written after Phase 1 check-in is approved.

**Goal:** TypeScript data files for all content types. After this phase, every subsequent phase has real data to render.

**Files to create:**
- `src/data/opportunities.ts` — 30+ opportunities with full Opportunity interface
- `src/data/directory.ts` — 20+ profiles with Profile interface
- `src/data/programs.ts`, `stories.ts`, `resources.ts`, `news.ts`, `partners.ts`, `team.ts`, `stats.ts`, `countries.ts`, `themes.ts`
- `src/types/opportunity.ts`, `profile.ts`, `resource.ts`, etc. (full per-type interfaces)
- `src/lib/validations.ts` — all Zod form schemas

**Key decisions:**
- Every data file starts with `// REPLACE WITH: CMS API CALL — see docs/CMS_INTEGRATION.md`
- 30 opportunities: all named in spec, each with `id`, `slug`, `title`, `organizer`, `type`, `themes`, `country`, `format`, `deadline`, `description`, etc. (full Opportunity type from spec)
- 20+ directory profiles spread across all 22 countries, 6 profile types
- Deadlines spread over next 6 months from today (2026-05-23)

---

## Phase 3: Homepage

> Full task details written after Phase 2 check-in is approved.

**Goal:** All 12 homepage sections assembled with animations.

**Sections:**
1. `Hero.tsx` — animated MENA map card + floating opportunity cards (Framer Motion)
2. `TrustBar.tsx` — 4 AnimatedCounter instances
3. `ProblemSection.tsx` — 3 numbered cards
4. `PillarsSection.tsx` — 3 pillar cards with SVG illustrations
5. `OpportunitiesPreview.tsx` — filter chips + 6-card grid (client-side filter)
6. `GreenXSpotlight.tsx` — water ripple animation + stats
7. `CommunitySection.tsx` — interactive MENA SVG map with 11+ animated pins
8. `PartnersSection.tsx` — institutional CTA + tag grid
9. `ResourcesPreview.tsx` — asymmetric 1+2 grid
10. `YouthStories.tsx` — 3 testimonials from MENA-named people
11. `FinalCTA.tsx` — dark emerald CTA section
12. `Footer` (already built in Phase 1)

---

## Phase 4: Core Functional Pages

> Full task details written after Phase 3 check-in is approved.

**Goal:** The Opportunities Hub and Network Directory — the two most functional pages.

**Pages:**
- `/opportunities` — filter sidebar/drawer (country, type, theme, format, deadline, age, language, compensation), sort dropdown, active filter chips, 3-column grid, pagination
- `/opportunities/[slug]` — full detail template with sticky sidebar Apply button
- `/opportunities/submit` — 4-step form with React Hook Form + Zod
- `/directory` — filter sidebar (country, expertise, profile type), profile card grid
- `/directory/join` — directory submission form

---

## Phase 5: Institutional Pages

> Full task details written after Phase 4 check-in is approved.

**Pages:** About · Mission & Vision (Theory of Change flow diagram) · Programs · GreenX 2025 case study (funder-facing) · Partners · Services · Impact (animated MENA map + milestone timeline)

---

## Phase 6: Content Pages

> Full task details written after Phase 5 check-in is approved.

**Pages:** Community · Resources (+ detail) · News (+ article) · Contact (+ FAQ) · Join Us hub · 404

---

## Phase 7: Forms & API Routes

> Full task details written after Phase 6 check-in is approved.

**Forms to fully wire:**
1. Youth Registration / Community Join
2. Newsletter Signup (already scaffolded)
3. Submit an Opportunity (4-step)
4. Partner Inquiry (with file upload placeholder)
5. Volunteer Application
6. Directory Profile Submission
7. Contact Form
8. Service Request

Each API route: Zod validation → console log `[FORM SUBMISSION]` → return JSON. Comments mark Resend/Mailchimp integration points.

---

## Phase 8: Legal & SEO

> Full task details written after Phase 7 check-in is approved.

**Deliverables:**
- Legal pages: `/privacy`, `/terms`, `/community-guidelines`, `/cookies`, `/accessibility`
- Per-page metadata (title, description, OG, Twitter Card) for all 21+ pages
- JSON-LD: Organization (home), Event (GreenX), Article (news), JobPosting (opportunities)
- Dynamic `src/app/sitemap.ts`
- Dynamic OG image via `src/app/opengraph-image.tsx`

---

## Phase 9: Accessibility & Performance Polish

> Full task details written after Phase 8 check-in is approved.

**Checklist:**
- Keyboard navigation audit (Tab order, focus traps in mobile menu/dialogs)
- WCAG AA contrast check on all text/background combinations
- All images have meaningful alt text
- All icon-only buttons have `aria-label`
- All form inputs have associated `<label>` elements
- `prefers-reduced-motion` wraps all Framer Motion animations
- `next/image` on every image with correct sizes prop
- Lazy-load below-fold sections
- Bundle analysis: `npm run build` and check First Load JS

---

## Phase 10: Documentation & Delivery

> Full task details written after Phase 9 check-in is approved.

**Deliverables:**
- `README.md` (project root) — setup, stack, scripts, deployment
- `docs/HANDOVER.md` — architecture decisions, how to add content, Phase 2 roadmap
- `docs/CONTENT_GUIDE.md` — full list of placeholders needing real content
- `docs/CMS_INTEGRATION.md` — schema design + migration instructions per content type
- `docs/DEPLOYMENT.md` — Vercel setup, env vars, DNS, email
- Final `npm run build` with zero errors
- Delivery summary: ✅ complete / ⚠️ placeholder / 🚀 Phase 2 recommendations
