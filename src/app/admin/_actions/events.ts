'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface EventInput {
  slug: string
  title: string
  organizer: string
  date: string
  end_date: string | null
  location: string
  country: string
  format: string
  description: string
  link: string
  image: string | null
  theme: string[]
  featured: boolean
}

export async function createEvent(input: EventInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('events').insert(input)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/events')
  revalidatePath('/en/ecosystem/events')
  revalidatePath('/ar/ecosystem/events')
  redirect('/admin/events')
}

export async function updateEvent(id: string, input: EventInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('events').update(input).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/events')
  revalidatePath('/en/ecosystem/events')
  revalidatePath('/ar/ecosystem/events')
  redirect('/admin/events')
}

export async function deleteEvent(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('events').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/events')
  revalidatePath('/en/ecosystem/events')
  revalidatePath('/ar/ecosystem/events')
}
