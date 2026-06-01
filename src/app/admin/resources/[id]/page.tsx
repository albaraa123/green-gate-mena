import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { ResourceForm } from '../_components/ResourceForm'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: 'Edit Resource' }

export default async function EditResourcePage({ params }: Props) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data: row } = await supabase.from('resources').select('*').eq('id', id).single()
  if (!row) notFound()
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit Resource</h1>
      <ResourceForm row={row} />
    </div>
  )
}
