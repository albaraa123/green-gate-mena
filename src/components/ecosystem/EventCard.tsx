import Image from 'next/image'
import { MapPin, ExternalLink } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { Event } from '@/types'

function formatEventDate(date: string, endDate?: string, locale = 'en'): string {
  const loc = locale === 'ar' ? 'ar' : 'en-GB'
  const start = new Date(date)
  const fmt = (d: Date) =>
    new Intl.DateTimeFormat(loc, { day: 'numeric', month: 'short', year: 'numeric' }).format(d)

  if (!endDate) return fmt(start)
  const end = new Date(endDate)
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()}–${fmt(end)}`
  }
  return `${fmt(start)} – ${fmt(end)}`
}

const formatBadge: Record<Event['format'], string> = {
  'in-person': 'bg-teal-100 text-teal-800 border-teal-200',
  online: 'bg-purple-50 text-purple-800 border-purple-200',
  hybrid: 'bg-turquoise/10 text-teal-700 border-turquoise/20',
}

interface Props {
  event: Event
  isPast?: boolean
  locale?: string
}

export function EventCard({ event: ev, isPast = false, locale = 'en' }: Props) {
  const isAr = locale === 'ar'

  const FORMAT_LABELS: Record<Event['format'], string> = isAr
    ? { 'in-person': 'حضوري', online: 'عبر الإنترنت', hybrid: 'هجين' }
    : { 'in-person': 'In-person', online: 'Online', hybrid: 'Hybrid' }

  const pastEventLabel = isAr ? 'فعالية ماضية' : 'Past event'
  const registerLabel = isAr ? 'سجّل' : 'Register'
  const reportLabel = isAr ? 'التقرير' : 'Report'

  return (
    <article
      className={[
        'flex flex-col gap-4 rounded-2xl border overflow-hidden transition-all',
        isPast
          ? 'bg-sand-50 border-sand-200 opacity-70'
          : 'bg-white border-sand-200 hover:border-teal-200 hover:shadow-md',
      ].join(' ')}
    >
      {/* Cover image */}
      {ev.image && (
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={ev.image}
            alt={ev.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover object-center"
          />
          {isPast && (
            <div className="absolute inset-0 bg-gray-900/30" aria-hidden />
          )}
        </div>
      )}

      <div className="flex flex-col gap-4 p-5 pt-0">
      {/* Date + format */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col">
          <p className="font-mono text-xs text-teal-600 font-semibold uppercase tracking-wide">
            {formatEventDate(ev.date, ev.endDate, locale)}
          </p>
          {isPast && (
            <span className="text-xs text-ink-soft/50 font-mono">{pastEventLabel}</span>
          )}
        </div>
        <span
          className={[
            'rounded-full border px-2.5 py-0.5 text-xs font-medium',
            formatBadge[ev.format],
          ].join(' ')}
        >
          {FORMAT_LABELS[ev.format]}
        </span>
      </div>

      {/* Title */}
      <div className="flex flex-col gap-1">
        <h3 className="font-display font-semibold text-ink leading-snug line-clamp-2">
          {ev.title}
        </h3>
        <p className="text-sm text-ink-soft">{ev.organizer}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-ink-soft leading-relaxed line-clamp-3 flex-1">
        {ev.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-sand-100">
        <span className="flex items-center gap-1 text-xs text-ink-soft/70">
          <MapPin className="h-3 w-3" aria-hidden />
          {ev.location}
        </span>
        <a
          href={ev.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors"
        >
          {isPast ? reportLabel : registerLabel} <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Theme chips */}
      <div className="flex flex-wrap gap-1.5">
        {ev.theme.map((t) => (
          <span
            key={t}
            className="rounded-full bg-teal-50 border border-teal-100 px-2 py-0.5 text-xs text-teal-700 capitalize"
          >
            {t}
          </span>
        ))}
      </div>
      </div>
    </article>
  )
}
