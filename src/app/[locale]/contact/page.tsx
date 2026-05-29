import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ContactPageContent } from '@/components/contact/ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Green Gate MENA — questions, partnership inquiries, media requests, or general feedback.',
}

interface Props {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ContactPageContent />
}
