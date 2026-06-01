import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { TeamForm } from '../_components/TeamForm'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: 'Edit Team Member' }

export default async function EditTeamMemberPage({ params }: Props) {
  const { id } = await params
  const decodedId = decodeURIComponent(id)

  const supabase = createAdminClient()

  // Try by id column
  const { data: row, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('id', decodedId)
    .maybeSingle()

  if (error) {
    console.error('[admin/team/[id]] Supabase error:', error.message, 'id:', decodedId)
  }

  if (!row) {
    console.error('[admin/team/[id]] Row not found for id:', decodedId)
    redirect('/admin/team')
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit Team Member</h1>
      <TeamForm row={row} />
    </div>
  )
}
