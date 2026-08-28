import Image from 'next/image'
import { getTranslations, getLocale } from 'next-intl/server'
import { Quote } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ReadMoreText } from '@/components/ui/ReadMoreText'
import { getCountryName } from '@/data/countries'
import { getStories } from '@/lib/supabase/queries'
import { AnimateIn, StaggerIn, StaggerItem } from '@/components/ui/AnimateIn'

export async function StoriesSection() {
  const t = await getTranslations('impact')
  const tc = await getTranslations('common')
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

        {/* Matches the Impact page story cards: large photo, name overlay, quote below */}
        <StaggerIn className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 items-start" delayStart={0.1}>
          {featured.map((story, i) => {
            const dark = i === 1
            const quote = isAr && story.quoteAr ? story.quoteAr : story.quote
            const role = isAr && story.roleAr ? story.roleAr : story.role
            return (
              <StaggerItem key={story.id}>
                <blockquote
                  className={[
                    'group relative rounded-2xl overflow-hidden flex flex-col h-full',
                    dark ? 'bg-teal-700 text-white' : 'bg-white border border-sand-200',
                  ].join(' ')}
                >
                  {/* Large prominent photo */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-teal-50">
                    {story.avatar ? (
                      <Image
                        src={story.avatar}
                        alt={story.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-6xl font-bold text-teal-300">
                          {story.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    {/* Name overlay on the image */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 pt-10">
                      <p className="font-display font-semibold text-white text-base leading-snug">
                        {story.name}
                      </p>
                      <p className="text-xs text-white/80">
                        {role} · {getCountryName(story.country, locale)}
                      </p>
                    </div>
                  </div>

                  {/* Quote (with Read more for long testimonials) */}
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <Quote
                      className={['h-7 w-7 shrink-0', dark ? 'text-lime/60' : 'text-teal-200'].join(' ')}
                      aria-hidden
                    />
                    <ReadMoreText
                      text={quote}
                      limit={240}
                      moreLabel={tc('readMore')}
                      lessLabel={tc('readLess')}
                      className={['text-sm leading-relaxed flex-1', dark ? 'text-teal-100' : 'text-ink-soft'].join(' ')}
                      linkClassName={
                        dark
                          ? 'font-medium text-lime hover:text-lime/80 underline underline-offset-2'
                          : undefined
                      }
                    />
                    {story.opportunityTitle && (
                      <p className={['text-xs', dark ? 'text-lime/60' : 'text-teal-600/60'].join(' ')}>
                        {t('via')} {story.opportunityTitle}
                      </p>
                    )}
                  </div>
                </blockquote>
              </StaggerItem>
            )
          })}
        </StaggerIn>
      </Container>
    </section>
  )
}
