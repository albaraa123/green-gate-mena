// REPLACE WITH: CMS API CALL — see docs/CMS_INTEGRATION.md
import type { Story } from '@/types'

export const stories: Story[] = [
  {
    id: 'story-1',
    name: 'Lina Mansouri',
    role: 'Climate Activist & YALI Fellow',
    country: 'TN',
    quote:
      'Green Gate MENA helped me find the YALI fellowship at exactly the right moment. Six months later, I was leading a solar energy campaign in rural Tunisia. This platform is what the region needed.',
    opportunityTitle: 'YALI RLC – Climate & Environment Track',
  },
  {
    id: 'story-2',
    name: 'Omar Al-Rashid',
    role: 'Marine Biologist & WWF Intern',
    country: 'JO',
    quote:
      'I had never heard of the WWF Mediterranean internship until I saw it on Green Gate MENA. Three months in Beirut studying coral reefs changed my career path entirely. Now I\'m pursuing a PhD.',
    opportunityTitle: 'WWF North Africa Research Internship',
  },
  {
    id: 'story-3',
    name: 'Fatima Zahra Benhassoun',
    role: 'Renewable Energy Entrepreneur',
    country: 'MA',
    quote:
      'The MENA Green Tech Fellowship gave me the seed funding and mentorship I needed to launch my solar installation startup. We\'ve now electrified 12 villages in rural Morocco.',
    opportunityTitle: 'MENA Green Tech Innovators Fellowship',
  },
  {
    id: 'story-4',
    name: 'Ahmad Khaled',
    role: 'Environmental Policy Analyst',
    country: 'EG',
    quote:
      'Green Gate MENA\'s resource library helped me understand climate finance before I applied for the Green Climate Fund readiness grant. We secured $180,000 for our watershed restoration project.',
    opportunityTitle: 'A Youth Guide to Climate Finance in the Arab World',
  },
  {
    id: 'story-5',
    name: 'Reem Al-Dossari',
    role: 'Sustainability Consultant',
    country: 'SA',
    quote:
      'Finding consulting opportunities as a Saudi woman in the environmental sector was hard. Green Gate MENA\'s directory connected me with three NGOs I\'m now partnering with on ESG projects.',
    opportunityTitle: 'Gulf Green Network',
  },
  {
    id: 'story-6',
    name: 'Amine Bouzid',
    role: 'Youth Climate Negotiator',
    country: 'DZ',
    quote:
      'I attended my first COP as part of a delegation organized through Green Gate MENA. Meeting youth from 22 Arab countries and having one unified voice at international negotiations — that\'s powerful.',
    opportunityTitle: 'Arab Youth Climate Fellowship',
  },
]

export const heroTestimonials = stories.slice(0, 3)
