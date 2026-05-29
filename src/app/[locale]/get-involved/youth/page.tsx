import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { UserPlus, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Join as Youth',
  description:
    'Take your first step into the green ecosystem. Get curated opportunities, mentors, and a community of MENA climate leaders.',
}
import { Container } from '@/components/ui/Container'
import { GetInvolvedForm } from '@/components/get-involved/GetInvolvedForm'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function JoinYouthPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('joinYouth')

  const benefits = [
    t('benefit1'), t('benefit2'), t('benefit3'),
    t('benefit4'), t('benefit5'), t('benefit6'),
  ]

  return (
    <main id="main-content">
      <div className="bg-teal-700 text-white grain-overlay py-14">
        <Container>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-lime" />
            </div>
            <p className="eyebrow text-teal-300/70">{t('heroEyebrow')}</p>
          </div>
          <h1 className="font-display text-display-lg text-white text-balance">
            {t('heroHeadingPre')}{' '}
            <em className="not-italic font-display italic text-lime">{t('heroHeadingItalic')}</em>
          </h1>
          <p className="mt-4 text-teal-300/80 max-w-xl leading-relaxed">{t('heroSubhead')}</p>
        </Container>
      </div>

      <div className="bg-paper-warm min-h-screen">
        <Container className="py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-2xl font-semibold text-teal-800">
                {t('benefitsHeading')}
              </h2>
              <ul className="flex flex-col gap-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-leaf shrink-0 mt-0.5" aria-hidden />
                    <span className="text-sm text-ink-soft leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl bg-teal-50 border border-teal-100 p-5">
                <p className="text-xs font-mono text-teal-600 uppercase tracking-wide mb-1">
                  {t('freeLabel')}
                </p>
                <p className="text-sm text-ink-soft leading-relaxed">{t('freeNote')}</p>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="font-display text-xl font-semibold text-teal-800 mb-5">
                {t('formHeading')}
              </h2>
              <GetInvolvedForm
                pathway="youth"
                messagePlaceholder={t('messagePlaceholder')}
              />
            </div>
          </div>
        </Container>
      </div>
    </main>
  )
}
