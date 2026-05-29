import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Handshake, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Partner with Us',
  description:
    'Become a Green Gate MENA partner. Sponsor opportunities, co-create programs, and reach the largest green network in the Arab world.',
}
import { Container } from '@/components/ui/Container'
import { GetInvolvedForm } from '@/components/get-involved/GetInvolvedForm'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function PartnerWithUsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('joinPartners')

  const partnerTypes = [
    { type: t('track1Type'), desc: t('track1Desc') },
    { type: t('track2Type'), desc: t('track2Desc') },
    { type: t('track3Type'), desc: t('track3Desc') },
    { type: t('track4Type'), desc: t('track4Desc') },
  ]

  const benefits = [
    t('benefit1'), t('benefit2'), t('benefit3'),
    t('benefit4'), t('benefit5'), t('benefit6'),
  ]

  return (
    <main id="main-content">
      <div className="bg-gradient-to-br from-terracotta to-terracotta-soft text-white grain-overlay py-14">
        <Container>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Handshake className="h-5 w-5 text-white" />
            </div>
            <p className="eyebrow text-white/60">{t('heroEyebrow')}</p>
          </div>
          <h1 className="font-display text-display-lg text-white text-balance">
            {t('heroHeadingPre')}{' '}
            <em className="not-italic font-display italic">{t('heroHeadingItalic')}</em>
          </h1>
          <p className="mt-4 text-white/80 max-w-xl leading-relaxed">{t('heroSubhead')}</p>
        </Container>
      </div>

      <div className="bg-paper-warm min-h-screen">
        <Container className="py-10">
          {/* Partnership types */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-teal-800 mb-6">
              {t('tracksHeading')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {partnerTypes.map(({ type, desc }) => (
                <div key={type} className="rounded-2xl bg-white border border-sand-200 p-5 flex flex-col gap-2">
                  <h3 className="font-display text-base font-semibold text-ink">{type}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-2xl font-semibold text-teal-800">
                {t('benefitsHeading')}
              </h2>
              <ul className="flex flex-col gap-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-terracotta shrink-0 mt-0.5" aria-hidden />
                    <span className="text-sm text-ink-soft leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-teal-800 mb-5">
                {t('formHeading')}
              </h2>
              <GetInvolvedForm
                pathway="partner"
                showOrg
                orgLabel={t('orgLabel')}
                messagePlaceholder={t('messagePlaceholder')}
              />
            </div>
          </div>
        </Container>
      </div>
    </main>
  )
}
