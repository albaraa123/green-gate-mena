import { createServerClient } from '@supabase/ssr'
import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

// Public site is closed behind a bilingual "coming soon" page.
// Set COMING_SOON=false in the environment to reopen the site.
const COMING_SOON = process.env.COMING_SOON !== 'false'

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (COMING_SOON && !pathname.startsWith('/admin')) {
    const url = request.nextUrl.clone()
    url.pathname = '/coming-soon'
    url.search = ''
    return NextResponse.rewrite(url, {
      status: 503,
      headers: { 'Retry-After': '86400', 'X-Robots-Tag': 'noindex, nofollow' },
    })
  }

  // Admin routes: bypass intl middleware entirely
  if (pathname.startsWith('/admin')) {
    // Allow login page through without auth check
    if (pathname.startsWith('/admin/login')) {
      const reqHeaders = new Headers(request.headers)
      reqHeaders.set('x-admin-page', 'login')
      return NextResponse.next({ request: { headers: reqHeaders } })
    }

    const response = NextResponse.next({
      request: { headers: request.headers },
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value)
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return response
  }

  // All other routes: next-intl locale routing
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/((?!_next|_vercel|api|.*\\..*).*)',
  ],
}
