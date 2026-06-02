'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Intro loader: the Green Gate dot-ring spinning in white on a teal background,
// then fades out to reveal the site. Shown once per session.
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

        {/* Spinning white brand mark */}
        <motion.svg
          viewBox="0 0 1080 1080"
          className="relative w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, ease: 'linear', repeat: Infinity }}
          aria-label="Green Gate"
        >
          <g fill="#ffffff">
            <circle cx="440" cy="285" r="46" /><circle cx="300" cy="330" r="34" /><circle cx="640" cy="285" r="40" />
            <circle cx="755" cy="370" r="34" /><circle cx="840" cy="490" r="42" /><circle cx="800" cy="640" r="38" />
            <circle cx="730" cy="780" r="34" /><circle cx="590" cy="850" r="46" /><circle cx="440" cy="850" r="40" />
            <circle cx="300" cy="780" r="34" /><circle cx="230" cy="640" r="38" /><circle cx="220" cy="490" r="42" />
          </g>
          <g fill="#c6e94a">
            <circle cx="540" cy="270" r="22" /><circle cx="690" cy="780" r="22" /><circle cx="370" cy="350" r="20" /><circle cx="850" cy="560" r="20" />
          </g>
        </motion.svg>
      </motion.div>
    </motion.div>
  )
}
