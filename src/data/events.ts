// REPLACE WITH: CMS API CALL — see docs/CMS_INTEGRATION.md
import type { Event } from '@/types'

export const events: Event[] = [
  {
    slug: 'greenx-2025-summit',
    title: 'GreenX 2025 — MENA Youth Climate Summit',
    organizer: 'Green Gate MENA',
    date: '2025-11-15',
    endDate: '2025-11-17',
    location: 'Sharm El Sheikh, Egypt',
    country: 'EG',
    format: 'in-person',
    description:
      'The flagship youth climate summit for the MENA region. 180+ participants from 22 countries gathered for workshops, panels, and a hackathon focused on climate solutions adapted to the Arab world.',
    link: '#',
    theme: ['climate', 'youth', 'policy'],
    featured: true,
  },
  {
    slug: 'arab-sustainability-forum-2026',
    title: 'Arab Sustainability Forum 2026',
    organizer: 'League of Arab States',
    date: '2026-09-22',
    endDate: '2026-09-24',
    location: 'Cairo, Egypt',
    country: 'EG',
    format: 'hybrid',
    description:
      'Annual forum convening government ministers, civil society leaders, and private sector executives to advance the UN SDGs across Arab nations. Focus themes: climate finance, green energy, and nature-positive economies.',
    link: '#',
    theme: ['sustainability', 'policy', 'finance'],
    featured: true,
  },
  {
    slug: 'mena-solar-energy-conference-2026',
    title: 'MENA Solar Energy Conference & Exhibition',
    organizer: 'IRENA & Solar Power Europe',
    date: '2026-10-12',
    endDate: '2026-10-14',
    location: 'Abu Dhabi, UAE',
    country: 'AE',
    format: 'in-person',
    description:
      'The region\'s premier solar energy event connecting investors, policymakers, and technology providers. Features a youth innovation pavilion with special passes available for students and young professionals.',
    link: '#',
    theme: ['energy', 'sustainability'],
  },
  {
    slug: 'world-environment-day-mena-2026',
    title: 'World Environment Day MENA Youth Gathering',
    organizer: 'UNEP & Green Gate MENA',
    date: '2026-06-05',
    location: 'Virtual + Regional Hubs',
    country: 'EG',
    format: 'hybrid',
    description:
      'A day of coordinated events across MENA marking World Environment Day. Youth gatherings in Cairo, Amman, Rabat, Riyadh, and Beirut — with a live virtual program connecting all hubs.',
    link: '#',
    theme: ['climate', 'youth', 'biodiversity'],
    featured: true,
  },
  {
    slug: 'jordan-water-week-2026',
    title: 'Jordan Water Week 2026',
    organizer: 'Jordan Ministry of Water and Irrigation',
    date: '2026-09-08',
    endDate: '2026-09-12',
    location: 'Amman, Jordan',
    country: 'JO',
    format: 'in-person',
    description:
      'A week of conferences, field visits, and workshops on water security in one of the world\'s most water-stressed countries. Youth sessions focus on water conservation innovation and community-led solutions.',
    link: '#',
    theme: ['water', 'policy', 'sustainability'],
  },
  {
    slug: 'north-africa-climate-dialogue-2026',
    title: 'North Africa Climate Dialogue',
    organizer: 'UNDP & GIZ',
    date: '2026-07-07',
    endDate: '2026-07-09',
    location: 'Tunis, Tunisia',
    country: 'TN',
    format: 'hybrid',
    description:
      'A high-level dialogue bringing North African governments, civil society, and youth together to coordinate regional climate commitments, NDC implementation, and adaptation finance.',
    link: '#',
    theme: ['climate', 'policy', 'finance'],
  },
  {
    slug: 'mena-biodiversity-summit-2026',
    title: 'MENA Biodiversity & Nature Summit',
    organizer: 'IUCN & Convention on Biological Diversity',
    date: '2026-10-27',
    endDate: '2026-10-29',
    location: 'Muscat, Oman',
    country: 'OM',
    format: 'in-person',
    description:
      'A regional summit ahead of COP16 on biodiversity, focusing on MENA\'s unique ecosystems — from the Arabian Peninsula\'s deserts to North Africa\'s Mediterranean coast and the Red Sea reef systems.',
    link: '#',
    theme: ['biodiversity', 'oceans', 'sustainability'],
  },
  {
    slug: 'circular-economy-mena-2026',
    title: 'Circular Economy MENA Summit',
    organizer: 'World Economic Forum & Ellen MacArthur Foundation',
    date: '2026-11-03',
    endDate: '2026-11-04',
    location: 'Dubai, UAE',
    country: 'AE',
    format: 'in-person',
    description:
      'Bringing together CEOs, policymakers, and innovators to accelerate the circular economy transition in MENA. Showcase opportunities for startups building circular solutions for plastics, food, and construction.',
    link: '#',
    theme: ['waste', 'sustainability', 'urban'],
  },
  {
    slug: 'arab-youth-climate-hackathon-2026',
    title: 'Arab Youth Climate Hackathon 2026',
    organizer: 'Arab Youth Climate Movement & Google.org',
    date: '2026-08-15',
    endDate: '2026-08-17',
    location: 'Virtual',
    country: 'EG',
    format: 'online',
    description:
      'A 48-hour virtual hackathon for Arab youth teams to build tech solutions to regional climate challenges. Challenge tracks: urban heat, agricultural drought, marine pollution, and energy access. $50,000 in prizes.',
    link: '#',
    theme: ['climate', 'youth', 'energy'],
    featured: true,
  },
  {
    slug: 'cop31-youth-delegation-prep-2026',
    title: 'MENA Youth COP31 Delegation Preparation Workshop',
    organizer: 'Green Gate MENA & YOUNGO',
    date: '2026-10-05',
    endDate: '2026-10-06',
    location: 'Virtual',
    country: 'EG',
    format: 'online',
    description:
      'Two-day preparatory workshop for MENA youth delegates attending COP31. Sessions cover negotiation skills, understanding country positions, side event planning, and effective climate advocacy.',
    link: '#',
    theme: ['climate', 'policy', 'youth'],
  },
  {
    slug: 'green-economy-forum-riyadh-2026',
    title: 'Green Economy Forum — Riyadh 2026',
    organizer: 'Saudi Green Initiative',
    date: '2026-11-18',
    endDate: '2026-11-19',
    location: 'Riyadh, Saudi Arabia',
    country: 'SA',
    format: 'in-person',
    description:
      'Part of Saudi Arabia\'s Green Initiative, this annual forum convenes regional leaders to discuss net-zero pathways, green hydrogen, and nature restoration across the Arabian Peninsula.',
    link: '#',
    theme: ['energy', 'sustainability', 'policy'],
  },
]

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug)
}

export function getFeaturedEvents(count = 4): Event[] {
  const featured = events.filter((e) => e.featured)
  return featured.slice(0, count)
}

export function getUpcomingEvents(): Event[] {
  const now = new Date()
  return events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}
