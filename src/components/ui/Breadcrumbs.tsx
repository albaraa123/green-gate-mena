import { ChevronRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export interface Crumb {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  crumbs: Crumb[]
  className?: string
}

export function Breadcrumbs({ crumbs, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1 flex-wrap text-sm text-ink/50', className)}
    >
      <ol className="flex items-center gap-1 flex-wrap list-none">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && (
                <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 rtl:rotate-180" aria-hidden />
              )}
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="hover:text-teal-700 transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={isLast ? 'text-ink/70 font-medium max-w-[240px] truncate' : ''}
                >
                  {crumb.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
