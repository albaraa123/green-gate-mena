import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { ExternalLink } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { getProgramBySlug } from '@/lib/supabase/queries'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const program = await getProgramBySlug(slug)
  if (!program) return {}
  const desc =
    program.description.length > 160
      ? program.description.slice(0, 157) + '…'
      : program.description
  return {
    title: program.title,
    description: desc,
    openGraph: {
      title: program.title,
      description: desc,
      type: 'article',
    },
  }
}

export default async function ProgramDetailPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const program = await getProgramBySlug(slug)
  if (!program) notFound()

  const isAr = locale === 'ar'
  const title = isAr && program.titleAr ? program.titleAr : program.title
  const description =
    isAr && program.descriptionAr ? program.descriptionAr : program.description
  const hasLink = program.link && program.link !== '#'

  return (
    <main id="main-content">
      {/* Breadcrumb */}
      <div className="bg-paper border-b border-sand-200 py-3">
        <Container>
          <Breadcrumbs
            crumbs={[
              { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
              { label: isAr ? 'البرامج' : 'Programs', href: '/ecosystem/programs' },
              { label: title },
            ]}
          />
        </Container>
      </div>

      <div className="bg-paper-warm min-h-screen">
        <Container className="py-10">
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            {/* Cover image banner */}
            {program.image && (
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-teal-50 border border-sand-200">
                <Image
                  src={program.image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover object-center"
                  priority
                />
              </div>
            )}

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-teal-800 text-balance leading-tight">
              {title}
            </h1>

            {/* Description */}
            <div className="rounded-2xl bg-white border border-sand-200 p-6 md:p-8">
              <h2 className="font-display text-lg font-semibold text-teal-800 mb-3">
                {isAr ? 'عن البرنامج' : 'About this program'}
              </h2>
              <p className="text-ink-soft leading-relaxed whitespace-pre-wrap">
                {description}
              </p>
            </div>

            {/* CTA */}
            {hasLink && (
              <div>
                <Button asChild size="lg">
                  <a href={program.link} target="_blank" rel="noopener noreferrer">
                    {isAr ? 'اعرف أكثر' : 'Learn more'}
                    <ExternalLink className="ms-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </Container>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  return []
}
