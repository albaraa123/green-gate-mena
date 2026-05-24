// REPLACE WITH: CMS API CALL — see docs/CMS_INTEGRATION.md
import type { DirectoryProfile } from '@/types'

export const directoryProfiles: DirectoryProfile[] = [
  // ─── NGOs ───────────────────────────────────────────────────────────────────
  {
    slug: 'eco-mena',
    name: 'EcoMENA',
    type: 'ngo',
    country: 'QA',
    city: 'Doha',
    description:
      'EcoMENA is a knowledge-based initiative promoting environmental sustainability in the MENA region through education, research, and advocacy on waste management, renewable energy, and green building.',
    themes: ['waste', 'energy', 'sustainability'],
    website: 'https://www.ecomena.org',
    verified: true,
    tags: ['education', 'research', 'qatar'],
    founded: 2012,
    members: 25,
  },
  {
    slug: 'green-arab-world',
    name: 'Arab Youth Climate Movement',
    type: 'ngo',
    country: 'EG',
    city: 'Cairo',
    description:
      'The regional youth network connecting Arab youth to climate action. We train, mentor, and mobilize young environmental advocates across 20+ Arab countries through workshops, campaigns, and UN engagement.',
    themes: ['climate', 'youth', 'policy'],
    website: '#',
    verified: true,
    tags: ['advocacy', 'youth', 'pan-arab'],
    founded: 2015,
    members: 300,
  },
  {
    slug: 'jordan-royal-society-conservation',
    name: 'Royal Society for the Conservation of Nature – Jordan',
    type: 'institution',
    country: 'JO',
    city: 'Amman',
    description:
      'Jordan\'s leading nature conservation organization managing national reserves, conducting biodiversity research, and engaging communities in sustainable natural resource management across the country.',
    themes: ['biodiversity', 'water', 'sustainability'],
    website: 'https://www.rscn.org.jo',
    verified: true,
    tags: ['conservation', 'reserves', 'jordan'],
    founded: 1966,
  },
  {
    slug: 'morocco-climate-association',
    name: 'Association Marocaine pour le Climat',
    type: 'ngo',
    country: 'MA',
    city: 'Casablanca',
    description:
      'Moroccan civil society organization focused on climate change adaptation in rural communities, renewable energy advocacy, and youth environmental education across Morocco\'s diverse regions.',
    themes: ['climate', 'energy', 'youth'],
    website: '#',
    verified: true,
    tags: ['morocco', 'rural', 'adaptation'],
    founded: 2018,
    members: 60,
  },
  {
    slug: 'tunisia-green-society',
    name: 'Association Tunisienne pour la Protection de la Nature',
    type: 'ngo',
    country: 'TN',
    city: 'Tunis',
    description:
      'One of Tunisia\'s oldest environmental organizations working on biodiversity conservation, sustainable tourism in national parks, and anti-desertification efforts in the country\'s southern regions.',
    themes: ['biodiversity', 'sustainability', 'agriculture'],
    website: '#',
    verified: true,
    tags: ['tunisia', 'conservation', 'desertification'],
    founded: 1987,
    members: 120,
  },
  {
    slug: 'egypt-environment-youth',
    name: 'Egypt Youth for Environment',
    type: 'youth-group',
    country: 'EG',
    city: 'Cairo',
    description:
      'A network of Egyptian university students and young professionals advocating for stronger environmental policies, clean transport, and plastic-free cities. Active in Cairo, Alexandria, and Luxor.',
    themes: ['waste', 'urban', 'policy'],
    website: '#',
    verified: true,
    tags: ['egypt', 'students', 'urban'],
    founded: 2019,
    members: 150,
  },
  {
    slug: 'gulf-green-network',
    name: 'Gulf Green Network',
    type: 'ngo',
    country: 'AE',
    city: 'Dubai',
    description:
      'A regional platform connecting environmental organizations, sustainability professionals, and businesses across the GCC. Facilitates knowledge sharing, joint projects, and regional climate advocacy.',
    themes: ['sustainability', 'climate', 'finance'],
    website: '#',
    verified: true,
    tags: ['gcc', 'network', 'business'],
    founded: 2020,
    members: 200,
  },
  {
    slug: 'lebanese-environment-forum',
    name: 'Lebanese Environment Forum',
    type: 'ngo',
    country: 'LB',
    city: 'Beirut',
    description:
      'Lebanon\'s largest environmental coalition, bringing together over 90 NGOs to address environmental degradation, solid waste, water pollution, and coastal erosion affecting Lebanese communities.',
    themes: ['waste', 'water', 'oceans'],
    website: '#',
    verified: true,
    tags: ['lebanon', 'coalition', 'coastal'],
    founded: 2001,
    members: 90,
  },

  // ─── Youth Groups ────────────────────────────────────────────────────────────
  {
    slug: 'saudi-climate-youth',
    name: 'Saudi Youth for Climate',
    type: 'youth-group',
    country: 'SA',
    city: 'Riyadh',
    description:
      'A growing movement of Saudi youth committed to climate action and the green economy. We organize beach cleanups, tree-planting campaigns, and climate literacy workshops in schools and universities.',
    themes: ['climate', 'youth', 'sustainability'],
    website: '#',
    verified: false,
    tags: ['saudi', 'grassroots', 'youth'],
    founded: 2021,
    members: 80,
  },
  {
    slug: 'moroccan-youth-sustainability',
    name: 'Mouvement Marocain de la Jeunesse pour le Développement Durable',
    type: 'youth-group',
    country: 'MA',
    city: 'Rabat',
    description:
      'Moroccan youth movement advocating for sustainable development with a focus on renewable energy access in rural areas, waste reduction, and environmental education in public schools.',
    themes: ['energy', 'waste', 'youth'],
    website: '#',
    verified: true,
    tags: ['morocco', 'youth', 'rural-energy'],
    founded: 2016,
    members: 200,
  },
  {
    slug: 'iraq-environmental-youth',
    name: 'Iraq Environmental Youth Network',
    type: 'youth-group',
    country: 'IQ',
    city: 'Baghdad',
    description:
      'A network of Iraqi environmental youth activists focusing on water crisis advocacy, reforestation of degraded lands, and building community resilience to extreme heat events.',
    themes: ['water', 'climate', 'youth'],
    website: '#',
    verified: false,
    tags: ['iraq', 'water-crisis', 'reforestation'],
    founded: 2022,
    members: 45,
  },

  // ─── Individuals ─────────────────────────────────────────────────────────────
  {
    slug: 'amira-hassan-solar',
    name: 'Amira Hassan',
    type: 'individual',
    country: 'EG',
    city: 'Cairo',
    description:
      'Solar energy engineer and climate advocate with 5 years of experience in rural electrification projects across Egypt and Sudan. Mentor for MENA engineering students pursuing clean energy careers.',
    themes: ['energy', 'sustainability'],
    email: 'hello@greengate-mena.org',
    verified: true,
    tags: ['solar', 'engineering', 'mentor'],
  },
  {
    slug: 'youssef-el-amrani-marine',
    name: 'Youssef El Amrani',
    type: 'individual',
    country: 'MA',
    city: 'Agadir',
    description:
      'Marine biologist and ocean conservation consultant specializing in Mediterranean fisheries and coral reef restoration in Morocco. Available for collaborative research and NGO capacity building.',
    themes: ['oceans', 'biodiversity'],
    verified: true,
    tags: ['marine-biology', 'consultant', 'research'],
  },
  {
    slug: 'nour-khalil-climate-finance',
    name: 'Nour Khalil',
    type: 'individual',
    country: 'LB',
    city: 'Beirut',
    description:
      'Climate finance specialist and Green Climate Fund accreditation consultant. Helps MENA NGOs and governments navigate climate finance mechanisms, write project proposals, and access international funding.',
    themes: ['finance', 'climate', 'policy'],
    email: 'hello@greengate-mena.org',
    verified: true,
    tags: ['climate-finance', 'gcf', 'consultant'],
  },

  // ─── Institutions ─────────────────────────────────────────────────────────
  {
    slug: 'masdar-institute',
    name: 'Masdar Institute – Mohamed Bin Zayed University',
    type: 'institution',
    country: 'AE',
    city: 'Abu Dhabi',
    description:
      'A graduate research university dedicated to clean energy and sustainability. Offers research positions, joint projects with government and industry, and visiting scholar opportunities for environmental scientists.',
    themes: ['energy', 'sustainability', 'climate'],
    website: 'https://www.mbzuai.ac.ae',
    verified: true,
    tags: ['university', 'research', 'clean-energy', 'abu-dhabi'],
    founded: 2007,
  },
  {
    slug: 'regional-center-renewable-energy',
    name: 'Regional Center for Renewable Energy and Energy Efficiency (RCREEE)',
    type: 'institution',
    country: 'EG',
    city: 'Cairo',
    description:
      'An intergovernmental organization supporting the deployment of renewable energy and energy efficiency across 22 Arab countries. Provides technical assistance, training, and policy advisory services.',
    themes: ['energy', 'policy', 'sustainability'],
    website: 'https://www.rcreee.org',
    verified: true,
    tags: ['intergovernmental', 'energy', 'policy', 'pan-arab'],
    founded: 2008,
  },
  {
    slug: 'arab-center-climate',
    name: 'Arab Center for Climate Research and Policy',
    type: 'institution',
    country: 'JO',
    city: 'Amman',
    description:
      'Research institution producing Arabic-language climate science, policy analysis, and adaptation strategies for the MENA region. Accepts visiting researchers and co-authorship proposals from regional universities.',
    themes: ['climate', 'policy', 'water'],
    website: '#',
    verified: true,
    tags: ['research', 'arabic-language', 'policy'],
    founded: 2017,
  },

  // ─── Businesses ──────────────────────────────────────────────────────────────
  {
    slug: 'acwa-power',
    name: 'ACWA Power',
    type: 'business',
    country: 'SA',
    city: 'Riyadh',
    description:
      'A leading developer, investor, and operator of power generation and water desalination plants across MENA and beyond. Active in renewable energy (solar, wind, green hydrogen) and open to partnerships with environmental NGOs on CSR and talent programs.',
    themes: ['energy', 'water', 'sustainability'],
    website: 'https://www.acwapower.com',
    verified: true,
    tags: ['renewable-energy', 'power', 'desalination', 'csr'],
    founded: 2004,
  },
  {
    slug: 'biofilcom',
    name: 'Biofilcom – Sustainable Materials',
    type: 'business',
    country: 'TN',
    city: 'Sfax',
    description:
      'Tunisian startup producing biodegradable packaging from agricultural waste. Looking to expand into Egypt and Morocco and seeking NGO partners for circular economy awareness campaigns.',
    themes: ['waste', 'agriculture', 'sustainability'],
    website: '#',
    verified: false,
    tags: ['startup', 'packaging', 'circular-economy'],
    founded: 2021,
  },
  {
    slug: 'watergen-mena',
    name: 'Watergen MENA',
    type: 'business',
    country: 'AE',
    city: 'Dubai',
    description:
      'Atmospheric water generation technology company bringing water-from-air solutions to water-scarce MENA communities. Seeking partnerships with humanitarian NGOs for rural deployment and youth training programs.',
    themes: ['water', 'sustainability', 'climate'],
    website: '#',
    verified: true,
    tags: ['water-tech', 'innovation', 'humanitarian'],
    founded: 2018,
  },
]

export function getProfileBySlug(slug: string): DirectoryProfile | undefined {
  return directoryProfiles.find((p) => p.slug === slug)
}

export function getProfilesByCountry(countryCode: string): DirectoryProfile[] {
  return directoryProfiles.filter((p) => p.country === countryCode)
}

export function getVerifiedProfiles(): DirectoryProfile[] {
  return directoryProfiles.filter((p) => p.verified)
}
