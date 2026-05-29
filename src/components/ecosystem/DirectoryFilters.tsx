'use client'

import { useRouter, usePathname } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
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

  function toggle(key: string, current: string, value: string) {
    update(key, current === value ? '' : value)
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

      {/* Type filters */}
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
        <div className="w-px bg-sand-200 self-stretch mx-1" aria-hidden />
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

      {/* Theme */}
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
