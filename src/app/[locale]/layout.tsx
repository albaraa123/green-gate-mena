import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Manrope } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { IntroAnimation } from '@/components/ui/IntroAnimation'
import { ToastProvider } from '@/components/ui/Toast'
import { CursorFollower } from '@/components/ui/CursorFollower'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import '../globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://greengatemena.com'

export const metadata: Metadata = {
  title: {
    default: 'Green Gate (بوابة خضراء) — The Arab World\'s Gateway to Environmental Opportunities',
    template: '%s | Green Gate',
  },
  description:
    'Green Gate (بوابة خضراء) connects youth, NGOs, and institutions with climate and environmental opportunities across 22 Arab countries.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    siteName: 'Green Gate',
    title: 'Green Gate (بوابة خضراء) — The Arab World\'s Gateway to Environmental Opportunities',
    description:
      'Green Gate (بوابة خضراء) connects youth, NGOs, and institutions with climate and environmental opportunities across 22 Arab countries.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@GreenGateMENA',
    title: 'Green Gate MENA — Climate & Environment Gateway for MENA',
    description:
      'Green Gate MENA connects youth, NGOs, and institutions with climate and environmental opportunities across 22 MENA countries.',
  },
  icons: {
    icon: [
      { url: '/logo/favicon.ico', sizes: 'any' },
      { url: '/logo/logo-mark-color.svg', type: 'image/svg+xml' },
    ],
    apple: '/logo/logo-mark-color.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  // Add your Google Search Console verification code in NEXT_PUBLIC_GOOGLE_VERIFICATION
  ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION } }
    : {}),
  alternates: {
    canonical: siteUrl,
    languages: {
      'en': `${siteUrl}/en`,
      'ar': `${siteUrl}/ar`,
    },
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'ar')) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${manrope.variable} h-full`}
    >
      <head>
        {/* Self-hosted Thmanyah Sans — Arabic locale only */}
        {locale === 'ar' && (
          <style>{`
            @font-face {
              font-family: 'ThmanyahSans';
              src: url('/fonts/thmanyah/thmanyahsans-Regular.woff2') format('woff2');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'ThmanyahSans';
              src: url('/fonts/thmanyah/thmanyahsans-Medium.woff2') format('woff2');
              font-weight: 500;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'ThmanyahSans';
              src: url('/fonts/thmanyah/thmanyahsans-Bold.woff2') format('woff2');
              font-weight: 700;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'ThmanyahSans';
              src: url('/fonts/thmanyah/thmanyahsans-Black.woff2') format('woff2');
              font-weight: 900;
              font-style: normal;
              font-display: swap;
            }
            :root { --font-thmanyah: 'ThmanyahSans'; }
          `}</style>
        )}
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink antialiased">
        <GoogleAnalytics />
        <a href="#main-content" className="skip-to-content">
          {locale === 'ar' ? 'انتقل إلى المحتوى الرئيسي' : 'Skip to main content'}
        </a>
        <NextIntlClientProvider messages={messages}>
          <ToastProvider>
            <CursorFollower />
            <IntroAnimation />
            <Header />
            <div className="flex-1 pt-16 md:pt-18">
              {children}
            </div>
            <Footer />
            <ScrollToTop />
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
