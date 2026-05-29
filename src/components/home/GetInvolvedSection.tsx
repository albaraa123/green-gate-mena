import { getTranslations } from 'next-intl/server'
import { UserPlus, Building2, Briefcase, Handshake, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'

const pathways = [
  {
    icon: UserPlus,
    key: 'joinYouth' as const,
    href: '/get-involved/youth',
    accent: 'from-teal-700 to-teal-600',
  },
  {
    icon: Building2,
    key: 'listNGO' as const,
    href: '/get-involved/ngos',
    accent: 'from-leaf to-green-500',
  },
  {
    icon: Briefcase,
    key: 'beConsultant' as const,
    href: '/get-involved/consultants',
    accent: 'from-turquoise to-teal-400',
  },
  {
    icon: Handshake,
    key: 'partnerWithUs' as const,
    href: '/get-involved/partners',
    accent: 'from-terracotta to-terracotta-soft',
  },
]

export async function GetInvolvedSection() {
  const t = await getTranslations('getInvolved')
  const tCommon = await getTranslations('common')

  return (
    <section className="section-padding bg-paper">
      <Container>
        <div className="text-center mb-12">
          <p className="eyebrow mb-4">{t('eyebrow')}</p>
          <h2 className="font-display text-display-lg text-teal-800 text-balance">
            {t('heading')}{' '}
            <span className="relative inline-block">
              <em className="not-italic font-display italic text-teal-700">{t('headingItalic')}</em>
              <span
                className="absolute -bottom-1 left-0 right-0 h-3 bg-lime -skew-x-6 -z-10 rounded-sm"
                aria-hidden
              />
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pathways.map(({ icon: Icon, key, href, accent }) => (
            <Link
              key={key}
              href={href}
              className="group relative overflow-hidden rounded-2xl p-6 flex flex-col gap-4 min-h-[180px] transition-transform hover:-translate-y-1"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} aria-hidden />
              {/* Grain */}
              <div className="absolute inset-0 grain-overlay" aria-hidden />

              <div className="relative z-10 flex flex-col gap-4 flex-1">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white leading-snug flex-1">
                  {t(key)}
                </h3>
                <div className="flex items-center gap-1 text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                  {tCommon('getStarted')} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
