import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { MapPin, Calendar, ExternalLink, CheckCircle } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { OpportunityCard } from '@/components/ecosystem/OpportunityCard'
import { getOpportunityBySlug, getOpportunities } from '@/lib/supabase/queries'
import { formatDeadline, isDeadlinePast, isDeadlineSoon } from '@/lib/utils'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const opp = await getOpportunityBySlug(slug)
  if (!opp) return {}
  const desc = opp.description.length > 160 ? opp.description.slice(0, 157) + '…' : opp.description
  return {
    title: opp.title,
    description: desc,
    openGraph: {
      title: opp.title,
      description: desc,
      type: 'article',
    },
  }
}

export default async function OpportunityDetailPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const opp = await getOpportunityBySlug(slug)
  if (!opp) notFound()

  const past = isDeadlinePast(opp.deadline)
  const soon = isDeadlineSoon(opp.deadline)

  const allOpps = await getOpportunities()
  const related = allOpps
    .filter((o) => o.slug !== opp.slug && o.theme.some((t) => opp.theme.includes(t)))
    .slice(0, 3)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://greengate-mena.org'
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Opportunities', item: `${siteUrl}/${locale}/ecosystem/opportunities` },
      { '@type': 'ListItem', position: 3, name: opp.title, item: `${siteUrl}/${locale}/ecosystem/opportunities/${opp.slug}` },
    ],
  }

  return (
    <main id="main-content">
      {/* Breadcrumb nav */}
      <div className="bg-paper border-b border-sand-200 py-3">
        <Container>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
          <Breadcrumbs
            crumbs={[
              { label: locale === 'ar' ? 'الرئيسية' : 'Home', href: '/' },
              { label: locale === 'ar' ? 'الفرص' : 'Opportunities', href: '/ecosystem/opportunities' },
              { label: opp.title },
            ]}
          />
        </Container>
      </div>
      <div className="bg-paper-warm min-h-screen">
        <Container className="py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Type + tags */}
              <div className="flex flex-wrap gap-2">
                <Badge variant={opp.type}>{opp.type}</Badge>
                {opp.funded && (
                  <Badge variant="default" className="border-leaf/30 bg-leaf/10 text-green-800">
                    Funded
                  </Badge>
                )}
                {opp.stipend && !opp.funded && (
                  <Badge variant="default" className="border-amber-200 bg-amber-50 text-amber-800">
                    Stipend
                  </Badge>
                )}
              </div>

              <div>
                <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink text-balance leading-tight">
                  {opp.title}
                </h1>
                <p className="mt-2 text-ink-soft font-medium">{opp.organization}</p>
              </div>

              {/* Description */}
              <div className="rounded-2xl bg-white border border-sand-200 p-6">
                <h2 className="font-display text-lg font-semibold text-teal-800 mb-3">
                  About this opportunity
                </h2>
                <p className="text-ink-soft leading-relaxed">{opp.description}</p>
              </div>

              {/* Tags */}
              {opp.tags && opp.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {opp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white border border-sand-200 px-3 py-1 text-xs text-ink-soft/70 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-4">
              {/* Apply card */}
              <div className="rounded-2xl bg-white border border-sand-200 p-6 flex flex-col gap-4 sticky top-24">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-ink-soft/60 font-mono uppercase tracking-wide">Deadline</p>
                  <p
                    className={[
                      'font-display text-2xl font-semibold',
                      past ? 'text-ink-soft/40 line-through' : soon ? 'text-red-600' : 'text-teal-800',
                    ].join(' ')}
                  >
                    {formatDeadline(opp.deadline, locale)}
                  </p>
                  {soon && !past && (
                    <p className="text-xs text-red-600 font-medium">Closing soon!</p>
                  )}
                </div>

                {!past ? (
                  <Button asChild size="lg" className="w-full">
                    <a href={opp.link} target="_blank" rel="noopener noreferrer">
                      Apply Now <ExternalLink className="ms-2 h-4 w-4" />
                    </a>
                  </Button>
                ) : (
                  <div className="rounded-lg bg-sand-100 px-4 py-3 text-sm text-ink-soft text-center">
                    This opportunity has closed
                  </div>
                )}

                {/* Meta details */}
                <div className="flex flex-col gap-3 pt-3 border-t border-sand-100 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-teal-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-ink-soft/60 uppercase font-mono tracking-wide mb-0.5">Format</p>
                      <p className="text-ink capitalize">{opp.format}</p>
                    </div>
                  </div>

                  {opp.startDate && (
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-teal-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-ink-soft/60 uppercase font-mono tracking-wide mb-0.5">Starts</p>
                        <p className="text-ink">
                          {new Intl.DateTimeFormat('en-GB', {
                            month: 'long',
                            year: 'numeric',
                          }).format(new Date(opp.startDate))}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-ink-soft/60 uppercase font-mono tracking-wide mb-0.5">
                        Eligible countries
                      </p>
                      <p className="text-ink text-xs leading-relaxed">
                        {opp.countries.length <= 5
                          ? opp.countries.join(', ')
                          : `${opp.countries.slice(0, 5).join(', ')} +${opp.countries.length - 5} more`}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {opp.theme.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-teal-50 border border-teal-100 px-2 py-0.5 text-xs text-teal-700 capitalize"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="font-display text-xl font-semibold text-teal-800 mb-6">
                Related opportunities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((o) => (
                  <OpportunityCard key={o.slug} opportunity={o} locale={locale} />
                ))}
              </div>
            </section>
          )}
        </Container>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  return []
}
