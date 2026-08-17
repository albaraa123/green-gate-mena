'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface ServiceInput {
  slug: string
  title: string
  title_ar: string | null
  description: string
  description_ar: string | null
  icon: string | null
  image: string | null
  link: string | null
  sort_order: number | null
}

export async function createService(input: ServiceInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('services').insert(input)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/services')
  revalidatePath('/en')
  revalidatePath('/ar')
  redirect('/admin/services')
}

export async function updateService(id: string, input: ServiceInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('services').update(input).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/services')
  revalidatePath('/en')
  revalidatePath('/ar')
  redirect('/admin/services')
}

export async function deleteService(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/services')
  revalidatePath('/en')
  revalidatePath('/ar')
}
