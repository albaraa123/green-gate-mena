'use client'

import { motion, useReducedMotion } from 'framer-motion'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface AnimateInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  from?: 'bottom' | 'left' | 'right' | 'top'
  duration?: number
}

export function AnimateIn({
  children,
  className,
  delay = 0,
  from = 'bottom',
  duration = 0.65,
}: AnimateInProps) {
  const reduced = useReducedMotion()
  const offset = 28
  const initial = reduced
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: from === 'bottom' ? offset : from === 'top' ? -offset : 0,
        x: from === 'left' ? -offset : from === 'right' ? offset : 0,
      }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduced ? 0.3 : duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerProps {
  children: React.ReactNode
  className?: string
  stagger?: number
  delayStart?: number
}

export function StaggerIn({ children, className, stagger = 0.1, delayStart = 0 }: StaggerProps) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : stagger,
            delayChildren: delayStart,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      variants={{
        hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0.3 : 0.55, ease } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
