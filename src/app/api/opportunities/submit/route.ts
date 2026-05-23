import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(3),
  organization: z.string().min(2),
  type: z.string(),
  description: z.string().min(20),
  link: z.string().url(),
  contactEmail: z.string().email(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown
    const data = schema.parse(body)

    // REPLACE WITH: Store in CMS or send to admin email — see docs/CMS_INTEGRATION.md
    console.log('[FORM SUBMISSION] Opportunity Submit:', data)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
