import { createClient } from '@/lib/supabase/server'
import { ApplicationsTable } from './_components/ApplicationsTable'

export const metadata = { title: 'Applications' }

const PATHWAY_LABELS: Record<string, string> = {
  youth: 'شاب',
  ngo: 'منظمة',
  consultant: 'مستشار',
  partner: 'شريك',
}

export default async function ApplicationsPage() {
  const supabase = await createClient()

  const { data: applications } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })

  const counts = {
    total: applications?.length ?? 0,
    pending: applications?.filter(a => a.status === 'pending').length ?? 0,
    approved: applications?.filter(a => a.status === 'approved').length ?? 0,
    rejected: applications?.filter(a => a.status === 'rejected').length ?? 0,
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Applications</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total', value: counts.total, color: 'text-gray-900' },
          { label: 'Pending', value: counts.pending, color: 'text-amber-600' },
          { label: 'Approved', value: counts.approved, color: 'text-green-600' },
          { label: 'Rejected', value: counts.rejected, color: 'text-red-500' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className={`text-2xl font-semibold ${color}`}>{value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <ApplicationsTable
        applications={(applications ?? []).map(a => ({
          ...a,
          pathwayLabel: PATHWAY_LABELS[a.pathway as string] ?? a.pathway,
        }))}
      />
    </div>
  )
}
