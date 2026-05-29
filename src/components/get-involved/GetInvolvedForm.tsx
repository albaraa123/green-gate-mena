'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'

const COUNTRY_OPTIONS = [
  { value: 'MA', label: 'Morocco' }, { value: 'DZ', label: 'Algeria' },
  { value: 'TN', label: 'Tunisia' }, { value: 'LY', label: 'Libya' },
  { value: 'EG', label: 'Egypt' }, { value: 'SD', label: 'Sudan' },
  { value: 'MR', label: 'Mauritania' }, { value: 'LB', label: 'Lebanon' },
  { value: 'SY', label: 'Syria' }, { value: 'JO', label: 'Jordan' },
  { value: 'PS', label: 'Palestine' }, { value: 'IQ', label: 'Iraq' },
  { value: 'SA', label: 'Saudi Arabia' }, { value: 'AE', label: 'UAE' },
  { value: 'KW', label: 'Kuwait' }, { value: 'QA', label: 'Qatar' },
  { value: 'BH', label: 'Bahrain' }, { value: 'OM', label: 'Oman' },
  { value: 'YE', label: 'Yemen' }, { value: 'DJ', label: 'Djibouti' },
  { value: 'SO', label: 'Somalia' }, { value: 'KM', label: 'Comoros' },
]

type Pathway = 'youth' | 'ngo' | 'consultant' | 'partner'

interface Props {
  pathway: Pathway
  showOrg?: boolean
  orgLabel?: string
  messagePlaceholder?: string
}

interface FormState {
  name: string
  email: string
  organization: string
  country: string
  message: string
}

const EMPTY: FormState = { name: '', email: '', organization: '', country: '', message: '' }

export function GetInvolvedForm({ pathway, showOrg = false, orgLabel = 'Organization', messagePlaceholder = 'Tell us about yourself...' }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<FormState>>({})

  function set(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  function validate(): boolean {
    const e: Partial<FormState> = {}
    if (!form.name.trim() || form.name.length < 2) e.name = 'Name must be at least 2 characters'
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required'
    if (!form.country) e.country = 'Please select your country'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/get-involved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pathway, ...form }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-white border border-sand-200 p-8 flex flex-col items-center gap-5 text-center">
        <div className="h-14 w-14 rounded-full bg-leaf/20 flex items-center justify-center">
          <CheckCircle className="h-7 w-7 text-leaf" />
        </div>
        <h3 className="font-display text-xl font-semibold text-teal-800">Application received!</h3>
        <p className="text-ink-soft text-sm max-w-sm">
          We&apos;ll review your application and reach out within 5 business days. Welcome to the Green Gate MENA community!
        </p>
        <Button asChild variant="ghost">
          <Link href="/ecosystem/opportunities">Browse Opportunities</Link>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-sand-200 p-6 flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink" htmlFor="gi-name">Full name *</label>
          <Input
            id="gi-name"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Your full name"
          />
          {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink" htmlFor="gi-email">Email *</label>
          <Input
            id="gi-email"
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink" htmlFor="gi-country">Country *</label>
          <Select
            id="gi-country"
            value={form.country}
            onChange={(e) => set('country', e.target.value)}
            placeholder="Select country"
            options={COUNTRY_OPTIONS}
          />
          {errors.country && <p className="text-xs text-red-600">{errors.country}</p>}
        </div>
        {showOrg && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink" htmlFor="gi-org">{orgLabel}</label>
            <Input
              id="gi-org"
              value={form.organization}
              onChange={(e) => set('organization', e.target.value)}
              placeholder="e.g. Your NGO or organization"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-ink" htmlFor="gi-message">Message (optional)</label>
        <Textarea
          id="gi-message"
          rows={4}
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder={messagePlaceholder}
        />
        <p className="text-xs text-ink-soft/60">{form.message.length}/500</p>
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}

      <Button type="submit" size="lg" disabled={status === 'loading'} className="self-start">
        {status === 'loading' ? 'Submitting…' : (
          <><Send className="me-2 h-4 w-4" /> Submit Application</>
        )}
      </Button>
    </form>
  )
}
