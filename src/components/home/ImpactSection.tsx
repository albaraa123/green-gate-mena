import { getTranslations, getLocale } from 'next-intl/server'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { impactStats, impactTimeline } from '@/data/stats'

export async function ImpactSection() {
  const t = await getTranslations('impact')
  const locale = await getLocale()
  const isAr = locale === 'ar'

  return (
    <section className="section-padding bg-teal-700 text-white grain-overlay overflow-hidden">
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={
            <>
              {t('heading')}{' '}
              <em className="not-italic font-display italic text-lime">{t('headingItalic')}</em>
            </>
          }
          className="[&_h2]:text-white [&_p]:text-teal-300/80"
        />

        {/* Stats grid */}
        <dl className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 mb-16">
          {impactStats.map((stat) => {
            const label = isAr && stat.labelAr ? stat.labelAr : stat.label
            const description = isAr && stat.descriptionAr ? stat.descriptionAr : stat.description
            const numericPart = stat.value.replace(/[^0-9]/g, '')
            const suffix = stat.value.replace(/[0-9]/g, '')
            const target = parseInt(numericPart, 10)
            return (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col gap-2"
              >
                <dt className="font-display text-3xl md:text-4xl font-semibold text-white">
                  {!isNaN(target) ? (
                    <AnimatedCounter target={target} suffix={suffix} />
                  ) : (
                    stat.value
                  )}
                </dt>
                <dd className="text-sm font-semibold text-teal-300">{label}</dd>
                {description && (
                  <p className="text-xs text-teal-300/60 leading-relaxed">{description}</p>
                )}
              </div>
            )
          })}
        </dl>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute start-4 top-0 bottom-0 w-px bg-white/10 hidden md:block" aria-hidden />

          <div className="flex flex-col gap-8">
            {impactTimeline.map((entry) => {
              const title = isAr && entry.titleAr ? entry.titleAr : entry.title
              const description = isAr && entry.descriptionAr ? entry.descriptionAr : entry.description
              return (
                <div key={entry.year} className="md:flex md:gap-10 md:items-start">
                  <div className="hidden md:flex items-center gap-4 shrink-0 w-28">
                    <div className="h-2.5 w-2.5 rounded-full bg-lime border-2 border-teal-900 shrink-0" />
                    <span className="font-mono text-sm font-semibold text-lime">{entry.year}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-3 md:hidden">
                      <span className="font-mono text-xs font-semibold text-lime">{entry.year}</span>
                      <div className="h-px flex-1 bg-white/10" aria-hidden />
                    </div>
                    <h4 className="font-display text-base font-semibold text-white">{title}</h4>
                    <p className="text-sm text-teal-300/70 leading-relaxed">{description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
