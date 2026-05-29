import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { GraduationCap, Users, Lightbulb, Globe, ArrowRight, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'For Youth',
  description:
    'Fellowships, grants, training programs, and events for young climate leaders across the MENA region.',
}
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { OpportunityCard } from '@/components/ecosystem/OpportunityCard'
import { getFeaturedOpportunities } from '@/lib/supabase/queries'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function ForYouthPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('servicesYouth')
  const featured = await getFeaturedOpportunities(3)

  const offerings = [
    { icon: GraduationCap, title: t('offering1Title'), description: t('offering1Desc') },
    { icon: Lightbulb, title: t('offering2Title'), description: t('offering2Desc') },
    { icon: Users, title: t('offering3Title'), description: t('offering3Desc') },
    { icon: Globe, title: t('offering4Title'), description: t('offering4Desc') },
  ]

  const pathways = [
    { label: t('pathway1Label'), description: t('pathway1Desc') },
    { label: t('pathway2Label'), description: t('pathway2Desc') },
    { label: t('pathway3Label'), description: t('pathway3Desc') },
    { label: t('pathway4Label'), description: t('pathway4Desc') },
  ]

  return (
    <main id="main-content">
      {/* Hero */}
      <div className="bg-teal-700 text-white grain-overlay py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow text-teal-300/70 mb-4">{t('heroEyebrow')}</p>
            <h1 className="font-display text-display-lg text-white text-balance">
              {t('heroHeadingPre')}{' '}
              <em className="not-italic font-display italic text-lime">{t('heroHeadingItalic')}</em>
            </h1>
            <p className="mt-6 text-teal-300/80 text-lg leading-relaxed max-w-xl">
              {t('heroSubhead')}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" variant="lime">
                <Link href="/ecosystem/opportunities">{t('heroCta1')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link href="/get-involved/youth">{t('heroCta2')}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Pathway chips */}
      <div className="bg-teal-700 py-5">
        <Container>
          <div className="flex flex-wrap gap-3 justify-center">
            {pathways.map(({ label, description }) => (
              <div key={label} className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-center">
                <span className="text-sm font-semibold text-white">{label}</span>
                <span className="text-xs text-teal-300/70">{description}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* What we offer */}
      <section className="section-padding bg-paper">
        <Container>
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">{t('offeringsEyebrow')}</p>
            <h2 className="font-display text-display-lg text-teal-800 text-balance">
              {t('offeringsHeadingPre')}{' '}
              <em className="not-italic italic text-teal-700">{t('offeringsHeadingItalic')}</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offerings.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-5 rounded-2xl bg-paper-warm border border-sand-200 p-6 hover:shadow-sm transition-shadow"
              >
                <div className="h-12 w-12 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
                  <Icon className="h-6 w-6 text-teal-700" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured opportunities */}
      <section className="section-padding bg-paper-warm grain-overlay">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="eyebrow mb-2">{t('featuredEyebrow')}</p>
              <h2 className="font-display text-2xl font-semibold text-teal-800">{t('featuredHeading')}</h2>
            </div>
            <Link
              href="/ecosystem/opportunities"
              className="flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-800 transition-colors"
            >
              {t('viewAll')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featured.map((opp) => (
              <OpportunityCard key={opp.slug} opportunity={opp} locale={locale} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding bg-teal-700 grain-overlay text-center">
        <Container className="max-w-2xl">
          <Star className="h-10 w-10 text-lime mx-auto mb-4" />
          <h2 className="font-display text-display-lg text-white text-balance">
            {t('ctaHeadingPre')}{' '}
            <em className="not-italic italic text-lime">{t('ctaHeadingItalic')}</em>
          </h2>
          <p className="mt-4 text-teal-300/80 leading-relaxed">{t('ctaSubhead')}</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="lime">
              <Link href="/get-involved/youth">
                {t('ctaJoinYouth')} <ArrowRight className="ms-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link href="/ecosystem/opportunities">{t('ctaBrowse')}</Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  )
}
