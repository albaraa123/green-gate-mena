import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  pathway: z.enum(['youth', 'ngo', 'consultant', 'partner']),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  organization: z.string().optional(),
  country: z.string(),
  linkedin: z.string().optional(),
  bio: z.string().min(20),
  avatar: z.string().optional(),
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

    await supabase.from('applications').insert({
      pathway: data.pathway,
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      organization: data.organization ?? null,
      country: data.country,
      linkedin: data.linkedin ?? null,
      bio: data.bio,
      avatar: data.avatar ?? null,
      message: null,
      status: 'pending',
    })

    // Notify admin
    await resend.emails.send({
      from: 'Green Gate <newsletter@greengatemena.com>',
      replyTo: data.email,
      to: 'greengate4menayouth@gmail.com',
      subject: `طلب انضمام جديد: ${PATHWAY_LABELS[data.pathway]} — ${data.name}`,
      html: `
        <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f9fafb;">
          <div style="background:#00796b;border-radius:12px;padding:24px;margin-bottom:20px;">
            <h2 style="color:#c6e94a;margin:0;font-size:18px;">طلب انضمام جديد</h2>
            <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px;">${PATHWAY_LABELS[data.pathway]}</p>
          </div>
          <div style="background:white;border-radius:12px;padding:24px;">
            ${data.avatar ? `<img src="${data.avatar}" style="width:64px;height:64px;border-radius:50%;object-fit:cover;margin-bottom:16px;">` : ''}
            <table style="width:100%;font-size:14px;border-collapse:collapse;">
              <tr><td style="padding:6px 0;color:#6b7280;width:130px;">الاسم</td><td style="padding:6px 0;font-weight:600;">${data.name}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280;">البريد</td><td style="padding:6px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
              ${data.phone ? `<tr><td style="padding:6px 0;color:#6b7280;">الهاتف</td><td style="padding:6px 0;">${data.phone}</td></tr>` : ''}
              <tr><td style="padding:6px 0;color:#6b7280;">الدولة</td><td style="padding:6px 0;">${data.country}</td></tr>
              ${data.organization ? `<tr><td style="padding:6px 0;color:#6b7280;">المنظمة</td><td style="padding:6px 0;">${data.organization}</td></tr>` : ''}
              ${data.linkedin ? `<tr><td style="padding:6px 0;color:#6b7280;">LinkedIn</td><td style="padding:6px 0;"><a href="${data.linkedin}">${data.linkedin}</a></td></tr>` : ''}
              <tr><td style="padding:6px 0;color:#6b7280;vertical-align:top;">النبذة</td><td style="padding:6px 0;">${data.bio}</td></tr>
            </table>
            <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e5e7eb;">
              <a href="https://green-gate-mena.vercel.app/admin/applications"
                 style="background:#00796b;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">
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
