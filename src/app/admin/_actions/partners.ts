'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface PartnerInput {
  id: string
  name: string
  logo: string
  website: string | null
  tier: string
  country: string | null
}

export async function createPartner(input: PartnerInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('partners').insert(input)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/partners')
  revalidatePath('/en')
  revalidatePath('/ar')
  revalidatePath('/en/about')
  revalidatePath('/ar/about')
  redirect('/admin/partners')
}

export async function updatePartner(id: string, input: PartnerInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('partners').update(input).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/partners')
  revalidatePath('/en')
  revalidatePath('/ar')
  revalidatePath('/en/about')
  revalidatePath('/ar/about')
  revalidatePath('/en/impact')
  revalidatePath('/ar/impact')
  redirect('/admin/partners')
}

export async function deletePartner(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('partners').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/partners')
  revalidatePath('/en')
  revalidatePath('/ar')
}
