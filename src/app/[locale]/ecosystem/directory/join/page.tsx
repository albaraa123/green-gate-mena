import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { DirectoryJoinForm } from '@/components/ecosystem/DirectoryJoinForm'

export const metadata: Metadata = {
  title: 'Join the Directory',
  description:
    'List your NGO, youth group, or organization on the Green Gate MENA directory — free to join, reviewed within 5 business days.',
}

interface Props {
  params: Promise<{ locale: string }>
}

export default async function JoinDirectoryPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <DirectoryJoinForm />
}
