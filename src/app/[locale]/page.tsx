import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { HeroSection } from '@/components/home/HeroSection'
import { getSiteSetting } from '@/lib/supabase/queries'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isAr = locale === 'ar'
  const title = isAr
    ? 'Green Gate MENA — بوابة المناخ والبيئة للعالم العربي'
    : 'Green Gate MENA — Climate & Environment Gateway for MENA'
  const description = isAr
    ? 'منصة شبابية تربط الشباب والمنظمات والمستشارين بفرص المناخ والبيئة عبر 22 دولة عربية.'
    : "The MENA region's gateway to climate and environmental opportunities — connecting youth, NGOs, consultants, and businesses across 22 Arab countries."
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://greengate-mena.org/${locale}`,
      siteName: 'Green Gate MENA',
      locale: isAr ? 'ar_AR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://greengate-mena.org/${locale}`,
      languages: {
        en: 'https://greengate-mena.org/en',
        ar: 'https://greengate-mena.org/ar',
      },
    },
  }
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Green Gate MENA',
  url: 'https://greengate-mena.org',
  description:
    "The MENA region's gateway to climate and environmental opportunities — connecting youth, NGOs, consultants, and businesses across 22 Arab countries.",
  sameAs: [
    'https://instagram.com/GreenGateMENA',
    'https://linkedin.com/company/green-gate-mena',
    'https://twitter.com/GreenGateMENA',
  ],
  areaServed: { '@type': 'Place', name: 'MENA Region' },
}
import { ServicesSection } from '@/components/home/ServicesSection'
import { EcosystemPreview } from '@/components/home/EcosystemPreview'
import { ImpactSection } from '@/components/home/ImpactSection'
import { StoriesSection } from '@/components/home/StoriesSection'
import { PartnersSection } from '@/components/home/PartnersSection'
import { GetInvolvedSection } from '@/components/home/GetInvolvedSection'
import { KnowledgePreview } from '@/components/home/KnowledgePreview'
import { FinalCTA } from '@/components/home/FinalCTA'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const heroImage = await getSiteSetting('hero_image')

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <HeroSection heroImage={heroImage ?? undefined} />
      <ServicesSection />
      <EcosystemPreview />
      <ImpactSection />
      <StoriesSection />
      <PartnersSection />
      <GetInvolvedSection />
      <KnowledgePreview />
      <FinalCTA />
    </main>
  )
}
