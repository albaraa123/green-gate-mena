'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createProgram, updateProgram } from '../../_actions/programs'
import { ImageUpload } from '@/components/admin/ImageUpload'

const schema = z.object({
  slug: z.string().min(1, 'Required'),
  title: z.string().min(1, 'Required'),
  title_ar: z.string().optional().nullable(),
  description: z.string().min(1, 'Required'),
  description_ar: z.string().optional().nullable(),
  link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  image: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  sort_order: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface Row {
  id: string
  slug: string
  title: string
  title_ar: string | null
  description: string
  description_ar: string | null
  image: string | null
  link: string | null
  status: string | null
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

export function ProgramForm({ row }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues, unknown, FormValues>({
    resolver: zodResolver(schema),
    defaultValues: row
      ? {
          slug: row.slug,
          title: row.title,
          title_ar: row.title_ar ?? '',
          description: row.description,
          description_ar: row.description_ar ?? '',
          link: row.link ?? '',
          image: row.image ?? '',
          status: row.status ?? 'active',
          sort_order: row.sort_order != null ? String(row.sort_order) : '0',
        }
      : {
          slug: '',
          title: '',
          title_ar: '',
          description: '',
          description_ar: '',
          link: '',
          image: '',
          status: 'active',
          sort_order: '0',
        },
  })

  const [serverError, setServerError] = useState<string | null>(null)

  const titleValue = watch('title') ?? ''

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
        title_ar: data.title_ar || null,
        description: data.description,
        description_ar: data.description_ar || null,
        image: data.image || null,
        link: data.link || null,
        status: data.status || null,
        sort_order: data.sort_order?.trim() ? Number(data.sort_order) : null,
      }
      if (row) {
        await updateProgram(row.id, payload)
      } else {
        await createProgram(payload)
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

      <Field label="Title (Arabic)" error={errors.title_ar?.message}>
        <input {...register('title_ar')} dir="rtl" className={inputCls} />
      </Field>

      <Field label="Slug *" error={errors.slug?.message}>
        <input {...register('slug')} className={inputCls} />
      </Field>

      <Field label="Description *" error={errors.description?.message}>
        <textarea {...register('description')} rows={5} className={inputCls} />
      </Field>

      <Field label="Description (Arabic)" error={errors.description_ar?.message}>
        <textarea {...register('description_ar')} rows={5} dir="rtl" className={inputCls} />
      </Field>

      <Field label="Link" error={errors.link?.message}>
        <input {...register('link')} type="url" className={inputCls} />
      </Field>

      <div className="flex flex-col gap-1.5">
        <ImageUpload
          value={watch('image') ?? undefined}
          onChange={(url) => setValue('image', url, { shouldValidate: true })}
          folder="programs"
          label="صورة البرنامج"
          recommended="1200 × 630 بكسل"
        />
        {errors.image && <p className="text-xs text-red-600">{errors.image.message}</p>}
      </div>

      <Field label="Status" error={errors.status?.message}>
        <input {...register('status')} className={inputCls} />
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
          href="/admin/programs"
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
