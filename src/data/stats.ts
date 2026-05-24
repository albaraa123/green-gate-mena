// REPLACE WITH: CMS API CALL — see docs/CMS_INTEGRATION.md
import type { ImpactStat } from '@/types'

export const heroStats = [
  { value: '500', suffix: '+', label: 'Youth Members' },
  { value: '40', suffix: 'K+', label: 'Social Followers' },
  { value: '22', suffix: '', label: 'MENA Countries' },
  { value: '180', suffix: '+', label: 'GreenX Participants' },
]

export const trustBarStats = [
  { value: 500, suffix: '+', label: 'Community Members' },
  { value: 40000, suffix: '+', label: 'Social Media Followers' },
  { value: 22, suffix: '', label: 'MENA Countries' },
  { value: 180, suffix: '+', label: 'GreenX 2025 Participants' },
]

export const impactStats: ImpactStat[] = [
  {
    value: '500+',
    label: 'Youth Members',
    description: 'Active members across 22 MENA countries',
  },
  {
    value: '40K+',
    label: 'Social Media Followers',
    description: 'Engaged community across Instagram, LinkedIn, and X',
  },
  {
    value: '22',
    label: 'Countries Reached',
    description: 'Covering the full MENA region from Morocco to Oman',
  },
  {
    value: '180+',
    label: 'GreenX 2025 Participants',
    description: 'Youth who joined our flagship environmental summit',
  },
  {
    value: '60+',
    label: 'Opportunities Listed',
    description: 'Fellowships, grants, events and internships aggregated',
  },
  {
    value: '30+',
    label: 'Partner Organizations',
    description: 'NGOs, institutions, and funders supporting our ecosystem',
  },
]

export const impactTimeline = [
  {
    year: '2022',
    title: 'Green Gate MENA Founded',
    description: 'Launched as a youth-led initiative to connect MENA youth with climate opportunities.',
  },
  {
    year: '2023',
    title: 'First 500 Community Members',
    description: 'Grew to 500+ active youth members across 15 MENA countries within the first year.',
  },
  {
    year: '2024',
    title: 'Regional Partnerships',
    description: 'Established formal partnerships with 30+ NGOs, UN agencies, and regional institutions.',
  },
  {
    year: '2025',
    title: 'GreenX 2025 Summit',
    description: '180+ participants from 22 countries gathered for the region\'s premier youth climate summit.',
  },
  {
    year: '2026',
    title: 'Platform Launch',
    description: 'Launching the comprehensive digital ecosystem connecting every green actor in MENA.',
  },
]
