import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { PartnerForm } from '../_components/PartnerForm'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: 'Edit Partner' }

export default async function EditPartnerPage({ params }: Props) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data: row } = await supabase.from('partners').select('*').eq('id', id).single()
  if (!row) notFound()
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit Partner</h1>
      <PartnerForm row={row} />
    </div>
  )
}
