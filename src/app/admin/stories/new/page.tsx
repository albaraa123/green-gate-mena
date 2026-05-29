import { StoryForm } from '../_components/StoryForm'

export const metadata = { title: 'New Story' }

export default function NewStoryPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">New Story</h1>
      <StoryForm />
    </div>
  )
}
