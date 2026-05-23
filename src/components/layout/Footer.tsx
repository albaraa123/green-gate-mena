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
    <footer className="bg-teal-900 text-white/90 grain-overlay">
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
          </div>
        </div>
      </Container>
    </footer>
  )
}
