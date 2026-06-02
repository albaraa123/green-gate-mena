'use client'

import { useState, useRef } from 'react'
import { useLocale } from 'next-intl'
import { Send, CheckCircle } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { useToast } from '@/components/ui/Toast'
import { createClient } from '@/lib/supabase/client'

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
  phone: string
  organization: string
  country: string
  linkedin: string
  bio: string
  avatar: string
}

const EMPTY: FormState = {
  name: '', email: '', phone: '', organization: '',
  country: '', linkedin: '', bio: '', avatar: '',
}

export function GetInvolvedForm({ pathway, showOrg = false, orgLabel, messagePlaceholder }: Props) {
  const locale = useLocale()
  const { toast } = useToast()
  const isAr = locale === 'ar'
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const ui = {
    labelName: isAr ? 'الاسم الكامل *' : 'Full name *',
    placeholderName: isAr ? 'اسمك الكامل' : 'Your full name',
    labelEmail: isAr ? 'البريد الإلكتروني *' : 'Email *',
    placeholderEmail: isAr ? 'بريدك@مثال.com' : 'you@example.com',
    labelPhone: isAr ? 'واتساب / هاتف' : 'WhatsApp / Phone',
    placeholderPhone: isAr ? '+966 5X XXX XXXX' : '+1 234 567 8900',
    labelCountry: isAr ? 'الدولة *' : 'Country *',
    placeholderCountry: isAr ? 'اختر الدولة' : 'Select country',
    labelOrg: orgLabel ?? (isAr ? 'المنظمة أو الجهة' : 'Organization'),
    placeholderOrg: isAr ? 'اسم منظمتك أو جهتك' : 'Your NGO or organization',
    labelLinkedin: isAr ? 'رابط LinkedIn' : 'LinkedIn URL',
    placeholderLinkedin: 'https://linkedin.com/in/...',
    labelBio: isAr ? 'نبذة عنك *' : 'About you *',
    placeholderBio: messagePlaceholder ?? (isAr
      ? 'أخبرنا عن خلفيتك واهتماماتك وما الذي تأمل تحقيقه معنا...'
      : 'Tell us about your background, interests, and what you hope to achieve with us...'),
    labelAvatar: isAr ? 'صورتك الشخصية' : 'Profile photo',
    avatarHint: isAr ? 'JPG أو PNG · حد أقصى 5MB' : 'JPG or PNG · Max 5MB',
    btnSubmit: isAr ? 'إرسال الطلب' : 'Submit Application',
    btnSubmitting: isAr ? 'جاري الإرسال...' : 'Submitting…',
    errorGeneric: isAr ? 'حدث خطأ. حاول مجدداً.' : 'Something went wrong. Please try again.',
    errName: isAr ? 'الاسم يجب أن يكون حرفين على الأقل' : 'Name must be at least 2 characters',
    errEmail: isAr ? 'بريد إلكتروني صحيح مطلوب' : 'Valid email required',
    errCountry: isAr ? 'يرجى اختيار دولتك' : 'Please select your country',
    errBio: isAr ? 'النبذة مطلوبة (20 حرفاً على الأقل)' : 'Bio is required (at least 20 characters)',
    successTitle: isAr ? 'تم استلام طلبك!' : 'Application received!',
    successBody: isAr
      ? 'سنراجع طلبك ونتواصل معك خلال 5 أيام عمل. ترقّب رسالة القبول على بريدك الإلكتروني!'
      : "We'll review your application and reach out within 5 business days. Watch for an acceptance email!",
    browseOpps: isAr ? 'استكشف الفرص' : 'Browse Opportunities',
    uploadPhoto: isAr ? 'ارفع صورتك' : 'Upload photo',
    changePhoto: isAr ? 'تغيير الصورة' : 'Change photo',
  }

  const countryOptions = COUNTRY_CODES.map(code => ({
    value: code,
    label: isAr ? (COUNTRY_AR[code] ?? code) : (COUNTRY_EN[code] ?? code),
  }))

  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  function set(key: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: '' }))
  }

  async function handlePhotoUpload(file: File) {
    if (file.size > 5 * 1024 * 1024) return
    if (!file.type.startsWith('image/')) return
    setUploading(true)
    try {
      const supabase = createClient()
      const path = `applications/${Date.now()}-${file.name.replace(/\s+/g, '-')}`
      const { error } = await supabase.storage.from('uploads').upload(path, file, { upsert: true })
      if (!error) {
        const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(path)
        set('avatar', publicUrl)
      }
    } finally {
      setUploading(false)
    }
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim() || form.name.length < 2) e.name = ui.errName
    if (!form.email.trim() || !form.email.includes('@')) e.email = ui.errEmail
    if (!form.country) e.country = ui.errCountry
    if (!form.bio.trim() || form.bio.length < 20) e.bio = ui.errBio
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
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        toast(ui.errorGeneric, 'error')
      }
    } catch {
      setStatus('error')
      toast(ui.errorGeneric, 'error')
    }
  }

  if (status === 'success') {
    const steps = isAr
      ? [
          'سيتواصل معك فريقنا خلال 5 أيام عمل',
          'ترقّب رسالة القبول على بريدك الإلكتروني',
          'استكشف الفرص والفعاليات في انتظارك',
        ]
      : [
          'Our team will reach out within 5 business days',
          'Watch for an acceptance email in your inbox',
          'Explore the opportunities and events waiting for you',
        ]
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-700 to-teal-800 grain-overlay p-8 sm:p-10 flex flex-col items-center gap-6 text-center text-white">
        {/* Decorative glow */}
        <div className="absolute -top-16 -end-16 w-48 h-48 rounded-full bg-lime/10 blur-3xl" aria-hidden />

        <div className="relative h-20 w-20 rounded-full bg-lime/20 flex items-center justify-center animate-pulse-dot">
          <CheckCircle className="h-10 w-10 text-lime" />
        </div>

        <div className="relative flex flex-col gap-2">
          <h3 className="font-display text-2xl font-semibold text-white">{ui.successTitle}</h3>
          <p className="text-teal-100/80 text-sm max-w-sm leading-relaxed">{ui.successBody}</p>
        </div>

        {/* Next steps */}
        <div className="relative w-full max-w-sm bg-white/10 rounded-xl p-5 flex flex-col gap-3 text-start">
          <p className="text-xs font-semibold text-lime uppercase tracking-wide">
            {isAr ? 'الخطوات التالية' : 'Next steps'}
          </p>
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-lime/20 text-lime text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-sm text-teal-50/90 leading-snug">{step}</span>
            </div>
          ))}
        </div>

        <div className="relative flex flex-wrap justify-center gap-3">
          <Button asChild variant="lime">
            <Link href="/ecosystem/opportunities">{ui.browseOpps}</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
            <Link href="/">{isAr ? 'العودة للرئيسية' : 'Back to home'}</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-sand-200 p-6 flex flex-col gap-5">

      {/* Profile photo */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-ink">{ui.labelAvatar}</label>
        <div className="flex items-center gap-4">
          {form.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.avatar} alt="preview" className="h-16 w-16 rounded-full object-cover border-2 border-teal-200" />
          ) : (
            <div className="h-16 w-16 rounded-full bg-teal-50 border-2 border-dashed border-teal-200 flex items-center justify-center text-teal-400 text-xl font-bold">
              {form.name ? form.name.charAt(0).toUpperCase() : '?'}
            </div>
          )}
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="text-sm text-teal-700 border border-teal-200 rounded-lg px-3 py-1.5 hover:bg-teal-50 transition-colors disabled:opacity-50"
            >
              {uploading ? (isAr ? 'جاري الرفع...' : 'Uploading...') : (form.avatar ? ui.changePhoto : ui.uploadPhoto)}
            </button>
            <p className="text-xs text-ink-soft/60 mt-1">{ui.avatarHint}</p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => e.target.files?.[0] && handlePhotoUpload(e.target.files[0])}
        />
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink" htmlFor="gi-name">{ui.labelName}</label>
          <Input id="gi-name" value={form.name} onChange={e => set('name', e.target.value)} placeholder={ui.placeholderName} />
          {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink" htmlFor="gi-email">{ui.labelEmail}</label>
          <Input id="gi-email" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder={ui.placeholderEmail} />
          {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>

      {/* Phone + Country */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink" htmlFor="gi-phone">{ui.labelPhone}</label>
          <Input id="gi-phone" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder={ui.placeholderPhone} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink" htmlFor="gi-country">{ui.labelCountry}</label>
          <Select id="gi-country" value={form.country} onChange={e => set('country', e.target.value)} placeholder={ui.placeholderCountry} options={countryOptions} />
          {errors.country && <p className="text-xs text-red-600">{errors.country}</p>}
        </div>
      </div>

      {/* Organization + LinkedIn */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {showOrg && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink" htmlFor="gi-org">{ui.labelOrg}</label>
            <Input id="gi-org" value={form.organization} onChange={e => set('organization', e.target.value)} placeholder={ui.placeholderOrg} />
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink" htmlFor="gi-linkedin">{ui.labelLinkedin}</label>
          <Input id="gi-linkedin" type="url" value={form.linkedin} onChange={e => set('linkedin', e.target.value)} placeholder={ui.placeholderLinkedin} />
        </div>
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-ink" htmlFor="gi-bio">{ui.labelBio}</label>
        <Textarea id="gi-bio" rows={4} value={form.bio} onChange={e => set('bio', e.target.value)} placeholder={ui.placeholderBio} />
        <div className="flex justify-between">
          {errors.bio ? <p className="text-xs text-red-600">{errors.bio}</p> : <span />}
          <p className="text-xs text-ink-soft/60">{form.bio.length}/500</p>
        </div>
      </div>

      {status === 'error' && <p className="text-sm text-red-600">{ui.errorGeneric}</p>}

      <Button type="submit" size="lg" disabled={status === 'loading' || uploading} className="self-start">
        {status === 'loading' ? ui.btnSubmitting : <><Send className="me-2 h-4 w-4" /> {ui.btnSubmit}</>}
      </Button>
    </form>
  )
}
