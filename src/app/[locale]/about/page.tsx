import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Leaf, Globe, Users, BookOpen, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Green Gate MENA is a youth-led platform connecting climate changemakers, NGOs, consultants, and businesses across 22 MENA countries.',
}
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { TeamCarousel } from '@/components/ui/TeamCarousel'
import { getTeam, getPartners } from '@/lib/supabase/queries'
import { getGallery } from '@/lib/supabase/gallery'
import { impactTimeline } from '@/data/stats'
import { getCountryName } from '@/data/countries'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('about')
  const isAr = locale === 'ar'

  const [team, allPartners, gallery] = await Promise.all([getTeam(), getPartners(), getGallery()])
  const strategic = allPartners.filter((p) => p.tier === 'strategic' || p.tier === 'program')

  // Find the founder's photo from the team (matches by role or name).
  const founder = team.find(
    (m) => /founder|ceo|مؤسس|تنفيذ/i.test(`${m.role} ${m.roleAr ?? ''}`) || /islem|إسلام/i.test(m.name)
  )

  const values = [
    { icon: Leaf, title: t('value1Title'), description: t('value1Desc') },
    { icon: Globe, title: t('value2Title'), description: t('value2Desc') },
    { icon: Users, title: t('value3Title'), description: t('value3Desc') },
    { icon: BookOpen, title: t('value4Title'), description: t('value4Desc') },
  ]

  return (
    <main id="main-content">

      {/* Our Story */}
      <section className="section-padding bg-paper pt-28">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow mb-4">{t('storyEyebrow')}</p>
            <h1 className="font-display text-display-lg text-teal-800 text-balance leading-tight">
              {t('storyHeading')}{' '}
              <em className="not-italic italic text-teal-600">{t('storyHeadingItalic')}</em>
            </h1>
            <div className="mt-8 flex flex-col gap-5 text-start">
              <p className="text-ink-soft leading-relaxed text-lg">{t('storyP1')}</p>
              <p className="text-ink-soft leading-relaxed text-lg">{t('storyP2')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Founder */}
      <section className="section-padding bg-paper-warm grain-overlay">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-14 items-center max-w-4xl mx-auto">
            {/* Photo */}
            <div className="relative mx-auto lg:mx-0 w-full max-w-[340px] overflow-hidden rounded-2xl bg-teal-50" style={{ aspectRatio: '3/4' }}>
              {founder?.avatar ? (
                <Image
                  src={founder.avatar}
                  alt={t('founderName')}
                  fill
                  sizes="340px"
                  className="object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-display text-7xl font-bold text-teal-300">
                    {t('founderName').charAt(0)}
                  </span>
                </div>
              )}
            </div>
            {/* Bio */}
            <div className="flex flex-col gap-4 text-center lg:text-start">
              <p className="eyebrow">{t('founderEyebrow')}</p>
              <h2 className="font-display text-3xl font-semibold text-teal-800">{t('founderName')}</h2>
              <p className="text-teal-600 font-medium">{t('founderRole')}</p>
              <p className="text-ink-soft leading-relaxed mt-2">{t('founderBio')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="section-padding bg-paper">
          <Container>
            <div className="text-center mb-14">
              <p className="eyebrow mb-4">{t('teamEyebrow')}</p>
              <h2 className="font-display text-display-lg text-teal-800 text-balance">
                {t('teamHeadingPre')}{' '}
                <em className="not-italic italic text-teal-700">{t('teamHeadingItalic')}</em>
              </h2>
              <p className="text-ink-soft mt-4 max-w-xl mx-auto leading-relaxed">
                {t('teamSubhead')}
              </p>
            </div>
            <TeamCarousel
              isAr={isAr}
              members={team.map((m) => ({
                id: m.id,
                name: m.name,
                nameAr: m.nameAr ?? null,
                role: m.role,
                roleAr: m.roleAr ?? null,
                country: m.country,
                avatar: m.avatar ?? null,
                countryLabel: getCountryName(m.country, locale),
              }))}
            />
          </Container>
        </section>
      )}

      {/* Gallery — activities & events */}
      {gallery.length > 0 && (
        <section className="section-padding bg-paper-warm grain-overlay">
          <Container>
            <div className="text-center mb-12">
              <p className="eyebrow mb-4">{t('galleryEyebrow')}</p>
              <h2 className="font-display text-display-lg text-teal-800 text-balance">
                {t('galleryHeading')}{' '}
                <em className="not-italic italic text-teal-700">{t('galleryHeadingItalic')}</em>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((img, i) => (
                <div
                  key={img.id}
                  className={[
                    'relative overflow-hidden rounded-2xl bg-teal-50 group',
                    // Make some images span 2 rows for a dynamic masonry feel
                    i % 6 === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-[3/2]',
                  ].join(' ')}
                >
                  <Image
                    src={img.image}
                    alt={(isAr ? img.captionAr : img.caption) ?? ''}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {(isAr ? img.captionAr : img.caption) && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8">
                      <p className="text-white text-xs font-medium leading-snug">
                        {isAr ? img.captionAr : img.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Our Impact */}
      <section className="section-padding bg-paper">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex flex-col gap-6">
              <p className="eyebrow">{t('impactSectionEyebrow')}</p>
              <h2 className="font-display text-display-lg text-teal-800 text-balance">
                {t('impactSectionHeading')}{' '}
                <em className="not-italic italic text-teal-600">{t('impactSectionHeadingItalic')}</em>
              </h2>
              <p className="text-ink-soft leading-relaxed text-lg">{t('impactSectionSubhead')}</p>
              <Button asChild className="self-start">
                <Link href="/get-involved/youth">
                  {t('missionCta')} <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
                </Link>
              </Button>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute start-4 top-0 bottom-0 w-px bg-teal-100" aria-hidden />
              <div className="flex flex-col gap-8 ps-12">
                {impactTimeline.map((entry) => (
                  <div key={entry.year} className="relative">
                    <div className="absolute -start-[2.25rem] top-1 h-3 w-3 rounded-full bg-teal-700 border-2 border-white" />
                    <span className="font-mono text-xs font-semibold text-teal-600 uppercase tracking-wide">
                      {entry.year}
                    </span>
                    <h3 className="font-display text-base font-semibold text-ink mt-1">
                      {isAr ? (entry.titleAr ?? entry.title) : entry.title}
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed mt-1">
                      {isAr ? (entry.descriptionAr ?? entry.description) : entry.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="section-padding bg-paper-warm grain-overlay">
        <Container>
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">{t('valuesEyebrow')}</p>
            <h2 className="font-display text-display-lg text-teal-800 text-balance">
              {t('valuesHeadingPre')}{' '}
              <em className="not-italic italic text-teal-700">{t('valuesHeadingItalic')}</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-5 rounded-2xl bg-white border border-sand-200 p-6"
              >
                <div className="h-11 w-11 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-teal-700" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Partners */}
      {strategic.length > 0 && (
        <section className="section-padding bg-teal-700 grain-overlay">
          <Container>
            <div className="text-center mb-10">
              <p className="eyebrow text-teal-300/70 mb-4">{t('partnersEyebrow')}</p>
              <h2 className="font-display text-display-lg text-white text-balance">
                {t('partnersHeadingPre')}{' '}
                <em className="not-italic italic text-lime">{t('partnersHeadingItalic')}</em>
              </h2>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {strategic.map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center justify-center rounded-xl bg-white/10 border border-white/10 px-4 py-5 h-16"
                  title={partner.name}
                >
                  <span className="text-xs font-mono text-white/60 text-center leading-tight">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                <Link href="/get-involved/partners">{t('becomePartner')}</Link>
              </Button>
            </div>
          </Container>
        </section>
      )}
    </main>
  )
}
