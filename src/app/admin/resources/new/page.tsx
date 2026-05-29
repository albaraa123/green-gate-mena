import { ResourceForm } from '../_components/ResourceForm'

export const metadata = { title: 'New Resource' }

export default function NewResourcePage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">New Resource</h1>
      <ResourceForm />
    </div>
  )
}
