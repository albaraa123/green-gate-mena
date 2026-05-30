import { Resend } from 'resend'
import { NewsletterComposer } from './_components/NewsletterComposer'

const resend = new Resend(process.env.RESEND_API_KEY)

export const metadata = { title: 'Newsletter' }

export default async function NewsletterPage() {
  let totalContacts = 0
  let activeContacts = 0

  try {
    const { data } = await resend.contacts.list({ audienceId: process.env.RESEND_AUDIENCE_ID! })
    const contacts = data?.data ?? []
    totalContacts = contacts.length
    activeContacts = contacts.filter((c: { unsubscribed: boolean }) => !c.unsubscribed).length
  } catch {
    // fail silently
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Newsletter</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-3xl font-semibold text-teal-700">{activeContacts}</p>
          <p className="text-sm text-gray-600 mt-1">Active Subscribers</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-3xl font-semibold text-gray-400">{totalContacts - activeContacts}</p>
          <p className="text-sm text-gray-600 mt-1">Unsubscribed</p>
        </div>
      </div>

      {/* Composer */}
      <NewsletterComposer activeCount={activeContacts} />
    </div>
  )
}
