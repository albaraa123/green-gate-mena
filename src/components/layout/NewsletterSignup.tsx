'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { cn } from '@/lib/utils'

interface NewsletterSignupProps {
  className?: string
  compact?: boolean
}

export function NewsletterSignup({ className, compact = false }: NewsletterSignupProps) {
  const t = useTranslations('footer.newsletter')
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
        toast(t('success'), 'success')
      } else {
        setStatus('idle')
        toast(t('error'), 'error')
      }
    } catch {
      setStatus('idle')
      toast(t('error'), 'error')
    }
  }

  if (status === 'success') {
    return (
      <p className={cn('text-sm text-leaf font-medium', className)}>
        ✓ {t('success')}
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex gap-2', compact ? 'flex-row' : 'flex-col sm:flex-row', className)}
    >
      <label className="sr-only" htmlFor="newsletter-email">
        {t('label')}
      </label>
      <Input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('placeholder')}
        required
        className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-lime focus:border-lime"
        disabled={status === 'loading'}
      />
      <Button
        type="submit"
        variant="lime"
        size="md"
        disabled={status === 'loading'}
        className="shrink-0"
      >
        {status === 'loading' ? '…' : t('button')}
      </Button>
    </form>
  )
}
