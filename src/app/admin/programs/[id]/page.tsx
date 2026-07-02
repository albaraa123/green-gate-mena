import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { ProgramForm } from '../_components/ProgramForm'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: 'Edit Program' }

export default async function EditProgramPage({ params }: Props) {
  const { id } = await params
  const decodedId = decodeURIComponent(id)

  const supabase = createAdminClient()

  const { data: row, error } = await supabase
    .from('programs')
    .select('*')
    .eq('id', decodedId)
    .maybeSingle()

  if (error) {
    console.error('[admin/programs/[id]] Supabase error:', error.message, 'id:', decodedId)
  }

  if (!row) {
    console.error('[admin/programs/[id]] Row not found for id:', decodedId)
    redirect('/admin/programs')
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit Program</h1>
      <ProgramForm row={row} />
    </div>
  )
}
