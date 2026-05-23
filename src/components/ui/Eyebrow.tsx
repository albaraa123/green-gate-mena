import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
  className?: string
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'eyebrow',
        className
      )}
    >
      {children}
    </p>
  )
}
