import { createAdminClient } from '@/lib/supabase/admin'
import { TeamOrderTable } from './_components/TeamOrderTable'

export const metadata = { title: 'Team' }

export default async function TeamAdminPage() {
  const supabase = createAdminClient()
  const { data: rows } = await supabase
    .from('team_members')
    .select('id, name, role, country, sort_order')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  return <TeamOrderTable members={rows ?? []} />
}
