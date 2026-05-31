import { createClient } from './server'
import type {
  Opportunity,
  Event,
  Resource,
  DirectoryProfile,
  Partner,
  TeamMember,
  Story,
} from '@/types'

// ── Opportunities ─────────────────────────────────────────────────────────────

export async function getOpportunities(filters?: {
  type?: string
  theme?: string
  format?: string
  funded?: boolean
}): Promise<Opportunity[]> {
  const supabase = await createClient()
  let query = supabase
    .from('opportunities')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters?.type) query = query.eq('type', filters.type)
  if (filters?.theme) query = query.contains('theme', [filters.theme])
  if (filters?.format) query = query.eq('format', filters.format)
  if (filters?.funded) query = query.eq('funded', true)

  const { data, error } = await query
  if (error) {
    console.error('[getOpportunities]', error.message)
    return []
  }
  return (data ?? []).map(mapOpportunity)
}

export async function getFeaturedOpportunities(count = 4): Promise<Opportunity[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('opportunities')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(count)
  if (error) {
    console.error('[getFeaturedOpportunities]', error.message)
    return []
  }
  return (data ?? []).map(mapOpportunity)
}

export async function getOpportunityBySlug(slug: string): Promise<Opportunity | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('opportunities')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) {
    console.error('[getOpportunityBySlug]', error.message)
    return null
  }
  return data ? mapOpportunity(data) : null
}

function mapOpportunity(row: Record<string, unknown>): Opportunity {
  const { start_date, ...rest } = row
  return { ...rest, startDate: start_date } as unknown as Opportunity
}

// ── Events ────────────────────────────────────────────────────────────────────

export async function getUpcomingEvents(): Promise<Event[]> {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('date', today)
    .order('date', { ascending: true })
  if (error) {
    console.error('[getUpcomingEvents]', error.message)
    return []
  }
  return (data ?? []).map(mapEvent)
}

export async function getPastEvents(): Promise<Event[]> {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .lt('date', today)
    .order('date', { ascending: false })
  if (error) {
    console.error('[getPastEvents]', error.message)
    return []
  }
  return (data ?? []).map(mapEvent)
}

export async function getFeaturedEvents(count = 4): Promise<Event[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('featured', true)
    .order('date', { ascending: true })
    .limit(count)
  if (error) {
    console.error('[getFeaturedEvents]', error.message)
    return []
  }
  return (data ?? []).map(mapEvent)
}

function mapEvent(row: Record<string, unknown>): Event {
  const { end_date, ...rest } = row
  return { ...rest, endDate: end_date } as unknown as Event
}

// ── Resources ─────────────────────────────────────────────────────────────────

export async function getResources(filters?: {
  type?: string
  theme?: string
}): Promise<Resource[]> {
  const supabase = await createClient()
  let query = supabase
    .from('resources')
    .select('*')
    .order('published_at', { ascending: false })

  if (filters?.type) query = query.eq('type', filters.type)
  if (filters?.theme) query = query.eq('theme', filters.theme)

  const { data, error } = await query
  if (error) {
    console.error('[getResources]', error.message)
    return []
  }
  return (data ?? []).map(mapResource)
}

export async function getFeaturedResources(count = 3): Promise<Resource[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(count)
  if (error) {
    console.error('[getFeaturedResources]', error.message)
    return []
  }
  return (data ?? []).map(mapResource)
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) {
    console.error('[getResourceBySlug]', error.message)
    return null
  }
  return data ? mapResource(data) : null
}

function mapResource(row: Record<string, unknown>): Resource {
  const { published_at, ...rest } = row
  return { ...rest, publishedAt: published_at } as unknown as Resource
}

// ── Directory ─────────────────────────────────────────────────────────────────

export async function getDirectoryProfiles(filters?: {
  type?: string
  theme?: string
  verified?: boolean
}): Promise<DirectoryProfile[]> {
  const supabase = await createClient()
  let query = supabase
    .from('directory_profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters?.type) query = query.eq('type', filters.type)
  if (filters?.theme) query = query.contains('themes', [filters.theme])
  if (filters?.verified) query = query.eq('verified', true)

  const { data, error } = await query
  if (error) {
    console.error('[getDirectoryProfiles]', error.message)
    return []
  }
  return (data ?? []) as unknown as DirectoryProfile[]
}

// ── Partners ──────────────────────────────────────────────────────────────────

export async function getPartners(): Promise<Partner[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('partners').select('*').order('created_at')
  if (error) {
    console.error('[getPartners]', error.message)
    return []
  }
  return (data ?? []) as unknown as Partner[]
}

// ── Team ──────────────────────────────────────────────────────────────────────

export async function getTeam(): Promise<TeamMember[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('team_members').select('*').order('created_at')
  if (error) {
    console.error('[getTeam]', error.message)
    return []
  }
  return (data ?? []).map(mapTeamMember)
}

function mapTeamMember(row: Record<string, unknown>): TeamMember {
  const { name_ar, role_ar, ...rest } = row
  return { ...rest, nameAr: name_ar, roleAr: role_ar } as unknown as TeamMember
}

// ── Stories ───────────────────────────────────────────────────────────────────

export async function getStories(): Promise<Story[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('stories').select('*').order('created_at')
  if (error) {
    console.error('[getStories]', error.message)
    return []
  }
  return (data ?? []).map(mapStory)
}

function mapStory(row: Record<string, unknown>): Story {
  const { role_ar, quote_ar, opportunity_title, ...rest } = row
  return {
    ...rest,
    roleAr: role_ar,
    quoteAr: quote_ar,
    opportunityTitle: opportunity_title,
  } as unknown as Story
}

// ── Site Settings ─────────────────────────────────────────────────────────────

export async function getSiteSetting(key: string): Promise<string | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .single()
  if (error) return null
  return (data?.value as string) || null
}
