import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { TrendingUp, UserCheck, Megaphone, Award, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'For Businesses',
  description:
    'Connect with the MENA green economy. Partner with NGOs, fund youth programs, and build your sustainability profile.',
}
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

interface Props {
  params: Promise<{ locale: string }>
}

const businessPartners = [
  { name: 'Masdar', role: 'Clean Energy Partner', country: 'UAE' },
  { name: 'Saudi Green Initiative', role: 'Ecosystem Partner', country: 'Saudi Arabia' },
  { name: 'GIZ', role: 'Program Partner', country: 'Germany/MENA' },
  { name: 'WWF Mediterranean', role: 'Conservation Partner', country: 'Regional' },
]

export default async function ForBusinessesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('servicesBusinesses')

  const offerings = [
    { icon: TrendingUp, title: t('offering1Title'), description: t('offering1Desc') },
    { icon: UserCheck, title: t('offering2Title'), description: t('offering2Desc') },
    { icon: Megaphone, title: t('offering3Title'), description: t('offering3Desc') },
    { icon: Award, title: t('offering4Title'), description: t('offering4Desc') },
  ]

  const metrics = [
    { value: t('metric1Value'), label: t('metric1Label') },
    { value: t('metric2Value'), label: t('metric2Label') },
    { value: t('metric3Value'), label: t('metric3Label') },
    { value: t('metric4Value'), label: t('metric4Label') },
  ]

  return (
    <main id="main-content">
      {/* Hero */}
      <div className="bg-gradient-to-br from-terracotta to-terracotta-soft text-white grain-overlay py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow text-white/60 mb-4">{t('heroEyebrow')}</p>
            <h1 className="font-display text-display-lg text-white text-balance">
              {t('heroHeadingPre')}{' '}
              <em className="not-italic font-display italic">{t('heroHeadingItalic')}</em>
            </h1>
            <p className="mt-6 text-white/80 text-lg leading-relaxed max-w-xl">
              {t('heroSubhead')}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-terracotta hover:bg-red-50">
                <Link href="/get-involved/partners">{t('heroCta1')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link href="/contact">{t('heroCta2')}</Link>
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
                <div className="h-12 w-12 rounded-xl bg-terracotta/10 flex items-center justify-center shrink-0">
                  <Icon className="h-6 w-6 text-terracotta" />
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

      {/* Audience reach */}
      <section className="section-padding bg-teal-700 grain-overlay">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow text-teal-300/70 mb-4">{t('audienceEyebrow')}</p>
              <h2 className="font-display text-display-lg text-white text-balance">
                {t('audienceHeadingPre')}{' '}
                <em className="not-italic italic text-lime">{t('audienceHeadingNum')}</em>{' '}
                {t('audienceHeadingPost')}
              </h2>
              <p className="mt-4 text-teal-300/80 leading-relaxed">{t('audienceSubhead')}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {metrics.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col gap-1"
                >
                  <p className="font-display text-3xl font-semibold text-white">{value}</p>
                  <p className="text-xs text-teal-300/70">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Sample partners */}
      <section className="section-padding bg-paper-warm grain-overlay">
        <Container>
          <div className="text-center mb-10">
            <p className="eyebrow mb-4">{t('businessPartnersEyebrow')}</p>
            <h2 className="font-display text-2xl font-semibold text-teal-800">
              {t('businessPartnersHeading')}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {businessPartners.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl bg-white border border-sand-200 p-5 flex flex-col gap-2 text-center"
              >
                <p className="font-display font-semibold text-ink">{p.name}</p>
                <p className="text-xs text-teal-600">{p.role}</p>
                <p className="text-xs text-ink-soft/60">{p.country}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding bg-paper text-center">
        <Container className="max-w-2xl">
          <h2 className="font-display text-display-lg text-teal-800 text-balance">
            {t('ctaHeadingPre')}{' '}
            <em className="not-italic italic text-teal-600">{t('ctaHeadingItalic')}</em>
          </h2>
          <p className="mt-4 text-ink-soft leading-relaxed">{t('ctaSubhead')}</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/get-involved/partners">
                {t('ctaPartner')} <ArrowRight className="ms-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/contact">{t('ctaTalk')}</Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  )
}
