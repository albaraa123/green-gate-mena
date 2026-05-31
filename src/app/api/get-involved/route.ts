import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  pathway: z.enum(['youth', 'ngo', 'consultant', 'partner']),
  name: z.string().min(2),
  email: z.string().email(),
  organization: z.string().optional(),
  country: z.string(),
  message: z.string().optional(),
})

const PATHWAY_LABELS: Record<string, string> = {
  youth: 'شاب / Youth',
  ngo: 'منظمة / NGO',
  consultant: 'مستشار / Consultant',
  partner: 'شريك / Partner',
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown
    const data = schema.parse(body)

    const supabase = await createClient()

    // Save to database
    const { error: dbError } = await supabase.from('applications').insert({
      pathway: data.pathway,
      name: data.name,
      email: data.email,
      organization: data.organization ?? null,
      country: data.country,
      message: data.message ?? null,
      status: 'pending',
    })

    if (dbError) {
      console.error('[get-involved] DB error:', dbError.message)
    }

    // Notify admin via email
    await resend.emails.send({
      from: 'Green Gate MENA <onboarding@resend.dev>',
      replyTo: data.email,
      to: 'greengate4menayouth@gmail.com',
      subject: `طلب انضمام جديد: ${PATHWAY_LABELS[data.pathway]} — ${data.name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9fafb;">
          <div style="background: #00796b; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
            <h2 style="color: #c6e94a; margin: 0; font-size: 18px;">طلب انضمام جديد</h2>
            <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 14px;">${PATHWAY_LABELS[data.pathway]}</p>
          </div>
          <div style="background: white; border-radius: 12px; padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">الاسم</td><td style="padding: 8px 0; font-weight: 600;">${data.name}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">البريد</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">الدولة</td><td style="padding: 8px 0;">${data.country}</td></tr>
              ${data.organization ? `<tr><td style="padding: 8px 0; color: #6b7280;">المنظمة</td><td style="padding: 8px 0;">${data.organization}</td></tr>` : ''}
              ${data.message ? `<tr><td style="padding: 8px 0; color: #6b7280; vertical-align: top;">الرسالة</td><td style="padding: 8px 0;">${data.message}</td></tr>` : ''}
            </table>
            <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
              <a href="https://green-gate-mena.vercel.app/admin/applications"
                 style="display: inline-block; background: #00796b; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
                راجع الطلب في الأدمن ←
              </a>
            </div>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
