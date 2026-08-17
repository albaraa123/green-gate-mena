import { getTranslations, getLocale } from 'next-intl/server'
import {
  GraduationCap,
  Building2,
  Briefcase,
  BarChart3,
  Sparkles,
  Leaf,
  Globe,
  Users,
  Rocket,
  Handshake,
  BookOpen,
  Target,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateIn, StaggerIn, StaggerItem } from '@/components/ui/AnimateIn'
import { getServices } from '@/lib/supabase/queries'

const ICONS: Record<string, LucideIcon> = {
  GraduationCap,
  Building2,
  Briefcase,
  BarChart3,
  Sparkles,
  Leaf,
  Globe,
  Users,
  Rocket,
  Handshake,
  BookOpen,
  Target,
}

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
    accent: 'bg-white border-sand-200 group-hover:border-teal-300',
  },
  {
    icon: Briefcase,
    titleKey: 'consultants.title',
    descKey: 'consultants.description',
    href: '/services/consultants',
    accent: 'bg-paper-warm border-sand-200 group-hover:border-teal-300',
  },
  {
    icon: BarChart3,
    titleKey: 'businesses.title',
    descKey: 'businesses.description',
    href: '/services/businesses',
    accent: 'bg-lime/10 border-lime/30 group-hover:border-lime/60',
  },
]

export async function ServicesSection() {
  const t = await getTranslations('services')
  const tCommon = await getTranslations('common')
  const locale = await getLocale()

  const services = await getServices()

  return (
    <section className="section-padding bg-paper">
      <Container>
        <AnimateIn>
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
        </AnimateIn>

        {services.length > 0 ? (
          <StaggerIn className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12" delayStart={0.1}>
            {services.map((service) => {
              const Icon = ICONS[service.icon ?? 'Sparkles'] ?? Sparkles
              const title = locale === 'ar' && service.titleAr ? service.titleAr : service.title
              const description =
                locale === 'ar' && service.descriptionAr ? service.descriptionAr : service.description
              const href = service.link || '/services'
              return (
                <StaggerItem key={service.id} className="h-full">
                  <Link
                    href={href}
                    className={[
                      'group relative flex h-full flex-col gap-5 rounded-2xl border p-6 transition-all duration-200',
                      'hover:shadow-md hover:-translate-y-0.5',
                      'bg-white border-sand-200 group-hover:border-teal-300',
                    ].join(' ')}
                  >
                    {service.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={service.image}
                        alt={title}
                        className="h-28 w-full rounded-xl object-cover"
                      />
                    )}

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-700/10">
                      <Icon className="h-5 w-5 text-teal-700" />
                    </div>

                    <div className="flex-1 flex flex-col gap-2">
                      <h3 className="font-display text-lg font-semibold text-teal-800">{title}</h3>
                      <p className="text-sm leading-relaxed text-ink-soft">{description}</p>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-medium text-teal-700 group-hover:text-teal-800 transition-colors">
                      {tCommon('learnMore')}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
                    </div>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerIn>
        ) : (
          <StaggerIn className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12" delayStart={0.1}>
            {cards.map(({ icon: Icon, titleKey, descKey, href, accent }) => (
              <StaggerItem key={href} className="h-full">
                <Link
                  href={href}
                  className={[
                    'group relative flex h-full flex-col gap-5 rounded-2xl border p-6 transition-all duration-200',
                    'hover:shadow-md hover:-translate-y-0.5',
                    accent,
                  ].join(' ')}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-700/10">
                    <Icon className="h-5 w-5 text-teal-700" />
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <h3 className="font-display text-lg font-semibold text-teal-800">
                      {t(titleKey as Parameters<typeof t>[0])}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-soft">
                      {t(descKey as Parameters<typeof t>[0])}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-medium text-teal-700 group-hover:text-teal-800 transition-colors">
                    {tCommon('learnMore')}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerIn>
        )}
      </Container>
    </section>
  )
}
