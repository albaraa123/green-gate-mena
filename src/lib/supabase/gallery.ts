import { createClient } from './server'

export interface GalleryImage {
  id: string
  image: string
  caption?: string
  captionAr?: string
  sortOrder?: number
}

export async function getGallery(): Promise<GalleryImage[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })
  if (error) {
    console.error('[getGallery]', error.message)
    return []
  }
  return (data ?? []).map((row) => ({
    id: row.id as string,
    image: row.image as string,
    caption: (row.caption as string | null) ?? undefined,
    captionAr: (row.caption_ar as string | null) ?? undefined,
    sortOrder: (row.sort_order as number | null) ?? undefined,
  }))
}
