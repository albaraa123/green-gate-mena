import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Manrope } from 'next/font/google'
import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from './_components/AdminSidebar'
import '../globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata = { title: { default: 'Admin', template: '%s | Admin' } }

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const isLoginPage = headersList.get('x-admin-page') === 'login'

  if (isLoginPage) {
    return (
      <html lang="en" className={manrope.variable}>
        <body className="min-h-full bg-gray-50 antialiased">{children}</body>
      </html>
    )
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <html lang="en" className={manrope.variable}>
      <body className="min-h-full antialiased">
        <div className="flex min-h-screen bg-gray-50">
          <AdminSidebar />
          <main className="flex-1 p-8 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}
