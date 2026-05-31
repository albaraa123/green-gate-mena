'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

  const updateButtons = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
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
  }, [updateButtons])

  function scroll(dir: 'left' | 'right') {
    const el = trackRef.current
    if (!el) return
    const amount = (CARD_WIDTH + GAP) * 2
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        onClick={() => scroll(isAr ? 'right' : 'left')}
        disabled={isAr ? !canNext : !canPrev}
        aria-label={isAr ? 'التالي' : 'Previous'}
        className="absolute start-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-11 w-11 rounded-full bg-white border border-sand-200 shadow-md flex items-center justify-center text-ink hover:border-teal-300 hover:text-teal-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-5 w-5" />
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
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.avatar}
                    alt={name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
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

      {/* Right arrow */}
      <button
        onClick={() => scroll(isAr ? 'left' : 'right')}
        disabled={isAr ? !canPrev : !canNext}
        aria-label={isAr ? 'السابق' : 'Next'}
        className="absolute end-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-11 w-11 rounded-full bg-white border border-sand-200 shadow-md flex items-center justify-center text-ink hover:border-teal-300 hover:text-teal-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
