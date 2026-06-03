import { ImageResponse } from 'next/og'
import { getOpportunityBySlug } from '@/lib/supabase/queries'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export default async function OGImage({ params }: Props) {
  const { slug } = await params
  const opp = await getOpportunityBySlug(slug)

  const title = opp?.title ?? 'Climate Opportunity'
  const org = opp?.organization ?? 'Green Gate MENA'
  const type = opp?.type ?? 'opportunity'
  const desc = opp?.description
    ? opp.description.length > 120 ? opp.description.slice(0, 117) + '…' : opp.description
    : 'Explore climate and environmental opportunities across the MENA region.'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '56px 64px',
          background: 'linear-gradient(135deg, #003d33 0%, #00574a 50%, #00695c 100%)',
          position: 'relative',
        }}
      >
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 360, height: 360, borderRadius: '50%', background: 'rgba(198,233,74,0.1)' }} />
        <div style={{ position: 'absolute', bottom: -30, left: 180, width: 240, height: 240, borderRadius: '50%', background: 'rgba(198,233,74,0.06)' }} />

        {/* Type badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginBottom: 20,
            background: 'rgba(198,233,74,0.15)',
            border: '1.5px solid rgba(198,233,74,0.3)',
            borderRadius: 100,
            padding: '6px 18px',
            width: 'fit-content',
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 600, color: '#c6e94a', textTransform: 'capitalize', letterSpacing: '0.05em' }}>
            {type}
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 52, fontWeight: 700, color: '#ffffff', lineHeight: 1.15, margin: 0, marginBottom: 16, maxWidth: 860 }}>
          {title}
        </h1>

        {/* Description */}
        <p style={{ fontSize: 20, color: 'rgba(178,223,219,0.85)', margin: 0, marginBottom: 32, maxWidth: 720, lineHeight: 1.5 }}>
          {desc}
        </p>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{org}</span>
          <span style={{ fontSize: 16, color: 'rgba(198,233,74,0.7)', fontFamily: 'monospace' }}>greengatemena.com</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
