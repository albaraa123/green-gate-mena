import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { GraduationCap, Building2, Briefcase, Handshake, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Get Involved',
  description:
    'Join thousands of youth, NGOs, consultants, and businesses shaping the sustainable future of the Arab World.',
}

interface Props {
  params: Promise<{ locale: string }>
}

export default async function GetInvolvedPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('getInvolved')
  const isAr = locale === 'ar'

  const pathways = [
    {
      icon: GraduationCap,
      title: t('joinYouth'),
      href: '/get-involved/youth',
      desc: isAr
        ? 'فرص وزمالات وإرشاد ومجتمع من قادة المناخ.'
        : 'Opportunities, fellowships, mentorship, and a community of climate leaders.',
      color: 'bg-teal-100 text-teal-700',
    },
    {
      icon: Building2,
      title: t('listNGO'),
      href: '/get-involved/ngos',
      desc: isAr
        ? 'سجّل منظمتك في الدليل وتواصل مع الشركاء والممولين.'
        : 'List your organization in the directory and connect with partners and funders.',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      icon: Briefcase,
      title: t('beConsultant'),
      href: '/get-involved/consultants',
      desc: isAr
        ? 'انضم لشبكتنا الإقليمية وادخل خط مشاريعنا.'
        : 'Join our regional network and access our project pipeline.',
      color: 'bg-purple-50 text-purple-700',
    },
    {
      icon: Handshake,
      title: t('partnerWithUs'),
      href: '/get-involved/partners',
      desc: isAr
        ? 'اشترك معنا في برامج وفعاليات تشكّل مستقبل المنطقة.'
        : 'Partner on programs and events shaping the region\'s future.',
      color: 'bg-lime/20 text-green-800',
    },
  ]

  return (
    <main id="main-content">
      {/* Hero */}
      <div className="bg-teal-700 text-white grain-overlay py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow text-teal-300/70 mb-4">{t('eyebrow')}</p>
            <h1 className="font-display text-display-lg text-white text-balance leading-tight">
              {t('heading')}{' '}
              <em className="not-italic font-display italic text-lime">{t('headingItalic')}</em>
            </h1>
            <p className="mt-6 text-teal-300/80 text-lg leading-relaxed max-w-xl">
              {t('subhead')}
            </p>
            <p className="mt-4 text-sm text-teal-300/60 font-mono">{t('trustLine')}</p>
          </div>
        </Container>
      </div>

      {/* Pathways */}
      <section className="section-padding bg-paper">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pathways.map(({ icon: Icon, title, href, desc, color }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col gap-4 rounded-2xl bg-white border border-sand-200 p-7 hover:border-teal-300 hover:shadow-md transition-all"
              >
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${color}`}>
                  <Icon className="h-7 w-7" aria-hidden />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
                  <p className="text-ink-soft leading-relaxed">{desc}</p>
                </div>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-teal-700 group-hover:gap-2.5 transition-all">
                  {isAr ? 'ابدأ الآن' : 'Get started'}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
