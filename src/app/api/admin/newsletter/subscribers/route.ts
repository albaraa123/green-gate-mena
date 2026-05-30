import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { data } = await resend.contacts.list({ audienceId: process.env.RESEND_AUDIENCE_ID! })
    return NextResponse.json({ contacts: data?.data ?? [] })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 })
  }
}
