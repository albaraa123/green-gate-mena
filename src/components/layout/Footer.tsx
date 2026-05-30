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
                href="https://instagram.com/GreenGateMENA"
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
                href="https://linkedin.com/company/green-gate-mena"
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
              <a
                href="https://twitter.com/GreenGateMENA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="text-white/40 hover:text-lime transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.731-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
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
          <p className="text-xs text-white/40">{t('legal.copyright')}</p>
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
            <a href="/admin/login" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Admin
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
