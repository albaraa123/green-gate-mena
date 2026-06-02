import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { UserPlus, Users } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { DirectoryCard } from '@/components/ecosystem/DirectoryCard'
import { DirectoryFilters } from '@/components/ecosystem/DirectoryFilters'
import { getDirectoryProfiles } from '@/lib/supabase/queries'

export const metadata: Metadata = {
  title: 'Directory',
  description:
    'Discover verified NGOs, youth groups, consultants, and institutions working on climate and sustainability across 22 MENA countries.',
}

interface Props {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ type?: string; theme?: string; verified?: string }>
}

export default async function DirectoryPage({ params, searchParams }: Props) {
  const { locale } = await params
  const filters = await searchParams
  setRequestLocale(locale)

  const t = await getTranslations('directoryPage')

  const [allProfiles, filtered] = await Promise.all([
    getDirectoryProfiles(),
    getDirectoryProfiles({ type: filters.type, theme: filters.theme, verified: filters.verified === '1' }),
  ])

  return (
    <main id="main-content">
      {/* Hero */}
      <div className="bg-teal-700 text-white grain-overlay py-14">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
            <div className="flex flex-col gap-3">
              <p className="eyebrow text-teal-300/70">{t('eyebrow')}</p>
              <h1 className="font-display text-display-lg text-white text-balance">
                {t('heading')}{' '}
                <em className="not-italic font-display italic text-lime">{t('headingItalic')}</em>
              </h1>
              <p className="text-teal-300/80 max-w-lg leading-relaxed">{t('subhead')}</p>
            </div>
            <Button asChild size="lg" variant="lime">
              <Link href="/ecosystem/directory/join">
                <UserPlus className="h-4 w-4 me-1.5" />
                {t('listOrg')}
              </Link>
            </Button>
          </div>
        </Container>
      </div>

      {/* Content */}
      <div className="bg-paper-warm min-h-screen">
        <Container className="py-10">
          <div className="mb-8 rounded-2xl bg-white border border-sand-200 p-5">
            <Suspense fallback={<div className="h-20 animate-pulse bg-sand-100 rounded-xl" />}>
              <DirectoryFilters
                total={allProfiles.length}
                filtered={filtered.length}
              />
            </Suspense>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon={Users}
              title={t('noResults')}
              description={t('noResultsHint')}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((profile) => (
                <DirectoryCard key={profile.slug} profile={profile} locale={locale} />
              ))}
            </div>
          )}
        </Container>
      </div>
    </main>
  )
}
