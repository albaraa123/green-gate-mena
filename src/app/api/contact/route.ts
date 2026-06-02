import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown
    const data = schema.parse(body)

    await resend.emails.send({
      from: 'Green Gate <newsletter@greengatemena.com>',
      replyTo: data.email,
      to: 'greengate4menayouth@gmail.com',
      subject: `رسالة تواصل: ${data.subject}`,
      html: `
        <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f9fafb;">
          <div style="background:#00796b;border-radius:12px;padding:24px;margin-bottom:20px;">
            <h2 style="color:#c6e94a;margin:0;font-size:18px;">رسالة تواصل جديدة</h2>
          </div>
          <div style="background:white;border-radius:12px;padding:24px;">
            <table style="width:100%;font-size:14px;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#6b7280;width:120px;">الاسم</td><td style="padding:8px 0;font-weight:600;">${data.name}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;">البريد</td><td style="padding:8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;">الموضوع</td><td style="padding:8px 0;">${data.subject}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">الرسالة</td><td style="padding:8px 0;white-space:pre-wrap;">${data.message}</td></tr>
            </table>
            <p style="margin-top:16px;padding-top:16px;border-top:1px solid #e5e7eb;color:#9ca3af;font-size:12px;">
              للرد، اضغط Reply — سيصل ردك مباشرة إلى ${data.email}
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
