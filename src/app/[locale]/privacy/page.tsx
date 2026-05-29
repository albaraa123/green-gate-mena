import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Green Gate MENA privacy policy — how we collect, use, and protect your data.',
}

interface Props {
  params: Promise<{ locale: string }>
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const isAr = locale === 'ar'

  return (
    <main id="main-content" className="py-20">
      <Container className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-teal-600 mb-4">
          {isAr ? 'قانوني' : 'Legal'}
        </p>
        <h1 className="font-display text-4xl md:text-5xl italic text-ink mb-4">
          {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
        </h1>
        <p className="text-ink/50 text-sm mb-12">
          {isAr ? 'آخر تحديث: يناير 2026' : 'Last updated: January 2026'}
        </p>

        <div className="prose prose-ink max-w-none space-y-10 text-ink/80 leading-relaxed">

          <section>
            <h2 className="font-display text-2xl italic text-ink mb-3">
              {isAr ? 'المعلومات التي نجمعها' : 'Information we collect'}
            </h2>
            <p>
              {isAr
                ? 'نجمع المعلومات التي تقدمها لنا مباشرةً، مثل عنوان بريدك الإلكتروني عند الاشتراك في نشرتنا الإخبارية، أو تفاصيل التواصل عند ملء نماذجنا.'
                : 'We collect information you provide directly to us, such as your email address when subscribing to our newsletter, or contact details when completing our forms (contact, directory, opportunity submission, or get-involved forms).'}
            </p>
            <p className="mt-3">
              {isAr
                ? 'قد نجمع أيضاً بيانات الاستخدام العامة (الصفحات المزارة، اللغة المفضلة) من خلال أدوات التحليل لتحسين تجربتك.'
                : 'We may also collect general usage data (pages visited, preferred language) through analytics tools to improve your experience.'}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl italic text-ink mb-3">
              {isAr ? 'كيف نستخدم معلوماتك' : 'How we use your information'}
            </h2>
            <ul className="list-disc ps-5 space-y-2">
              <li>{isAr ? 'إرسال نشرة الفرص الخضراء الدورية (بموافقتك فقط)' : 'Send our periodic green opportunities newsletter (only with your consent)'}</li>
              <li>{isAr ? 'الرد على استفساراتك' : 'Respond to your enquiries'}</li>
              <li>{isAr ? 'مراجعة طلبات الانضمام إلى الدليل أو إضافة الفرص' : 'Review directory join or opportunity submission requests'}</li>
              <li>{isAr ? 'تحسين موقعنا وخدماتنا' : 'Improve our website and services'}</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl italic text-ink mb-3">
              {isAr ? 'مشاركة البيانات' : 'Data sharing'}
            </h2>
            <p>
              {isAr
                ? 'لا نبيع معلوماتك الشخصية أو نؤجرها أو نتاجر بها لأي طرف ثالث. قد نشارك البيانات مع مزودي الخدمة الموثوقين (مثل خدمات البريد الإلكتروني) الضروريين لتشغيل الموقع، وذلك بموجب اتفاقيات خصوصية صارمة.'
                : 'We do not sell, rent, or trade your personal information to any third party. We may share data with trusted service providers (e.g. email delivery services) necessary to operate the site, under strict privacy agreements.'}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl italic text-ink mb-3">
              {isAr ? 'حقوقك' : 'Your rights'}
            </h2>
            <p>
              {isAr
                ? 'يحق لك طلب الوصول إلى بياناتك أو تصحيحها أو حذفها في أي وقت. للقيام بذلك، تواصل معنا عبر البريد الإلكتروني أدناه.'
                : 'You have the right to request access, correction, or deletion of your data at any time. To do so, contact us at the email below.'}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl italic text-ink mb-3">
              {isAr ? 'تواصل معنا' : 'Contact us'}
            </h2>
            <p>
              {isAr ? 'لأي أسئلة تتعلق بالخصوصية:' : 'For any privacy questions:'}
              {' '}
              <a href="mailto:hello@greengate-mena.org" className="text-teal-700 underline hover:text-teal-800">
                hello@greengate-mena.org
              </a>
            </p>
          </section>

        </div>
      </Container>
    </main>
  )
}
