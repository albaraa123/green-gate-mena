import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  pathway: z.enum(['youth', 'ngo', 'consultant', 'partner']),
  name: z.string().min(2),
  email: z.string().email(),
  organization: z.string().optional(),
  country: z.string(),
  message: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown
    const data = schema.parse(body)

    // REPLACE WITH: Resend email to ADMIN_EMAIL — see docs/CMS_INTEGRATION.md
    console.log('[FORM SUBMISSION] Get Involved:', data)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
