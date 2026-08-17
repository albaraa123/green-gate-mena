'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  createImpactHighlight,
  updateImpactHighlight,
} from '../../_actions/impact-highlights'
import { ImageUpload } from '@/components/admin/ImageUpload'

const schema = z.object({
  title: z.string().min(1, 'Required'),
  title_ar: z.string().optional().nullable(),
  body: z.string().min(1, 'Required'),
  body_ar: z.string().optional().nullable(),
  accent: z.enum(['teal', 'orange', 'lime']),
  link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  sort_order: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface Row {
  id: string
  title: string
  title_ar: string | null
  body: string
  body_ar: string | null
  accent: string | null
  logos: string[] | null
  link: string | null
  sort_order: number | null
}

interface Props {
  row?: Row
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  )
}

const inputCls = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'

export function ImpactHighlightForm({ row }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues, unknown, FormValues>({
    resolver: zodResolver(schema),
    defaultValues: row
      ? {
          title: row.title,
          title_ar: row.title_ar ?? '',
          body: row.body,
          body_ar: row.body_ar ?? '',
          accent: (row.accent as 'teal' | 'orange' | 'lime') ?? 'teal',
          link: row.link ?? '',
          sort_order: row.sort_order != null ? String(row.sort_order) : '0',
        }
      : {
          title: '',
          title_ar: '',
          body: '',
          body_ar: '',
          accent: 'teal',
          link: '',
          sort_order: '0',
        },
  })

  const [logos, setLogos] = useState<string[]>(row?.logos ?? [])
  const [serverError, setServerError] = useState<string | null>(null)

  function addLogo(url: string) {
    if (url) setLogos((prev) => [...prev, url])
  }
  function removeLogo(idx: number) {
    setLogos((prev) => prev.filter((_, i) => i !== idx))
  }

  async function onSubmit(data: FormValues) {
    setServerError(null)
    try {
      const payload = {
        title: data.title,
        title_ar: data.title_ar || null,
        body: data.body,
        body_ar: data.body_ar || null,
        accent: data.accent,
        logos,
        link: data.link || null,
        sort_order: data.sort_order?.trim() ? Number(data.sort_order) : null,
      }
      if (row) {
        await updateImpactHighlight(row.id, payload)
      } else {
        await createImpactHighlight(payload)
      }
    } catch (e) {
      setServerError(e instanceof Error ? e.message : 'Something went wrong.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-2xl">
      <Field label="Title (headline) *" error={errors.title?.message}>
        <input {...register('title')} className={inputCls} placeholder="e.g. 20+ M. views" />
      </Field>

      <Field label="Title (Arabic)" error={errors.title_ar?.message}>
        <input {...register('title_ar')} dir="rtl" className={inputCls} />
      </Field>

      <Field label="Body *" error={errors.body?.message}>
        <textarea {...register('body')} rows={5} className={inputCls} />
      </Field>

      <Field label="Body (Arabic)" error={errors.body_ar?.message}>
        <textarea {...register('body_ar')} rows={5} dir="rtl" className={inputCls} />
      </Field>

      <Field label="Accent color" error={errors.accent?.message}>
        <select {...register('accent')} className={inputCls}>
          <option value="teal">Teal (green)</option>
          <option value="orange">Orange</option>
          <option value="lime">Lime</option>
        </select>
      </Field>

      <div className="flex flex-col gap-3">
        <label className="block text-sm font-medium text-gray-700">Partner logos (optional)</label>
        {logos.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {logos.map((logo, i) => (
              <div key={i} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo} alt="" className="h-14 w-24 object-contain rounded-lg border border-gray-200 bg-white p-1" />
                <button
                  type="button"
                  onClick={() => removeLogo(i)}
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 text-white text-xs leading-none"
                  aria-label="Remove logo"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <ImageUpload
          value={undefined}
          onChange={addLogo}
          folder="impact-logos"
          label="أضف شعار شريك"
          recommended="PNG بخلفية شفافة"
        />
      </div>

      <Field label="Link (optional)" error={errors.link?.message}>
        <input {...register('link')} type="url" className={inputCls} placeholder="https://..." />
      </Field>

      <Field label="Sort Order" error={errors.sort_order?.message}>
        <input {...register('sort_order')} type="number" className={inputCls} />
      </Field>

      {serverError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {serverError}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-teal-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-teal-800 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving…' : row ? 'Update' : 'Create'}
        </button>
        <a
          href="/admin/impact-highlights"
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
