import { cn } from '@/lib/utils'
import { Eyebrow } from './Eyebrow'
import type { ReactNode } from 'react'

interface SectionHeaderProps {
  eyebrow?: string
  heading: ReactNode
  subheading?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-14',
        align === 'center' && 'text-center',
        className
      )}
    >
      {eyebrow && (
        <Eyebrow className={cn('mb-4', align === 'center' && 'justify-center flex')}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          'font-display text-display-lg text-teal-800 text-balance',
          align === 'center' && 'mx-auto'
        )}
      >
        {heading}
      </h2>
      {subheading && (
        <p
          className={cn(
            'mt-4 text-ink-soft text-base md:text-lg leading-relaxed max-w-2xl',
            align === 'center' && 'mx-auto'
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  )
}
