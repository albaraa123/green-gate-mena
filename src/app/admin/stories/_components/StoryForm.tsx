'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createStory, updateStory } from '../../_actions/stories'

const schema = z.object({
  id: z.string().min(1, 'Required'),
  name: z.string().min(1, 'Required'),
  role: z.string().min(1, 'Required'),
  role_ar: z.string().optional().nullable(),
  country: z.string().min(1, 'Required'),
  quote: z.string().min(1, 'Required'),
  quote_ar: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  opportunity_title: z.string().optional().nullable(),
})

type FormValues = z.infer<typeof schema>

interface Row {
  id: string
  name: string
  role: string
  role_ar: string | null
  country: string
  quote: string
  quote_ar: string | null
  avatar: string | null
  opportunity_title: string | null
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

export function StoryForm({ row }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues, unknown, FormValues>({
    resolver: zodResolver(schema),
    defaultValues: row
      ? {
          id: row.id,
          name: row.name,
          role: row.role,
          role_ar: row.role_ar ?? '',
          country: row.country,
          quote: row.quote,
          quote_ar: row.quote_ar ?? '',
          avatar: row.avatar ?? '',
          opportunity_title: row.opportunity_title ?? '',
        }
      : {
          id: '',
          name: '',
          role: '',
          role_ar: '',
          country: '',
          quote: '',
          quote_ar: '',
          avatar: '',
          opportunity_title: '',
        },
  })

  const [serverError, setServerError] = useState<string | null>(null)

  async function onSubmit(data: FormValues) {
    setServerError(null)
    try {
      const payload = {
        id: data.id,
        name: data.name,
        role: data.role,
        role_ar: data.role_ar || null,
        country: data.country,
        quote: data.quote,
        quote_ar: data.quote_ar || null,
        avatar: data.avatar || null,
        opportunity_title: data.opportunity_title || null,
      }
      if (row) {
        await updateStory(row.id, payload)
      } else {
        await createStory(payload)
      }
    } catch (e) {
      setServerError(e instanceof Error ? e.message : 'Something went wrong.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-2xl">
      <Field label="ID *" error={errors.id?.message}>
        <input
          {...register('id')}
          className={inputCls}
          disabled={!!row}
          placeholder="e.g. layla-hassan"
        />
      </Field>

      <Field label="Name *" error={errors.name?.message}>
        <input {...register('name')} className={inputCls} />
      </Field>

      <Field label="Role *" error={errors.role?.message}>
        <input {...register('role')} className={inputCls} />
      </Field>

      <Field label="Role (Arabic)" error={errors.role_ar?.message}>
        <input {...register('role_ar')} className={inputCls} dir="rtl" />
      </Field>

      <Field label="Country *" error={errors.country?.message}>
        <input {...register('country')} className={inputCls} />
      </Field>

      <Field label="Quote *" error={errors.quote?.message}>
        <textarea {...register('quote')} rows={4} className={inputCls} />
      </Field>

      <Field label="Quote (Arabic)" error={errors.quote_ar?.message}>
        <textarea {...register('quote_ar')} rows={4} className={inputCls} dir="rtl" />
      </Field>

      <Field label="Avatar URL" error={errors.avatar?.message}>
        <input {...register('avatar')} type="url" className={inputCls} />
      </Field>

      <Field label="Opportunity Title" error={errors.opportunity_title?.message}>
        <input {...register('opportunity_title')} className={inputCls} />
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
          href="/admin/stories"
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
