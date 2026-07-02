import { ProgramForm } from '../_components/ProgramForm'

export const metadata = { title: 'New Program' }

export default function NewProgramPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">New Program</h1>
      <ProgramForm />
    </div>
  )
}
