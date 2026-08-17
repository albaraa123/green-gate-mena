'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface ImpactHighlightInput {
  title: string
  title_ar: string | null
  body: string
  body_ar: string | null
  accent: string
  logos: string[]
  link: string | null
  sort_order: number | null
}

export async function createImpactHighlight(input: ImpactHighlightInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('impact_highlights').insert(input)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/impact-highlights')
  revalidatePath('/en/impact')
  revalidatePath('/ar/impact')
  redirect('/admin/impact-highlights')
}

export async function updateImpactHighlight(id: string, input: ImpactHighlightInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('impact_highlights').update(input).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/impact-highlights')
  revalidatePath('/en/impact')
  revalidatePath('/ar/impact')
  redirect('/admin/impact-highlights')
}

export async function deleteImpactHighlight(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('impact_highlights').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/impact-highlights')
  revalidatePath('/en/impact')
  revalidatePath('/ar/impact')
}
