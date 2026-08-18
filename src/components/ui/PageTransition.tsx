'use client'

import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Fades + lifts each route on navigation instead of a hard cut.
// `mode="wait"` lets the outgoing page finish before the new one enters.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reduced = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: reduced ? 0.2 : 0.4, ease }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
