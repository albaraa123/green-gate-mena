import { setRequestLocale } from 'next-intl/server'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="section-padding">
      <p className="text-center text-ink-soft">Homepage — Phase 3 will build this out.</p>
    </div>
  )
}
