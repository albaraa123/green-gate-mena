import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  error?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const checkboxId = id ?? label.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={checkboxId} className="flex items-center gap-3 cursor-pointer group">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={cn(
              'h-4 w-4 rounded border-sand-200 text-teal-700 bg-white',
              'focus:ring-2 focus:ring-teal-700 focus:ring-offset-1',
              'transition-colors cursor-pointer',
              className
            )}
            {...props}
          />
          <span className="text-sm text-ink group-hover:text-teal-700 transition-colors">
            {label}
          </span>
        </label>
        {error && <p className="text-xs text-red-600 ps-7">{error}</p>}
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
