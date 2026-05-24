// REPLACE WITH: CMS API CALL — see docs/CMS_INTEGRATION.md
import type { Resource } from '@/types'

export const resources: Resource[] = [
  {
    slug: 'mena-climate-finance-guide-2026',
    title: 'A Youth Guide to Climate Finance in the Arab World',
    type: 'guide',
    theme: 'finance',
    publishedAt: '2026-04-15',
    author: 'Green Gate MENA Research Team',
    description:
      'A comprehensive guide for Arab youth organizations seeking climate funding. Covers the Green Climate Fund, Adaptation Fund, bilateral donors, and Arab development banks. Includes a step-by-step proposal writing framework in English and Arabic.',
    link: '#',
    featured: true,
    tags: ['climate-finance', 'funding', 'arabic', 'guide'],
  },
  {
    slug: 'ndcs-mena-youth-explainer-2026',
    title: 'NDCs Explained: What MENA Countries Promised at Paris',
    type: 'article',
    theme: 'policy',
    publishedAt: '2026-03-20',
    author: 'Nour Khalil',
    description:
      'An accessible breakdown of Nationally Determined Contributions (NDCs) from MENA countries. Covers emission reduction targets, adaptation pledges, implementation gaps, and what youth can do to hold governments accountable.',
    link: '#',
    featured: true,
    tags: ['ndcs', 'paris-agreement', 'policy', 'explainer'],
  },
  {
    slug: 'solar-energy-north-africa-report',
    title: 'Solar Energy in North Africa: Opportunities for Youth Employment',
    type: 'report',
    theme: 'energy',
    publishedAt: '2026-02-10',
    author: 'RCREEE & Green Gate MENA',
    description:
      'A joint report examining the job creation potential of North Africa\'s booming solar sector. Analysis covers Morocco, Tunisia, Egypt, and Algeria with case studies of youth-led solar SMEs and emerging skills gaps.',
    link: '#',
    featured: true,
    tags: ['solar', 'jobs', 'north-africa', 'report'],
  },
  {
    slug: 'water-scarcity-arab-world-explainer',
    title: 'Water Scarcity in the Arab World: A Youth Primer',
    type: 'article',
    theme: 'water',
    publishedAt: '2025-12-05',
    author: 'Green Gate MENA',
    description:
      'Why is the Arab world home to 5% of the global population but less than 1% of its freshwater? This primer explains the water crisis, its links to climate change, and the youth-led solutions emerging across the region.',
    link: '#',
    tags: ['water', 'explainer', 'primer'],
  },
  {
    slug: 'greenx-2025-summit-report',
    title: 'GreenX 2025 Summit Report — Key Outcomes & Youth Recommendations',
    type: 'report',
    theme: 'climate',
    publishedAt: '2025-12-01',
    author: 'Green Gate MENA',
    description:
      'Official report from the GreenX 2025 MENA Youth Climate Summit. Documents outcomes from 180+ participant sessions, the 10-point MENA Youth Climate Declaration, and recommendations submitted to regional governments.',
    link: '#',
    featured: true,
    tags: ['greenx', 'summit', 'greengate', 'recommendations'],
  },
  {
    slug: 'how-to-start-environmental-club',
    title: 'How to Start an Environmental Club at Your Arab University',
    type: 'guide',
    theme: 'youth',
    publishedAt: '2026-01-18',
    author: 'Green Gate MENA Community Team',
    description:
      'A practical, step-by-step guide for students who want to launch a green club or environmental society at their university. Includes templates for bylaws, event planning, social media, and funding applications.',
    link: '#',
    tags: ['students', 'university', 'how-to', 'community'],
  },
  {
    slug: 'circular-economy-mena-toolkit',
    title: 'Circular Economy Toolkit for Arab Entrepreneurs',
    type: 'toolkit',
    theme: 'waste',
    publishedAt: '2026-03-01',
    author: 'Ellen MacArthur Foundation Arab Region',
    description:
      'Practical tools, frameworks, and case studies for Arab entrepreneurs building circular economy businesses. Covers sectors including food systems, textiles, construction materials, and packaging.',
    link: '#',
    tags: ['circular-economy', 'entrepreneurship', 'toolkit'],
  },
  {
    slug: 'cop31-what-youth-should-know',
    title: 'COP31: What Every MENA Youth Climate Advocate Should Know',
    type: 'article',
    theme: 'policy',
    publishedAt: '2026-05-01',
    author: 'Green Gate MENA Policy Team',
    description:
      'Everything MENA youth need to know about COP31: where it\'s happening, what\'s on the agenda, how to attend or follow along, and how to engage your government before the negotiations begin.',
    link: '#',
    featured: true,
    tags: ['cop31', 'advocacy', 'explainer'],
  },
  {
    slug: 'green-jobs-mena-2025-report',
    title: 'Green Jobs in MENA 2025: Mapping the Opportunity',
    type: 'report',
    theme: 'sustainability',
    publishedAt: '2025-11-20',
    author: 'ILO Arab States & Green Gate MENA',
    description:
      'A landmark report mapping green job opportunities across 22 MENA countries. Covers renewable energy, sustainable agriculture, eco-tourism, green construction, and environmental services. Skills demand analysis for 2025–2030.',
    link: '#',
    tags: ['green-jobs', 'employment', 'ilo'],
  },
  {
    slug: 'desertification-sahel-mena-explainer',
    title: 'Desertification: The Silent Crisis Threatening MENA\'s South',
    type: 'article',
    theme: 'agriculture',
    publishedAt: '2026-02-28',
    author: 'Green Gate MENA',
    description:
      'Land degradation and desertification affect 65% of Arab lands. This article explains the causes, consequences, and community-based solutions emerging from Morocco to Sudan — and how youth can join the frontlines.',
    link: '#',
    tags: ['desertification', 'land', 'sahel'],
  },
  {
    slug: 'how-to-apply-climate-fellowship',
    title: 'How to Write a Winning Climate Fellowship Application',
    type: 'guide',
    theme: 'youth',
    publishedAt: '2026-04-01',
    author: 'Green Gate MENA Community Team',
    description:
      'A comprehensive guide for Arab youth applying to competitive climate fellowships. Covers personal statement writing, securing reference letters, translating local experience for international audiences, and common mistakes to avoid.',
    link: '#',
    tags: ['fellowships', 'applications', 'tips', 'youth'],
  },
  {
    slug: 'mediterranean-sea-health-podcast',
    title: 'The Mediterranean Is Warming: A Podcast for Arab Youth',
    type: 'podcast',
    theme: 'oceans',
    publishedAt: '2026-01-05',
    author: 'Green Gate MENA',
    description:
      'A 4-episode Arabic-language podcast series on the Mediterranean\'s climate crisis. Guests include marine scientists, fishers, and youth conservationists from Morocco, Tunisia, Egypt, and Lebanon.',
    link: '#',
    tags: ['podcast', 'arabic', 'mediterranean', 'oceans'],
  },
]

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug)
}

export function getFeaturedResources(count = 4): Resource[] {
  return resources.filter((r) => r.featured).slice(0, count)
}

export function getResourcesByType(type: string): Resource[] {
  return resources.filter((r) => r.type === type)
}
