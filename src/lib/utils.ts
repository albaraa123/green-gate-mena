import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

export function formatDeadline(deadline: string | null, locale: string): string {
  if (!deadline) return locale === 'ar' ? 'مفتوح' : 'Open'
  const date = new Date(deadline)
  const now = new Date()
  if (date < now) return locale === 'ar' ? 'منتهي' : 'Closed'
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function isDeadlineSoon(deadline: string | null): boolean {
  if (!deadline) return false
  const date = new Date(deadline)
  const now = new Date()
  const daysUntil = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  return daysUntil > 0 && daysUntil <= 14
}

export function isDeadlinePast(deadline: string | null): boolean {
  if (!deadline) return false
  return new Date(deadline) < new Date()
}
