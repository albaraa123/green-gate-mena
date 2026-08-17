import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { ImpactHighlightForm } from '../_components/ImpactHighlightForm'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: 'Edit Impact Highlight' }

export default async function EditImpactHighlightPage({ params }: Props) {
  const { id } = await params
  const decodedId = decodeURIComponent(id)

  const supabase = createAdminClient()

  const { data: row, error } = await supabase
    .from('impact_highlights')
    .select('*')
    .eq('id', decodedId)
    .maybeSingle()

  if (error) {
    console.error('[admin/impact-highlights/[id]] Supabase error:', error.message, 'id:', decodedId)
  }

  if (!row) {
    console.error('[admin/impact-highlights/[id]] Row not found for id:', decodedId)
    redirect('/admin/impact-highlights')
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit Impact Highlight</h1>
      <ImpactHighlightForm row={row} />
    </div>
  )
}
