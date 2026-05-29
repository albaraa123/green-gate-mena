import { createClient } from '@/lib/supabase/server'
import { AdminTable } from '../_components/AdminTable'
import { deleteEvent } from '../_actions/events'

export const metadata = { title: 'Events' }

export default async function EventsAdminPage() {
  const supabase = await createClient()
  const { data: rows } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false })

  return (
    <AdminTable
      title="Events"
      rows={rows ?? []}
      addHref="/admin/events/new"
      editBase="/admin/events"
      deleteAction={deleteEvent}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'organizer', label: 'Organizer' },
        { key: 'date', label: 'Date' },
        { key: 'format', label: 'Format' },
        { key: 'country', label: 'Country' },
      ]}
    />
  )
}
