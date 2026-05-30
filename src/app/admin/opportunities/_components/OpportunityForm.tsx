'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createOpportunity, updateOpportunity } from '../../_actions/opportunities'
import { ImageUpload } from '@/components/admin/ImageUpload'

const THEMES = ['climate', 'energy', 'water', 'biodiversity', 'waste', 'sustainability', 'policy', 'finance', 'agriculture', 'urban', 'oceans', 'youth'] as const
const FORMATS = ['in-person', 'online', 'hybrid'] as const
const OPP_TYPES = ['fellowship', 'grant', 'event', 'competition', 'internship', 'volunteer', 'training', 'job'] as const

const schema = z.object({
  slug: z.string().min(1, 'Required'),
  title: z.string().min(1, 'Required'),
  organization: z.string().min(1, 'Required'),
  type: z.enum(OPP_TYPES),
  theme: z.array(z.enum(THEMES)).min(1, 'Select at least one theme'),
  countries: z.string().min(1, 'Required'),
  format: z.enum(FORMATS),
  deadline: z.string().optional().nullable(),
  start_date: z.string().optional().nullable(),
  description: z.string().min(1, 'Required'),
  link: z.string().url('Must be a valid URL'),
  logo: z.string().optional().nullable(),
  featured: z.boolean(),
  stipend: z.boolean(),
  funded: z.boolean(),
})

type FormValues = z.infer<typeof schema>

interface Row {
  id: string
  slug: string
  title: string
  organization: string
  type: string
  theme: string[]
  countries: string[]
  format: string
  deadline: string | null
  start_date: string | null
  description: string
  link: string
  logo: string | null
  featured: boolean
  stipend: boolean
  funded: boolean
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

export function OpportunityForm({ row }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues, unknown, FormValues>({
    resolver: zodResolver(schema),
    defaultValues: row
      ? ({
          slug: row.slug,
          title: row.title,
          organization: row.organization,
          type: row.type as FormValues['type'],
          theme: row.theme as FormValues['theme'],
          countries: row.countries.join(', '),
          format: row.format as FormValues['format'],
          deadline: row.deadline ?? '',
          start_date: row.start_date ?? '',
          description: row.description,
          link: row.link,
          logo: row.logo ?? '',
          featured: row.featured,
          stipend: row.stipend,
          funded: row.funded,
        } satisfies FormValues)
      : {
          slug: '',
          title: '',
          organization: '',
          type: 'fellowship',
          theme: [],
          countries: '',
          format: 'in-person',
          deadline: '',
          start_date: '',
          description: '',
          link: '',
          logo: '',
          featured: false,
          stipend: false,
          funded: false,
        },
  })

  const [serverError, setServerError] = useState<string | null>(null)

  const titleValue = watch('title') ?? ''
  const selectedThemes = watch('theme') ?? []

  function handleTitleBlur() {
    if (!row) {
      setValue('slug', titleValue.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, ''))
    }
  }

  async function onSubmit(data: FormValues) {
    setServerError(null)
    try {
      const countries = data.countries.split(',').map((c) => c.trim()).filter(Boolean)
      const payload = {
        slug: data.slug,
        title: data.title,
        organization: data.organization,
        type: data.type,
        theme: data.theme,
        countries,
        format: data.format,
        deadline: data.deadline || null,
        start_date: data.start_date || null,
        description: data.description,
        link: data.link,
        logo: data.logo || null,
        featured: data.featured,
        stipend: data.stipend,
        funded: data.funded,
      }
      if (row) {
        await updateOpportunity(row.id, payload)
      } else {
        await createOpportunity(payload)
      }
    } catch (e) {
      setServerError(e instanceof Error ? e.message : 'Something went wrong.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-2xl">
      <Field label="Title *" error={errors.title?.message}>
        <input {...register('title')} onBlur={handleTitleBlur} className={inputCls} />
      </Field>

      <Field label="Slug *" error={errors.slug?.message}>
        <input {...register('slug')} className={inputCls} />
      </Field>

      <Field label="Organization *" error={errors.organization?.message}>
        <input {...register('organization')} className={inputCls} />
      </Field>

      <Field label="Type *" error={errors.type?.message}>
        <select {...register('type')} className={inputCls}>
          {OPP_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field label="Format *" error={errors.format?.message}>
        <select {...register('format')} className={inputCls}>
          {FORMATS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </Field>

      <Field label="Themes *" error={errors.theme?.message}>
        <div className="flex flex-wrap gap-2">
          {THEMES.map((theme) => {
            const checked = selectedThemes.includes(theme)
            return (
              <button
                key={theme}
                type="button"
                onClick={() =>
                  setValue(
                    'theme',
                    checked ? selectedThemes.filter((t) => t !== theme) : [...selectedThemes, theme],
                    { shouldValidate: true }
                  )
                }
                className={[
                  'rounded-full px-3 py-1 text-xs border transition-colors',
                  checked
                    ? 'bg-teal-700 text-white border-teal-700'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-teal-400',
                ].join(' ')}
              >
                {theme}
              </button>
            )
          })}
        </div>
      </Field>

      <Field label="Countries *" error={errors.countries?.message}>
        <input {...register('countries')} placeholder="SA, EG, MA, ALL" className={inputCls} />
      </Field>

      <Field label="Deadline" error={errors.deadline?.message}>
        <input {...register('deadline')} type="date" className={inputCls} />
      </Field>

      <Field label="Start Date" error={errors.start_date?.message}>
        <input {...register('start_date')} type="date" className={inputCls} />
      </Field>

      <Field label="Description *" error={errors.description?.message}>
        <textarea {...register('description')} rows={5} className={inputCls} />
      </Field>

      <Field label="Link *" error={errors.link?.message}>
        <input {...register('link')} type="url" className={inputCls} />
      </Field>

      <div className="flex flex-col gap-1.5">
        <ImageUpload
          value={watch('logo') ?? undefined}
          onChange={(url) => setValue('logo', url, { shouldValidate: true })}
          folder="opportunities"
          label="شعار المنظمة"
          recommended="400 × 400 بكسل"
        />
        {errors.logo && <p className="text-xs text-red-600">{errors.logo.message}</p>}
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input {...register('featured')} type="checkbox" className="rounded" />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input {...register('funded')} type="checkbox" className="rounded" />
          Funded
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input {...register('stipend')} type="checkbox" className="rounded" />
          Stipend
        </label>
      </div>

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
          href="/admin/opportunities"
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
