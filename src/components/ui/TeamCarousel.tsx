'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface Member {
  id: string
  name: string
  nameAr: string | null
  role: string
  roleAr: string | null
  country: string
  avatar: string | null
  countryLabel: string
}

interface Props {
  members: Member[]
  isAr: boolean
}

export function TeamCarousel({ members, isAr }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const CARD_WIDTH = 260 // px per card
  const GAP = 24

  // Works in both LTR and RTL. In RTL, scrollLeft is negative in modern browsers,
  // so we use the absolute distance from the start edge.
  const updateButtons = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    const fromStart = Math.abs(el.scrollLeft) // distance scrolled from the start edge
    setCanPrev(fromStart > 8)
    setCanNext(fromStart < maxScroll - 8)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateButtons()
    el.addEventListener('scroll', updateButtons, { passive: true })
    window.addEventListener('resize', updateButtons)
    return () => {
      el.removeEventListener('scroll', updateButtons)
      window.removeEventListener('resize', updateButtons)
    }
  }, [updateButtons, members.length])

  // dir: 'prev' moves toward the start, 'next' moves toward the end —
  // regardless of text direction. scrollBy with a sign matching scroll direction
  // handles both LTR (positive = forward) and RTL (negative = forward) automatically.
  function scroll(dir: 'prev' | 'next') {
    const el = trackRef.current
    if (!el) return
    const amount = (CARD_WIDTH + GAP) * 2
    const rtl = getComputedStyle(el).direction === 'rtl'
    // In RTL, "next" (toward end) means scrolling left (negative).
    const forwardSign = rtl ? -1 : 1
    const delta = dir === 'next' ? amount * forwardSign : -amount * forwardSign
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <div className="relative" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Start-side arrow (visually on the start edge) → goes to previous */}
      <button
        onClick={() => scroll('prev')}
        disabled={!canPrev}
        aria-label={isAr ? 'السابق' : 'Previous'}
        className="absolute start-0 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white border border-sand-200 shadow-md flex items-center justify-center text-ink hover:border-teal-300 hover:text-teal-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ insetInlineStart: '-1rem' }}
      >
        {isAr ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onScroll={updateButtons}
      >
        {members.map((member) => {
          const name = isAr && member.nameAr ? member.nameAr : member.name
          const role = isAr && member.roleAr ? member.roleAr : member.role
          return (
            <div
              key={member.id}
              className="group flex-none flex flex-col gap-4"
              style={{ width: CARD_WIDTH }}
            >
              {/* Portrait */}
              <div
                className="relative overflow-hidden rounded-2xl bg-teal-50"
                style={{ aspectRatio: '3/4' }}
              >
                {member.avatar ? (
                  <Image
                    src={member.avatar}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 50vw, 260px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display text-6xl font-bold text-teal-300 select-none">
                      {name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1">
                <p className="font-display font-semibold text-ink text-base leading-snug">{name}</p>
                <p className="text-sm text-teal-700 leading-snug">{role}</p>
                <p className="text-xs text-ink-soft/50 mt-0.5">{member.countryLabel}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* End-side arrow (visually on the end edge) → goes to next */}
      <button
        onClick={() => scroll('next')}
        disabled={!canNext}
        aria-label={isAr ? 'التالي' : 'Next'}
        className="absolute end-0 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white border border-sand-200 shadow-md flex items-center justify-center text-ink hover:border-teal-300 hover:text-teal-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ insetInlineEnd: '-1rem' }}
      >
        {isAr ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>
    </div>
  )
}
