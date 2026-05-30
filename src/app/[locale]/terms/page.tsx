import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for the Green Gate MENA platform.',
}

interface Props {
  params: Promise<{ locale: string }>
}

export default async function TermsPage({ params }: Props) {
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
          {isAr ? 'شروط الاستخدام' : 'Terms of Use'}
        </h1>
        <p className="text-ink/50 text-sm mb-12">
          {isAr ? 'آخر تحديث: يناير 2026' : 'Last updated: January 2026'}
        </p>

        <div className="prose prose-ink max-w-none space-y-10 text-ink/80 leading-relaxed">

          <section>
            <h2 className="font-display text-2xl italic text-ink mb-3">
              {isAr ? 'قبول الشروط' : 'Acceptance of terms'}
            </h2>
            <p>
              {isAr
                ? 'باستخدامك لموقع Green Gate MENA، فإنك توافق على هذه الشروط. إذا كنت لا توافق عليها، يُرجى عدم استخدام الموقع.'
                : 'By using the Green Gate MENA website, you agree to these terms. If you do not agree, please do not use the site.'}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl italic text-ink mb-3">
              {isAr ? 'استخدام المنصة' : 'Use of the platform'}
            </h2>
            <p>
              {isAr
                ? 'المحتوى على هذا الموقع مقدم لأغراض إعلامية فقط. تُقدِّم Green Gate MENA فرصاً وموارد ومجتمعاً لقطاع البيئة والمناخ في منطقة الشرق الأوسط وشمال أفريقيا. لا نضمن دقة أو اكتمال أي محتوى مقدم من جهات خارجية.'
                : 'Content on this site is provided for informational purposes only. Green Gate MENA curates opportunities, resources, and community for the MENA climate and environment sector. We do not guarantee the accuracy or completeness of any third-party content.'}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl italic text-ink mb-3">
              {isAr ? 'المحتوى الذي تقدمه' : 'Content you submit'}
            </h2>
            <p>
              {isAr
                ? 'عند تقديم فرصة أو ملف شخصي في الدليل أو أي محتوى آخر، فإنك تؤكد أن هذا المحتوى دقيق وأنك مخوّل بتقديمه. نحتفظ بالحق في مراجعة أي محتوى مقدم ورفضه أو إزالته إذا كان ينتهك هذه الشروط.'
                : 'When submitting an opportunity, directory profile, or any other content, you confirm that the content is accurate and that you are authorised to submit it. We reserve the right to review, reject, or remove any submitted content that violates these terms.'}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl italic text-ink mb-3">
              {isAr ? 'الملكية الفكرية' : 'Intellectual property'}
            </h2>
            <p>
              {isAr
                ? 'جميع محتويات الموقع — بما في ذلك الشعارات والتصاميم والنصوص — مملوكة لـ Green Gate MENA أو مرخصة لها. لا يجوز إعادة استخدامها تجارياً دون إذن خطي مسبق.'
                : 'All site content — including logos, designs, and text — is owned by or licensed to Green Gate MENA. It may not be commercially reused without prior written permission.'}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl italic text-ink mb-3">
              {isAr ? 'التغييرات على الشروط' : 'Changes to terms'}
            </h2>
            <p>
              {isAr
                ? 'قد نحدّث هذه الشروط من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة مع تحديث تاريخ "آخر تحديث".'
                : 'We may update these terms from time to time. Any changes will be posted on this page with an updated "last updated" date.'}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl italic text-ink mb-3">
              {isAr ? 'تواصل معنا' : 'Contact us'}
            </h2>
            <p>
              {isAr ? 'لأي أسئلة تتعلق بهذه الشروط:' : 'For questions about these terms:'}
              {' '}
              <a href="mailto:greengate4menayouth@gmail.com" className="text-teal-700 underline hover:text-teal-800">
                greengate4menayouth@gmail.com
              </a>
            </p>
          </section>

        </div>
      </Container>
    </main>
  )
}
