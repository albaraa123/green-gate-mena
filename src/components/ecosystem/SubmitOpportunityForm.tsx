'use client'

import { useState } from 'react'
import { ArrowLeft, Send, CheckCircle } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'

const TYPES = ['fellowship', 'grant', 'event', 'competition', 'internship', 'volunteer', 'training', 'job']
const THEMES = ['climate', 'energy', 'water', 'biodiversity', 'waste', 'sustainability', 'policy', 'finance', 'agriculture', 'urban', 'oceans', 'youth']
const FORMATS = ['in-person', 'online', 'hybrid']

interface FormState {
  title: string
  organization: string
  type: string
  theme: string
  format: string
  deadline: string
  description: string
  link: string
  contactEmail: string
}

const EMPTY: FormState = {
  title: '', organization: '', type: '', theme: '',
  format: '', deadline: '', description: '', link: '', contactEmail: '',
}

export function SubmitOpportunityForm() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<FormState>>({})

  function set(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  function validate(): boolean {
    const e: Partial<FormState> = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.organization.trim()) e.organization = 'Organization is required'
    if (!form.type) e.type = 'Select a type'
    if (!form.description.trim() || form.description.trim().length < 50)
      e.description = 'Description must be at least 50 characters'
    if (!form.link.trim()) e.link = 'Link is required'
    if (!form.contactEmail.trim() || !form.contactEmail.includes('@'))
      e.contactEmail = 'Valid email required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/opportunities/submit', {
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
          <h1 className="font-display text-3xl font-semibold text-teal-800">Submission received!</h1>
          <p className="text-ink-soft max-w-sm">
            Thank you! Our team will review your opportunity and publish it within 48 hours.
          </p>
          <Button asChild>
            <Link href="/ecosystem/opportunities">Browse Opportunities</Link>
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
            href="/ecosystem/opportunities"
            className="inline-flex items-center gap-1.5 text-sm text-teal-300/70 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <h1 className="font-display text-display-lg text-white">
            Submit an{' '}
            <em className="not-italic italic text-lime">Opportunity</em>
          </h1>
          <p className="mt-2 text-teal-300/80 max-w-lg">
            Share a fellowship, grant, job, or program with 22 MENA countries. Free to submit.
          </p>
        </Container>
      </div>

      <div className="bg-paper-warm min-h-screen">
        <Container className="py-10 max-w-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="rounded-2xl bg-white border border-sand-200 p-6 flex flex-col gap-5">
              <h2 className="font-display text-lg font-semibold text-teal-800">Basic information</h2>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="title">Opportunity title *</label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="e.g. MENA Climate Youth Fellowship 2026"
                />
                {errors.title && <p className="text-xs text-red-600">{errors.title}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="org">Organization *</label>
                <Input
                  id="org"
                  value={form.organization}
                  onChange={(e) => set('organization', e.target.value)}
                  placeholder="e.g. UNEP Arab States"
                />
                {errors.organization && <p className="text-xs text-red-600">{errors.organization}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-ink" htmlFor="type">Type *</label>
                  <Select
                    id="type"
                    value={form.type}
                    onChange={(e) => set('type', e.target.value)}
                    placeholder="Select type"
                    options={TYPES.map((t) => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) }))}
                  />
                  {errors.type && <p className="text-xs text-red-600">{errors.type}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-ink" htmlFor="format">Format</label>
                  <Select
                    id="format"
                    value={form.format}
                    onChange={(e) => set('format', e.target.value)}
                    placeholder="Select format"
                    options={FORMATS.map((f) => ({ value: f, label: f.charAt(0).toUpperCase() + f.slice(1) }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-ink" htmlFor="theme">Theme</label>
                  <Select
                    id="theme"
                    value={form.theme}
                    onChange={(e) => set('theme', e.target.value)}
                    placeholder="Select theme"
                    options={THEMES.map((t) => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) }))}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-ink" htmlFor="deadline">Deadline</label>
                  <Input
                    id="deadline"
                    type="date"
                    value={form.deadline}
                    onChange={(e) => set('deadline', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-sand-200 p-6 flex flex-col gap-5">
              <h2 className="font-display text-lg font-semibold text-teal-800">Details</h2>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="description">Description *</label>
                <Textarea
                  id="description"
                  rows={5}
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  placeholder="Describe the opportunity in at least 50 characters..."
                />
                <p className="text-xs text-ink-soft/60">{form.description.length} characters</p>
                {errors.description && <p className="text-xs text-red-600">{errors.description}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="link">Application link *</label>
                <Input
                  id="link"
                  type="url"
                  value={form.link}
                  onChange={(e) => set('link', e.target.value)}
                  placeholder="https://..."
                />
                {errors.link && <p className="text-xs text-red-600">{errors.link}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="email">Your contact email *</label>
                <Input
                  id="email"
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => set('contactEmail', e.target.value)}
                  placeholder="you@organization.org"
                />
                <p className="text-xs text-ink-soft/60">Not published — only used if we need to follow up.</p>
                {errors.contactEmail && <p className="text-xs text-red-600">{errors.contactEmail}</p>}
              </div>
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-600 text-center">Something went wrong. Please try again.</p>
            )}

            <Button type="submit" size="lg" disabled={status === 'loading'} className="self-start">
              {status === 'loading' ? 'Submitting…' : (
                <><Send className="me-2 h-4 w-4" /> Submit Opportunity</>
              )}
            </Button>
          </form>
        </Container>
      </div>
    </main>
  )
}
