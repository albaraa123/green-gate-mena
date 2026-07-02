import { createAdminClient } from '@/lib/supabase/admin'
import { GalleryManager } from './_components/GalleryManager'

export const metadata = { title: 'Gallery' }

export default async function GalleryAdminPage() {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('gallery')
    .select('id, image, caption, caption_ar')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  return <GalleryManager items={data ?? []} />
}
