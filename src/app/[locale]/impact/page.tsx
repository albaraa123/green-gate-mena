import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Quote, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Impact & Stories',
  description:
    'Our impact: 15,000+ youth engaged, 850+ opportunities listed, 45+ countries reached. Real stories from the Green Gate MENA community.',
}
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { getStories, getPartners } from '@/lib/supabase/queries'
import { impactStats, impactTimeline } from '@/data/stats'
import { getCountryName } from '@/data/countries'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function ImpactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('impactPage')
  const isAr = locale === 'ar'

  const [stories, allPartners] = await Promise.all([getStories(), getPartners()])
  const strategic = allPartners.filter((p) => p.tier === 'strategic' || p.tier === 'program')

  return (
    <main id="main-content">
      {/* Hero */}
      <div className="bg-teal-700 text-white grain-overlay py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow text-teal-300/70 mb-4">{t('heroEyebrow')}</p>
            <h1 className="font-display text-display-lg text-white text-balance">
              {t('heroHeadingPre')}{' '}
              <span className="relative inline-block">
                <em className="not-italic font-display italic text-lime">{t('heroHeadingItalic')}</em>
                <span
                  className="absolute -bottom-1 left-0 right-0 h-2.5 bg-lime/20 -skew-x-6 -z-10 rounded-sm"
                  aria-hidden
                />
              </span>
            </h1>
            <p className="mt-6 text-teal-300/80 text-lg leading-relaxed max-w-xl">
              {t('heroSubhead')}
            </p>
          </div>
        </Container>
      </div>

      {/* Stats */}
      <section className="bg-teal-700 border-b border-teal-700/50">
        <Container>
          <dl className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y md:divide-y-0 divide-teal-700/40">
            {impactStats.map((stat) => {
              const label = isAr ? (stat.labelAr ?? stat.label) : stat.label
              const description = isAr ? (stat.descriptionAr ?? stat.description) : stat.description
              const numericPart = stat.value.replace(/[^0-9]/g, '')
              const suffix = stat.value.replace(/[0-9]/g, '')
              const target = parseInt(numericPart, 10)
              return (
                <div key={stat.label} className="flex flex-col gap-1 py-8 px-6">
                  <dt className="font-display text-3xl md:text-4xl font-semibold text-white">
                    {!isNaN(target) ? (
                      <AnimatedCounter target={target} suffix={suffix} />
                    ) : (
                      stat.value
                    )}
                  </dt>
                  <dd className="text-sm font-semibold text-teal-300">{label}</dd>
                  {description && (
                    <p className="text-xs text-teal-300/60 leading-relaxed mt-0.5">{description}</p>
                  )}
                </div>
              )
            })}
          </dl>
        </Container>
      </section>

      {/* Stories */}
      {stories.length > 0 && (
      <section className="section-padding bg-paper">
        <Container>
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">{t('voicesEyebrow')}</p>
            <h2 className="font-display text-display-lg text-teal-800 text-balance">
              {t('voicesHeadingPre')}{' '}
              <em className="not-italic italic text-teal-700">{t('voicesHeadingItalic')}</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story, i) => {
              const dark = i === 1 || i === 4
              const quote = isAr ? (story.quoteAr ?? story.quote) : story.quote
              const role = isAr ? (story.roleAr ?? story.role) : story.role
              return (
                <blockquote
                  key={story.id}
                  className={[
                    'relative rounded-2xl p-6 flex flex-col gap-5',
                    dark ? 'bg-teal-700 text-white' : 'bg-sand-100 border border-sand-200',
                  ].join(' ')}
                >
                  <Quote
                    className={['h-8 w-8 shrink-0', dark ? 'text-lime/60' : 'text-teal-200'].join(' ')}
                    aria-hidden
                  />
                  <p
                    className={[
                      'text-sm leading-relaxed flex-1',
                      dark ? 'text-teal-100' : 'text-ink-soft',
                    ].join(' ')}
                  >
                    &ldquo;{quote}&rdquo;
                  </p>
                  {story.opportunityTitle && (
                    <p className={['text-xs font-mono', dark ? 'text-lime/60' : 'text-teal-600/60'].join(' ')}>
                      {t('via')} {story.opportunityTitle}
                    </p>
                  )}
                  <footer className="flex items-center gap-3">
                    <div
                      className={[
                        'h-10 w-10 rounded-full shrink-0 flex items-center justify-center font-display text-sm font-semibold',
                        dark ? 'bg-teal-700 text-white' : 'bg-teal-100 text-teal-700',
                      ].join(' ')}
                      aria-hidden
                    >
                      {story.name.charAt(0)}
                    </div>
                    <div>
                      <p className={['font-semibold text-sm', dark ? 'text-white' : 'text-ink'].join(' ')}>
                        {story.name}
                      </p>
                      <p className={['text-xs', dark ? 'text-teal-300/70' : 'text-ink-soft/70'].join(' ')}>
                        {role} · {getCountryName(story.country, locale)}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              )
            })}
          </div>
        </Container>
      </section>
      )}

      {/* Timeline */}
      <section className="section-padding bg-paper-warm grain-overlay">
        <Container>
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">{t('journeyEyebrow')}</p>
            <h2 className="font-display text-display-lg text-teal-800 text-balance">
              {t('journeyHeadingPre')}{' '}
              <em className="not-italic italic text-teal-700">{t('journeyHeadingItalic')}</em>
            </h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute start-6 top-0 bottom-0 w-px bg-teal-200 hidden md:block" aria-hidden />
            <div className="flex flex-col gap-10">
              {impactTimeline.map((entry) => (
                <div key={entry.year} className="md:flex md:gap-10 md:items-start">
                  <div className="hidden md:flex items-center gap-4 shrink-0 w-32">
                    <div className="h-3 w-3 rounded-full bg-teal-700 border-2 border-paper-warm shrink-0 ms-4" />
                    <span className="font-mono text-sm font-semibold text-teal-700">{entry.year}</span>
                  </div>
                  <div className="rounded-2xl bg-white border border-sand-200 p-5 flex flex-col gap-2 flex-1">
                    <span className="font-mono text-xs font-semibold text-teal-600 md:hidden">{entry.year}</span>
                    <h3 className="font-display text-base font-semibold text-ink">
                      {isAr ? (entry.titleAr ?? entry.title) : entry.title}
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed">
                      {isAr ? (entry.descriptionAr ?? entry.description) : entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Partners */}
      {strategic.length > 0 && (
        <section className="section-padding bg-paper">
          <Container>
            <div className="text-center mb-10">
              <p className="eyebrow mb-4">{t('partnersEyebrow')}</p>
              <h2 className="font-display text-2xl font-semibold text-teal-800">{t('partnersHeading')}</h2>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {strategic.map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center justify-center rounded-xl bg-white border border-sand-200 px-4 py-5 h-16"
                  title={partner.name}
                >
                  <span className="text-xs font-mono text-ink-soft/60 text-center leading-tight">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-teal-700 grain-overlay text-center">
        <Container className="max-w-2xl">
          <h2 className="font-display text-display-lg text-white text-balance">
            {t('ctaHeadingPre')}{' '}
            <em className="not-italic italic text-lime">{t('ctaHeadingItalic')}</em>
          </h2>
          <p className="mt-4 text-teal-300/80 leading-relaxed">{t('ctaSubhead')}</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="lime">
              <Link href="/ecosystem/opportunities">
                {t('ctaExplore')} <ArrowRight className="ms-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link href="/get-involved/youth">{t('ctaJoin')}</Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  )
}
