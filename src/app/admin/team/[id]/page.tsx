import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { TeamForm } from '../_components/TeamForm'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: 'Edit Team Member' }

export default async function EditTeamMemberPage({ params }: Props) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data: row } = await supabase.from('team_members').select('*').eq('id', id).single()
  if (!row) notFound()
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit Team Member</h1>
      <TeamForm row={row} />
    </div>
  )
}
