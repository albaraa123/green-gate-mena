'use client'

import Link from 'next/link'
import { useTransition } from 'react'
import { swapTeamOrder, deleteTeamMember } from '../../_actions/team'

interface Member {
  id: string
  name: string
  role: string
  country: string
  sort_order: number
}

interface Props {
  members: Member[]
}

export function TeamOrderTable({ members }: Props) {
  const [isPending, startTransition] = useTransition()

  function move(index: number, dir: -1 | 1) {
    const a = members[index]
    const b = members[index + dir]
    if (!a || !b) return
    startTransition(() => swapTeamOrder(a.id, a.sort_order, b.id, b.sort_order))
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this team member?')) return
    startTransition(() => deleteTeamMember(id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Team</h1>
        <Link
          href="/admin/team/new"
          className="bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-800 transition-colors"
        >
          Add New
        </Link>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Use the arrows to reorder. The order here is reflected on the public About page.
      </p>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600 w-24">Order</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Role</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Country</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {members.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-gray-400">
                  No team members yet.
                </td>
              </tr>
            ) : (
              members.map((m, i) => (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => move(i, -1)}
                        disabled={i === 0 || isPending}
                        className="w-7 h-7 rounded border border-gray-200 text-gray-500 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                        title="Move up"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => move(i, 1)}
                        disabled={i === members.length - 1 || isPending}
                        className="w-7 h-7 rounded border border-gray-200 text-gray-500 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                        title="Move down"
                      >
                        ▼
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{m.name}</td>
                  <td className="px-4 py-3 text-gray-700">{m.role}</td>
                  <td className="px-4 py-3 text-gray-700">{m.country}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/team/${encodeURIComponent(m.id)}`}
                        className="text-teal-700 hover:text-teal-900 text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(m.id)}
                        disabled={isPending}
                        className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
