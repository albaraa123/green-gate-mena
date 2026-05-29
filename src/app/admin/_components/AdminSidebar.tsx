'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const NAV = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/opportunities', label: 'Opportunities' },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/resources', label: 'Resources' },
  { href: '/admin/directory', label: 'Directory' },
  { href: '/admin/partners', label: 'Partners' },
  { href: '/admin/team', label: 'Team' },
  { href: '/admin/stories', label: 'Stories' },
] as const

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.refresh()
    router.push('/admin/login')
  }

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col min-h-screen shrink-0">
      <div className="px-4 py-5 border-b border-gray-100">
        <p className="font-semibold text-sm text-teal-700">Green Gate</p>
        <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
      </div>
      <nav className="flex-1 py-3 flex flex-col gap-0.5 px-2">
        {NAV.map((item) => {
          const { href, label } = item
          const exact = 'exact' in item ? item.exact : false
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={[
                'px-3 py-2 rounded-lg text-sm transition-colors',
                active
                  ? 'bg-teal-50 text-teal-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ].join(' ')}
            >
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="px-2 pb-4 border-t border-gray-100 pt-3">
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 text-left transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}
