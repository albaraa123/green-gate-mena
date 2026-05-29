import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Accessibility',
  description: 'Green Gate MENA accessibility statement — our commitment to an inclusive web experience.',
}

interface Props {
  params: Promise<{ locale: string }>
}

export default async function AccessibilityPage({ params }: Props) {
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
          {isAr ? 'إمكانية الوصول' : 'Accessibility'}
        </h1>
        <p className="text-ink/50 text-sm mb-12">
          {isAr ? 'آخر تحديث: يناير 2026' : 'Last updated: January 2026'}
        </p>

        <div className="prose prose-ink max-w-none space-y-10 text-ink/80 leading-relaxed">

          <section>
            <h2 className="font-display text-2xl italic text-ink mb-3">
              {isAr ? 'التزامنا' : 'Our commitment'}
            </h2>
            <p>
              {isAr
                ? 'تلتزم Green Gate MENA بتوفير تجربة رقمية شاملة يمكن الوصول إليها لجميع المستخدمين، بصرف النظر عن قدراتهم أو احتياجاتهم. نسعى إلى الامتثال لمبادئ WCAG 2.1 المستوى AA.'
                : 'Green Gate MENA is committed to providing a digital experience that is accessible to all users, regardless of their abilities or needs. We aim to conform to WCAG 2.1 Level AA guidelines.'}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl italic text-ink mb-3">
              {isAr ? 'ميزات إمكانية الوصول' : 'Accessibility features'}
            </h2>
            <ul className="list-disc ps-5 space-y-2">
              <li>{isAr ? 'دعم كامل للتصفح بلوحة المفاتيح' : 'Full keyboard navigation support'}</li>
              <li>{isAr ? 'رابط "تخطي إلى المحتوى الرئيسي" في كل صفحة' : '"Skip to main content" link on every page'}</li>
              <li>{isAr ? 'نسب تباين ألوان متوافقة مع WCAG AA' : 'Colour contrast ratios conforming to WCAG AA'}</li>
              <li>{isAr ? 'نصوص بديلة لجميع الصور المعلوماتية' : 'Alternative text for all informational images'}</li>
              <li>{isAr ? 'دعم اتجاه النص من اليمين إلى اليسار للمحتوى العربي' : 'Right-to-left text direction support for Arabic content'}</li>
              <li>{isAr ? 'تسميات ARIA لعناصر الواجهة التفاعلية' : 'ARIA labels for interactive UI elements'}</li>
              <li>{isAr ? 'هيكل عنوان واضح في كل الصفحات' : 'Clear heading structure on every page'}</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl italic text-ink mb-3">
              {isAr ? 'المشكلات المعروفة' : 'Known issues'}
            </h2>
            <p>
              {isAr
                ? 'نعمل بشكل مستمر على تحسين إمكانية الوصول. إذا واجهت أي مشكلة، يُرجى إبلاغنا بها عبر البريد الإلكتروني أدناه.'
                : 'We continuously work to improve accessibility. If you encounter any issues, please let us know via the email below.'}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl italic text-ink mb-3">
              {isAr ? 'تواصل معنا' : 'Contact us'}
            </h2>
            <p>
              {isAr
                ? 'إذا كنت تواجه صعوبة في الوصول إلى أي جزء من الموقع، تواصل معنا:'
                : 'If you experience difficulty accessing any part of the site, please contact us:'}
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
