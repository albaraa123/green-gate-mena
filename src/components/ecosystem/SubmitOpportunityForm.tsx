'use client'

import { useState } from 'react'
import { ArrowLeft, Send, CheckCircle } from 'lucide-react'
import { useLocale } from 'next-intl'
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
  const locale = useLocale()
  const isAr = locale === 'ar'

  const ui = {
    back: isAr ? 'رجوع' : 'Back',
    heroTitle1: isAr ? 'أضف' : 'Submit an',
    heroTitleItalic: isAr ? 'فرصة' : 'Opportunity',
    heroSubhead: isAr
      ? 'شارك زمالة أو منحة أو وظيفة أو برنامجاً مع 22 دولة عربية. مجاني — يُراجع خلال 48 ساعة.'
      : 'Share a fellowship, grant, job, or program with 22 MENA countries. Free to submit.',
    sectionBasic: isAr ? 'المعلومات الأساسية' : 'Basic information',
    sectionDetails: isAr ? 'التفاصيل' : 'Details',
    labelTitle: isAr ? 'عنوان الفرصة *' : 'Opportunity title *',
    placeholderTitle: isAr ? 'مثال: زمالة شباب المناخ 2026' : 'e.g. MENA Climate Youth Fellowship 2026',
    labelOrg: isAr ? 'المنظمة *' : 'Organization *',
    placeholderOrg: isAr ? 'مثال: برنامج الأمم المتحدة للبيئة' : 'e.g. UNEP Arab States',
    labelType: isAr ? 'النوع *' : 'Type *',
    selectType: isAr ? 'اختر نوعاً' : 'Select type',
    labelFormat: isAr ? 'الصيغة' : 'Format',
    selectFormat: isAr ? 'اختر صيغة' : 'Select format',
    labelTheme: isAr ? 'المحور' : 'Theme',
    selectTheme: isAr ? 'اختر محوراً' : 'Select theme',
    labelDeadline: isAr ? 'آخر موعد' : 'Deadline',
    labelDescription: isAr ? 'الوصف *' : 'Description *',
    placeholderDescription: isAr
      ? 'صف الفرصة بـ 50 حرفاً على الأقل...'
      : 'Describe the opportunity in at least 50 characters...',
    charCount: (n: number) => isAr ? `${n} حرف` : `${n} characters`,
    labelLink: isAr ? 'رابط التقديم *' : 'Application link *',
    labelEmail: isAr ? 'بريدك الإلكتروني *' : 'Your contact email *',
    placeholderEmail: isAr ? 'بريدك@منظمتك.com' : 'you@organization.org',
    emailNote: isAr
      ? 'لن يُنشر — للتواصل فقط إذا احتجنا.'
      : 'Not published — only used if we need to follow up.',
    btnSubmit: isAr ? 'أرسل الفرصة' : 'Submit Opportunity',
    btnSubmitting: isAr ? 'جاري الإرسال...' : 'Submitting…',
    errorGeneric: isAr ? 'حدث خطأ. حاول مجدداً.' : 'Something went wrong. Please try again.',
    successTitle: isAr ? 'تم الاستلام!' : 'Submission received!',
    successBody: isAr
      ? 'شكراً! سيراجع فريقنا فرصتك وينشرها خلال 48 ساعة.'
      : 'Thank you! Our team will review your opportunity and publish it within 48 hours.',
    successBtn: isAr ? 'تصفح الفرص' : 'Browse Opportunities',
    errTitle: isAr ? 'عنوان الفرصة مطلوب' : 'Title is required',
    errOrg: isAr ? 'اسم المنظمة مطلوب' : 'Organization is required',
    errType: isAr ? 'اختر نوعاً' : 'Select a type',
    errDesc: isAr ? 'الوصف يجب أن يكون 50 حرفاً على الأقل' : 'Description must be at least 50 characters',
    errLink: isAr ? 'رابط التقديم مطلوب' : 'Link is required',
    errEmail: isAr ? 'بريد إلكتروني صحيح مطلوب' : 'Valid email required',
  }

  const TYPE_LABELS: Record<string, string> = isAr ? {
    fellowship: 'زمالة', grant: 'منحة', event: 'فعالية', competition: 'مسابقة',
    internship: 'تدريب', volunteer: 'تطوع', training: 'تدريب', job: 'وظيفة',
  } : {
    fellowship: 'Fellowship', grant: 'Grant', event: 'Event', competition: 'Competition',
    internship: 'Internship', volunteer: 'Volunteer', training: 'Training', job: 'Job',
  }

  const FORMAT_LABELS: Record<string, string> = isAr ? {
    'in-person': 'حضوري', online: 'عبر الإنترنت', hybrid: 'هجين',
  } : {
    'in-person': 'In-person', online: 'Online', hybrid: 'Hybrid',
  }

  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<FormState>>({})

  function set(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  function validate(): boolean {
    const e: Partial<FormState> = {}
    if (!form.title.trim()) e.title = ui.errTitle
    if (!form.organization.trim()) e.organization = ui.errOrg
    if (!form.type) e.type = ui.errType
    if (!form.description.trim() || form.description.trim().length < 50)
      e.description = ui.errDesc
    if (!form.link.trim()) e.link = ui.errLink
    if (!form.contactEmail.trim() || !form.contactEmail.includes('@'))
      e.contactEmail = ui.errEmail
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
          <h1 className="font-display text-3xl font-semibold text-teal-800">{ui.successTitle}</h1>
          <p className="text-ink-soft max-w-sm">
            {ui.successBody}
          </p>
          <Button asChild>
            <Link href="/ecosystem/opportunities">{ui.successBtn}</Link>
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
            <ArrowLeft className="h-4 w-4" /> {ui.back}
          </Link>
          <h1 className="font-display text-display-lg text-white">
            {ui.heroTitle1}{' '}
            <em className="not-italic italic text-lime">{ui.heroTitleItalic}</em>
          </h1>
          <p className="mt-2 text-teal-300/80 max-w-lg">
            {ui.heroSubhead}
          </p>
        </Container>
      </div>

      <div className="bg-paper-warm min-h-screen">
        <Container className="py-10 max-w-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="rounded-2xl bg-white border border-sand-200 p-6 flex flex-col gap-5">
              <h2 className="font-display text-lg font-semibold text-teal-800">{ui.sectionBasic}</h2>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="title">{ui.labelTitle}</label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder={ui.placeholderTitle}
                />
                {errors.title && <p className="text-xs text-red-600">{errors.title}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="org">{ui.labelOrg}</label>
                <Input
                  id="org"
                  value={form.organization}
                  onChange={(e) => set('organization', e.target.value)}
                  placeholder={ui.placeholderOrg}
                />
                {errors.organization && <p className="text-xs text-red-600">{errors.organization}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-ink" htmlFor="type">{ui.labelType}</label>
                  <Select
                    id="type"
                    value={form.type}
                    onChange={(e) => set('type', e.target.value)}
                    placeholder={ui.selectType}
                    options={TYPES.map((t) => ({ value: t, label: TYPE_LABELS[t] ?? t }))}
                  />
                  {errors.type && <p className="text-xs text-red-600">{errors.type}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-ink" htmlFor="format">{ui.labelFormat}</label>
                  <Select
                    id="format"
                    value={form.format}
                    onChange={(e) => set('format', e.target.value)}
                    placeholder={ui.selectFormat}
                    options={FORMATS.map((f) => ({ value: f, label: FORMAT_LABELS[f] ?? f }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-ink" htmlFor="theme">{ui.labelTheme}</label>
                  <Select
                    id="theme"
                    value={form.theme}
                    onChange={(e) => set('theme', e.target.value)}
                    placeholder={ui.selectTheme}
                    options={THEMES.map((t) => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) }))}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-ink" htmlFor="deadline">{ui.labelDeadline}</label>
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
              <h2 className="font-display text-lg font-semibold text-teal-800">{ui.sectionDetails}</h2>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="description">{ui.labelDescription}</label>
                <Textarea
                  id="description"
                  rows={5}
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  placeholder={ui.placeholderDescription}
                />
                <p className="text-xs text-ink-soft/60">{ui.charCount(form.description.length)}</p>
                {errors.description && <p className="text-xs text-red-600">{errors.description}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="link">{ui.labelLink}</label>
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
                <label className="text-sm font-medium text-ink" htmlFor="email">{ui.labelEmail}</label>
                <Input
                  id="email"
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => set('contactEmail', e.target.value)}
                  placeholder={ui.placeholderEmail}
                />
                <p className="text-xs text-ink-soft/60">{ui.emailNote}</p>
                {errors.contactEmail && <p className="text-xs text-red-600">{errors.contactEmail}</p>}
              </div>
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-600 text-center">{ui.errorGeneric}</p>
            )}

            <Button type="submit" size="lg" disabled={status === 'loading'} className="self-start">
              {status === 'loading' ? ui.btnSubmitting : (
                <><Send className="me-2 h-4 w-4" /> {ui.btnSubmit}</>
              )}
            </Button>
          </form>
        </Container>
      </div>
    </main>
  )
}
