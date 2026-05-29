import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Leaf, Globe, Users, BookOpen, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Green Gate MENA is a youth-led platform connecting climate changemakers, NGOs, consultants, and businesses across 22 Arab countries.',
}
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { getTeam, getPartners } from '@/lib/supabase/queries'
import { impactTimeline, impactStats } from '@/data/stats'
import { getCountryName } from '@/data/countries'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('about')
  const isAr = locale === 'ar'

  const [team, allPartners] = await Promise.all([getTeam(), getPartners()])
  const strategic = allPartners.filter((p) => p.tier === 'strategic' || p.tier === 'program')

  const values = [
    { icon: Leaf, title: t('value1Title'), description: t('value1Desc') },
    { icon: Globe, title: t('value2Title'), description: t('value2Desc') },
    { icon: Users, title: t('value3Title'), description: t('value3Desc') },
    { icon: BookOpen, title: t('value4Title'), description: t('value4Desc') },
  ]

  return (
    <main id="main-content">
      {/* Hero */}
      <div className="bg-teal-700 text-white grain-overlay py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow text-teal-300/70 mb-4">{t('heroEyebrow')}</p>
            <h1 className="font-display text-display-lg text-white text-balance leading-tight">
              {t('heroHeadingPre')}{' '}
              <span className="relative inline-block">
                <em className="not-italic font-display italic text-lime">{t('heroHeadingItalic')}</em>
                <span
                  className="absolute -bottom-1 left-0 right-0 h-2.5 bg-lime/20 -skew-x-6 -z-10 rounded-sm"
                  aria-hidden
                />
              </span>{' '}
              {t('heroHeadingPost')}
            </h1>
            <p className="mt-6 text-teal-300/80 text-lg leading-relaxed max-w-xl">
              {t('heroSubhead')}
            </p>
          </div>
        </Container>
      </div>

      {/* Quick stats */}
      <div className="bg-teal-700 border-b border-teal-700/50">
        <Container>
          <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-teal-700/40">
            {impactStats.slice(0, 4).map((stat) => {
              const label = isAr ? (stat.labelAr ?? stat.label) : stat.label
              const numericPart = stat.value.replace(/[^0-9]/g, '')
              const suffix = stat.value.replace(/[0-9]/g, '')
              const target = parseInt(numericPart, 10)
              return (
                <div key={stat.label} className="flex flex-col items-center py-8 px-6 text-center gap-1">
                  <dt className="font-display text-3xl font-semibold text-white">
                    {!isNaN(target) ? (
                      <AnimatedCounter target={target} suffix={suffix} />
                    ) : (
                      stat.value
                    )}
                  </dt>
                  <dd className="text-xs text-teal-300/70 font-medium">{label}</dd>
                </div>
              )
            })}
          </dl>
        </Container>
      </div>

      {/* Mission */}
      <section className="section-padding bg-paper">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex flex-col gap-6">
              <p className="eyebrow">{t('missionEyebrow')}</p>
              <h2 className="font-display text-display-lg text-teal-800 text-balance">
                {t('missionHeadingPre')}{' '}
                <em className="not-italic italic text-teal-600">{t('missionHeadingItalic')}</em>{' '}
                {t('missionHeadingPost')}
              </h2>
              <p className="text-ink-soft leading-relaxed">{t('missionP1')}</p>
              <p className="text-ink-soft leading-relaxed">{t('missionP2')}</p>
              <Button asChild>
                <Link href="/get-involved/youth">
                  {t('missionCta')} <ArrowRight className="ms-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute start-4 top-0 bottom-0 w-px bg-teal-100" aria-hidden />
              <div className="flex flex-col gap-8 ps-12">
                {impactTimeline.map((entry) => (
                  <div key={entry.year} className="relative">
                    <div className="absolute -start-[2.25rem] top-1 h-3 w-3 rounded-full bg-teal-700 border-2 border-white" />
                    <span className="font-mono text-xs font-semibold text-teal-600 uppercase tracking-wide">
                      {entry.year}
                    </span>
                    <h3 className="font-display text-base font-semibold text-ink mt-1">
                      {isAr ? (entry.titleAr ?? entry.title) : entry.title}
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed mt-1">
                      {isAr ? (entry.descriptionAr ?? entry.description) : entry.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="section-padding bg-paper-warm grain-overlay">
        <Container>
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">{t('valuesEyebrow')}</p>
            <h2 className="font-display text-display-lg text-teal-800 text-balance">
              {t('valuesHeadingPre')}{' '}
              <em className="not-italic italic text-teal-700">{t('valuesHeadingItalic')}</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-5 rounded-2xl bg-white border border-sand-200 p-6"
              >
                <div className="h-11 w-11 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-teal-700" />
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

      {/* Team */}
      {team.length > 0 && (
        <section className="section-padding bg-paper">
          <Container>
            <div className="text-center mb-12">
              <p className="eyebrow mb-4">{t('teamEyebrow')}</p>
              <h2 className="font-display text-display-lg text-teal-800 text-balance">
                {t('teamHeadingPre')}{' '}
                <em className="not-italic italic text-teal-700">{t('teamHeadingItalic')}</em>
              </h2>
              <p className="text-ink-soft mt-4 max-w-xl mx-auto leading-relaxed">
                {t('teamSubhead')}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col items-center gap-3 rounded-2xl bg-paper-warm border border-sand-200 p-5 text-center"
                >
                  <div className="h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center font-display text-xl font-semibold text-teal-700">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="font-semibold text-ink text-sm leading-snug">{member.name}</p>
                    <p className="text-xs text-teal-700 leading-snug">{member.role}</p>
                    <p className="text-xs text-ink-soft/60 mt-0.5">{getCountryName(member.country, locale)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Partners */}
      {strategic.length > 0 && (
        <section className="section-padding bg-teal-700 grain-overlay">
          <Container>
            <div className="text-center mb-10">
              <p className="eyebrow text-teal-300/70 mb-4">{t('partnersEyebrow')}</p>
              <h2 className="font-display text-display-lg text-white text-balance">
                {t('partnersHeadingPre')}{' '}
                <em className="not-italic italic text-lime">{t('partnersHeadingItalic')}</em>
              </h2>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {strategic.map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center justify-center rounded-xl bg-white/10 border border-white/10 px-4 py-5 h-16"
                  title={partner.name}
                >
                  <span className="text-xs font-mono text-white/60 text-center leading-tight">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                <Link href="/get-involved/partners">{t('becomePartner')}</Link>
              </Button>
            </div>
          </Container>
        </section>
      )}
    </main>
  )
}
