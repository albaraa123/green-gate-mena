'use client'

import { useState } from 'react'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { saveSiteSetting } from '../_actions'

interface Props {
  settings: Record<string, string>
}

export function SettingsForm({ settings }: Props) {
  const [heroImage, setHeroImage] = useState(settings['hero_image'] ?? '')
  const [heroLogo, setHeroLogo] = useState(settings['hero_logo'] ?? '')
  const [newsletterHeader, setNewsletterHeader] = useState(settings['newsletter_header'] ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    await saveSiteSetting('hero_image', heroImage)
    await saveSiteSetting('hero_logo', heroLogo)
    await saveSiteSetting('newsletter_header', newsletterHeader)
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

      </div>

      {/* Hero logo (animated brand mark) */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-5">
        <div>
          <h2 className="font-semibold text-base text-gray-900">Hero Logo (Brand Mark)</h2>
          <p className="text-sm text-gray-500 mt-1">
            Your circular logo, shown animated beside the headline on the homepage. Use a transparent PNG. Recommended: 800×800px. If empty, the default animated dot-ring is used.
          </p>
        </div>

        <ImageUpload
          value={heroLogo}
          onChange={setHeroLogo}
          folder="site"
          label="Hero Logo"
          recommended="800 × 800 px (transparent PNG)"
        />

        {heroLogo && (
          <div className="rounded-xl border border-gray-200 p-6 flex items-center justify-center bg-gradient-to-br from-white to-teal-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroLogo} alt="Logo preview" className="w-40 h-40 object-contain" />
          </div>
        )}
      </div>

      {/* Newsletter header image */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-5">
        <div>
          <h2 className="font-semibold text-base text-gray-900">Newsletter Header Image</h2>
          <p className="text-sm text-gray-500 mt-1">
            The banner shown at the top of every newsletter email. Recommended: 1200×300px (4:1). If left empty, the green text header is used.
          </p>
        </div>

        <ImageUpload
          value={newsletterHeader}
          onChange={setNewsletterHeader}
          folder="site"
          label="Newsletter Header"
          recommended="1200 × 300 px"
        />

        {newsletterHeader && (
          <div className="rounded-xl overflow-hidden border border-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={newsletterHeader} alt="Newsletter header preview" className="w-full object-contain" />
          </div>
        )}
      </div>

      {/* Save button */}
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
  )
}
