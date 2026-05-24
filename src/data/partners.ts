// REPLACE WITH: CMS API CALL — see docs/CMS_INTEGRATION.md
import type { Partner } from '@/types'

export const partners: Partner[] = [
  // ─── Strategic ───────────────────────────────────────────────────────────────
  {
    id: 'unep',
    name: 'UNEP',
    logo: '/images/partners/unep.svg',
    website: 'https://www.unep.org',
    tier: 'strategic',
  },
  {
    id: 'undp',
    name: 'UNDP Arab States',
    logo: '/images/partners/undp.svg',
    website: 'https://www.undp.org',
    tier: 'strategic',
  },
  {
    id: 'irena',
    name: 'IRENA',
    logo: '/images/partners/irena.svg',
    website: 'https://www.irena.org',
    tier: 'strategic',
    country: 'AE',
  },
  {
    id: 'iucn',
    name: 'IUCN',
    logo: '/images/partners/iucn.svg',
    website: 'https://www.iucn.org',
    tier: 'strategic',
  },
  {
    id: 'gcf',
    name: 'Green Climate Fund',
    logo: '/images/partners/gcf.svg',
    website: 'https://www.greenclimate.fund',
    tier: 'strategic',
  },
  // ─── Program ─────────────────────────────────────────────────────────────────
  {
    id: 'giz',
    name: 'GIZ',
    logo: '/images/partners/giz.svg',
    website: 'https://www.giz.de',
    tier: 'program',
  },
  {
    id: 'wwf',
    name: 'WWF Mediterranean',
    logo: '/images/partners/wwf.svg',
    website: 'https://www.wwfmedi.org',
    tier: 'program',
  },
  {
    id: 'rcreee',
    name: 'RCREEE',
    logo: '/images/partners/rcreee.svg',
    website: 'https://www.rcreee.org',
    tier: 'program',
    country: 'EG',
  },
  {
    id: 'masdar',
    name: 'Masdar',
    logo: '/images/partners/masdar.svg',
    website: 'https://www.masdar.ae',
    tier: 'program',
    country: 'AE',
  },
  {
    id: 'arab-water-council',
    name: 'Arab Water Council',
    logo: '/images/partners/awc.svg',
    website: 'https://www.arabwatercouncil.org',
    tier: 'program',
    country: 'EG',
  },
  // ─── Media ───────────────────────────────────────────────────────────────────
  {
    id: 'arab-news',
    name: 'Arab News',
    logo: '/images/partners/arabnews.svg',
    website: 'https://www.arabnews.com',
    tier: 'media',
  },
  {
    id: 'al-monitor',
    name: 'Al-Monitor',
    logo: '/images/partners/almonitor.svg',
    website: 'https://www.al-monitor.com',
    tier: 'media',
  },
  // ─── Community ───────────────────────────────────────────────────────────────
  {
    id: 'aycm',
    name: 'Arab Youth Climate Movement',
    logo: '/images/partners/aycm.svg',
    tier: 'community',
    country: 'EG',
  },
  {
    id: 'youngo',
    name: 'YOUNGO',
    logo: '/images/partners/youngo.svg',
    website: 'https://www.youngo.uno',
    tier: 'community',
  },
  {
    id: 'eco-mena',
    name: 'EcoMENA',
    logo: '/images/partners/ecomena.svg',
    website: 'https://www.ecomena.org',
    tier: 'community',
    country: 'QA',
  },
]

export function getStrategicPartners(): Partner[] {
  return partners.filter((p) => p.tier === 'strategic')
}

export function getPartnersByTier(tier: Partner['tier']): Partner[] {
  return partners.filter((p) => p.tier === tier)
}
