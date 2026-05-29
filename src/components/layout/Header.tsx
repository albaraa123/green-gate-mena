'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileMenu } from './MobileMenu'

interface DropdownItem {
  label: string
  href: string
}

interface NavItem {
  label: string
  href?: string
  children?: DropdownItem[]
}

export function Header() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on ESC
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const navItems: NavItem[] = [
    { label: t('about'), href: '/about' },
    {
      label: t('services'),
      children: [
        { label: t('servicesYouth'), href: '/services/youth' },
        { label: t('servicesNGOs'), href: '/services/ngos' },
        { label: t('servicesConsultants'), href: '/services/consultants' },
        { label: t('servicesBusinesses'), href: '/services/businesses' },
      ],
    },
    {
      label: t('ecosystem'),
      children: [
        { label: t('opportunities'), href: '/ecosystem/opportunities' },
        { label: t('directory'), href: '/ecosystem/directory' },
        { label: t('events'), href: '/ecosystem/events' },
      ],
    },
    { label: t('knowledge'), href: '/knowledge' },
    { label: t('impact'), href: '/impact' },
    {
      label: t('getInvolved'),
      children: [
        { label: t('joinYouth'), href: '/get-involved/youth' },
        { label: t('listNGO'), href: '/get-involved/ngos' },
        { label: t('beConsultant'), href: '/get-involved/consultants' },
        { label: t('partnerWithUs'), href: '/get-involved/partners' },
      ],
    },
    { label: t('contact'), href: '/contact' },
  ]

  function isLinkActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-paper/95 backdrop-blur-md shadow-sm border-b border-sand-200'
            : 'bg-transparent'
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 focus-visible:ring-2 focus-visible:ring-teal-700 rounded">
              <Image
                src="/logo/logo-horizontal-brand.svg"
                alt="Green Gate MENA"
                width={150}
                height={40}
                priority
                className="h-8 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <nav
              aria-label="Main navigation"
              className="hidden lg:flex items-center gap-0.5"
            >
              {navItems.map((item) =>
                item.children ? (
                  <DropdownNav key={item.label} item={item} pathname={pathname} />
                ) : (
                  <Link
                    key={item.label}
                    href={item.href ?? '/'}
                    aria-current={isLinkActive(item.href ?? '/') ? 'page' : undefined}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isLinkActive(item.href ?? '/')
                        ? 'text-teal-700 bg-teal-50'
                        : 'text-ink hover:text-teal-700 hover:bg-teal-100/60'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop right */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher />
              <Button size="sm" asChild>
                <Link href="/get-involved/youth">{t('getInvolved')}</Link>
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-sand-100 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-6 w-6 text-ink" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

function DropdownNav({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false)

  const isGroupActive = item.children?.some(
    (child) => pathname === child.href || pathname.startsWith(child.href + '/')
  ) ?? false

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={cn(
          'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
          isGroupActive
            ? 'text-teal-700 bg-teal-50'
            : 'text-ink hover:text-teal-700 hover:bg-teal-100/60'
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-150',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && (
        <div className="absolute top-full start-0 mt-1 w-52 rounded-xl bg-white border border-sand-200 shadow-lg py-1.5 z-50">
          {item.children?.map((child) => {
            const active = pathname === child.href || pathname.startsWith(child.href + '/')
            return (
              <Link
                key={child.href}
                href={child.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'block px-4 py-2 text-sm transition-colors',
                  active
                    ? 'text-teal-700 bg-teal-50 font-medium'
                    : 'text-ink hover:text-teal-700 hover:bg-teal-50'
                )}
              >
                {child.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
