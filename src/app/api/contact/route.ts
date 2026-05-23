import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown
    const data = schema.parse(body)

    // REPLACE WITH: Resend email to ADMIN_EMAIL — see docs/CMS_INTEGRATION.md
    console.log('[FORM SUBMISSION] Contact:', data)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
