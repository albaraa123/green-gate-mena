import { getTranslations, getLocale } from 'next-intl/server'
import { Search, Users, CalendarDays, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Badge } from '@/components/ui/Badge'
import { getFeaturedOpportunities } from '@/lib/supabase/queries'
import { formatDeadline } from '@/lib/utils'
import { AnimateIn } from '@/components/ui/AnimateIn'

export async function EcosystemPreview() {
  const t = await getTranslations('ecosystem')
  const tCommon = await getTranslations('common')
  const locale = await getLocale()
  const featured = await getFeaturedOpportunities(3)

  return (
    <section className="section-padding bg-paper-warm grain-overlay">
      <Container>
        <AnimateIn>
          <SectionHeader
            eyebrow={t('eyebrow')}
            heading={
              <>
                {t('heading')}{' '}
                <em className="not-italic font-display italic text-teal-700">{t('headingItalic')}</em>
              </>
            }
          />
        </AnimateIn>

        <AnimateIn delay={0.15} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          {/* Opportunities column — featured cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-teal-700" />
                <h3 className="font-display text-lg font-semibold text-teal-800">
                  {t('opportunities.title')}
                </h3>
              </div>
              <Link
                href="/ecosystem/opportunities"
                className="text-sm text-teal-700 hover:text-teal-800 flex items-center gap-1 font-medium"
              >
                {tCommon('viewAll')} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {featured.map((opp) => (
              <Link
                key={opp.slug}
                href={`/ecosystem/opportunities/${opp.slug}`}
                className="group flex gap-4 rounded-xl bg-white border border-sand-200 p-4 hover:border-teal-200 hover:shadow-sm transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant={opp.type}>{opp.type}</Badge>
                    {opp.funded && (
                      <span className="text-xs text-leaf font-medium">✓ {t('opportunities.funded')}</span>
                    )}
                  </div>
                  <h4 className="font-semibold text-ink text-sm leading-snug group-hover:text-teal-700 transition-colors">
                    {opp.title}
                  </h4>
                  <p className="text-xs text-ink-soft mt-1">{opp.organization}</p>
                </div>
                <div className="shrink-0 text-end">
                  <p className="text-xs text-ink-soft/60 font-mono uppercase tracking-wide">
                    {tCommon('deadline')}
                  </p>
                  <p className="text-xs font-medium text-teal-700 mt-0.5">
                    {formatDeadline(opp.deadline, locale)}
                  </p>
                </div>
              </Link>
            ))}

            <Link
              href="/ecosystem/opportunities"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-dashed border-teal-200 py-4 text-sm text-teal-700 hover:bg-teal-50 transition-colors font-medium"
            >
              {t('opportunities.browseAll')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right column — Directory + Events */}
          <div className="flex flex-col gap-4">
            {/* Directory card */}
            <div className="rounded-xl bg-teal-700 text-white p-5 grain-overlay flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-lime" />
                <h3 className="font-display text-base font-semibold">{t('directory.title')}</h3>
              </div>
              <p className="text-sm text-teal-300/80 leading-relaxed">{t('directory.description')}</p>
              <Link
                href="/ecosystem/directory"
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-lime hover:text-lime/80 transition-colors"
              >
                {t('directory.explore')} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Events card */}
            <div className="rounded-xl bg-white border border-sand-200 p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-teal-700" />
                <h3 className="font-display text-base font-semibold text-teal-800">
                  {t('events.title')}
                </h3>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">{t('events.description')}</p>
              <Link
                href="/ecosystem/events"
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-800 transition-colors"
              >
                {t('events.view')} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
