'use client'

import { useState, useTransition } from 'react'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { addGalleryImage, deleteGalleryImage } from '../../_actions/gallery'

interface Item {
  id: string
  image: string
  caption: string | null
  caption_ar: string | null
}

export function GalleryManager({ items }: { items: Item[] }) {
  const [image, setImage] = useState('')
  const [caption, setCaption] = useState('')
  const [captionAr, setCaptionAr] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleAdd() {
    if (!image) return
    startTransition(async () => {
      await addGalleryImage({
        image,
        caption: caption || null,
        caption_ar: captionAr || null,
      })
      setImage('')
      setCaption('')
      setCaptionAr('')
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this image?')) return
    startTransition(() => deleteGalleryImage(id))
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold text-gray-900">Gallery</h1>
      <p className="text-sm text-gray-500 -mt-6">
        Photos of activities and events shown on the About page. Recommended: 1200×800px.
      </p>

      {/* Add new */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-base text-gray-900">Add Photo</h2>
        <ImageUpload
          value={image || undefined}
          onChange={setImage}
          folder="gallery"
          label="Photo"
          recommended="1200 × 800 px"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Caption (English, optional)"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            value={captionAr}
            onChange={(e) => setCaptionAr(e.target.value)}
            placeholder="التعليق (عربي، اختياري)"
            dir="rtl"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={!image || isPending}
          className="self-start bg-teal-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-teal-800 disabled:opacity-50"
        >
          {isPending ? 'Adding...' : 'Add Photo'}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.length === 0 ? (
          <p className="col-span-full text-center text-gray-400 py-10">No photos yet.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-[3/2]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.caption ?? ''} className="w-full h-full object-cover" />
              <button
                onClick={() => handleDelete(item.id)}
                disabled={isPending}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50"
              >
                ✕
              </button>
              {item.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-xs p-2 truncate">
                  {item.caption}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
