import type { LucideIcon } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/Button'

interface Props {
  icon: LucideIcon
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
}

// A friendly empty-state placeholder shown when a list has no items.
export function EmptyState({ icon: Icon, title, description, actionLabel, actionHref }: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 rounded-2xl border border-dashed border-sand-300 bg-paper-warm/50 py-16 px-6">
      <div className="h-16 w-16 rounded-2xl bg-teal-100 flex items-center justify-center">
        <Icon className="h-8 w-8 text-teal-600" aria-hidden />
      </div>
      <div className="flex flex-col gap-1.5 max-w-sm">
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
        {description && <p className="text-sm text-ink-soft leading-relaxed">{description}</p>}
      </div>
      {actionLabel && actionHref && (
        <Button asChild variant="outline" className="mt-1">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  )
}
