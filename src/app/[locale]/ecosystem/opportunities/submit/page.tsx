import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { SubmitOpportunityForm } from '@/components/ecosystem/SubmitOpportunityForm'

export const metadata: Metadata = {
  title: 'Submit an Opportunity',
  description:
    'Share a fellowship, grant, job, or program with 22 MENA countries. Free to submit — reviewed within 48 hours.',
}

interface Props {
  params: Promise<{ locale: string }>
}

export default async function SubmitOpportunityPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <SubmitOpportunityForm />
}
