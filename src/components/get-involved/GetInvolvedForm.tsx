'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { Send, CheckCircle } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'

const COUNTRY_EN: Record<string, string> = {
  MA: 'Morocco', DZ: 'Algeria', TN: 'Tunisia', LY: 'Libya', EG: 'Egypt',
  SD: 'Sudan', MR: 'Mauritania', LB: 'Lebanon', SY: 'Syria', JO: 'Jordan',
  PS: 'Palestine', IQ: 'Iraq', SA: 'Saudi Arabia', AE: 'UAE', KW: 'Kuwait',
  QA: 'Qatar', BH: 'Bahrain', OM: 'Oman', YE: 'Yemen', DJ: 'Djibouti',
  SO: 'Somalia', KM: 'Comoros',
}

const COUNTRY_AR: Record<string, string> = {
  MA: 'المغرب', DZ: 'الجزائر', TN: 'تونس', LY: 'ليبيا', EG: 'مصر',
  SD: 'السودان', MR: 'موريتانيا', LB: 'لبنان', SY: 'سوريا', JO: 'الأردن',
  PS: 'فلسطين', IQ: 'العراق', SA: 'المملكة العربية السعودية', AE: 'الإمارات',
  KW: 'الكويت', QA: 'قطر', BH: 'البحرين', OM: 'عُمان', YE: 'اليمن',
  DJ: 'جيبوتي', SO: 'الصومال', KM: 'جزر القمر',
}

const COUNTRY_CODES = Object.keys(COUNTRY_EN)

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

export function GetInvolvedForm({ pathway, showOrg = false, orgLabel, messagePlaceholder }: Props) {
  const locale = useLocale()
  const isAr = locale === 'ar'

  const ui = {
    labelName: isAr ? 'الاسم الكامل *' : 'Full name *',
    placeholderName: isAr ? 'اسمك الكامل' : 'Your full name',
    labelEmail: isAr ? 'البريد الإلكتروني *' : 'Email *',
    placeholderEmail: isAr ? 'بريدك@مثال.com' : 'you@example.com',
    labelCountry: isAr ? 'الدولة *' : 'Country *',
    placeholderCountry: isAr ? 'اختر الدولة' : 'Select country',
    labelOrg: orgLabel ?? (isAr ? 'المنظمة أو الجهة' : 'Organization'),
    placeholderOrg: isAr ? 'مثال: منظمتك أو جهتك' : 'e.g. Your NGO or organization',
    labelMessage: isAr ? 'الرسالة (اختياري)' : 'Message (optional)',
    placeholderMessage: messagePlaceholder ?? (isAr ? 'أخبرنا عن نفسك...' : 'Tell us about yourself...'),
    btnSubmit: isAr ? 'إرسال الطلب' : 'Submit Application',
    btnSubmitting: isAr ? 'جاري الإرسال...' : 'Submitting…',
    errorGeneric: isAr ? 'حدث خطأ. حاول مجدداً.' : 'Something went wrong. Please try again.',
    errName: isAr ? 'الاسم يجب أن يكون حرفين على الأقل' : 'Name must be at least 2 characters',
    errEmail: isAr ? 'بريد إلكتروني صحيح مطلوب' : 'Valid email required',
    errCountry: isAr ? 'يرجى اختيار دولتك' : 'Please select your country',
    successTitle: isAr ? 'تم استلام طلبك!' : 'Application received!',
    successBody: isAr
      ? 'سنراجع طلبك ونتواصل معك خلال 5 أيام عمل. أهلاً بك في مجتمع Green Gate MENA!'
      : "We'll review your application and reach out within 5 business days. Welcome to the Green Gate MENA community!",
    browseOpps: isAr ? 'استكشف الفرص' : 'Browse Opportunities',
  }

  const countryOptions = COUNTRY_CODES.map(code => ({
    value: code,
    label: isAr ? (COUNTRY_AR[code] ?? code) : (COUNTRY_EN[code] ?? code),
  }))

  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<FormState>>({})

  function set(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  function validate(): boolean {
    const e: Partial<FormState> = {}
    if (!form.name.trim() || form.name.length < 2) e.name = ui.errName
    if (!form.email.trim() || !form.email.includes('@')) e.email = ui.errEmail
    if (!form.country) e.country = ui.errCountry
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
        <h3 className="font-display text-xl font-semibold text-teal-800">{ui.successTitle}</h3>
        <p className="text-ink-soft text-sm max-w-sm">{ui.successBody}</p>
        <Button asChild variant="ghost">
          <Link href="/ecosystem/opportunities">{ui.browseOpps}</Link>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-sand-200 p-6 flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink" htmlFor="gi-name">{ui.labelName}</label>
          <Input
            id="gi-name"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder={ui.placeholderName}
          />
          {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink" htmlFor="gi-email">{ui.labelEmail}</label>
          <Input
            id="gi-email"
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder={ui.placeholderEmail}
          />
          {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink" htmlFor="gi-country">{ui.labelCountry}</label>
          <Select
            id="gi-country"
            value={form.country}
            onChange={(e) => set('country', e.target.value)}
            placeholder={ui.placeholderCountry}
            options={countryOptions}
          />
          {errors.country && <p className="text-xs text-red-600">{errors.country}</p>}
        </div>
        {showOrg && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink" htmlFor="gi-org">{ui.labelOrg}</label>
            <Input
              id="gi-org"
              value={form.organization}
              onChange={(e) => set('organization', e.target.value)}
              placeholder={ui.placeholderOrg}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-ink" htmlFor="gi-message">{ui.labelMessage}</label>
        <Textarea
          id="gi-message"
          rows={4}
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder={ui.placeholderMessage}
        />
        <p className="text-xs text-ink-soft/60">{form.message.length}/500</p>
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600">{ui.errorGeneric}</p>
      )}

      <Button type="submit" size="lg" disabled={status === 'loading'} className="self-start">
        {status === 'loading' ? ui.btnSubmitting : (
          <><Send className="me-2 h-4 w-4" /> {ui.btnSubmit}</>
        )}
      </Button>
    </form>
  )
}
