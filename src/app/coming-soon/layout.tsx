import type { ReactNode } from 'react'
import { Manrope } from 'next/font/google'
import '../globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '600', '800'],
})

export const metadata = {
  title: 'Coming Soon | قريباً — Green Gate',
  description: 'Green Gate is launching soon. بوابة خضراء قريباً.',
  robots: { index: false, follow: false },
}

export default function ComingSoonLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} h-full`}>
      <head>
        <style>{`
          @font-face {
            font-family: 'ThmanyahSans';
            src: url('/fonts/thmanyah/thmanyahsans-Regular.woff2') format('woff2');
            font-weight: 400;
            font-display: swap;
          }
          @font-face {
            font-family: 'ThmanyahSans';
            src: url('/fonts/thmanyah/thmanyahsans-Bold.woff2') format('woff2');
            font-weight: 700;
            font-display: swap;
          }
          @font-face {
            font-family: 'ThmanyahSans';
            src: url('/fonts/thmanyah/thmanyahsans-Black.woff2') format('woff2');
            font-weight: 900;
            font-display: swap;
          }
        `}</style>
      </head>
      <body className="min-h-full bg-teal-900 text-white antialiased">{children}</body>
    </html>
  )
}
