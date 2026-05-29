'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main id="main-content" className="flex flex-col items-center justify-center py-32 text-center px-4">
      <p className="font-mono text-xs uppercase tracking-widest text-teal-600 mb-5">Error</p>
      <h1 className="font-display text-4xl md:text-5xl italic text-ink mb-6">
        Something went wrong.
      </h1>
      <p className="text-ink/55 text-lg mb-10 max-w-md">
        An unexpected error occurred. Please try again — if the problem persists, contact us.
      </p>
      <Button onClick={reset}>Try again</Button>
    </main>
  )
}
