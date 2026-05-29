import type { MetadataRoute } from 'next'
import { getOpportunities, getResources } from '@/lib/supabase/queries'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://greengate-mena.org'
const locales = ['en', 'ar'] as const

function url(path: string) {
  return `${siteUrl}${path}`
}

function localizedEntries(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: url(`/${locale}${path}`),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, url(`/${l}${path}`)])
      ),
    },
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [opportunities, resources] = await Promise.all([getOpportunities(), getResources()])
  const staticRoutes: MetadataRoute.Sitemap = [
    // Homepage
    ...localizedEntries('', 1.0, 'weekly'),
    // Core pages
    ...localizedEntries('/about', 0.8, 'monthly'),
    ...localizedEntries('/contact', 0.7, 'monthly'),
    ...localizedEntries('/impact', 0.8, 'monthly'),
    // Services
    ...localizedEntries('/services/youth', 0.8, 'monthly'),
    ...localizedEntries('/services/ngos', 0.8, 'monthly'),
    ...localizedEntries('/services/consultants', 0.8, 'monthly'),
    ...localizedEntries('/services/businesses', 0.8, 'monthly'),
    // Ecosystem hub
    ...localizedEntries('/ecosystem/opportunities', 0.9, 'daily'),
    ...localizedEntries('/ecosystem/opportunities/submit', 0.6, 'monthly'),
    ...localizedEntries('/ecosystem/directory', 0.9, 'weekly'),
    ...localizedEntries('/ecosystem/directory/join', 0.6, 'monthly'),
    ...localizedEntries('/ecosystem/events', 0.8, 'weekly'),
    // Knowledge
    ...localizedEntries('/knowledge', 0.8, 'weekly'),
    // Get Involved
    ...localizedEntries('/get-involved/youth', 0.7, 'monthly'),
    ...localizedEntries('/get-involved/ngos', 0.7, 'monthly'),
    ...localizedEntries('/get-involved/consultants', 0.7, 'monthly'),
    ...localizedEntries('/get-involved/partners', 0.7, 'monthly'),
    // Legal
    ...localizedEntries('/privacy', 0.3, 'yearly'),
    ...localizedEntries('/terms', 0.3, 'yearly'),
    ...localizedEntries('/accessibility', 0.3, 'yearly'),
  ]

  const opportunityEntries: MetadataRoute.Sitemap = opportunities.flatMap((opp) =>
    locales.map((locale) => ({
      url: url(`/${locale}/ecosystem/opportunities/${opp.slug}`),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, url(`/${l}/ecosystem/opportunities/${opp.slug}`)])
        ),
      },
    }))
  )

  const resourceEntries: MetadataRoute.Sitemap = resources.flatMap((r) =>
    locales.map((locale) => ({
      url: url(`/${locale}/knowledge/${r.slug}`),
      lastModified: new Date(r.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, url(`/${l}/knowledge/${r.slug}`)])
        ),
      },
    }))
  )

  return [...staticRoutes, ...opportunityEntries, ...resourceEntries]
}
