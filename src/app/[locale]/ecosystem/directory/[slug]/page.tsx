import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { Globe, Mail, BadgeCheck, MapPin, Users, Calendar } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { getProfileBySlug } from '@/lib/supabase/queries'
import type { DirectoryProfile } from '@/types'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

const TYPE_LABELS: Record<DirectoryProfile['type'], { en: string; ar: string }> = {
  ngo: { en: 'NGO', ar: 'منظمة غير حكومية' },
  'youth-group': { en: 'Youth Group', ar: 'مجموعة شبابية' },
  individual: { en: 'Individual', ar: 'فرد' },
  institution: { en: 'Institution', ar: 'مؤسسة' },
  business: { en: 'Business', ar: 'شركة' },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const profile = await getProfileBySlug(slug)
  if (!profile) return {}
  const desc = profile.description.length > 160 ? profile.description.slice(0, 157) + '…' : profile.description
  return { title: profile.name, description: desc }
}

export default async function ProfilePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const profile = await getProfileBySlug(slug)
  if (!profile) notFound()

  const isAr = locale === 'ar'
  const typeLabel = TYPE_LABELS[profile.type]?.[isAr ? 'ar' : 'en'] ?? profile.type

  return (
    <main id="main-content">
      {/* Breadcrumb */}
      <div className="bg-paper border-b border-sand-200 py-3">
        <Container>
          <Breadcrumbs
            crumbs={[
              { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
              { label: isAr ? 'الدليل' : 'Directory', href: '/ecosystem/directory' },
              { label: profile.name },
            ]}
          />
        </Container>
      </div>

      <div className="bg-paper-warm min-h-screen">
        <Container className="py-10">
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            {/* Header card */}
            <div className="rounded-2xl bg-white border border-sand-200 p-6 md:p-8 flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 shrink-0 rounded-xl bg-teal-100 flex items-center justify-center overflow-hidden">
                  {profile.logo ? (
                    <Image src={profile.logo} alt={profile.name} fill sizes="64px" className="object-contain p-1.5" />
                  ) : (
                    <span className="font-display text-2xl font-semibold text-teal-700">{profile.name.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-800">
                      {typeLabel}
                    </span>
                    {profile.verified && (
                      <span className="flex items-center gap-1 text-xs text-teal-600 font-medium">
                        <BadgeCheck className="h-3.5 w-3.5" /> {isAr ? 'موثّق' : 'Verified'}
                      </span>
                    )}
                  </div>
                  <h1 className="font-display text-2xl md:text-3xl font-semibold text-teal-800">{profile.name}</h1>
                  <p className="flex items-center gap-1.5 text-sm text-ink-soft">
                    <MapPin className="h-4 w-4" />
                    {profile.city ? `${profile.city}, ` : ''}{profile.country}
                  </p>
                </div>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap gap-4 text-sm text-ink-soft border-t border-sand-100 pt-4">
                {profile.founded && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-teal-600" />
                    {isAr ? 'تأسست' : 'Est.'} {profile.founded}
                  </span>
                )}
                {profile.members && (
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-teal-600" />
                    {profile.members.toLocaleString()} {isAr ? 'عضو' : 'members'}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl bg-white border border-sand-200 p-6 md:p-8">
              <h2 className="font-display text-lg font-semibold text-teal-800 mb-3">
                {isAr ? 'نبذة' : 'About'}
              </h2>
              <p className="text-ink-soft leading-relaxed whitespace-pre-wrap">{profile.description}</p>

              {/* Themes */}
              {profile.themes.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {profile.themes.map((t) => (
                    <span key={t} className="rounded-full bg-teal-50 border border-teal-100 px-3 py-1 text-xs text-teal-700 capitalize">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Contact */}
            {(profile.website || profile.email) && (
              <div className="flex flex-wrap gap-3">
                {profile.website && profile.website !== '#' && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-teal-700 text-white px-5 py-2.5 text-sm font-medium hover:bg-teal-800 transition-colors"
                  >
                    <Globe className="h-4 w-4" /> {isAr ? 'زيارة الموقع' : 'Visit website'}
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 rounded-lg border border-sand-200 text-ink px-5 py-2.5 text-sm font-medium hover:border-teal-300 hover:text-teal-700 transition-colors"
                  >
                    <Mail className="h-4 w-4" /> {isAr ? 'تواصل' : 'Contact'}
                  </a>
                )}
              </div>
            )}
          </div>
        </Container>
      </div>
    </main>
  )
}
