'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { TransparentLogo } from './TransparentLogo'

// A circular ring of dots (like the brand mark), animated.
// Pure SVG + Framer Motion — no images, scales crisply.

const COLORS = ['#1f9e6e', '#3fb98a', '#7bd0a3', '#1a7d8c', '#42b3c2', '#c6e94a']

interface Dot {
  cx: number
  cy: number
  r: number
  color: string
  delay: number
}

function buildRing(count: number, radius: number, center: number, rBase: number): Dot[] {
  const dots: Dot[] = []
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2
    // Vary dot size pseudo-randomly but deterministically.
    const sizeFactor = 0.55 + ((i * 7) % 10) / 10
    dots.push({
      cx: center + Math.cos(angle) * radius,
      cy: center + Math.sin(angle) * radius,
      r: rBase * sizeFactor,
      color: COLORS[i % COLORS.length]!,
      delay: (i % count) * 0.05,
    })
  }
  return dots
}

interface Props {
  logo?: string
}

export function HeroOrbit({ logo }: Props) {
  const size = 460
  const center = size / 2

  const dots = useMemo(() => {
    return [
      ...buildRing(22, 175, center, 11),
      ...buildRing(16, 135, center, 8),
      ...buildRing(10, 95, center, 6),
    ]
  }, [center])

  // If a custom logo is uploaded, show it with gentle rotation + glow.
  // The black background is stripped to transparent on a canvas.
  if (logo) {
    return (
      <div className="relative w-full max-w-[460px] aspect-square mx-auto">
        <div className="absolute inset-8 rounded-full bg-lime/20 blur-3xl" aria-hidden />
        <div className="absolute inset-16 rounded-full bg-teal-200/40 blur-2xl" aria-hidden />
        <TransparentLogo src={logo} className="relative w-full h-full object-contain p-6" />
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-[460px] aspect-square mx-auto">
      {/* Soft glow behind the ring */}
      <div className="absolute inset-8 rounded-full bg-lime/20 blur-3xl" aria-hidden />
      <div className="absolute inset-16 rounded-full bg-teal-200/40 blur-2xl" aria-hidden />

      {/* Rotating ring of dots */}
      <motion.svg
        viewBox={`0 0 ${size} ${size}`}
        className="relative w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
        aria-hidden
      >
        {dots.map((d, i) => (
          <motion.circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            fill={d.color}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.15, 1],
            }}
            transition={{
              opacity: { duration: 3, repeat: Infinity, delay: d.delay, ease: 'easeInOut' },
              scale: { duration: 3, repeat: Infinity, delay: d.delay, ease: 'easeInOut' },
            }}
          />
        ))}
      </motion.svg>

      {/* Center pulse */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-lime"
        animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0.3, 0.8] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
    </div>
  )
}
