import { ServiceForm } from '../_components/ServiceForm'

export const metadata = { title: 'New Service' }

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">New Service</h1>
      <ServiceForm />
    </div>
  )
}
