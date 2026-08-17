import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ReadMoreText } from '@/components/ui/ReadMoreText'
import type { ImpactHighlight } from '@/types'

// Brand-only styles. Each variant pairs a headline color with a card
// background drawn entirely from Green Gate's palette (teal + lime).
type Variant = { headline: string; card: string }

const DEFAULT_VARIANT: Variant = { headline: 'text-teal-700', card: 'bg-teal-50/70' }

const VARIANTS: Record<string, Variant> = {
  teal: DEFAULT_VARIANT,
  deep: { headline: 'text-teal-800', card: 'bg-teal-700 text-white' },
  turquoise: { headline: 'text-teal-600', card: 'bg-white border border-sand-200' },
  lime: { headline: 'text-teal-800', card: 'bg-lime/15 border border-lime/30' },
  // legacy accent values still resolve to a brand variant
  orange: DEFAULT_VARIANT,
}

interface Props {
  highlights: ImpactHighlight[]
}

// ChangeNOW-style grid of impact milestones: a big colored headline,
// a body with Read more, and partner logos at the bottom of each card.
// Uses a grid (not CSS columns) so cards keep left-to-right reading order,
// which also reads correctly in RTL.
export async function ImpactHighlights({ highlights }: Props) {
  if (highlights.length === 0) return null

  const t = await getTranslations('common')
  const locale = await getLocale()
  const isAr = locale === 'ar'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
      {highlights.map((h) => {
        const title = isAr && h.titleAr ? h.titleAr : h.title
        const body = isAr && h.bodyAr ? h.bodyAr : h.body
        const variant = VARIANTS[h.accent ?? 'teal'] ?? DEFAULT_VARIANT
        const dark = variant.card.includes('bg-teal-700')
        const logos = h.logos ?? []

        const card = (
          <div className={`rounded-2xl p-7 h-full transition-shadow hover:shadow-md ${variant.card}`}>
            <h3
              className={`font-display text-2xl md:text-[1.7rem] font-bold leading-tight mb-3 ${
                dark ? 'text-white' : variant.headline
              }`}
            >
              {title}
            </h3>
            <ReadMoreText
              text={body}
              moreLabel={t('readMore')}
              lessLabel={t('readLess')}
              className={`text-sm leading-relaxed ${dark ? 'text-teal-100' : 'text-ink-soft'}`}
              linkClassName={
                dark
                  ? 'font-medium text-lime hover:text-lime/80 underline underline-offset-2'
                  : undefined
              }
            />
            {logos.length > 0 && (
              <div
                className={`mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 ${
                  dark ? 'rounded-xl bg-white/95 p-3' : ''
                }`}
              >
                {logos.map((logo, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={logo}
                    alt={h.title}
                    loading="lazy"
                    className="h-9 w-auto max-w-[130px] object-contain"
                  />
                ))}
              </div>
            )}
          </div>
        )

        return h.link ? (
          <Link key={h.id} href={h.link} className="block">
            {card}
          </Link>
        ) : (
          <div key={h.id}>{card}</div>
        )
      })}
    </div>
  )
}
