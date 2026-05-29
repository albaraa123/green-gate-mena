import { createClient } from '@/lib/supabase/server'
import { AdminTable } from '../_components/AdminTable'
import { deleteStory } from '../_actions/stories'

export const metadata = { title: 'Stories' }

export default async function StoriesAdminPage() {
  const supabase = await createClient()
  const { data: rows } = await supabase
    .from('stories')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <AdminTable
      title="Stories"
      rows={rows ?? []}
      addHref="/admin/stories/new"
      editBase="/admin/stories"
      deleteAction={deleteStory}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'country', label: 'Country' },
      ]}
    />
  )
}
