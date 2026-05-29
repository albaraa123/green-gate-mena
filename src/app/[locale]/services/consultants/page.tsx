import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Briefcase, PieChart, Globe2, Zap, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'For Consultants',
  description:
    'Join a network of climate and sustainability consultants. Find projects and partners across the Arab world.',
}
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function ForConsultantsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('servicesConsultants')

  const offerings = [
    { icon: Globe2, title: t('offering1Title'), description: t('offering1Desc') },
    { icon: Briefcase, title: t('offering2Title'), description: t('offering2Desc') },
    { icon: PieChart, title: t('offering3Title'), description: t('offering3Desc') },
    { icon: Zap, title: t('offering4Title'), description: t('offering4Desc') },
  ]

  const expertise = [
    t('expertise1'), t('expertise2'), t('expertise3'), t('expertise4'), t('expertise5'),
    t('expertise6'), t('expertise7'), t('expertise8'), t('expertise9'), t('expertise10'),
  ]

  const steps = [
    { step: '01', title: t('step1Title'), desc: t('step1Desc') },
    { step: '02', title: t('step2Title'), desc: t('step2Desc') },
    { step: '03', title: t('step3Title'), desc: t('step3Desc') },
  ]

  return (
    <main id="main-content">
      {/* Hero */}
      <div className="bg-gradient-to-br from-turquoise to-teal-500 text-white grain-overlay py-20">
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
              <Button asChild size="lg" className="bg-white text-teal-800 hover:bg-teal-50">
                <Link href="/get-involved/consultants">{t('heroCta1')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link href="/ecosystem/directory">{t('heroCta2')}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Expertise areas */}
      <div className="bg-teal-700 py-6">
        <Container>
          <div className="flex flex-wrap gap-2 justify-center">
            {expertise.map((area) => (
              <span
                key={area}
                className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs font-medium text-white/80"
              >
                {area}
              </span>
            ))}
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
                  <Icon className="h-6 w-6 text-turquoise" />
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

      {/* How it works */}
      <section className="section-padding bg-paper-warm grain-overlay">
        <Container className="max-w-3xl">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">{t('howEyebrow')}</p>
            <h2 className="font-display text-display-lg text-teal-800 text-balance">
              {t('howHeadingPre')}{' '}
              <em className="not-italic italic text-teal-700">{t('howHeadingItalic')}</em>
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="flex gap-6 rounded-2xl bg-white border border-sand-200 p-6">
                <span className="font-mono text-3xl font-bold text-teal-200 shrink-0 leading-none">{step}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
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
              <Link href="/get-involved/consultants">
                {t('ctaJoin')} <ArrowRight className="ms-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  )
}
