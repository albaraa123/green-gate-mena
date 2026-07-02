'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function addGalleryImage(input: {
  image: string
  caption: string | null
  caption_ar: string | null
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('gallery').insert(input)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/gallery')
  revalidatePath('/en/about')
  revalidatePath('/ar/about')
}

export async function deleteGalleryImage(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await supabase.from('gallery').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/gallery')
  revalidatePath('/en/about')
  revalidatePath('/ar/about')
}
