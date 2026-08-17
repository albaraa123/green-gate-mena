import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { ServiceForm } from '../_components/ServiceForm'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: 'Edit Service' }

export default async function EditServicePage({ params }: Props) {
  const { id } = await params
  const decodedId = decodeURIComponent(id)

  const supabase = createAdminClient()

  const { data: row, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', decodedId)
    .maybeSingle()

  if (error) {
    console.error('[admin/services/[id]] Supabase error:', error.message, 'id:', decodedId)
  }

  if (!row) {
    console.error('[admin/services/[id]] Row not found for id:', decodedId)
    redirect('/admin/services')
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit Service</h1>
      <ServiceForm row={row} />
    </div>
  )
}
