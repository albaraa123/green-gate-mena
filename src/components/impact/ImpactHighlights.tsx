import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ReadMoreText } from '@/components/ui/ReadMoreText'
import type { ImpactHighlight } from '@/types'

const ACCENT: Record<string, string> = {
  teal: 'text-teal-700',
  orange: 'text-orange-500',
  lime: 'text-lime-600',
}

interface Props {
  highlights: ImpactHighlight[]
}

// ChangeNOW-style masonry of impact milestones: a big colored headline,
// a body with Read more, and partner logos at the bottom of each card.
export async function ImpactHighlights({ highlights }: Props) {
  if (highlights.length === 0) return null

  const t = await getTranslations('common')
  const locale = await getLocale()
  const isAr = locale === 'ar'

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
      {highlights.map((h) => {
        const title = isAr && h.titleAr ? h.titleAr : h.title
        const body = isAr && h.bodyAr ? h.bodyAr : h.body
        const accent = ACCENT[h.accent ?? 'teal'] ?? ACCENT.teal
        const logos = h.logos ?? []

        const card = (
          <div className="rounded-2xl bg-teal-50/60 p-7 transition-shadow hover:shadow-md">
            <h3 className={`font-display text-2xl md:text-[1.7rem] font-bold leading-tight mb-3 ${accent}`}>
              {title}
            </h3>
            <ReadMoreText
              text={body}
              moreLabel={t('readMore')}
              lessLabel={t('readLess')}
              className="text-sm leading-relaxed text-ink-soft"
            />
            {logos.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                {logos.map((logo, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={logo}
                    alt=""
                    className="h-9 w-auto max-w-[130px] object-contain"
                  />
                ))}
              </div>
            )}
          </div>
        )

        return (
          <div key={h.id} className="mb-6 break-inside-avoid">
            {h.link ? (
              <Link href={h.link} className="block">
                {card}
              </Link>
            ) : (
              card
            )}
          </div>
        )
      })}
    </div>
  )
}
