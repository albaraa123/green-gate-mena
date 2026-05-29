'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface TeamInput {
  id: string
  name: string
  name_ar: string | null
  role: string
  role_ar: string | null
  country: string
  bio: string | null
  avatar: string | null
  linkedin: string | null
}

export async function createTeamMember(input: TeamInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('team_members').insert(input)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/team')
  revalidatePath('/en/about')
  revalidatePath('/ar/about')
  redirect('/admin/team')
}

export async function updateTeamMember(id: string, input: TeamInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('team_members').update(input).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/team')
  revalidatePath('/en/about')
  revalidatePath('/ar/about')
  redirect('/admin/team')
}

export async function deleteTeamMember(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('team_members').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/team')
  revalidatePath('/en/about')
  revalidatePath('/ar/about')
}
