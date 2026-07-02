import { createAdminClient } from '@/lib/supabase/admin'
import { AdminTable } from '../_components/AdminTable'
import { deleteProgram } from '../_actions/programs'

export const metadata = { title: 'Programs' }

export default async function ProgramsAdminPage() {
  const supabase = createAdminClient()
  const { data: rows } = await supabase
    .from('programs')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  return (
    <AdminTable
      title="Programs"
      rows={rows ?? []}
      addHref="/admin/programs/new"
      editBase="/admin/programs"
      deleteAction={deleteProgram}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
