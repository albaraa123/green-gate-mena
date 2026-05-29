'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface StoryInput {
  id: string
  name: string
  role: string
  role_ar: string | null
  country: string
  quote: string
  quote_ar: string | null
  avatar: string | null
  opportunity_title: string | null
}

export async function createStory(input: StoryInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('stories').insert(input)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/stories')
  revalidatePath('/en/impact')
  revalidatePath('/ar/impact')
  redirect('/admin/stories')
}

export async function updateStory(id: string, input: StoryInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('stories').update(input).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/stories')
  revalidatePath('/en/impact')
  revalidatePath('/ar/impact')
  redirect('/admin/stories')
}

export async function deleteStory(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('stories').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/stories')
  revalidatePath('/en/impact')
  revalidatePath('/ar/impact')
}
