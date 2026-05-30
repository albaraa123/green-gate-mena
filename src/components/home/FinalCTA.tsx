import { getTranslations } from 'next-intl/server'
import { ArrowRight, Leaf } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { AnimateIn } from '@/components/ui/AnimateIn'

export async function FinalCTA() {
  const t = await getTranslations('getInvolved')
  const tCommon = await getTranslations('common')

  return (
    <section className="relative overflow-hidden bg-teal-700 py-24 grain-overlay">
      <div
        className="absolute -top-24 -start-24 h-72 w-72 rounded-full bg-teal-700/30 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-24 -end-24 h-72 w-72 rounded-full bg-lime/10 blur-3xl"
        aria-hidden
      />

      <Container className="relative z-10 text-center">
        <AnimateIn>
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime/20 backdrop-blur-sm">
          <Leaf className="h-7 w-7 text-lime" />
        </div>

        <h2 className="font-display text-display-lg text-white text-balance mx-auto max-w-2xl">
          {t('heading')}{' '}
          <span className="relative inline-block">
            <em className="not-italic font-display italic text-lime">{t('headingItalic')}.</em>
            <span
              className="absolute -bottom-1 left-0 right-0 h-3 bg-lime/20 -skew-x-6 -z-10 rounded-sm"
              aria-hidden
            />
          </span>
        </h2>

        <p className="mt-4 mx-auto max-w-xl text-teal-300/80 leading-relaxed text-lg">
          {t('subhead')}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/ecosystem/opportunities">
              {tCommon('exploreOpportunities')} <ArrowRight className="ms-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
            <Link href="/get-involved/youth">
              {tCommon('joinCommunity')}
            </Link>
          </Button>
        </div>

        <p className="mt-10 text-xs text-teal-400/60 font-mono tracking-wide">
          {t('trustLine')}
        </p>
        </AnimateIn>
      </Container>
    </section>
  )
}
