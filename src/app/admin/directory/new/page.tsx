import { DirectoryForm } from '../_components/DirectoryForm'

export const metadata = { title: 'New Directory Profile' }

export default function NewDirectoryPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">New Directory Profile</h1>
      <DirectoryForm />
    </div>
  )
}
