import { getTranslations } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { getPartners } from '@/lib/supabase/queries'
import { AnimateIn } from '@/components/ui/AnimateIn'

export async function PartnersSection() {
  const t = await getTranslations('partners')
  const tNav = await getTranslations('nav')
  const allPartners = await getPartners()
  const strategic = allPartners.filter((p) => p.tier === 'strategic' || p.tier === 'program')

  const tags = [
    t('tags.unAgencies'),
    t('tags.regionalFunders'),
    t('tags.researchInstitutes'),
    t('tags.developmentBanks'),
    t('tags.youthNetworks'),
    t('tags.civilSociety'),
    t('tags.privateSector'),
    t('tags.mediaPartners'),
  ]

  return (
    <section className="section-padding bg-paper-warm grain-overlay">
      <Container>
        <AnimateIn className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 className="font-display text-display-lg text-teal-800 text-balance">
              {t('heading')}{' '}
              <em className="not-italic italic text-teal-700">{t('headingItalic')}</em>
            </h2>
            <p className="text-ink-soft leading-relaxed">{t('description')}</p>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
              <Button asChild>
                <Link href="/get-involved/partners">
                  {tNav('partnerWithUs')} <ArrowRight className="ms-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/about">{t('learnAbout')}</Link>
              </Button>
            </div>
          </div>

          {/* Right — partner logo grid */}
          {strategic.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {strategic.slice(0, 9).map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center justify-center rounded-xl bg-white border border-sand-200 px-4 py-5 h-20"
                  title={partner.name}
                >
                  <span className="text-xs font-mono text-ink-soft/60 text-center leading-tight">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-2xl bg-teal-50 border border-teal-100 h-48">
              <p className="text-sm text-teal-700/50 font-mono">شركاؤنا قادمون قريباً</p>
            </div>
          )}
        </AnimateIn>
      </Container>
    </section>
  )
}
