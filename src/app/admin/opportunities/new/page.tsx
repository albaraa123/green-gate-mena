import { OpportunityForm } from '../_components/OpportunityForm'

export const metadata = { title: 'New Opportunity' }

export default function NewOpportunityPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">New Opportunity</h1>
      <OpportunityForm />
    </div>
  )
}
