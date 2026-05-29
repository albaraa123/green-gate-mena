# CMS Integration Guide

Every data file in `src/data/` is a self-contained TypeScript module with this comment at the top:

```ts
// REPLACE WITH: CMS API CALL — see docs/CMS_INTEGRATION.md
```

This guide explains how to replace each file with live CMS data.

---

## Recommended CMS Options

| CMS | Why it fits |
| --- | ----------- |
| **Sanity** | Excellent for structured content, Arabic support, real-time preview |
| **Contentful** | Battle-tested, good Arabic locale support |
| **Airtable** | Simple for non-technical team members; great for opportunities |
| **Notion + Notion API** | If the team already uses Notion for content management |

---

## Migration Pattern

Each data function should become an async server fetch. Example for opportunities:

### Before (static)
```ts
// src/data/opportunities.ts
export const opportunities: Opportunity[] = [ /* ... */ ]

export function getFeaturedOpportunities(count = 6): Opportunity[] {
  return opportunities.filter(o => o.featured).slice(0, count)
}
```

### After (CMS — Sanity example)
```ts
// src/data/opportunities.ts
import { sanityClient } from '@/lib/sanity'

export async function getOpportunities(): Promise<Opportunity[]> {
  return sanityClient.fetch(`*[_type == "opportunity"] | order(deadline asc)`)
}

export async function getFeaturedOpportunities(count = 6): Promise<Opportunity[]> {
  return sanityClient.fetch(
    `*[_type == "opportunity" && featured == true][0...$count]`,
    { count }
  )
}
```

Then in page components, call `await getFeaturedOpportunities(3)` instead of the sync version.

---

## Files to Migrate

| File | Data type | Priority |
| ---- | --------- | -------- |
| `src/data/opportunities.ts` | 32 opportunities | High — changes weekly |
| `src/data/events.ts` | 11 events | High — time-sensitive |
| `src/data/resources.ts` | 12 resources | Medium — published regularly |
| `src/data/directory.ts` | 21 profiles | Medium — grows over time |
| `src/data/stories.ts` | 6 testimonials | Low — stable |
| `src/data/partners.ts` | 15 partners | Low — stable |
| `src/data/team.ts` | 6 members | Low — stable |
| `src/data/stats.ts` | Impact stats | Low — quarterly update |

---

## Caching Strategy

Once CMS is connected, use Next.js `fetch` caching:

```ts
// Revalidate opportunities every hour
const data = await fetch(cmsUrl, { next: { revalidate: 3600 } })

// Revalidate on-demand (recommended for CMS webhook triggers)
const data = await fetch(cmsUrl, { next: { tags: ['opportunities'] } })
```

Set up a CMS webhook → `/api/revalidate` to trigger on-demand revalidation when content is published.

---

## Arabic Content

All content types should have Arabic fields alongside English:

```ts
interface Opportunity {
  title: string        // English
  titleAr?: string     // Arabic — optional until fully translated
  description: string
  descriptionAr?: string
}
```

The page components can then select based on the current locale:
```ts
const title = locale === 'ar' && opp.titleAr ? opp.titleAr : opp.title
```
