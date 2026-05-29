'use client'

import { useState } from 'react'
import { ArrowLeft, Send, CheckCircle } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'

const TYPES = ['ngo', 'youth-group', 'individual', 'institution', 'business']
const THEMES = ['climate', 'energy', 'water', 'biodiversity', 'waste', 'sustainability', 'policy', 'finance', 'agriculture', 'urban', 'oceans', 'youth']

const COUNTRY_NAMES: Record<string, string> = {
  MA: 'Morocco', DZ: 'Algeria', TN: 'Tunisia', LY: 'Libya', EG: 'Egypt',
  SD: 'Sudan', MR: 'Mauritania', LB: 'Lebanon', SY: 'Syria', JO: 'Jordan',
  PS: 'Palestine', IQ: 'Iraq', SA: 'Saudi Arabia', AE: 'UAE', KW: 'Kuwait',
  QA: 'Qatar', BH: 'Bahrain', OM: 'Oman', YE: 'Yemen', DJ: 'Djibouti',
  SO: 'Somalia', KM: 'Comoros',
}

interface FormState {
  name: string
  type: string
  country: string
  city: string
  description: string
  themes: string[]
  website: string
  email: string
}

const EMPTY: FormState = {
  name: '', type: '', country: '', city: '', description: '',
  themes: [], website: '', email: '',
}

export function DirectoryJoinForm() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  function set(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  function toggleTheme(theme: string) {
    setForm((prev) => ({
      ...prev,
      themes: prev.themes.includes(theme)
        ? prev.themes.filter((t) => t !== theme)
        : [...prev.themes, theme],
    }))
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.type) e.type = 'Select a type'
    if (!form.country) e.country = 'Select a country'
    if (!form.description.trim() || form.description.length < 50)
      e.description = 'Description must be at least 50 characters'
    if (!form.email.trim() || !form.email.includes('@'))
      e.email = 'Valid email required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/directory/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <main id="main-content" className="bg-paper-warm min-h-screen">
        <Container className="py-20 text-center flex flex-col items-center gap-6">
          <div className="h-16 w-16 rounded-full bg-leaf/20 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-leaf" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-teal-800">Application submitted!</h1>
          <p className="text-ink-soft max-w-sm">
            We&apos;ll review your profile and publish it to the directory within 5 business days.
          </p>
          <Button asChild>
            <Link href="/ecosystem/directory">Browse Directory</Link>
          </Button>
        </Container>
      </main>
    )
  }

  return (
    <main id="main-content">
      <div className="bg-teal-700 text-white grain-overlay py-12">
        <Container>
          <Link
            href="/ecosystem/directory"
            className="inline-flex items-center gap-1.5 text-sm text-teal-300/70 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Directory
          </Link>
          <h1 className="font-display text-display-lg text-white">
            Join the{' '}
            <em className="not-italic italic text-lime">Directory</em>
          </h1>
          <p className="mt-2 text-teal-300/80 max-w-lg">
            List your NGO, group, or organization — free to join, reviewed within 5 days.
          </p>
        </Container>
      </div>

      <div className="bg-paper-warm min-h-screen">
        <Container className="py-10 max-w-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="rounded-2xl bg-white border border-sand-200 p-6 flex flex-col gap-5">
              <h2 className="font-display text-lg font-semibold text-teal-800">Organization details</h2>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="name">Name *</label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="Your organization's full name"
                />
                {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-ink" htmlFor="type">Type *</label>
                  <Select
                    id="type"
                    value={form.type}
                    onChange={(e) => set('type', e.target.value)}
                    placeholder="Select type"
                    options={TYPES.map((t) => ({ value: t, label: t.replace('-', ' ').replace(/^\w/, (c) => c.toUpperCase()) }))}
                  />
                  {errors.type && <p className="text-xs text-red-600">{errors.type}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-ink" htmlFor="country">Country *</label>
                  <Select
                    id="country"
                    value={form.country}
                    onChange={(e) => set('country', e.target.value)}
                    placeholder="Select country"
                    options={Object.entries(COUNTRY_NAMES).map(([code, name]) => ({ value: code, label: name }))}
                  />
                  {errors.country && <p className="text-xs text-red-600">{errors.country}</p>}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="city">City (optional)</label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => set('city', e.target.value)}
                  placeholder="e.g. Cairo"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="description">Description *</label>
                <Textarea
                  id="description"
                  rows={4}
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  placeholder="Describe your organization's mission and work..."
                />
                {errors.description && <p className="text-xs text-red-600">{errors.description}</p>}
              </div>

              {/* Themes */}
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-ink">Themes</p>
                <div className="flex flex-wrap gap-2">
                  {THEMES.map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => toggleTheme(theme)}
                      className={[
                        'rounded-full px-3 py-1 text-xs font-medium capitalize border transition-colors',
                        form.themes.includes(theme)
                          ? 'bg-teal-100 text-teal-800 border-teal-300'
                          : 'bg-white text-ink-soft border-sand-200 hover:border-teal-200',
                      ].join(' ')}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-sand-200 p-6 flex flex-col gap-5">
              <h2 className="font-display text-lg font-semibold text-teal-800">Contact</h2>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="email">Email *</label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="contact@organization.org"
                />
                {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="website">Website (optional)</label>
                <Input
                  id="website"
                  type="url"
                  value={form.website}
                  onChange={(e) => set('website', e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-600 text-center">Something went wrong. Please try again.</p>
            )}

            <Button type="submit" size="lg" disabled={status === 'loading'} className="self-start">
              {status === 'loading' ? 'Submitting…' : (
                <><Send className="me-2 h-4 w-4" /> Submit Profile</>
              )}
            </Button>
          </form>
        </Container>
      </div>
    </main>
  )
}
