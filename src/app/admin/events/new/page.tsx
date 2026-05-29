import { EventForm } from '../_components/EventForm'

export const metadata = { title: 'New Event' }

export default function NewEventPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">New Event</h1>
      <EventForm />
    </div>
  )
}
