import { cn } from '@/lib/utils'
import type { OpportunityType } from '@/types'

type BadgeVariant = OpportunityType | 'default' | 'outline'

const variantClasses: Record<BadgeVariant, string> = {
  fellowship: 'bg-teal-100 text-teal-800 border-teal-200',
  grant: 'bg-amber-50 text-amber-800 border-amber-200',
  event: 'bg-terracotta/10 text-terracotta border-terracotta/20',
  competition: 'bg-turquoise/10 text-teal-700 border-turquoise/20',
  internship: 'bg-purple-50 text-purple-800 border-purple-200',
  volunteer: 'bg-red-50 text-red-700 border-red-200',
  training: 'bg-leaf/10 text-green-800 border-leaf/20',
  job: 'bg-blue-50 text-blue-800 border-blue-200',
  default: 'bg-sand-100 text-ink-soft border-sand-200',
  outline: 'bg-transparent text-ink-soft border-ink-soft/30',
}

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        'font-mono uppercase tracking-wide',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
