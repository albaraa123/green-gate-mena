'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createEvent, updateEvent } from '../../_actions/events'
import { ImageUpload } from '@/components/admin/ImageUpload'

const THEMES = ['climate', 'energy', 'water', 'biodiversity', 'waste', 'sustainability', 'policy', 'finance', 'agriculture', 'urban', 'oceans', 'youth'] as const
const FORMATS = ['in-person', 'online', 'hybrid'] as const

const schema = z.object({
  slug: z.string().min(1, 'Required'),
  title: z.string().min(1, 'Required'),
  organizer: z.string().min(1, 'Required'),
  date: z.string().min(1, 'Required'),
  end_date: z.string().optional().nullable(),
  location: z.string().min(1, 'Required'),
  country: z.string().min(1, 'Required'),
  format: z.enum(FORMATS),
  theme: z.array(z.enum(THEMES)).min(1, 'Select at least one theme'),
  description: z.string().min(1, 'Required'),
  link: z.string().url('Must be a valid URL'),
  image: z.string().optional().nullable(),
  featured: z.boolean(),
})

type FormValues = z.infer<typeof schema>

interface Row {
  id: string
  slug: string
  title: string
  organizer: string
  date: string
  end_date: string | null
  location: string
  country: string
  format: string
  theme: string[]
  description: string
  link: string
  image: string | null
  featured: boolean
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

export function EventForm({ row }: Props) {
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
          organizer: row.organizer,
          date: row.date,
          end_date: row.end_date ?? '',
          location: row.location,
          country: row.country,
          format: row.format as FormValues['format'],
          theme: row.theme as FormValues['theme'],
          description: row.description,
          link: row.link,
          image: row.image ?? '',
          featured: row.featured,
        } satisfies FormValues)
      : {
          slug: '',
          title: '',
          organizer: '',
          date: '',
          end_date: '',
          location: '',
          country: '',
          format: 'in-person',
          theme: [],
          description: '',
          link: '',
          image: '',
          featured: false,
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
      const payload = {
        slug: data.slug,
        title: data.title,
        organizer: data.organizer,
        date: data.date,
        end_date: data.end_date || null,
        location: data.location,
        country: data.country,
        format: data.format,
        theme: data.theme,
        description: data.description,
        link: data.link,
        image: data.image || null,
        featured: data.featured,
      }
      if (row) {
        await updateEvent(row.id, payload)
      } else {
        await createEvent(payload)
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

      <Field label="Organizer *" error={errors.organizer?.message}>
        <input {...register('organizer')} className={inputCls} />
      </Field>

      <Field label="Date *" error={errors.date?.message}>
        <input {...register('date')} type="date" className={inputCls} />
      </Field>

      <Field label="End Date" error={errors.end_date?.message}>
        <input {...register('end_date')} type="date" className={inputCls} />
      </Field>

      <Field label="Location *" error={errors.location?.message}>
        <input {...register('location')} className={inputCls} />
      </Field>

      <Field label="Country *" error={errors.country?.message}>
        <input {...register('country')} className={inputCls} />
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

      <Field label="Description *" error={errors.description?.message}>
        <textarea {...register('description')} rows={5} className={inputCls} />
      </Field>

      <Field label="Link *" error={errors.link?.message}>
        <input {...register('link')} type="url" className={inputCls} />
      </Field>

      <div className="flex flex-col gap-1.5">
        <ImageUpload
          value={watch('image') ?? undefined}
          onChange={(url) => setValue('image', url, { shouldValidate: true })}
          folder="events"
          label="صورة الفعالية"
          recommended="1200 × 630 بكسل"
        />
        {errors.image && <p className="text-xs text-red-600">{errors.image.message}</p>}
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input {...register('featured')} type="checkbox" className="rounded" />
          Featured
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
          href="/admin/events"
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
