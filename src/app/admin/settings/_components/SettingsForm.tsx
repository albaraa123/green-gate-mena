'use client'

import { useState } from 'react'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { saveSiteSetting } from '../_actions'

interface Props {
  settings: Record<string, string>
}

export function SettingsForm({ settings }: Props) {
  const [heroImage, setHeroImage] = useState(settings['hero_image'] ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    await saveSiteSetting('hero_image', heroImage)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex flex-col gap-8">

      {/* Hero background image */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-5">
        <div>
          <h2 className="font-semibold text-base text-gray-900">Hero Background Image</h2>
          <p className="text-sm text-gray-500 mt-1">
            The large background image shown on the homepage hero section. Recommended: 1920×1080px or wider.
          </p>
        </div>

        <ImageUpload
          value={heroImage}
          onChange={setHeroImage}
          folder="site"
          label="Hero Background"
          recommended="1920 × 1080 px"
        />

        {heroImage && (
          <div className="rounded-xl overflow-hidden border border-gray-200 aspect-video relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImage} alt="Hero preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-teal-900/40 flex items-center justify-center">
              <p className="text-white text-sm font-medium opacity-70">Preview with overlay</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-teal-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-teal-800 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {saved && (
            <span className="text-sm text-green-600 font-medium">✓ Saved successfully</span>
          )}
        </div>
      </div>

    </div>
  )
}
