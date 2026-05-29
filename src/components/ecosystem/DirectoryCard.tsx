import { Globe, Mail, BadgeCheck, Users } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { DirectoryProfile } from '@/types'

const typeColor: Record<DirectoryProfile['type'], string> = {
  ngo: 'bg-teal-100 text-teal-800 border-teal-200',
  'youth-group': 'bg-lime/20 text-green-800 border-leaf/30',
  individual: 'bg-purple-50 text-purple-800 border-purple-200',
  institution: 'bg-blue-50 text-blue-800 border-blue-200',
  business: 'bg-amber-50 text-amber-800 border-amber-200',
}

const TYPE_LABELS: Record<DirectoryProfile['type'], { en: string; ar: string }> = {
  ngo: { en: 'NGO', ar: 'منظمة غير حكومية' },
  'youth-group': { en: 'Youth Group', ar: 'مجموعة شبابية' },
  individual: { en: 'Individual', ar: 'فرد' },
  institution: { en: 'Institution', ar: 'مؤسسة' },
  business: { en: 'Business', ar: 'شركة' },
}

interface Props {
  profile: DirectoryProfile
  locale?: string
}

export function DirectoryCard({ profile: p, locale = 'en' }: Props) {
  const isAr = locale === 'ar'
  const typeLabel = TYPE_LABELS[p.type][isAr ? 'ar' : 'en']
  const verifiedLabel = isAr ? 'موثّق' : 'Verified'
  const websiteLabel = isAr ? 'الموقع' : 'Website'
  const contactLabel = isAr ? 'تواصل' : 'Contact'
  const viewProfileLabel = isAr ? 'عرض الملف ←' : 'View profile →'
  const estLabel = isAr ? 'تأسست' : 'est.'
  const membersLabel = isAr ? 'عضو' : 'members'

  return (
    <article className="flex flex-col gap-4 rounded-2xl bg-white border border-sand-200 p-5 hover:border-teal-200 hover:shadow-md transition-all">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="h-11 w-11 rounded-xl bg-teal-100 flex items-center justify-center font-display text-lg font-semibold text-teal-700 shrink-0">
          {p.name.charAt(0)}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span
            className={[
              'rounded-full border px-2.5 py-0.5 text-xs font-medium',
              typeColor[p.type],
            ].join(' ')}
          >
            {typeLabel}
          </span>
          {p.verified && (
            <span className="flex items-center gap-1 text-xs text-teal-600 font-medium">
              <BadgeCheck className="h-3 w-3" aria-hidden />
              {verifiedLabel}
            </span>
          )}
        </div>
      </div>

      {/* Name + location */}
      <div className="flex flex-col gap-0.5">
        <h3 className="font-display font-semibold text-ink leading-snug">{p.name}</h3>
        <p className="text-xs text-ink-soft/70">
          {p.city ? `${p.city}, ` : ''}{p.country}
          {p.founded ? ` · ${estLabel} ${p.founded}` : ''}
          {p.members ? ` · ${p.members.toLocaleString()} ${membersLabel}` : ''}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-ink-soft leading-relaxed line-clamp-3 flex-1">
        {p.description}
      </p>

      {/* Themes */}
      <div className="flex flex-wrap gap-1.5">
        {p.themes.map((t) => (
          <span
            key={t}
            className="rounded-full bg-teal-50 border border-teal-100 px-2 py-0.5 text-xs text-teal-700 capitalize"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Footer links */}
      <div className="flex items-center gap-3 pt-3 border-t border-sand-100">
        {p.website && p.website !== '#' && (
          <a
            href={p.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-teal-700 hover:text-teal-800 font-medium transition-colors"
          >
            <Globe className="h-3 w-3" /> {websiteLabel}
          </a>
        )}
        {p.email && (
          <a
            href={`mailto:${p.email}`}
            className="flex items-center gap-1 text-xs text-teal-700 hover:text-teal-800 font-medium transition-colors"
          >
            <Mail className="h-3 w-3" /> {contactLabel}
          </a>
        )}
        <Link
          href={`/ecosystem/directory/${p.slug}`}
          className="ms-auto text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors"
        >
          {viewProfileLabel}
        </Link>
      </div>
    </article>
  )
}
