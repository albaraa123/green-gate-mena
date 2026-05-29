'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface OppInput {
  slug: string
  title: string
  organization: string
  type: string
  theme: string[]
  countries: string[]
  format: string
  deadline: string | null
  start_date: string | null
  description: string
  link: string
  logo: string | null
  featured: boolean
  stipend: boolean
  funded: boolean
}

export async function createOpportunity(input: OppInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('opportunities').insert(input)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/opportunities')
  revalidatePath('/en/ecosystem/opportunities')
  revalidatePath('/ar/ecosystem/opportunities')
  redirect('/admin/opportunities')
}

export async function updateOpportunity(id: string, input: OppInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('opportunities').update(input).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/opportunities')
  revalidatePath('/en/ecosystem/opportunities')
  revalidatePath('/ar/ecosystem/opportunities')
  redirect('/admin/opportunities')
}

export async function deleteOpportunity(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('opportunities').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/opportunities')
  revalidatePath('/en/ecosystem/opportunities')
  revalidatePath('/ar/ecosystem/opportunities')
}
