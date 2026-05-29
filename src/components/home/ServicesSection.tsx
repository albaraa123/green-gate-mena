import { getTranslations } from 'next-intl/server'
import { GraduationCap, Building2, Briefcase, BarChart3, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'

interface ServiceCard {
  icon: React.ElementType
  titleKey: string
  descKey: string
  href: string
  accent: string
}

const cards: ServiceCard[] = [
  {
    icon: GraduationCap,
    titleKey: 'youth.title',
    descKey: 'youth.description',
    href: '/services/youth',
    accent: 'bg-teal-50 border-teal-100 group-hover:border-teal-300',
  },
  {
    icon: Building2,
    titleKey: 'ngos.title',
    descKey: 'ngos.description',
    href: '/services/ngos',
    accent: 'bg-sand-100 border-sand-200 group-hover:border-sand-300',
  },
  {
    icon: Briefcase,
    titleKey: 'consultants.title',
    descKey: 'consultants.description',
    href: '/services/consultants',
    accent: 'bg-paper-warm border-sand-200 group-hover:border-terracotta-soft/40',
  },
  {
    icon: BarChart3,
    titleKey: 'businesses.title',
    descKey: 'businesses.description',
    href: '/services/businesses',
    accent: 'bg-teal-700 border-teal-800 group-hover:border-teal-600',
  },
]

export async function ServicesSection() {
  const t = await getTranslations('services')
  const tCommon = await getTranslations('common')

  return (
    <section className="section-padding bg-paper">
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={
            <>
              {t('heading')}{' '}
              <em className="not-italic font-display italic text-teal-700">{t('headingItalic')}</em>
            </>
          }
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {cards.map(({ icon: Icon, titleKey, descKey, href, accent }) => {
            const isDark = accent.includes('teal-900')
            return (
              <Link
                key={href}
                href={href}
                className={[
                  'group relative flex flex-col gap-5 rounded-2xl border p-6 transition-all duration-200',
                  'hover:shadow-md hover:-translate-y-0.5',
                  accent,
                ].join(' ')}
              >
                <div
                  className={[
                    'flex h-11 w-11 items-center justify-center rounded-xl',
                    isDark ? 'bg-teal-700' : 'bg-teal-700/10',
                  ].join(' ')}
                >
                  <Icon
                    className={['h-5 w-5', isDark ? 'text-lime' : 'text-teal-700'].join(' ')}
                  />
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <h3
                    className={[
                      'font-display text-lg font-semibold',
                      isDark ? 'text-white' : 'text-teal-800',
                    ].join(' ')}
                  >
                    {t(titleKey as Parameters<typeof t>[0])}
                  </h3>
                  <p
                    className={[
                      'text-sm leading-relaxed',
                      isDark ? 'text-teal-300/80' : 'text-ink-soft',
                    ].join(' ')}
                  >
                    {t(descKey as Parameters<typeof t>[0])}
                  </p>
                </div>

                <div
                  className={[
                    'flex items-center gap-1 text-xs font-medium transition-colors',
                    isDark
                      ? 'text-lime group-hover:text-lime/80'
                      : 'text-teal-700 group-hover:text-teal-800',
                  ].join(' ')}
                >
                  {tCommon('learnMore')}
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
