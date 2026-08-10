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

      {/* Filter dropdowns row */}
      <div className="flex flex-wrap gap-3">
        {/* Type */}
        <select
          value={activeType}
          onChange={(e) => update('type', e.target.value)}
          className="border border-sand-200 rounded-lg px-3 py-2 text-sm bg-white text-ink focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">{t('allTypes')}</option>
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {t(TYPE_KEYS[type])}
            </option>
          ))}
        </select>

        {/* Format */}
        <select
          value={activeFormat}
          onChange={(e) => update('format', e.target.value)}
          className="border border-sand-200 rounded-lg px-3 py-2 text-sm bg-white text-ink focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">{t('allFormats')}</option>
          {FORMATS.map((fmt) => (
            <option key={fmt} value={fmt}>
              {t(FORMAT_KEYS[fmt])}
            </option>
          ))}
        </select>

        {/* Theme */}
        <select
          value={activeTheme}
          onChange={(e) => update('theme', e.target.value)}
          className="border border-sand-200 rounded-lg px-3 py-2 text-sm bg-white text-ink focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">{t('allThemes')}</option>
          {THEMES.map((theme) => (
            <option key={theme} value={theme}>
              {t(THEME_KEYS[theme])}
            </option>
          ))}
        </select>

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
    </div>
  )
}
