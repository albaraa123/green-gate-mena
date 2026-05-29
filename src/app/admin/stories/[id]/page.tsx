import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { StoryForm } from '../_components/StoryForm'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: 'Edit Story' }

export default async function EditStoryPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: row } = await supabase.from('stories').select('*').eq('id', id).single()
  if (!row) notFound()
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit Story</h1>
      <StoryForm row={row} />
    </div>
  )
}
