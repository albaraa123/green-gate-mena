'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BrandMark } from '@/components/home/BrandMark'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Intro loader: the real Green Gate brand mark spinning in white on a teal
// background, then fades out to reveal the site. Shown once per session.
export function IntroAnimation() {
  const [phase, setPhase] = useState<'idle' | 'enter' | 'out' | 'done'>('idle')

  useEffect(() => {
    if (sessionStorage.getItem('intro-shown')) return
    sessionStorage.setItem('intro-shown', '1')

    setPhase('enter')
    const t1 = setTimeout(() => setPhase('out'), 1700)
    const t2 = setTimeout(() => setPhase('done'), 2350)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'idle' || phase === 'done') return null

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-teal-700 grain-overlay flex items-center justify-center pointer-events-none"
      animate={{ opacity: phase === 'out' ? 0 : 1 }}
      transition={{ duration: 0.6, ease }}
    >
      <motion.div
        className="relative w-44 h-44 sm:w-56 sm:h-56"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease }}
      >
        {/* Soft glow */}
        <div className="absolute inset-2 rounded-full bg-white/10 blur-2xl" aria-hidden />

        {/* Real brand mark, white, fast spin */}
        <BrandMark mono="#ffffff" duration={2.6} className="relative w-full h-full" />
      </motion.div>
    </motion.div>
  )
}
