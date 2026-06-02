'use client'

import { motion } from 'framer-motion'
import { BrandMark } from './BrandMark'

// Hero brand visual: the official Green Gate mark (transparent SVG, real colors)
// with a soft glow and gentle rotation/pulse.
export function HeroOrbit() {
  return (
    <div className="relative w-full max-w-[460px] aspect-square mx-auto">
      {/* Soft glow behind the mark */}
      <div className="absolute inset-8 rounded-full bg-lime/20 blur-3xl" aria-hidden />
      <div className="absolute inset-16 rounded-full bg-teal-200/40 blur-2xl" aria-hidden />

      {/* Rotating brand mark */}
      <BrandMark className="relative w-full h-full p-4" />

      {/* Gentle breathing pulse overlay */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ scale: [1, 1.03, 1], opacity: [0.95, 1, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
    </div>
  )
}
