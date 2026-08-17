import { createAdminClient } from '@/lib/supabase/admin'
import { AdminTable } from '../_components/AdminTable'
import { deleteImpactHighlight } from '../_actions/impact-highlights'

export const metadata = { title: 'Impact Highlights' }

export default async function ImpactHighlightsAdminPage() {
  const supabase = createAdminClient()
  const { data: rows } = await supabase
    .from('impact_highlights')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  return (
    <AdminTable
      title="Impact Highlights"
      rows={rows ?? []}
      addHref="/admin/impact-highlights/new"
      editBase="/admin/impact-highlights"
      deleteAction={deleteImpactHighlight}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'accent', label: 'Accent' },
      ]}
    />
  )
}
