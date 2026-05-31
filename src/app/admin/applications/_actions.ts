'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const PATHWAY_LABELS_AR: Record<string, string> = {
  youth: 'شاب في المجتمع البيئي',
  ngo: 'منظمة بيئية في الدليل',
  consultant: 'مستشار بيئي معتمد',
  partner: 'شريك استراتيجي',
}

const DIRECTORY_TYPES: Record<string, string> = {
  consultant: 'individual',
  ngo: 'ngo',
  partner: 'institution',
  youth: 'individual',
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[؀-ۿ]/g, (c) => c)
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50) + '-' + Date.now()
}

export async function updateApplicationStatus(
  id: string,
  status: 'approved' | 'rejected' | 'pending'
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Fetch application details
  const { data: app } = await supabase
    .from('applications')
    .select('*')
    .eq('id', id)
    .single()

  // Update status
  const { error } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', id)

  if (error) throw new Error(error.message)

  // On approval
  if (status === 'approved' && app) {
    // 1. Send acceptance email to applicant
    await resend.emails.send({
      from: 'Green Gate MENA <onboarding@resend.dev>',
      replyTo: 'greengate4menayouth@gmail.com',
      to: app.email as string,
      subject: `🌿 تهانينا! تم قبول طلبك في Green Gate MENA`,
      html: `
        <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f9fafb;">
          <div style="background:#00796b;border-radius:12px;padding:32px;text-align:center;margin-bottom:24px;">
            <h1 style="color:#c6e94a;font-size:22px;margin:0 0 8px;">Green Gate MENA</h1>
            <p style="color:rgba(255,255,255,0.8);margin:0;font-size:14px;">مجتمع المناخ والبيئة في العالم العربي</p>
          </div>
          <div style="background:white;border-radius:12px;padding:32px;">
            <h2 style="color:#00796b;font-size:20px;margin:0 0 16px;">أهلاً ${app.name as string}! 🎉</h2>
            <p style="color:#374151;line-height:1.8;margin:0 0 16px;">
              يسعدنا إخبارك بأن طلبك للانضمام إلى Green Gate MENA كـ <strong>${PATHWAY_LABELS_AR[app.pathway as string] ?? app.pathway}</strong> قد تم قبوله.
            </p>
            <p style="color:#374151;line-height:1.8;margin:0 0 24px;">
              انضممت الآن إلى مجتمع من الشباب والمنظمات والمستشارين الذين يعملون على بناء مستقبل مستدام في المنطقة العربية.
            </p>
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin:0 0 24px;">
              <p style="color:#166534;font-size:14px;margin:0;font-weight:600;">الخطوات التالية:</p>
              <ul style="color:#374151;font-size:14px;line-height:2;margin:8px 0 0;padding-right:20px;">
                <li>سيتواصل معك فريقنا قريباً على هذا البريد أو عبر الواتساب</li>
                <li>تابعنا على وسائل التواصل الاجتماعي للبقاء على اطلاع</li>
                <li>ستجد ملفك في دليل المنصة قريباً</li>
              </ul>
            </div>
            <a href="https://green-gate-mena.vercel.app/ar/ecosystem/opportunities"
               style="display:inline-block;background:#00796b;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">
              استكشف الفرص ←
            </a>
          </div>
          <p style="color:#9ca3af;font-size:12px;text-align:center;margin:20px 0 0;">
            Green Gate MENA · للتواصل: greengate4menayouth@gmail.com
          </p>
        </div>
      `,
    })

    // 2. Auto-create directory profile for consultants, NGOs, and partners
    if (['consultant', 'ngo', 'partner'].includes(app.pathway as string)) {
      const slug = generateSlug(app.name as string)
      await supabase.from('directory_profiles').insert({
        slug,
        name: app.name,
        type: DIRECTORY_TYPES[app.pathway as string] ?? 'individual',
        country: app.country,
        description: app.bio ?? '',
        themes: [],
        email: app.email,
        website: app.linkedin ?? null,
        logo: app.avatar ?? null,
        verified: true,
        tags: [app.pathway],
      })
    }
  }

  revalidatePath('/admin/applications')
}
