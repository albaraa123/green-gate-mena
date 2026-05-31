'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function saveSiteSetting(key: string, value: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  await supabase
    .from('site_settings')
    .upsert({ key, value, updated_at: new Date().toISOString() })

  revalidatePath('/')
  revalidatePath('/ar')
  revalidatePath('/en')
}
