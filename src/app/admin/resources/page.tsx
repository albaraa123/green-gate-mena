import { createClient } from '@/lib/supabase/server'
import { AdminTable } from '../_components/AdminTable'
import { deleteResource } from '../_actions/resources'

export const metadata = { title: 'Resources' }

export default async function ResourcesAdminPage() {
  const supabase = await createClient()
  const { data: rows } = await supabase
    .from('resources')
    .select('*')
    .order('published_at', { ascending: false })

  return (
    <AdminTable
      title="Resources"
      rows={rows ?? []}
      addHref="/admin/resources/new"
      editBase="/admin/resources"
      deleteAction={deleteResource}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'type', label: 'Type' },
        { key: 'theme', label: 'Theme' },
        { key: 'published_at', label: 'Published' },
        { key: 'featured', label: 'Featured', render: (row) => (row.featured ? '✓' : '—') },
      ]}
    />
  )
}
