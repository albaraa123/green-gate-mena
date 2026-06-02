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

    const { data: setting } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'newsletter_header')
      .maybeSingle()
    const headerImage = (setting?.value as string) || ''

    const headerHtml = headerImage
      ? `<div style="border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
           <img src="${headerImage}" alt="Green Gate" style="display: block; width: 100%; max-width: 600px;" />
           ${previewText ? `<p style="color: #6b7280; margin: 12px 0 0; font-size: 13px; text-align: center;">${previewText}</p>` : ''}
         </div>`
      : `<div style="background: #00796b; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
           <h1 style="color: #c6e94a; font-size: 20px; margin: 0 0 6px;">Green Gate — TEST</h1>
           ${previewText ? `<p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 13px;">${previewText}</p>` : ''}
         </div>`

    const emailHtml = `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9fafb;">
        ${headerHtml}
        <div style="background: white; border-radius: 12px; padding: 32px; white-space: pre-wrap;">
          ${content.replace(/\n/g, '<br>')}
        </div>
      </div>
    `

    await resend.emails.send({
      from: 'Green Gate <newsletter@greengatemena.com>',
      to: 'greengate4menayouth@gmail.com',
      subject: `[TEST] ${subject}`,
      html: emailHtml,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
