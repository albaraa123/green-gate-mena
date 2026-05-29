'use client'

import { useEffect } from 'react'

export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, sans-serif',
          background: '#fbf8f1',
          color: '#1a1a1a',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#00796b',
              marginBottom: '1rem',
            }}
          >
            Critical Error
          </p>
          <h1
            style={{
              fontSize: '2rem',
              fontStyle: 'italic',
              marginBottom: '1rem',
              fontWeight: 600,
            }}
          >
            Something went wrong.
          </h1>
          <p style={{ color: '#666', marginBottom: '2rem', maxWidth: '400px', lineHeight: 1.6 }}>
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={reset}
            style={{
              background: '#00796b',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
