'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const otherLocale = locale === 'en' ? 'ar' : 'en'
  const label = locale === 'en' ? 'العربية' : 'English'

  function handleSwitch() {
    router.push(pathname, { locale: otherLocale })
  }

  return (
    <button
      onClick={handleSwitch}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5',
        'text-sm font-medium text-teal-700 hover:bg-teal-100 transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700',
        className
      )}
      aria-label={`Switch to ${otherLocale === 'ar' ? 'Arabic' : 'English'}`}
    >
      <span className="text-base leading-none">🌐</span>
      {label}
    </button>
  )
}
