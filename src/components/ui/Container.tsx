import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer'
}

export function Container({
  children,
  className,
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'w-full mx-auto px-[clamp(20px,4vw,56px)] max-w-[1320px]',
        className
      )}
    >
      {children}
    </Tag>
  )
}
