import Link from 'next/link'
import { DeleteButton } from './DeleteButton'

interface Column<T> {
  key: keyof T | string
  label: string
  render?: (row: T) => React.ReactNode
}

interface Props<T extends { id: string }> {
  rows: T[]
  columns: Column<T>[]
  editBase: string
  deleteAction: (id: string) => Promise<void>
  addHref: string
  title: string
  emptyMessage?: string
}

export function AdminTable<T extends { id: string }>({
  rows,
  columns,
  editBase,
  deleteAction,
  addHref,
  title,
  emptyMessage = 'No items yet.',
}: Props<T>) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        <Link
          href={addHref}
          className="bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-800 transition-colors"
        >
          Add New
        </Link>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-4 py-3 text-left font-medium text-gray-600"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-10 text-center text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3 text-gray-700">
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[String(col.key)] ?? '—')}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`${editBase}/${encodeURIComponent(row.id)}`}
                        className="text-teal-700 hover:text-teal-900 text-sm"
                      >
                        Edit
                      </Link>
                      <DeleteButton id={row.id} action={deleteAction} />
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
