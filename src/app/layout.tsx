import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://greengatemena.com'

// metadataBase lets Next resolve OG/Twitter image URLs to absolute paths.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
}

// Root layout: minimal pass-through. [locale]/layout.tsx provides html/body.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
