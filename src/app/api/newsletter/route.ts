import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown
    const { email } = schema.parse(body)

    // REPLACE WITH: Resend/Mailchimp API call — see docs/CMS_INTEGRATION.md
    console.log('[FORM SUBMISSION] Newsletter:', { email })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
