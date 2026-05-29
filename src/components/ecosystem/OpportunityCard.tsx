import { MapPin, Calendar, ExternalLink } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Badge } from '@/components/ui/Badge'
import { formatDeadline, isDeadlineSoon, isDeadlinePast } from '@/lib/utils'
import type { Opportunity } from '@/types'

interface Props {
  opportunity: Opportunity
  locale?: string
}

export function OpportunityCard({ opportunity: opp, locale = 'en' }: Props) {
  const soon = isDeadlineSoon(opp.deadline)
  const past = isDeadlinePast(opp.deadline)
  const isAr = locale === 'ar'

  const TYPE_LABELS: Record<string, string> = isAr
    ? {
        fellowship: 'زمالة',
        grant: 'منحة',
        event: 'فعالية',
        competition: 'مسابقة',
        internship: 'تدريب',
        volunteer: 'تطوع',
        training: 'تدريب',
        job: 'وظيفة',
      }
    : {
        fellowship: 'Fellowship',
        grant: 'Grant',
        event: 'Event',
        competition: 'Competition',
        internship: 'Internship',
        volunteer: 'Volunteer',
        training: 'Training',
        job: 'Job',
      }

  const FORMAT_LABEL =
    opp.format === 'online'
      ? isAr ? 'عبر الإنترنت' : 'Online'
      : opp.format === 'hybrid'
        ? isAr ? 'هجين' : 'Hybrid'
        : isAr ? 'حضوري' : 'In-person'

  const countriesLabel =
    opp.countries.length > 3
      ? `${opp.countries.length} ${isAr ? 'دولة' : 'countries'}`
      : opp.countries.join(', ')

  const detailsLabel = isAr ? 'التفاصيل' : 'Details'
  const fundedLabel = isAr ? 'ممولة' : 'Funded'
  const stipendLabel = isAr ? 'مكافأة مالية' : 'Stipend'

  return (
    <article className="group flex flex-col gap-4 rounded-2xl bg-white border border-sand-200 p-5 hover:border-teal-200 hover:shadow-md transition-all">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant={opp.type}>{TYPE_LABELS[opp.type] ?? opp.type}</Badge>
          {opp.funded && (
            <Badge variant="default" className="border-leaf/30 bg-leaf/10 text-green-800">
              {fundedLabel}
            </Badge>
          )}
          {opp.stipend && !opp.funded && (
            <Badge variant="default" className="border-amber-200 bg-amber-50 text-amber-800">
              {stipendLabel}
            </Badge>
          )}
        </div>
        <span
          className={[
            'shrink-0 rounded-full px-2.5 py-0.5 text-xs font-mono font-medium',
            past
              ? 'bg-sand-100 text-ink-soft/50'
              : soon
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-teal-50 text-teal-700',
          ].join(' ')}
        >
          {formatDeadline(opp.deadline, locale)}
        </span>
      </div>

      {/* Title + org */}
      <div className="flex flex-col gap-1">
        <Link
          href={`/ecosystem/opportunities/${opp.slug}`}
          className="font-display font-semibold text-ink leading-snug hover:text-teal-700 transition-colors line-clamp-2"
        >
          {opp.title}
        </Link>
        <p className="text-sm text-ink-soft">{opp.organization}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-ink-soft leading-relaxed line-clamp-3 flex-1">
        {opp.description}
      </p>

      {/* Footer meta */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-sand-100">
        <div className="flex flex-wrap gap-3 text-xs text-ink-soft/70">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" aria-hidden />
            {FORMAT_LABEL}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" aria-hidden />
            {countriesLabel}
          </span>
        </div>
        <Link
          href={`/ecosystem/opportunities/${opp.slug}`}
          className="flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors"
        >
          {detailsLabel} <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </article>
  )
}
