import { TeamForm } from '../_components/TeamForm'

export const metadata = { title: 'New Team Member' }

export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">New Team Member</h1>
      <TeamForm />
    </div>
  )
}
