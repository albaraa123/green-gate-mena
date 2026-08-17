import { ImpactHighlightForm } from '../_components/ImpactHighlightForm'

export const metadata = { title: 'New Impact Highlight' }

export default function NewImpactHighlightPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">New Impact Highlight</h1>
      <ImpactHighlightForm />
    </div>
  )
}
