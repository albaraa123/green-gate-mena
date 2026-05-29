import { createClient } from '@/lib/supabase/server'
import { AdminTable } from '../_components/AdminTable'
import { deletePartner } from '../_actions/partners'

export const metadata = { title: 'Partners' }

export default async function PartnersAdminPage() {
  const supabase = await createClient()
  const { data: rows } = await supabase
    .from('partners')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <AdminTable
      title="Partners"
      rows={rows ?? []}
      addHref="/admin/partners/new"
      editBase="/admin/partners"
      deleteAction={deletePartner}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'tier', label: 'Tier' },
        { key: 'country', label: 'Country' },
      ]}
    />
  )
}
