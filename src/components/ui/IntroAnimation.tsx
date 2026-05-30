'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function IntroAnimation() {
  const [phase, setPhase] = useState<'idle' | 'enter' | 'fly' | 'done'>('idle')
  const [target, setTarget] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (sessionStorage.getItem('intro-shown')) return
    sessionStorage.setItem('intro-shown', '1')

    // Approximate header logo position: left ~80px, top ~28px from viewport center
    setTarget({
      x: -(window.innerWidth / 2) + 88,
      y: -(window.innerHeight / 2) + 28,
    })

    setPhase('enter')

    const t1 = setTimeout(() => setPhase('fly'), 1300)
    const t2 = setTimeout(() => setPhase('done'), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'idle' || phase === 'done') return null

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-teal-700 grain-overlay flex items-center justify-center pointer-events-none"
      animate={{ opacity: phase === 'fly' ? 0 : 1 }}
      transition={{ duration: 0.65, delay: phase === 'fly' ? 0.25 : 0, ease }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          phase === 'fly'
            ? { scale: 0.2, x: target.x, y: target.y, opacity: 0 }
            : { opacity: 1, scale: 1 }
        }
        transition={
          phase === 'fly'
            ? { duration: 0.75, ease }
            : { duration: 0.55, ease }
        }
      >
        <Image
          src="/logo/logo-horizontal-white.svg"
          alt="Green Gate MENA"
          width={300}
          height={75}
          priority
        />
      </motion.div>
    </motion.div>
  )
}
