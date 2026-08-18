import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  as?: 'div' | 'article' | 'li'
}

export function Card({ children, className, hover = false, as: Tag = 'div' }: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-2xl bg-white border border-sand-200 overflow-hidden',
        hover && 'transition-[transform,box-shadow] duration-300 ease-out hover:shadow-xl hover:-translate-y-1',
        className
      )}
    >
      {children}
    </Tag>
  )
}

interface CardBodyProps {
  children: ReactNode
  className?: string
}

export function CardBody({ children, className }: CardBodyProps) {
  return (
    <div className={cn('p-5 md:p-6', className)}>{children}</div>
  )
}
