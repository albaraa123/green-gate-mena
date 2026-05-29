'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface DirectoryInput {
  slug: string
  name: string
  type: string
  country: string
  city: string | null
  description: string
  themes: string[]
  website: string | null
  email: string | null
  logo: string | null
  verified: boolean
  tags: string[] | null
  founded: number | null
  members: number | null
}

export async function createDirectoryProfile(input: DirectoryInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('directory_profiles').insert(input)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/directory')
  revalidatePath('/en/ecosystem/directory')
  revalidatePath('/ar/ecosystem/directory')
  redirect('/admin/directory')
}

export async function updateDirectoryProfile(id: string, input: DirectoryInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('directory_profiles').update(input).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/directory')
  revalidatePath('/en/ecosystem/directory')
  revalidatePath('/ar/ecosystem/directory')
  redirect('/admin/directory')
}

export async function deleteDirectoryProfile(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('directory_profiles').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/directory')
  revalidatePath('/en/ecosystem/directory')
  revalidatePath('/ar/ecosystem/directory')
}
