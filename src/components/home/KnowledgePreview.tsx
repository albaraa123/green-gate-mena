import { getTranslations, getLocale } from 'next-intl/server'
import { BookOpen, FileText, Headphones, ArrowRight, Newspaper } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getFeaturedResources } from '@/lib/supabase/queries'
import type { Resource } from '@/types'

const typeIcon: Record<Resource['type'], React.ComponentType<{ className?: string }>> = {
  guide: BookOpen,
  article: Newspaper,
  report: FileText,
  toolkit: BookOpen,
  podcast: Headphones,
  video: Newspaper,
}

const typeColor: Record<Resource['type'], string> = {
  guide: 'bg-teal-50 text-teal-700 border-teal-200',
  article: 'bg-sand-100 text-ink border-sand-200',
  report: 'bg-leaf/10 text-leaf border-leaf/20',
  toolkit: 'bg-turquoise/10 text-teal-700 border-turquoise/20',
  podcast: 'bg-terracotta/10 text-terracotta border-terracotta/20',
  video: 'bg-sand-100 text-ink border-sand-200',
}

export async function KnowledgePreview() {
  const t = await getTranslations('knowledge')
  const locale = await getLocale()
  const featured = await getFeaturedResources(3)
  if (featured.length === 0) return null

  function formatDate(dateStr: string): string {
    return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(
      new Date(dateStr),
    )
  }

  const typeLabels: Record<Resource['type'], string> = {
    guide: t('types.guide'),
    article: t('types.article'),
    report: t('types.report'),
    toolkit: t('types.toolkit'),
    podcast: t('types.podcast'),
    video: t('types.video'),
  }

  return (
    <section className="section-padding bg-paper-warm grain-overlay">
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={
            <>
              {t('heading')}{' '}
              <em className="not-italic font-display italic text-teal-700">{t('headingItalic')}</em>
            </>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {featured.map((resource, i) => {
            const Icon = typeIcon[resource.type] ?? FileText
            const colorClass = typeColor[resource.type] ?? typeColor.article
            const isHighlighted = i === 0
            const typeLabel = typeLabels[resource.type] ?? resource.type

            return (
              <Link
                key={resource.slug}
                href={`/knowledge/${resource.slug}`}
                className={[
                  'group flex flex-col gap-4 rounded-2xl p-6 border transition-all hover:shadow-md',
                  isHighlighted
                    ? 'bg-teal-700 border-teal-800 md:row-span-1'
                    : 'bg-white border-sand-200 hover:border-teal-200',
                ].join(' ')}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium capitalize',
                      isHighlighted
                        ? 'bg-white/10 text-teal-200 border-white/20'
                        : colorClass,
                    ].join(' ')}
                  >
                    <Icon className="h-3 w-3" aria-hidden />
                    {typeLabel}
                  </span>
                </div>

                <h3
                  className={[
                    'font-display text-base font-semibold leading-snug flex-1 group-hover:opacity-80 transition-opacity',
                    isHighlighted ? 'text-white' : 'text-ink',
                  ].join(' ')}
                >
                  {resource.title}
                </h3>

                <p
                  className={[
                    'text-sm leading-relaxed line-clamp-3',
                    isHighlighted ? 'text-teal-300/80' : 'text-ink-soft',
                  ].join(' ')}
                >
                  {resource.description}
                </p>

                <div
                  className={[
                    'flex items-center justify-between text-xs pt-2 border-t',
                    isHighlighted ? 'border-white/10 text-teal-400/70' : 'border-sand-200 text-ink-soft/60',
                  ].join(' ')}
                >
                  <span>{resource.author}</span>
                  <span className="font-mono">{formatDate(resource.publishedAt)}</span>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-6 py-2.5 text-sm font-medium text-teal-700 hover:bg-teal-50 hover:border-teal-300 transition-colors"
          >
            {t('browseAll')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
