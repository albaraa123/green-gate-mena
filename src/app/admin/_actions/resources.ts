'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface ResourceInput {
  slug: string
  title: string
  type: string
  theme: string
  published_at: string
  author: string | null
  description: string
  link: string
  image: string | null
  featured: boolean
  tags: string[] | null
}

export async function createResource(input: ResourceInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('resources').insert(input)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/resources')
  revalidatePath('/en/knowledge')
  revalidatePath('/ar/knowledge')
  redirect('/admin/resources')
}

export async function updateResource(id: string, input: ResourceInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('resources').update(input).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/resources')
  revalidatePath('/en/knowledge')
  revalidatePath('/ar/knowledge')
  redirect('/admin/resources')
}

export async function deleteResource(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('resources').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/resources')
  revalidatePath('/en/knowledge')
  revalidatePath('/ar/knowledge')
}
