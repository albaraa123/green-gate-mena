'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createPartner, updatePartner } from '../../_actions/partners'

const TIERS = ['strategic', 'program', 'media', 'community'] as const

const schema = z.object({
  id: z.string().min(1, 'Required'),
  name: z.string().min(1, 'Required'),
  logo: z.string().url('Must be a valid URL'),
  website: z.string().optional().nullable(),
  tier: z.enum(TIERS),
  country: z.string().optional().nullable(),
})

type FormValues = z.infer<typeof schema>

interface Row {
  id: string
  name: string
  logo: string
  website: string | null
  tier: string
  country: string | null
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

export function PartnerForm({ row }: Props) {
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
          logo: row.logo,
          website: row.website ?? '',
          tier: row.tier as typeof TIERS[number],
          country: row.country ?? '',
        }
      : {
          id: '',
          name: '',
          logo: '',
          website: '',
          tier: 'strategic',
          country: '',
        },
  })

  const [serverError, setServerError] = useState<string | null>(null)

  async function onSubmit(data: FormValues) {
    setServerError(null)
    try {
      const payload = {
        id: data.id,
        name: data.name,
        logo: data.logo,
        website: data.website || null,
        tier: data.tier,
        country: data.country || null,
      }
      if (row) {
        await updatePartner(row.id, payload)
      } else {
        await createPartner(payload)
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
          placeholder="e.g. undp"
        />
      </Field>

      <Field label="Name *" error={errors.name?.message}>
        <input {...register('name')} className={inputCls} />
      </Field>

      <Field label="Logo URL *" error={errors.logo?.message}>
        <input {...register('logo')} type="url" className={inputCls} />
      </Field>

      <Field label="Website" error={errors.website?.message}>
        <input {...register('website')} type="url" className={inputCls} />
      </Field>

      <Field label="Tier *" error={errors.tier?.message}>
        <select {...register('tier')} className={inputCls}>
          {TIERS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field label="Country" error={errors.country?.message}>
        <input {...register('country')} className={inputCls} />
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
          href="/admin/partners"
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
