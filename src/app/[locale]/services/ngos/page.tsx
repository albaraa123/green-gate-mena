import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Network, FileText, Handshake, BarChart3, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'For NGOs',
  description:
    'List your NGO, access partner networks, and amplify your environmental mission across 22 MENA countries.',
}
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function ForNGOsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('servicesNGOs')

  const offerings = [
    { icon: Network, title: t('offering1Title'), description: t('offering1Desc') },
    { icon: FileText, title: t('offering2Title'), description: t('offering2Desc') },
    { icon: Handshake, title: t('offering3Title'), description: t('offering3Desc') },
    { icon: BarChart3, title: t('offering4Title'), description: t('offering4Desc') },
  ]

  const reasons = [
    t('reason1'), t('reason2'), t('reason3'),
    t('reason4'), t('reason5'), t('reason6'),
  ]

  return (
    <main id="main-content">
      {/* Hero */}
      <div className="bg-teal-700 text-white grain-overlay py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow text-teal-300/70 mb-4">{t('heroEyebrow')}</p>
            <h1 className="font-display text-display-lg text-white text-balance">
              {t('heroHeadingPre')}{' '}
              <em className="not-italic font-display italic text-lime">{t('heroHeadingItalic')}</em>
            </h1>
            <p className="mt-6 text-teal-300/80 text-lg leading-relaxed max-w-xl">
              {t('heroSubhead')}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" variant="lime">
                <Link href="/get-involved/ngos">{t('heroCta1')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link href="/ecosystem/directory">{t('heroCta2')}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Offerings */}
      <section className="section-padding bg-paper">
        <Container>
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">{t('offeringsEyebrow')}</p>
            <h2 className="font-display text-display-lg text-teal-800 text-balance">
              {t('offeringsHeadingPre')}{' '}
              <em className="not-italic italic text-teal-700">{t('offeringsHeadingItalic')}</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offerings.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-5 rounded-2xl bg-paper-warm border border-sand-200 p-6 hover:shadow-sm transition-shadow"
              >
                <div className="h-12 w-12 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
                  <Icon className="h-6 w-6 text-teal-700" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why list */}
      <section className="section-padding bg-paper-warm grain-overlay">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-4">{t('whyEyebrow')}</p>
              <h2 className="font-display text-display-lg text-teal-800 text-balance">
                {t('whyHeadingPre')}{' '}
                <em className="not-italic italic text-teal-700">{t('whyHeadingItalic')}</em>
              </h2>
            </div>
            <ul className="flex flex-col gap-3">
              {reasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-3 rounded-xl bg-white border border-sand-200 px-5 py-4">
                  <span className="font-mono text-xs font-bold text-teal-600 mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-ink-soft leading-relaxed">{reason}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding bg-teal-700 grain-overlay text-center">
        <Container className="max-w-2xl">
          <h2 className="font-display text-display-lg text-white text-balance">
            {t('ctaHeadingPre')}{' '}
            <em className="not-italic italic text-lime">{t('ctaHeadingItalic')}</em>
          </h2>
          <p className="mt-4 text-teal-300/80 leading-relaxed">{t('ctaSubhead')}</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="lime">
              <Link href="/get-involved/ngos">
                {t('ctaList')} <ArrowRight className="ms-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link href="/contact">{t('ctaContact')}</Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  )
}
