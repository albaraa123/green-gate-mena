import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  subject: z.string().min(1),
  previewText: z.string().optional(),
  content: z.string().min(1),
})

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json() as unknown
    const { subject, previewText, content } = schema.parse(body)

    // Get all active subscribers
    const { data: contactsData } = await resend.contacts.list({
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    })
    const contacts = contactsData?.data ?? []
    const activeContacts = contacts.filter((c: { unsubscribed: boolean }) => !c.unsubscribed)

    if (activeContacts.length === 0) {
      return NextResponse.json({ error: 'No active subscribers' }, { status: 400 })
    }

    // Fetch the custom newsletter header image (if set)
    const { data: setting } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'newsletter_header')
      .maybeSingle()
    const headerImage = (setting?.value as string) || ''

    const headerHtml = headerImage
      ? `<div style="border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
           <img src="${headerImage}" alt="Green Gate" style="display: block; width: 100%; max-width: 600px;" />
           ${previewText ? `<p style="color: #6b7280; margin: 12px 0 0; font-size: 14px; text-align: center;">${previewText}</p>` : ''}
         </div>`
      : `<div style="background: #00796b; border-radius: 12px; padding: 32px; text-align: center; margin-bottom: 24px;">
           <h1 style="color: #c6e94a; font-size: 24px; margin: 0 0 8px;">Green Gate</h1>
           ${previewText ? `<p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 14px;">${previewText}</p>` : ''}
         </div>`

    // Send to all active subscribers
    const emailHtml = `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9fafb;">
        ${headerHtml}
        <div style="background: white; border-radius: 12px; padding: 32px; margin-bottom: 16px; white-space: pre-wrap;">
          ${content.replace(/\n/g, '<br>')}
        </div>
        <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
          Green Gate · للإلغاء الاشتراك تواصل معنا على greengate4menayouth@gmail.com
        </p>
      </div>
    `

    const results = await Promise.allSettled(
      activeContacts.map((contact: { email: string }) =>
        resend.emails.send({
          from: 'Green Gate <newsletter@greengatemena.com>',
          replyTo: 'greengate4menayouth@gmail.com',
          to: contact.email,
          subject,
          html: emailHtml,
        })
      )
    )

    const sent = results.filter(r => r.status === 'fulfilled').length
    const failed = results.filter(r => r.status === 'rejected').length

    return NextResponse.json({ sent, failed, total: activeContacts.length })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to send newsletter' }, { status: 500 })
  }
}
