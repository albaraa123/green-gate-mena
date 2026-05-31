'use client'

import { useState, useTransition } from 'react'
import { updateApplicationStatus } from '../_actions'

interface Application {
  id: string
  pathway: string
  pathwayLabel: string
  name: string
  email: string
  organization: string | null
  country: string
  message: string | null
  status: string
  created_at: string
}

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  approved: 'bg-green-50 text-green-700 border-green-200',
  rejected: 'bg-red-50 text-red-600 border-red-200',
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
}

const PATHWAY_COLORS: Record<string, string> = {
  youth: 'bg-teal-50 text-teal-700',
  ngo: 'bg-blue-50 text-blue-700',
  consultant: 'bg-purple-50 text-purple-700',
  partner: 'bg-lime-50 text-lime-700',
}

function StatusButton({ id, action, label, className }: {
  id: string
  action: 'approved' | 'rejected' | 'pending'
  label: string
  className: string
}) {
  const [isPending, startTransition] = useTransition()
  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(() => updateApplicationStatus(id, action))}
      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 ${className}`}
    >
      {isPending ? '...' : label}
    </button>
  )
}

export function ApplicationsTable({ applications }: { applications: Application[] }) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [pathwayFilter, setPathwayFilter] = useState<string>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = applications.filter(a => {
    if (filter !== 'all' && a.status !== filter) return false
    if (pathwayFilter !== 'all' && a.pathway !== pathwayFilter) return false
    return true
  })

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-1">
          {(['all', 'pending', 'approved', 'rejected'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === s ? 'bg-teal-700 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-teal-300'
              }`}
            >
              {s === 'all' ? 'All' : STATUS_LABELS[s]}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {(['all', 'youth', 'ngo', 'consultant', 'partner'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPathwayFilter(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                pathwayFilter === p ? 'bg-gray-700 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              {p === 'all' ? 'All types' : p}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 text-sm">No applications found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(app => (
            <div key={app.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpanded(expanded === app.id ? null : app.id)}
              >
                {/* Pathway badge */}
                <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${PATHWAY_COLORS[app.pathway] ?? 'bg-gray-100 text-gray-600'}`}>
                  {app.pathwayLabel}
                </span>

                {/* Name + email */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">{app.name}</p>
                  <p className="text-xs text-gray-500 truncate">{app.email} · {app.country}</p>
                </div>

                {/* Date */}
                <p className="shrink-0 text-xs text-gray-400">
                  {new Date(app.created_at).toLocaleDateString('en-GB')}
                </p>

                {/* Status */}
                <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_STYLES[app.status] ?? STATUS_STYLES.pending}`}>
                  {STATUS_LABELS[app.status] ?? app.status}
                </span>

                <span className="text-gray-300 text-sm">{expanded === app.id ? '▲' : '▼'}</span>
              </div>

              {/* Expanded details */}
              {expanded === app.id && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4 flex flex-col gap-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    {app.organization && (
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">Organization</p>
                        <p className="text-gray-700">{app.organization}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Country</p>
                      <p className="text-gray-700">{app.country}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Type</p>
                      <p className="text-gray-700 capitalize">{app.pathway}</p>
                    </div>
                  </div>

                  {app.message && (
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Message</p>
                      <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 leading-relaxed">{app.message}</p>
                    </div>
                  )}

                  {/* Actions */}
                  {app.status === 'pending' && (
                    <div className="flex gap-2 pt-1">
                      <StatusButton
                        id={app.id}
                        action="approved"
                        label="✓ Approve"
                        className="bg-green-600 text-white hover:bg-green-700"
                      />
                      <StatusButton
                        id={app.id}
                        action="rejected"
                        label="✕ Reject"
                        className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                      />
                      <a
                        href={`mailto:${app.email}`}
                        className="px-3 py-1 rounded-lg text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50"
                      >
                        Reply by email
                      </a>
                    </div>
                  )}
                  {app.status !== 'pending' && (
                    <div className="flex gap-2 pt-1">
                      <StatusButton
                        id={app.id}
                        action="pending"
                        label="↩ Reset to Pending"
                        className="border border-gray-200 text-gray-600 hover:bg-gray-50"
                      />
                      <a
                        href={`mailto:${app.email}`}
                        className="px-3 py-1 rounded-lg text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50"
                      >
                        Reply by email
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
