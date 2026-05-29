'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Mail, MapPin, Send, CheckCircle, ChevronDown } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

const EMPTY: FormState = { name: '', email: '', subject: '', message: '' }

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-sand-200 last:border-0">
      <button
        className="flex items-center justify-between w-full py-4 text-start gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-sm text-ink">{q}</span>
        <ChevronDown
          className={['h-4 w-4 text-ink-soft/60 shrink-0 transition-transform', open ? 'rotate-180' : ''].join(' ')}
          aria-hidden
        />
      </button>
      {open && (
        <p className="pb-4 text-sm text-ink-soft leading-relaxed">{a}</p>
      )}
    </div>
  )
}

export function ContactPageContent() {
  const t = useTranslations('contact')
  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<FormState>>({})

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') },
    { q: t('faq6Q'), a: t('faq6A') },
  ]

  function set(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  function validate(): boolean {
    const e: Partial<FormState> = {}
    if (!form.name.trim() || form.name.length < 2) e.name = t('validName')
    if (!form.email.trim() || !form.email.includes('@')) e.email = t('validEmail')
    if (!form.subject.trim() || form.subject.length < 3) e.subject = t('validSubject')
    if (!form.message.trim() || form.message.length < 20) e.message = t('validMessage')
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main id="main-content">
      {/* Hero */}
      <div className="bg-teal-700 text-white grain-overlay py-14">
        <Container>
          <p className="eyebrow text-teal-300/70 mb-4">{t('eyebrow')}</p>
          <h1 className="font-display text-display-lg text-white text-balance">
            {t('heading')}{' '}
            <em className="not-italic font-display italic text-lime">{t('headingItalic')}</em>
          </h1>
          <p className="mt-4 text-teal-300/80 max-w-xl leading-relaxed">
            {t('heroSubhead')}
          </p>
        </Container>
      </div>

      <div className="bg-paper-warm min-h-screen">
        <Container className="py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact details + FAQ */}
            <div className="flex flex-col gap-8">
              {/* Contact info */}
              <div className="flex flex-col gap-4">
                <h2 className="font-display text-lg font-semibold text-teal-800">{t('getInTouch')}</h2>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-teal-600 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-ink-soft/60 uppercase font-mono tracking-wide mb-0.5">
                      {t('emailLabel')}
                    </p>
                    <a
                      href="mailto:hello@greengate-mena.org"
                      className="text-sm text-teal-700 hover:text-teal-800 font-medium transition-colors"
                    >
                      hello@greengate-mena.org
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-teal-600 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-ink-soft/60 uppercase font-mono tracking-wide mb-0.5">
                      {t('regionLabel')}
                    </p>
                    <p className="text-sm text-ink-soft">{t('regionValue')}</p>
                  </div>
                </div>
                <div className="rounded-xl bg-white border border-sand-200 p-4">
                  <p className="text-xs text-ink-soft/60 font-mono uppercase tracking-wide mb-1">
                    {t('responseTimeLabel')}
                  </p>
                  <p className="text-sm text-ink-soft">{t('responseTimeValue')}</p>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="font-display text-lg font-semibold text-teal-800 mb-4">
                  {t('faqHeading')}
                </h2>
                <div className="rounded-2xl bg-white border border-sand-200 px-5 divide-y divide-sand-200">
                  {faqs.map((faq) => (
                    <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-xl font-semibold text-teal-800 mb-6">
                {t('sendMessage')}
              </h2>

              {status === 'success' ? (
                <div className="rounded-2xl bg-white border border-sand-200 p-10 flex flex-col items-center gap-5 text-center">
                  <div className="h-14 w-14 rounded-full bg-leaf/20 flex items-center justify-center">
                    <CheckCircle className="h-7 w-7 text-leaf" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-teal-800">{t('messageSent')}</h3>
                  <p className="text-ink-soft text-sm max-w-sm">{t('thankYou')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-sand-200 p-6 flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-ink" htmlFor="c-name">
                        {t('nameLabel')}
                      </label>
                      <Input
                        id="c-name"
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                        placeholder={t('namePlaceholder')}
                      />
                      {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-ink" htmlFor="c-email">
                        {t('emailFieldLabel')}
                      </label>
                      <Input
                        id="c-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        placeholder={t('emailPlaceholder')}
                      />
                      {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-ink" htmlFor="c-subject">
                      {t('subjectLabel')}
                    </label>
                    <Input
                      id="c-subject"
                      value={form.subject}
                      onChange={(e) => set('subject', e.target.value)}
                      placeholder={t('subjectPlaceholder')}
                    />
                    {errors.subject && <p className="text-xs text-red-600">{errors.subject}</p>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-ink" htmlFor="c-message">
                      {t('messageLabel')}
                    </label>
                    <Textarea
                      id="c-message"
                      rows={6}
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      placeholder={t('messagePlaceholder')}
                    />
                    {errors.message && <p className="text-xs text-red-600">{errors.message}</p>}
                  </div>

                  {status === 'error' && (
                    <p className="text-sm text-red-600">{t('errorGeneric')}</p>
                  )}

                  <Button type="submit" size="lg" disabled={status === 'loading'} className="self-start">
                    {status === 'loading' ? t('sending') : (
                      <><Send className="me-2 h-4 w-4" /> {t('sendBtn')}</>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </div>
    </main>
  )
}
