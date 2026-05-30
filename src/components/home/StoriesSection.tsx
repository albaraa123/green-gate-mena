import { getTranslations, getLocale } from 'next-intl/server'
import { Quote } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getCountryName } from '@/data/countries'
import { getStories } from '@/lib/supabase/queries'
import { AnimateIn, StaggerIn, StaggerItem } from '@/components/ui/AnimateIn'

export async function StoriesSection() {
  const t = await getTranslations('impact')
  const locale = await getLocale()
  const isAr = locale === 'ar'
  const allStories = await getStories()
  const featured = allStories.slice(0, 3)
  if (featured.length === 0) return null

  return (
    <section className="section-padding bg-paper">
      <Container>
        <AnimateIn>
          <SectionHeader
            eyebrow={t('eyebrow')}
            heading={
              <>
                {t('heading')}{' '}
                <span className="relative inline-block">
                  <em className="not-italic font-display italic text-teal-700">{t('headingItalic')}</em>
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-2.5 bg-lime -skew-x-6 -z-10 rounded-sm"
                    aria-hidden
                  />
                </span>
              </>
            }
            align="center"
          />
        </AnimateIn>

        <StaggerIn className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12" delayStart={0.1}>
          {featured.map((story, i) => {
            const quote = isAr && story.quoteAr ? story.quoteAr : story.quote
            const role = isAr && story.roleAr ? story.roleAr : story.role
            return (
              <StaggerItem key={story.id}>
              <blockquote
                className={[
                  'relative rounded-2xl p-6 flex flex-col gap-5',
                  i === 1
                    ? 'bg-teal-700 text-white'
                    : 'bg-sand-100 border border-sand-200',
                ].join(' ')}
              >
                <Quote
                  className={[
                    'h-8 w-8 shrink-0',
                    i === 1 ? 'text-lime/60' : 'text-teal-200',
                  ].join(' ')}
                  aria-hidden
                />
                <p
                  className={[
                    'text-sm leading-relaxed flex-1',
                    i === 1 ? 'text-teal-100' : 'text-ink-soft',
                  ].join(' ')}
                >
                  &ldquo;{quote}&rdquo;
                </p>
                <footer className="flex items-center gap-3">
                  <div
                    className={[
                      'h-10 w-10 rounded-full shrink-0 flex items-center justify-center font-display text-sm font-semibold',
                      i === 1 ? 'bg-teal-700 text-white' : 'bg-teal-100 text-teal-700',
                    ].join(' ')}
                    aria-hidden
                  >
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <p
                      className={[
                        'font-semibold text-sm',
                        i === 1 ? 'text-white' : 'text-ink',
                      ].join(' ')}
                    >
                      {story.name}
                    </p>
                    <p
                      className={[
                        'text-xs',
                        i === 1 ? 'text-teal-300/70' : 'text-ink-soft/70',
                      ].join(' ')}
                    >
                      {role} · {getCountryName(story.country, locale)}
                    </p>
                  </div>
                </footer>
              </blockquote>
              </StaggerItem>
            )
          })}
        </StaggerIn>
      </Container>
    </section>
  )
}
