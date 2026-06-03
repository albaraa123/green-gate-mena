'use client'

import { useState } from 'react'
import { Link2, Check, MessageCircle } from 'lucide-react'

interface Props {
  title: string
  // Path is appended to the current origin at click time so it always shares the live URL.
  isAr?: boolean
}

// Social share buttons: WhatsApp, LinkedIn, X, and copy-link.
export function ShareButtons({ title, isAr }: Props) {
  const [copied, setCopied] = useState(false)

  function getUrl() {
    return typeof window !== 'undefined' ? window.location.href : ''
  }

  function share(network: 'whatsapp' | 'linkedin' | 'x') {
    const url = encodeURIComponent(getUrl())
    const text = encodeURIComponent(title)
    const links = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    }
    window.open(links[network], '_blank', 'noopener,noreferrer,width=600,height=500')
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(getUrl())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const btn =
    'h-9 w-9 rounded-full border border-sand-200 bg-white flex items-center justify-center text-ink-soft hover:text-teal-700 hover:border-teal-300 transition-colors'

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-ink-soft/60 me-1">{isAr ? 'شارك:' : 'Share:'}</span>
      <button onClick={() => share('whatsapp')} className={btn} aria-label="Share on WhatsApp">
        <MessageCircle className="h-4 w-4" />
      </button>
      <button onClick={() => share('linkedin')} className={btn} aria-label="Share on LinkedIn">
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
      </button>
      <button onClick={() => share('x')} className={btn} aria-label="Share on X">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>
      <button onClick={copyLink} className={btn} aria-label={isAr ? 'نسخ الرابط' : 'Copy link'}>
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  )
}
