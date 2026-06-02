import { getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { BrandMark } from '@/components/home/BrandMark'

export default async function NotFound() {
  let locale = 'en'
  try {
    locale = await getLocale()
  } catch {}

  const isAr = locale === 'ar'

  return (
    <main
      id="main-content"
      className="relative min-h-[80vh] flex flex-col items-center justify-center py-24 text-center px-4 overflow-hidden bg-gradient-to-br from-white via-teal-50/40 to-lime/5"
    >
      {/* Decorative blurred blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 end-0 w-[500px] h-[500px] rounded-full bg-teal-100/50 blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 start-0 w-[400px] h-[400px] rounded-full bg-lime/10 blur-3xl" />
      </div>

      <Container className="relative z-10 max-w-lg flex flex-col items-center">
        {/* Faded brand mark behind the 404 */}
        <div className="w-28 h-28 mb-6 opacity-90">
          <BrandMark className="w-full h-full" duration={50} />
        </div>

        <p className="font-mono text-sm uppercase tracking-[0.3em] text-teal-600 mb-4">404</p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold text-teal-800 mb-5 leading-tight text-balance">
          {isAr ? 'الصفحة غير موجودة' : 'Page not found'}
        </h1>
        <p className="text-ink-soft text-lg mb-9 leading-relaxed max-w-md">
          {isAr
            ? 'عذراً، يبدو أن هذه الصفحة قد انتقلت أو لم تعد موجودة. دعنا نعيدك إلى المسار الصحيح.'
            : "Sorry, this page may have moved or no longer exists. Let's get you back on track."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link href="/">{isAr ? 'العودة إلى الرئيسية' : 'Back to home'}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/ecosystem/opportunities">
              {isAr ? 'استكشف الفرص' : 'Browse opportunities'}
            </Link>
          </Button>
        </div>
      </Container>
    </main>
  )
}
