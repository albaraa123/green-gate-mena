import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { EventForm } from '../_components/EventForm'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: 'Edit Event' }

export default async function EditEventPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: row } = await supabase.from('events').select('*').eq('id', id).single()
  if (!row) notFound()
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit Event</h1>
      <EventForm row={row} />
    </div>
  )
}
