import { createClient } from '@/lib/supabase/server'
import { AdminTable } from '../_components/AdminTable'
import { deleteOpportunity } from '../_actions/opportunities'

export const metadata = { title: 'Opportunities' }

export default async function OpportunitiesAdminPage() {
  const supabase = await createClient()
  const { data: rows } = await supabase
    .from('opportunities')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <AdminTable
      title="Opportunities"
      rows={rows ?? []}
      addHref="/admin/opportunities/new"
      editBase="/admin/opportunities"
      deleteAction={deleteOpportunity}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'organization', label: 'Organization' },
        { key: 'type', label: 'Type' },
        { key: 'deadline', label: 'Deadline', render: (row) => row.deadline ?? '—' },
        { key: 'featured', label: 'Featured', render: (row) => (row.featured ? '✓' : '—') },
      ]}
    />
  )
}
