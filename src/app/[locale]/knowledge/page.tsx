import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { BookOpen, Newspaper, FileText, Headphones, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { KnowledgeFilters } from '@/components/knowledge/KnowledgeFilters'
import { getResources, getFeaturedResources } from '@/lib/supabase/queries'
import type { ResourceType, OpportunityTheme } from '@/types'

export const metadata: Metadata = {
  title: 'Knowledge & Blog',
  description:
    'Guides, reports, toolkits, podcasts, and articles on climate, sustainability, and environmental policy for the MENA region.',
}

interface Props {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ type?: string; theme?: string }>
}

const typeIcon: Record<ResourceType, React.ComponentType<{ className?: string }>> = {
  guide: BookOpen,
  article: Newspaper,
  report: FileText,
  toolkit: BookOpen,
  podcast: Headphones,
  video: Newspaper,
}

const typeColor: Record<ResourceType, string> = {
  guide: 'bg-teal-50 text-teal-700 border-teal-200',
  article: 'bg-sand-100 text-ink border-sand-200',
  report: 'bg-leaf/10 text-green-800 border-leaf/20',
  toolkit: 'bg-turquoise/10 text-teal-700 border-turquoise/20',
  podcast: 'bg-terracotta/10 text-terracotta border-terracotta/20',
  video: 'bg-purple-50 text-purple-700 border-purple-200',
}

function formatDate(dateStr: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateStr))
}

export default async function KnowledgePage({ params, searchParams }: Props) {
  const { locale } = await params
  const filters = await searchParams
  setRequestLocale(locale)

  const t = await getTranslations('knowledgePage')

  const typeLabels: Record<ResourceType, string> = {
    guide: t('typeGuide'),
    article: t('typeArticle'),
    report: t('typeReport'),
    toolkit: t('typeToolkit'),
    podcast: t('typePodcast'),
    video: t('typeVideo'),
  }

  const [allResources, filtered, featuredArr] = await Promise.all([
    getResources(),
    getResources({ type: filters.type, theme: filters.theme }),
    getFeaturedResources(1),
  ])
  const featured = featuredArr[0] ?? null

  return (
    <main id="main-content">
      {/* Hero */}
      <div className="bg-teal-700 text-white grain-overlay py-14">
        <Container>
          <p className="eyebrow text-teal-300/70 mb-4">{t('eyebrow')}</p>
          <h1 className="font-display text-display-lg text-white text-balance">
            {t('heading')}{' '}
            <em className="not-italic font-display italic text-lime">{t('headingItalic')}</em>
          </h1>
          <p className="mt-4 text-teal-300/80 max-w-xl leading-relaxed">{t('subhead')}</p>
        </Container>
      </div>

      <div className="bg-paper-warm min-h-screen">
        <Container className="py-10">
          {/* Featured resource */}
          {featured && !filters.type && !filters.theme && (
            <div className="mb-10 rounded-2xl bg-teal-700 text-white grain-overlay overflow-hidden">
              <div className="p-8 md:p-10 flex flex-col gap-4 max-w-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium capitalize text-white/80">
                  <FileText className="h-3 w-3" aria-hidden />
                  {typeLabels[featured.type]} · {t('featured')}
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-white text-balance leading-tight">
                  {featured.title}
                </h2>
                <p className="text-teal-300/80 text-sm leading-relaxed line-clamp-3">
                  {featured.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-teal-400/70">
                  <span>{featured.author}</span>
                  <span className="font-mono">{formatDate(featured.publishedAt, locale)}</span>
                </div>
                <Link
                  href={`/knowledge/${featured.slug}`}
                  className="mt-2 self-start inline-flex items-center gap-1.5 text-sm font-semibold text-lime hover:text-lime/80 transition-colors"
                >
                  {t('readNow')} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="mb-8 rounded-2xl bg-white border border-sand-200 p-5">
            <Suspense fallback={<div className="h-20 animate-pulse bg-sand-100 rounded-xl" />}>
              <KnowledgeFilters total={allResources.length} filtered={filtered.length} />
            </Suspense>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center text-ink-soft">
              <p className="font-display text-lg font-semibold text-teal-800 mb-2">{t('noResults')}</p>
              <p className="text-sm">{t('noResultsHint')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((resource) => {
                const Icon = typeIcon[resource.type]
                const color = typeColor[resource.type]
                return (
                  <Link
                    key={resource.slug}
                    href={`/knowledge/${resource.slug}`}
                    className="group flex flex-col gap-4 rounded-2xl bg-white border border-sand-200 p-5 hover:border-teal-200 hover:shadow-md transition-all"
                  >
                    <span
                      className={[
                        'self-start inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
                        color,
                      ].join(' ')}
                    >
                      <Icon className="h-3 w-3" aria-hidden />
                      {typeLabels[resource.type]}
                    </span>
                    <h3 className="font-display font-semibold text-ink leading-snug group-hover:text-teal-700 transition-colors line-clamp-2">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed line-clamp-3 flex-1">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-ink-soft/60 pt-3 border-t border-sand-100">
                      <span>{resource.author}</span>
                      <span className="font-mono">{formatDate(resource.publishedAt, locale)}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </Container>
      </div>
    </main>
  )
}
