'use client'

import { useRouter, usePathname } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { X } from 'lucide-react'

const TYPES = ['fellowship', 'grant', 'event', 'competition', 'internship', 'volunteer', 'training', 'job'] as const
const THEMES = ['climate', 'energy', 'water', 'biodiversity', 'waste', 'sustainability', 'policy', 'finance', 'agriculture', 'urban', 'oceans', 'youth'] as const
const FORMATS = ['in-person', 'online', 'hybrid'] as const

const TYPE_KEYS = {
  fellowship: 'typeFellowship',
  grant: 'typeGrant',
  event: 'typeEvent',
  competition: 'typeCompetition',
  internship: 'typeInternship',
  volunteer: 'typeVolunteer',
  training: 'typeTraining',
  job: 'typeJob',
} as const

const FORMAT_KEYS = {
  'in-person': 'formatInPerson',
  online: 'formatOnline',
  hybrid: 'formatHybrid',
} as const

const THEME_KEYS = {
  climate: 'themeClimate',
  energy: 'themeEnergy',
  water: 'themeWater',
  biodiversity: 'themeBiodiversity',
  waste: 'themeWaste',
  sustainability: 'themeSustainability',
  policy: 'themePolicy',
  finance: 'themeFinance',
  agriculture: 'themeAgriculture',
  urban: 'themeUrban',
  oceans: 'themeOceans',
  youth: 'themeYouth',
} as const

interface Props {
  total: number
  filtered: number
}

export function OpportunityFilters({ total, filtered }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations('opportunitiesPage')

  const activeType = searchParams.get('type') ?? ''
  const activeTheme = searchParams.get('theme') ?? ''
  const activeFormat = searchParams.get('format') ?? ''
  const activeFunded = searchParams.get('funded') === '1'

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  function toggle(key: string, current: string, value: string) {
    update(key, current === value ? '' : value)
  }

  function clearAll() {
    router.push(pathname)
  }

  const hasFilters = activeType || activeTheme || activeFormat || activeFunded

  return (
    <div className="flex flex-col gap-4">
      {/* Result count + clear */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-soft">
          <span className="font-semibold text-ink">{filtered}</span>
          {' '}{t('countOpps', { total })}
        </p>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-teal-700 hover:text-teal-800 font-medium transition-colors"
          >
            <X className="h-3 w-3" /> {t('filterClear')}
          </button>
        )}
      </div>

      {/* Filter pills row */}
      <div className="flex flex-wrap gap-3">
        {/* Type */}
        <div className="flex flex-wrap gap-1.5">
          {TYPES.map((type) => (
            <button
              key={type}
              onClick={() => toggle('type', activeType, type)}
              className={[
                'rounded-full px-3 py-1 text-xs font-medium border transition-colors',
                activeType === type
                  ? 'bg-teal-700 text-white border-teal-700'
                  : 'bg-white text-ink-soft border-sand-200 hover:border-teal-300 hover:text-teal-700',
              ].join(' ')}
            >
              {t(TYPE_KEYS[type])}
            </button>
          ))}
        </div>

        <div className="w-px bg-sand-200 self-stretch" aria-hidden />

        {/* Format */}
        {FORMATS.map((fmt) => (
          <button
            key={fmt}
            onClick={() => toggle('format', activeFormat, fmt)}
            className={[
              'rounded-full px-3 py-1 text-xs font-medium border transition-colors',
              activeFormat === fmt
                ? 'bg-teal-700 text-white border-teal-700'
                : 'bg-white text-ink-soft border-sand-200 hover:border-teal-300 hover:text-teal-700',
            ].join(' ')}
          >
            {t(FORMAT_KEYS[fmt])}
          </button>
        ))}

        <div className="w-px bg-sand-200 self-stretch" aria-hidden />

        {/* Funded toggle */}
        <button
          onClick={() => update('funded', activeFunded ? '' : '1')}
          className={[
            'rounded-full px-3 py-1 text-xs font-medium border transition-colors',
            activeFunded
              ? 'bg-leaf/20 text-green-800 border-leaf/30'
              : 'bg-white text-ink-soft border-sand-200 hover:border-teal-300 hover:text-teal-700',
          ].join(' ')}
        >
          {t('filterFundedOnly')}
        </button>
      </div>

      {/* Theme chips */}
      <div className="flex flex-wrap gap-1.5">
        <span className="text-xs text-ink-soft/60 self-center me-1">{t('filterThemeLabel')}:</span>
        {THEMES.map((theme) => (
          <button
            key={theme}
            onClick={() => toggle('theme', activeTheme, theme)}
            className={[
              'rounded-full px-2.5 py-0.5 text-xs font-medium border transition-colors',
              activeTheme === theme
                ? 'bg-teal-100 text-teal-800 border-teal-300'
                : 'bg-white text-ink-soft/70 border-sand-100 hover:border-teal-200 hover:text-teal-700',
            ].join(' ')}
          >
            {t(THEME_KEYS[theme])}
          </button>
        ))}
      </div>
    </div>
  )
}
