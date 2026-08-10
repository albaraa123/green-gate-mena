'use client'

import { useRouter, usePathname } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { X } from 'lucide-react'

const TYPES = ['ngo', 'youth-group', 'individual', 'institution', 'business'] as const
const THEMES = ['climate', 'energy', 'water', 'biodiversity', 'waste', 'sustainability', 'policy', 'finance', 'agriculture', 'urban', 'oceans', 'youth'] as const

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

const TYPE_KEYS = {
  ngo: 'typeNGO',
  'youth-group': 'typeYouthGroup',
  individual: 'typeIndividual',
  institution: 'typeInstitution',
  business: 'typeBusiness',
} as const

interface Props {
  total: number
  filtered: number
}

export function DirectoryFilters({ total, filtered }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations('directoryPage')

  const activeType = searchParams.get('type') ?? ''
  const activeTheme = searchParams.get('theme') ?? ''
  const activeVerified = searchParams.get('verified') === '1'

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

  const hasFilters = activeType || activeTheme || activeVerified

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-soft">
          <span className="font-semibold text-ink">{filtered}</span>
          {' '}{t('countOrgs', { total })}
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

        {/* Verified toggle */}
        <button
          onClick={() => update('verified', activeVerified ? '' : '1')}
          className={[
            'rounded-full px-3 py-1 text-xs font-medium border transition-colors',
            activeVerified
              ? 'bg-teal-100 text-teal-800 border-teal-300'
              : 'bg-white text-ink-soft border-sand-200 hover:border-teal-300 hover:text-teal-700',
          ].join(' ')}
        >
          {t('filterVerifiedOnly')}
        </button>
      </div>
    </div>
  )
}
