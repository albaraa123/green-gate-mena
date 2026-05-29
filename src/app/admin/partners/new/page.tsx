import { PartnerForm } from '../_components/PartnerForm'

export const metadata = { title: 'New Partner' }

export default function NewPartnerPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">New Partner</h1>
      <PartnerForm />
    </div>
  )
}
