# Content Guide — What to Replace Before Launch

This guide lists every piece of placeholder content and what real content should look like.

---

## Team Members (`src/data/team.ts`)

Replace all 6 placeholder entries with real team members.

**Required fields per member:**

| Field | Example |
| ----- | ------- |
| `id` | `'sara-hassan'` (unique slug) |
| `name` | `'Sara Hassan'` |
| `nameAr` | `'سارة حسن'` |
| `role` | `'Co-Founder & Executive Director'` |
| `roleAr` | `'المؤسسة المشاركة والمديرة التنفيذية'` |
| `country` | ISO code e.g. `'EG'`, `'JO'`, `'MA'` |
| `bio` | 2–3 sentence bio in English |
| `avatar` | Path to photo e.g. `'/images/team/sara-hassan.jpg'` |
| `linkedin` | Optional LinkedIn URL |

**Photo specs:**
- Square format, minimum 400×400px
- Place files in `public/images/team/`
- The avatar placeholder currently shows the first letter of the name

---

## Partner Logos (`src/data/partners.ts` + `public/images/partners/`)

The `logo` field in each partner entry points to a file that doesn't exist yet.

**Steps:**
1. Obtain SVG logos from each partner (preferred) or PNG at 2× resolution
2. Save to `public/images/partners/[partner-id].svg`
3. In `PartnersSection.tsx` and `src/app/[locale]/about/page.tsx`, replace the text placeholder `<span>` with:

```tsx
import Image from 'next/image'

<Image
  src={partner.logo}
  alt={partner.name}
  width={120}
  height={40}
  className="object-contain opacity-80 hover:opacity-100 transition-opacity"
/>
```

---

## Opportunities (`src/data/opportunities.ts`)

32 real opportunities are included through November 2026. Update as needed:

- Remove expired entries (deadline has passed and no longer relevant)
- Add new opportunities weekly
- Mark high-value opportunities with `featured: true`
- Confirm all `link` values are real URLs before launch (currently some are `'#'`)

---

## Events (`src/data/events.ts`)

11 events are listed. Before launch:

- Verify all event dates and locations are confirmed
- Replace `link: '#'` with real registration URLs
- Add GreenX 2026 once dates are announced

---

## Resources (`src/data/resources.ts`)

12 knowledge resources are listed. Currently all `link` values are `'#'`.

Replace each `link` with the actual URL (PDF, external article, podcast episode, etc.).

---

## Stories (`src/data/stories.ts`)

6 youth testimonials are included with real names and quotes (from Green Gate MENA community members). Before launch:

- Confirm you have written permission to publish each quote and name
- Add `avatar` photos if available (place in `public/images/stories/`)
- Add more stories as the community grows

---

## Contact Email

Update the contact email in `src/app/[locale]/contact/page.tsx`:

```tsx
// Line ~60: change this
href="mailto:hello@greengate-mena.org"
// to your real email
href="mailto:info@greengate-mena.org"
```

---

## Social Links

The Footer and Header do not yet include social media links. Add them to `src/components/layout/Footer.tsx` once handles are confirmed:

- Instagram: `@GreenGateMENA`
- LinkedIn: `company/green-gate-mena`
- X/Twitter: `@GreenGateMENA`
- YouTube (if applicable)
