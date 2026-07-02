export type Locale = 'en' | 'ar'

// ─── Opportunity ─────────────────────────────────────────────────────────────

export type OpportunityType =
  | 'fellowship'
  | 'grant'
  | 'event'
  | 'competition'
  | 'internship'
  | 'volunteer'
  | 'training'
  | 'job'

export type OpportunityTheme =
  | 'climate'
  | 'energy'
  | 'water'
  | 'biodiversity'
  | 'waste'
  | 'sustainability'
  | 'policy'
  | 'finance'
  | 'agriculture'
  | 'urban'
  | 'oceans'
  | 'youth'

export type OpportunityFormat = 'in-person' | 'online' | 'hybrid'

export interface Opportunity {
  slug: string
  title: string
  organization: string
  type: OpportunityType
  theme: OpportunityTheme[]
  countries: string[]
  format: OpportunityFormat
  deadline: string | null
  startDate?: string
  description: string
  link: string
  logo?: string
  image?: string
  featured?: boolean
  tags?: string[]
  stipend?: boolean
  funded?: boolean
}

// ─── Directory Profile ────────────────────────────────────────────────────────

export type ProfileType = 'ngo' | 'youth-group' | 'individual' | 'institution' | 'business'

export interface DirectoryProfile {
  slug: string
  name: string
  type: ProfileType
  country: string
  city?: string
  description: string
  themes: OpportunityTheme[]
  website?: string
  email?: string
  logo?: string
  verified?: boolean
  tags?: string[]
  founded?: number
  members?: number
}

// ─── Events ──────────────────────────────────────────────────────────────────

export interface Event {
  slug: string
  title: string
  organizer: string
  date: string
  endDate?: string
  location: string
  country: string
  format: OpportunityFormat
  description: string
  link: string
  image?: string
  theme: OpportunityTheme[]
  featured?: boolean
}

// ─── Knowledge / Blog ─────────────────────────────────────────────────────────

export type ResourceType = 'report' | 'guide' | 'article' | 'toolkit' | 'video' | 'podcast'

export interface Resource {
  slug: string
  title: string
  type: ResourceType
  theme: OpportunityTheme
  publishedAt: string
  author?: string
  description: string
  link: string
  image?: string
  featured?: boolean
  tags?: string[]
}

// ─── Impact / Stories ─────────────────────────────────────────────────────────

export interface Story {
  id: string
  name: string
  role: string
  roleAr?: string
  country: string
  quote: string
  quoteAr?: string
  avatar?: string
  opportunityTitle?: string
}

export interface ImpactStat {
  value: string
  label: string
  labelAr?: string
  description?: string
  descriptionAr?: string
}

// ─── Partners ────────────────────────────────────────────────────────────────

export type PartnerTier = 'strategic' | 'program' | 'media' | 'community'

export interface Partner {
  id: string
  name: string
  logo: string
  website?: string
  tier: PartnerTier
  country?: string
}

// ─── Team ────────────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string
  name: string
  nameAr?: string
  role: string
  roleAr?: string
  country: string
  bio?: string
  avatar?: string
  linkedin?: string
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

// ─── Form payloads ────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface NewsletterFormData {
  email: string
}

export interface OpportunitySubmitData {
  title: string
  organization: string
  type: OpportunityType
  theme: OpportunityTheme[]
  countries: string[]
  format: OpportunityFormat
  deadline?: string
  description: string
  link: string
  contactEmail: string
}

export interface DirectoryJoinData {
  name: string
  type: ProfileType
  country: string
  city?: string
  description: string
  themes: OpportunityTheme[]
  website?: string
  email: string
}

export interface GetInvolvedFormData {
  pathway: 'youth' | 'ngo' | 'consultant' | 'partner'
  name: string
  email: string
  organization?: string
  country: string
  message?: string
}
