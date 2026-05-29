'use client'

import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from './LanguageSwitcher'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations('nav')

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={t('menuAriaLabel')}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div className="absolute inset-y-0 end-0 w-full max-w-sm bg-paper shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-sand-200">
          <span className="font-display text-lg text-teal-800 font-semibold">{t('menuLabel')}</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-sand-100 transition-colors"
            aria-label={t('closeMenu')}
          >
            <X className="h-5 w-5 text-ink" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-1">
          <NavSection label={t('about')} href="/about" onClick={onClose} />

          <MobileNavGroup label={t('services')}>
            <NavSection label={t('servicesYouth')} href="/services/youth" onClick={onClose} indent />
            <NavSection label={t('servicesNGOs')} href="/services/ngos" onClick={onClose} indent />
            <NavSection label={t('servicesConsultants')} href="/services/consultants" onClick={onClose} indent />
            <NavSection label={t('servicesBusinesses')} href="/services/businesses" onClick={onClose} indent />
          </MobileNavGroup>

          <MobileNavGroup label={t('ecosystem')}>
            <NavSection label={t('opportunities')} href="/ecosystem/opportunities" onClick={onClose} indent />
            <NavSection label={t('directory')} href="/ecosystem/directory" onClick={onClose} indent />
            <NavSection label={t('events')} href="/ecosystem/events" onClick={onClose} indent />
          </MobileNavGroup>

          <NavSection label={t('knowledge')} href="/knowledge" onClick={onClose} />
          <NavSection label={t('impact')} href="/impact" onClick={onClose} />

          <MobileNavGroup label={t('getInvolved')}>
            <NavSection label={t('joinYouth')} href="/get-involved/youth" onClick={onClose} indent />
            <NavSection label={t('listNGO')} href="/get-involved/ngos" onClick={onClose} indent />
            <NavSection label={t('beConsultant')} href="/get-involved/consultants" onClick={onClose} indent />
            <NavSection label={t('partnerWithUs')} href="/get-involved/partners" onClick={onClose} indent />
          </MobileNavGroup>

          <NavSection label={t('contact')} href="/contact" onClick={onClose} />
        </nav>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-sand-200 flex items-center justify-between">
          <LanguageSwitcher />
          <Button size="sm" asChild>
            <Link href="/get-involved/youth" onClick={onClose}>
              {t('getInvolved')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function NavSection({
  label,
  href,
  onClick,
  indent = false,
}: {
  label: string
  href: string
  onClick: () => void
  indent?: boolean
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        'block py-2.5 text-sm font-medium text-ink hover:text-teal-700 transition-colors rounded-lg',
        indent ? 'ps-4 text-ink-soft' : 'px-2',
      ].join(' ')}
    >
      {label}
    </Link>
  )
}

function MobileNavGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="px-2 py-2 text-xs font-mono uppercase tracking-widest text-ink-soft/60">
        {label}
      </p>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  )
}
