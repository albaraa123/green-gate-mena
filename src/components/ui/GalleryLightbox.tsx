'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export interface GalleryImage {
  id: string
  image: string
  caption?: string | null
  captionAr?: string | null
}

interface Props {
  images: GalleryImage[]
  isAr: boolean
  closeLabel: string
}

// Clickable gallery grid that opens a full-size lightbox with prev/next.
// Keyboard: Esc closes, ← / → navigate. Scroll locks while open.
export function GalleryLightbox({ images, isAr, closeLabel }: Props) {
  const [open, setOpen] = useState<number | null>(null)

  const caption = (img: GalleryImage) => (isAr ? img.captionAr : img.caption) ?? ''

  const close = useCallback(() => setOpen(null), [])
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  )
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  )

  useEffect(() => {
    if (open === null) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') isAr ? prev() : next()
      else if (e.key === 'ArrowLeft') isAr ? next() : prev()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close, prev, next, isAr])

  const active = open !== null ? images[open] : null

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={caption(img) || 'Open image'}
            className={[
              'relative overflow-hidden rounded-2xl bg-teal-50 group cursor-zoom-in',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2',
              // Uniform landscape tiles so nothing is cropped into a tall shape;
              // the full image is always available in the lightbox on click.
              'aspect-[3/2]',
            ].join(' ')}
          >
            <Image
              src={img.image}
              alt={caption(img)}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            {caption(img) && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8">
                <p className="text-white text-xs font-medium leading-snug text-start">{caption(img)}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={close}
            aria-label={closeLabel}
            className="absolute top-4 end-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev() }}
                aria-label="Previous"
                className="absolute start-2 sm:start-6 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 rtl:rotate-180"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next() }}
                aria-label="Next"
                className="absolute end-2 sm:end-6 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 rtl:rotate-180"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          <figure className="relative max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[75vh] w-[90vw] max-w-5xl">
              <Image
                src={active.image}
                alt={caption(active)}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            {caption(active) && (
              <figcaption className="mt-3 text-center text-sm text-white/90">{caption(active)}</figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  )
}
