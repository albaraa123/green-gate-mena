import { getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export default async function NotFound() {
  let locale = 'en'
  try {
    locale = await getLocale()
  } catch {}

  const isAr = locale === 'ar'

  return (
    <main id="main-content" className="flex flex-col items-center justify-center py-32 text-center px-4">
      <Container className="max-w-lg">
        <p className="font-mono text-xs uppercase tracking-widest text-teal-600 mb-5">404</p>
        <h1 className="font-display text-5xl md:text-7xl italic text-ink mb-6 leading-tight">
          {isAr ? 'الصفحة غير موجودة.' : 'Page not found.'}
        </h1>
        <p className="text-ink/55 text-lg mb-10 leading-relaxed">
          {isAr
            ? 'عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها.'
            : "Sorry, we couldn't find the page you're looking for."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/">{isAr ? 'العودة إلى الرئيسية' : 'Back to home'}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/ecosystem/opportunities">
              {isAr ? 'استكشف الفرص' : 'Browse opportunities'}
            </Link>
          </Button>
        </div>
      </Container>
    </main>
  )
}
