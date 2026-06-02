import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Plus, Compass } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { OpportunityCard } from '@/components/ecosystem/OpportunityCard'
import { OpportunityFilters } from '@/components/ecosystem/OpportunityFilters'
import { getOpportunities } from '@/lib/supabase/queries'

export const metadata: Metadata = {
  title: 'Opportunities',
  description:
    'Browse fellowships, grants, jobs, internships, and competitions in climate and sustainability open to MENA youth.',
}

interface Props {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ type?: string; theme?: string; format?: string; funded?: string }>
}

export default async function OpportunitiesPage({ params, searchParams }: Props) {
  const { locale } = await params
  const filters = await searchParams
  setRequestLocale(locale)

  const t = await getTranslations('opportunitiesPage')

  const [allOpps, filtered] = await Promise.all([
    getOpportunities(),
    getOpportunities({
      type: filters.type,
      theme: filters.theme,
      format: filters.format,
      funded: filters.funded === '1',
    }),
  ])

  return (
    <main id="main-content">
      {/* Hero band */}
      <div className="bg-teal-700 text-white grain-overlay py-14">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
            <div className="flex flex-col gap-3">
              <p className="eyebrow text-teal-300/70">{t('eyebrow')}</p>
              <h1 className="font-display text-display-lg text-white text-balance">
                {t('heading')}{' '}
                <em className="not-italic font-display italic text-lime">{t('headingItalic')}</em>
              </h1>
              <p className="text-teal-300/80 max-w-lg leading-relaxed">{t('subhead')}</p>
            </div>
            <Button asChild size="lg" variant="lime">
              <Link href="/ecosystem/opportunities/submit">
                <Plus className="h-4 w-4 me-1.5" />
                {t('submit')}
              </Link>
            </Button>
          </div>
        </Container>
      </div>

      {/* Content */}
      <div className="bg-paper-warm min-h-screen">
        <Container className="py-10">
          <div className="mb-8 rounded-2xl bg-white border border-sand-200 p-5">
            <Suspense fallback={<div className="h-20 animate-pulse bg-sand-100 rounded-xl" />}>
              <OpportunityFilters total={allOpps.length} filtered={filtered.length} />
            </Suspense>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon={Compass}
              title={t('noResults')}
              description={t('noResultsHint')}
              actionLabel={t('submit')}
              actionHref="/ecosystem/opportunities/submit"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((opp) => (
                <OpportunityCard key={opp.slug} opportunity={opp} locale={locale} />
              ))}
            </div>
          )}
        </Container>
      </div>
    </main>
  )
}
