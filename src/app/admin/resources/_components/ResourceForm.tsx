'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createResource, updateResource } from '../../_actions/resources'

const THEMES = ['climate', 'energy', 'water', 'biodiversity', 'waste', 'sustainability', 'policy', 'finance', 'agriculture', 'urban', 'oceans', 'youth'] as const
const RESOURCE_TYPES = ['report', 'guide', 'article', 'toolkit', 'video', 'podcast'] as const

const schema = z.object({
  slug: z.string().min(1, 'Required'),
  title: z.string().min(1, 'Required'),
  type: z.enum(RESOURCE_TYPES),
  theme: z.enum(THEMES),
  published_at: z.string().min(1, 'Required'),
  author: z.string().optional().nullable(),
  description: z.string().min(1, 'Required'),
  link: z.string().url('Must be a valid URL'),
  image: z.string().optional().nullable(),
  featured: z.boolean(),
  tags: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface Row {
  id: string
  slug: string
  title: string
  type: string
  theme: string
  published_at: string
  author: string | null
  description: string
  link: string
  image: string | null
  featured: boolean
  tags: string[] | null
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

export function ResourceForm({ row }: Props) {
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
          type: row.type as typeof RESOURCE_TYPES[number],
          theme: row.theme as typeof THEMES[number],
          published_at: row.published_at,
          author: row.author ?? '',
          description: row.description,
          link: row.link,
          image: row.image ?? '',
          featured: row.featured,
          tags: row.tags ? row.tags.join(', ') : '',
        }
      : {
          slug: '',
          title: '',
          type: 'report',
          theme: 'climate',
          published_at: '',
          author: '',
          description: '',
          link: '',
          image: '',
          featured: false,
          tags: '',
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
      const tagsRaw = data.tags ?? ''
      const tags = tagsRaw.trim() ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : null
      const payload = {
        slug: data.slug,
        title: data.title,
        type: data.type,
        theme: data.theme,
        published_at: data.published_at,
        author: data.author || null,
        description: data.description,
        link: data.link,
        image: data.image || null,
        featured: data.featured,
        tags,
      }
      if (row) {
        await updateResource(row.id, payload)
      } else {
        await createResource(payload)
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

      <Field label="Type *" error={errors.type?.message}>
        <select {...register('type')} className={inputCls}>
          {RESOURCE_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field label="Theme *" error={errors.theme?.message}>
        <select {...register('theme')} className={inputCls}>
          {THEMES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field label="Published At *" error={errors.published_at?.message}>
        <input {...register('published_at')} type="date" className={inputCls} />
      </Field>

      <Field label="Author" error={errors.author?.message}>
        <input {...register('author')} className={inputCls} />
      </Field>

      <Field label="Description *" error={errors.description?.message}>
        <textarea {...register('description')} rows={5} className={inputCls} />
      </Field>

      <Field label="Link *" error={errors.link?.message}>
        <input {...register('link')} type="url" className={inputCls} />
      </Field>

      <Field label="Image URL" error={errors.image?.message}>
        <input {...register('image')} type="url" className={inputCls} />
      </Field>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input {...register('featured')} type="checkbox" className="rounded" />
          Featured
        </label>
      </div>

      <Field label="Tags" error={errors.tags?.message}>
        <input {...register('tags')} placeholder="tag1, tag2" className={inputCls} />
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
          href="/admin/resources"
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
