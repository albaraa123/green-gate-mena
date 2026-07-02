'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface ProgramInput {
  slug: string
  title: string
  title_ar: string | null
  description: string
  description_ar: string | null
  image: string | null
  link: string | null
  status: string | null
  sort_order: number | null
}

export async function createProgram(input: ProgramInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('programs').insert(input)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/programs')
  revalidatePath('/en')
  revalidatePath('/ar')
  redirect('/admin/programs')
}

export async function updateProgram(id: string, input: ProgramInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('programs').update(input).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/programs')
  revalidatePath('/en')
  revalidatePath('/ar')
  redirect('/admin/programs')
}

export async function deleteProgram(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('programs').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/programs')
  revalidatePath('/en')
  revalidatePath('/ar')
}
