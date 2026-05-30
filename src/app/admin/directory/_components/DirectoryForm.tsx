'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createDirectoryProfile, updateDirectoryProfile } from '../../_actions/directory'
import { ImageUpload } from '@/components/admin/ImageUpload'

const THEMES = ['climate', 'energy', 'water', 'biodiversity', 'waste', 'sustainability', 'policy', 'finance', 'agriculture', 'urban', 'oceans', 'youth'] as const
const ORG_TYPES = ['ngo', 'youth-group', 'individual', 'institution', 'business'] as const

const schema = z.object({
  slug: z.string().min(1, 'Required'),
  name: z.string().min(1, 'Required'),
  type: z.enum(ORG_TYPES),
  country: z.string().min(1, 'Required'),
  city: z.string().optional().nullable(),
  description: z.string().min(1, 'Required'),
  themes: z.array(z.enum(THEMES)).min(1, 'Select at least one theme'),
  website: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  verified: z.boolean(),
  tags: z.string().optional(),
  founded: z.string().optional().nullable(),
  members: z.string().optional().nullable(),
})

type FormValues = z.infer<typeof schema>

interface Row {
  id: string
  slug: string
  name: string
  type: string
  country: string
  city: string | null
  description: string
  themes: string[]
  website: string | null
  email: string | null
  logo: string | null
  verified: boolean
  tags: string[] | null
  founded: number | null
  members: number | null
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

export function DirectoryForm({ row }: Props) {
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
          name: row.name,
          type: row.type as typeof ORG_TYPES[number],
          country: row.country,
          city: row.city ?? '',
          description: row.description,
          themes: row.themes as Array<typeof THEMES[number]>,
          website: row.website ?? '',
          email: row.email ?? '',
          logo: row.logo ?? '',
          verified: row.verified,
          tags: row.tags ? row.tags.join(', ') : '',
          founded: row.founded != null ? String(row.founded) : '',
          members: row.members != null ? String(row.members) : '',
        }
      : {
          slug: '',
          name: '',
          type: 'ngo',
          country: '',
          city: '',
          description: '',
          themes: [],
          website: '',
          email: '',
          logo: '',
          verified: false,
          tags: '',
          founded: '',
          members: '',
        },
  })

  const [serverError, setServerError] = useState<string | null>(null)

  const nameValue = watch('name') ?? ''
  const selectedThemes = watch('themes') ?? []

  function handleNameBlur() {
    if (!row) {
      setValue('slug', nameValue.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, ''))
    }
  }

  async function onSubmit(data: FormValues) {
    setServerError(null)
    try {
      const tagsRaw = data.tags ?? ''
      const tags = tagsRaw.trim() ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : null
      const foundedVal = data.founded && data.founded.trim() ? parseInt(data.founded, 10) : null
      const membersVal = data.members && data.members.trim() ? parseInt(data.members, 10) : null
      const payload = {
        slug: data.slug,
        name: data.name,
        type: data.type,
        country: data.country,
        city: data.city || null,
        description: data.description,
        themes: data.themes,
        website: data.website || null,
        email: data.email || null,
        logo: data.logo || null,
        verified: data.verified,
        tags,
        founded: foundedVal,
        members: membersVal,
      }
      if (row) {
        await updateDirectoryProfile(row.id, payload)
      } else {
        await createDirectoryProfile(payload)
      }
    } catch (e) {
      setServerError(e instanceof Error ? e.message : 'Something went wrong.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-2xl">
      <Field label="Name *" error={errors.name?.message}>
        <input {...register('name')} onBlur={handleNameBlur} className={inputCls} />
      </Field>

      <Field label="Slug *" error={errors.slug?.message}>
        <input {...register('slug')} className={inputCls} />
      </Field>

      <Field label="Type *" error={errors.type?.message}>
        <select {...register('type')} className={inputCls}>
          {ORG_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field label="Country *" error={errors.country?.message}>
        <input {...register('country')} className={inputCls} />
      </Field>

      <Field label="City" error={errors.city?.message}>
        <input {...register('city')} className={inputCls} />
      </Field>

      <Field label="Themes *" error={errors.themes?.message}>
        <div className="flex flex-wrap gap-2">
          {THEMES.map((theme) => {
            const checked = selectedThemes.includes(theme)
            return (
              <button
                key={theme}
                type="button"
                onClick={() =>
                  setValue(
                    'themes',
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

      <Field label="Website" error={errors.website?.message}>
        <input {...register('website')} className={inputCls} />
      </Field>

      <Field label="Email" error={errors.email?.message}>
        <input {...register('email')} type="email" className={inputCls} />
      </Field>

      <div className="flex flex-col gap-1.5">
        <ImageUpload
          value={watch('logo') ?? undefined}
          onChange={(url) => setValue('logo', url, { shouldValidate: true })}
          folder="directory"
          label="شعار المنظمة"
          recommended="400 × 400 بكسل"
        />
        {errors.logo && <p className="text-xs text-red-600">{errors.logo.message}</p>}
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input {...register('verified')} type="checkbox" className="rounded" />
          Verified
        </label>
      </div>

      <Field label="Founded (year)" error={errors.founded?.message}>
        <input {...register('founded')} type="number" className={inputCls} />
      </Field>

      <Field label="Members (count)" error={errors.members?.message}>
        <input {...register('members')} type="number" className={inputCls} />
      </Field>

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
          href="/admin/directory"
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
