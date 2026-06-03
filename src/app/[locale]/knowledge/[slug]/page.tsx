import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { BookOpen, Newspaper, FileText, Headphones, ExternalLink, Calendar, User } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { getResourceBySlug, getResources } from '@/lib/supabase/queries'
import type { ResourceType } from '@/types'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ReadingProgress } from '@/components/ui/ReadingProgress'
import { ShareButtons } from '@/components/ui/ShareButtons'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const resource = await getResourceBySlug(slug)
  if (!resource) return {}
  const desc = resource.description.length > 160 ? resource.description.slice(0, 157) + '…' : resource.description
  return {
    title: resource.title,
    description: desc,
    openGraph: {
      title: resource.title,
      description: desc,
      type: 'article',
      publishedTime: resource.publishedAt,
      tags: resource.tags,
    },
  }
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

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' }).format(
    new Date(dateStr),
  )
}

export default async function ResourceDetailPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const resource = await getResourceBySlug(slug)
  if (!resource) notFound()

  const Icon = typeIcon[resource.type]
  const color = typeColor[resource.type]

  const allResources = await getResources()
  const related = allResources
    .filter((r) => r.slug !== resource.slug && r.theme === resource.theme)
    .slice(0, 3)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://greengatemena.com'
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Knowledge', item: `${siteUrl}/${locale}/knowledge` },
      { '@type': 'ListItem', position: 3, name: resource.title, item: `${siteUrl}/${locale}/knowledge/${resource.slug}` },
    ],
  }

  return (
    <main id="main-content">
      <ReadingProgress />
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
              { label: locale === 'ar' ? 'المعرفة والمدونة' : 'Knowledge & Blog', href: '/knowledge' },
              { label: resource.title },
            ]}
          />
        </Container>
      </div>

      <div className="bg-paper-warm min-h-screen">
        <Container className="py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Type badge */}
              <span
                className={[
                  'self-start inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium capitalize',
                  color,
                ].join(' ')}
              >
                <Icon className="h-3 w-3" aria-hidden />
                {resource.type}
              </span>

              {/* Title */}
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink text-balance leading-tight">
                {resource.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-ink-soft/70">
                {resource.author && (
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" aria-hidden />
                    {resource.author}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" aria-hidden />
                  {formatDate(resource.publishedAt)}
                </span>
                <span className="capitalize rounded-full bg-teal-50 border border-teal-100 px-2.5 py-0.5 text-xs text-teal-700">
                  {resource.theme}
                </span>
              </div>

              {/* Content */}
              <div className="rounded-2xl bg-white border border-sand-200 p-6 md:p-8">
                <p className="text-ink-soft leading-relaxed text-base">{resource.description}</p>

                {/* Placeholder for full content — replace with rich text from CMS */}
                <div className="mt-8 pt-8 border-t border-sand-100">
                  <p className="text-xs text-ink-soft/40 font-mono italic">
                    Full content will be loaded from the CMS. See docs/CMS_INTEGRATION.md.
                  </p>
                </div>
              </div>

              {/* Tags */}
              {resource.tags && resource.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white border border-sand-200 px-3 py-1 text-xs text-ink-soft/70 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share */}
              <div className="pt-2">
                <ShareButtons title={resource.title} isAr={locale === 'ar'} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl bg-white border border-sand-200 p-6 sticky top-24 flex flex-col gap-4">
                <h2 className="font-display text-base font-semibold text-teal-800">Read or Access</h2>
                <Button asChild size="lg" className="w-full">
                  <a href={resource.link} target="_blank" rel="noopener noreferrer">
                    {resource.type === 'podcast' ? 'Listen now' : 'Read now'}{' '}
                    <ExternalLink className="ms-2 h-4 w-4" />
                  </a>
                </Button>
                <p className="text-xs text-ink-soft/60 text-center">
                  Opens external link · Free to access
                </p>

                <div className="pt-4 border-t border-sand-100 flex flex-col gap-3">
                  <div>
                    <p className="text-xs text-ink-soft/60 uppercase font-mono tracking-wide mb-1">Type</p>
                    <p className="text-sm text-ink capitalize">{resource.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-ink-soft/60 uppercase font-mono tracking-wide mb-1">Theme</p>
                    <p className="text-sm text-ink capitalize">{resource.theme}</p>
                  </div>
                  {resource.author && (
                    <div>
                      <p className="text-xs text-ink-soft/60 uppercase font-mono tracking-wide mb-1">Author</p>
                      <p className="text-sm text-ink">{resource.author}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="font-display text-xl font-semibold text-teal-800 mb-6">Related resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((r) => {
                  const RelIcon = typeIcon[r.type]
                  const relColor = typeColor[r.type]
                  return (
                    <Link
                      key={r.slug}
                      href={`/knowledge/${r.slug}`}
                      className="group flex flex-col gap-3 rounded-2xl bg-white border border-sand-200 p-5 hover:border-teal-200 hover:shadow-md transition-all"
                    >
                      <span className={['self-start inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium capitalize', relColor].join(' ')}>
                        <RelIcon className="h-3 w-3" aria-hidden />
                        {r.type}
                      </span>
                      <h3 className="font-display font-semibold text-ink text-sm leading-snug group-hover:text-teal-700 transition-colors line-clamp-2">
                        {r.title}
                      </h3>
                    </Link>
                  )
                })}
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
