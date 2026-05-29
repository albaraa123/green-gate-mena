import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DirectoryForm } from '../_components/DirectoryForm'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: 'Edit Directory Profile' }

export default async function EditDirectoryPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: row } = await supabase.from('directory_profiles').select('*').eq('id', id).single()
  if (!row) notFound()
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit Directory Profile</h1>
      <DirectoryForm row={row} />
    </div>
  )
}
