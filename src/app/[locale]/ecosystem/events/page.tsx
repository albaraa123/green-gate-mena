import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { CalendarDays } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'
import { Container } from '@/components/ui/Container'
import { EventCard } from '@/components/ecosystem/EventCard'
import { getUpcomingEvents, getPastEvents } from '@/lib/supabase/queries'

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Climate and sustainability events, conferences, and workshops across the MENA region — summits, webinars, and training sessions.',
}

interface Props {
  params: Promise<{ locale: string }>
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('eventsPage')

  const [upcoming, past] = await Promise.all([getUpcomingEvents(), getPastEvents()])

  return (
    <main id="main-content">
      {/* Hero */}
      <div className="bg-teal-700 text-white grain-overlay py-14">
        <Container>
          <div className="flex flex-col gap-3">
            <p className="eyebrow text-teal-300/70">{t('eyebrow')}</p>
            <h1 className="font-display text-display-lg text-white text-balance">
              {t('heading')}{' '}
              <em className="not-italic font-display italic text-lime">{t('headingItalic')}</em>
            </h1>
            <p className="text-teal-300/80 max-w-lg leading-relaxed">{t('subhead')}</p>
          </div>
        </Container>
      </div>

      <div className="bg-paper-warm min-h-screen">
        <Container className="py-10">
          {/* Upcoming */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <CalendarDays className="h-5 w-5 text-teal-700" />
              <h2 className="font-display text-xl font-semibold text-teal-800">
                {t('upcoming')}
              </h2>
              <span className="ms-2 rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-mono font-semibold text-teal-800">
                {upcoming.length}
              </span>
            </div>

            {upcoming.length === 0 ? (
              <EmptyState icon={CalendarDays} title={t('noUpcoming')} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {upcoming.map((ev) => (
                  <EventCard key={ev.slug} event={ev} locale={locale} />
                ))}
              </div>
            )}
          </section>

          {/* Past */}
          {past.length > 0 && (
            <section className="mt-14">
              <h2 className="font-display text-xl font-semibold text-ink-soft/60 mb-6">
                {t('past')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {past.map((ev) => (
                  <EventCard key={ev.slug} event={ev} isPast locale={locale} />
                ))}
              </div>
            </section>
          )}
        </Container>
      </div>
    </main>
  )
}
