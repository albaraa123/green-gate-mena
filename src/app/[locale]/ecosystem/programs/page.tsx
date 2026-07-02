import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ExternalLink } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { getPrograms } from '@/lib/supabase/queries'

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Capacity-building programs, fellowships, and initiatives designed for MENA youth across climate and sustainability.',
}

interface Props {
  params: Promise<{ locale: string }>
}

export default async function ProgramsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('programsPage')
  const isAr = locale === 'ar'

  const programs = await getPrograms()

  return (
    <main id="main-content">
      {/* Hero */}
      <div className="bg-teal-700 text-white grain-overlay py-14">
        <Container>
          <div className="flex flex-col gap-3">
            <p className="eyebrow text-teal-300/70">{t('eyebrow')}</p>
            <h1 className="font-display text-display-lg text-white text-balance">
              {t('heading')}{' '}
              <em className="not-italic font-display italic text-lime">{t('headingItalic')}</em>
            </h1>
            <p className="text-teal-300/80 max-w-lg leading-relaxed">{t('subhead')}</p>
          </div>
        </Container>
      </div>

      <div className="bg-paper-warm min-h-screen">
        <Container className="py-10">
          {programs.length === 0 ? (
            <p className="text-center text-ink-soft/70 py-16">{t('comingSoon')}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {programs.map((program) => {
                const title = isAr && program.titleAr ? program.titleAr : program.title
                const description =
                  isAr && program.descriptionAr ? program.descriptionAr : program.description
                return (
                  <article
                    key={program.id}
                    className="group flex flex-col rounded-2xl bg-white border border-sand-200 overflow-hidden hover:border-teal-200 hover:shadow-md transition-all"
                  >
                    {program.image && (
                      <div className="relative h-40 w-full overflow-hidden bg-teal-50">
                        <Image
                          src={program.image}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-3 p-5 flex-1">
                      <h2 className="font-display font-semibold text-ink leading-snug line-clamp-2">
                        {title}
                      </h2>
                      <p className="text-sm text-ink-soft leading-relaxed line-clamp-3 flex-1">
                        {description}
                      </p>
                      <a
                        href={program.link || '#'}
                        target={program.link ? '_blank' : undefined}
                        rel={program.link ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors pt-2 border-t border-sand-100"
                      >
                        {t('learnMore')} <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </Container>
      </div>
    </main>
  )
}
