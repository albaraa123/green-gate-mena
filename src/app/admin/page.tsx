import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const SECTIONS = [
  { table: 'opportunities', label: 'Opportunities', href: '/admin/opportunities' },
  { table: 'events', label: 'Events', href: '/admin/events' },
  { table: 'resources', label: 'Resources', href: '/admin/resources' },
  { table: 'directory_profiles', label: 'Directory Profiles', href: '/admin/directory' },
  { table: 'partners', label: 'Partners', href: '/admin/partners' },
  { table: 'team_members', label: 'Team Members', href: '/admin/team' },
  { table: 'stories', label: 'Stories', href: '/admin/stories' },
] as const

export default async function AdminDashboard() {
  const supabase = await createClient()

  const counts = await Promise.all(
    SECTIONS.map(async ({ table, label, href }) => {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })
      return { label, count: error ? null : (count ?? 0), href }
    })
  )

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {counts.map(({ label, count, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-teal-300 hover:shadow-sm transition-all"
          >
            <p className="text-3xl font-semibold text-teal-700">{count !== null ? count : '—'}</p>
            <p className="text-sm text-gray-600 mt-1">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
