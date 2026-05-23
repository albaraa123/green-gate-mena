'use client'

import { Slot } from '@radix-ui/react-slot'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'lime' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  asChild?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-teal-700 text-white hover:bg-teal-800 active:bg-teal-900 shadow-sm',
  secondary:
    'bg-teal-100 text-teal-800 hover:bg-teal-200 active:bg-teal-300',
  lime:
    'bg-lime text-ink hover:bg-yellow-300 active:bg-yellow-400 shadow-sm',
  ghost:
    'bg-transparent text-teal-700 hover:bg-teal-100 active:bg-teal-200',
  outline:
    'border border-teal-700 text-teal-700 bg-transparent hover:bg-teal-100 active:bg-teal-200',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-6 text-sm gap-2',
  lg: 'h-13 px-8 text-base gap-2.5',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-body font-semibold',
          'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-teal-700 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50 select-none',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, type ButtonProps }
