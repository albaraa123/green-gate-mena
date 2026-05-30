import { getLocale, getTranslations } from 'next-intl/server'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { NewsletterSignup } from './NewsletterSignup'

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-white/60 hover:text-white transition-colors"
      >
        {children}
      </Link>
    </li>
  )
}

export async function Footer() {
  const locale = await getLocale()
  const t = await getTranslations('footer')
  const tNav = await getTranslations('nav')

  return (
    <footer className="bg-teal-700 text-white/90 grain-overlay">
      <Container className="py-14 md:py-20">
        {/* Top: logo + tagline + newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 pb-12 border-b border-white/10">
          <div>
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/logo/logo-horizontal-white.svg"
                alt="Green Gate MENA"
                width={160}
                height={40}
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              {t('tagline')}
            </p>
            <div className="flex items-center gap-4 mt-5">
              <a
                href="https://www.instagram.com/greengate4my/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/40 hover:text-lime transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@greengate4menayouth"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-white/40 hover:text-lime transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/greengate4menayouth"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/40 hover:text-lime transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:pt-2">
            <p className="text-sm font-medium text-white/80 mb-3">
              {t('newsletter.label')}
            </p>
            <NewsletterSignup />
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
              {t('columns.explore')}
            </h3>
            <ul className="flex flex-col gap-2.5">
              <FooterLink href="/ecosystem/opportunities">{t('links.opportunities')}</FooterLink>
              <FooterLink href="/ecosystem/directory">{t('links.directory')}</FooterLink>
              <FooterLink href="/ecosystem/events">{t('links.events')}</FooterLink>
              <FooterLink href="/knowledge">{t('links.knowledge')}</FooterLink>
              <FooterLink href="/impact">{t('links.impact')}</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
              {t('columns.services')}
            </h3>
            <ul className="flex flex-col gap-2.5">
              <FooterLink href="/services/youth">{t('links.forYouth')}</FooterLink>
              <FooterLink href="/services/ngos">{t('links.forNGOs')}</FooterLink>
              <FooterLink href="/services/consultants">{t('links.forConsultants')}</FooterLink>
              <FooterLink href="/services/businesses">{t('links.forBusinesses')}</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
              {t('columns.about')}
            </h3>
            <ul className="flex flex-col gap-2.5">
              <FooterLink href="/about">{t('links.about')}</FooterLink>
              <FooterLink href="/contact">{t('links.contact')}</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
              {tNav('getInvolved')}
            </h3>
            <ul className="flex flex-col gap-2.5">
              <FooterLink href="/get-involved/youth">{t('links.joinYouth')}</FooterLink>
              <FooterLink href="/get-involved/partners">{t('links.partnerWithUs')}</FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-4">
            <p className="text-xs text-white/40">{t('legal.copyright')}</p>
            <a href="/admin/login" className="text-xs text-white/60 hover:text-white border border-white/20 hover:border-white/40 rounded px-2 py-0.5 transition-colors">
              Admin
            </a>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              {t('legal.privacy')}
            </Link>
            <Link href="/terms" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              {t('legal.terms')}
            </Link>
            <Link href="/accessibility" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              {t('legal.accessibility')}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
