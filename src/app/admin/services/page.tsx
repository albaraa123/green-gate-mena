import { createAdminClient } from '@/lib/supabase/admin'
import { AdminTable } from '../_components/AdminTable'
import { deleteService } from '../_actions/services'

export const metadata = { title: 'Services' }

export default async function ServicesAdminPage() {
  const supabase = createAdminClient()
  const { data: rows } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  return (
    <AdminTable
      title="Services"
      rows={rows ?? []}
      addHref="/admin/services/new"
      editBase="/admin/services"
      deleteAction={deleteService}
      columns={[{ key: 'title', label: 'Title' }]}
    />
  )
}
