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
    ? 'بوابة خضراء | Green Gate — بوابة العالم العربي إلى الفرص البيئية'
    : 'Green Gate (بوابة خضراء) — The Arab World\'s Gateway to Environmental Opportunities'
  const description = isAr
    ? 'بوابة خضراء (Green Gate) منصة شبابية تربط الشباب والمنظمات والمستشارين بفرص المناخ والبيئة عبر 22 دولة عربية. مجاناً وبثقة.'
    : "Green Gate (بوابة خضراء) is a youth-led platform connecting youth, NGOs, consultants, and businesses with climate and environmental opportunities across 22 Arab countries."
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://greengatemena.com/${locale}`,
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
      canonical: `https://greengatemena.com/${locale}`,
      languages: {
        en: 'https://greengatemena.com/en',
        ar: 'https://greengatemena.com/ar',
      },
    },
  }
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Green Gate',
  legalName: 'Green Gate MENA',
  alternateName: ['Green Gate MENA', 'بوابة خضراء', 'Green Gate 4 MENA Youth', 'GreenGate'],
  url: 'https://greengatemena.com',
  logo: 'https://greengatemena.com/logo/logo-mark-color.svg',
  description:
    "The Arab World's gateway to climate and environmental opportunities — connecting youth, NGOs, consultants, and businesses across 22 Arab countries.",
  email: 'greengate4menayouth@gmail.com',
  foundingDate: '2025',
  sameAs: [
    'https://www.instagram.com/greengate4my/',
    'https://www.tiktok.com/@greengate4menayouth',
    'https://www.linkedin.com/company/greengate4menayouth',
  ],
  areaServed: { '@type': 'Place', name: 'Middle East and North Africa' },
}

// Helps Google show a sitelinks search box for the brand.
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Green Gate',
  alternateName: 'بوابة خضراء',
  url: 'https://greengatemena.com',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
