import { createClient } from '@/lib/supabase/server'
import { AdminTable } from '../_components/AdminTable'
import { deleteDirectoryProfile } from '../_actions/directory'

export const metadata = { title: 'Directory' }

export default async function DirectoryAdminPage() {
  const supabase = await createClient()
  const { data: rows } = await supabase
    .from('directory_profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <AdminTable
      title="Directory"
      rows={rows ?? []}
      addHref="/admin/directory/new"
      editBase="/admin/directory"
      deleteAction={deleteDirectoryProfile}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'type', label: 'Type' },
        { key: 'country', label: 'Country' },
        { key: 'verified', label: 'Verified', render: (row) => (row.verified ? '✓' : '—') },
      ]}
    />
  )
}
