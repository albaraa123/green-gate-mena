import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const schema = z.object({
  email: z.string().email(),
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown
    const { email } = schema.parse(body)

    // Send welcome email to subscriber
    await resend.emails.send({
      from: 'Green Gate MENA <onboarding@resend.dev>',
      to: email,
      subject: 'مرحباً بك في Green Gate MENA 🌿',
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9fafb;">
          <div style="background: #00796b; border-radius: 12px; padding: 32px; text-align: center; margin-bottom: 24px;">
            <h1 style="color: #c6e94a; font-size: 24px; margin: 0 0 8px;">Green Gate MENA</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 14px;">بوابة العالم العربي إلى الفرص البيئية</p>
          </div>

          <div style="background: white; border-radius: 12px; padding: 32px; margin-bottom: 16px;">
            <h2 style="color: #00796b; font-size: 20px; margin: 0 0 16px;">أهلاً وسهلاً! 👋</h2>
            <p style="color: #374151; line-height: 1.8; margin: 0 0 16px;">
              شكراً لاشتراكك في نشرة Green Gate MENA. ستصلك أحدث الفرص المناخية والبيئية عبر 22 دولة عربية مباشرةً إلى بريدك.
            </p>
            <p style="color: #374151; line-height: 1.8; margin: 0 0 24px;">
              ما ستحصل عليه:
            </p>
            <ul style="color: #374151; line-height: 2; margin: 0 0 24px; padding-right: 20px;">
              <li>🎓 زمالات ومنح مفتوحة للشباب العربي</li>
              <li>📅 فعاليات وورش عمل بيئية</li>
              <li>📚 موارد ومعرفة في مجال الاستدامة</li>
              <li>🤝 فرص شراكة وتواصل مهني</li>
            </ul>
            <a href="https://green-gate-mena.vercel.app/ar" style="display: inline-block; background: #00796b; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              استكشف الفرص الآن ←
            </a>
          </div>

          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
            Green Gate MENA · للإلغاء الاشتراك تواصل معنا على greengate4menayouth@gmail.com
          </p>
        </div>
      `,
    })

    // Notify admin
    await resend.emails.send({
      from: 'Green Gate MENA <onboarding@resend.dev>',
      to: 'greengate4menayouth@gmail.com',
      subject: `مشترك جديد في النشرة: ${email}`,
      html: `<p>مشترك جديد: <strong>${email}</strong></p>`,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
