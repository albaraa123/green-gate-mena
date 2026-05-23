import type { ReactNode } from 'react'

// Root layout: minimal pass-through. [locale]/layout.tsx provides html/body.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
