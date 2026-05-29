import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { OpportunityForm } from '../_components/OpportunityForm'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: 'Edit Opportunity' }

export default async function EditOpportunityPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: row } = await supabase.from('opportunities').select('*').eq('id', id).single()
  if (!row) notFound()
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit Opportunity</h1>
      <OpportunityForm row={row} />
    </div>
  )
}
