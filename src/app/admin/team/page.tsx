import { createClient } from '@/lib/supabase/server'
import { AdminTable } from '../_components/AdminTable'
import { deleteTeamMember } from '../_actions/team'

export const metadata = { title: 'Team' }

export default async function TeamAdminPage() {
  const supabase = await createClient()
  const { data: rows } = await supabase
    .from('team_members')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <AdminTable
      title="Team"
      rows={rows ?? []}
      addHref="/admin/team/new"
      editBase="/admin/team"
      deleteAction={deleteTeamMember}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'country', label: 'Country' },
      ]}
    />
  )
}
