import { ImageResponse } from 'next/og'
import { getResourceBySlug } from '@/lib/supabase/queries'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export default async function OGImage({ params }: Props) {
  const { slug } = await params
  const resource = await getResourceBySlug(slug)

  const title = resource?.title ?? 'Knowledge Resource'
  const type = resource?.type ?? 'resource'
  const author = resource?.author ?? 'Green Gate MENA'
  const desc = resource?.description
    ? resource.description.length > 120 ? resource.description.slice(0, 117) + '…' : resource.description
    : 'Explore climate and environmental knowledge resources for the MENA region.'

  const typeColors: Record<string, string> = {
    report: '#60a5fa',
    guide: '#34d399',
    article: '#a78bfa',
    toolkit: '#fb923c',
    video: '#f472b6',
    podcast: '#facc15',
  }
  const badgeColor = typeColors[type] ?? '#c6e94a'

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
          background: 'linear-gradient(135deg, #1a2744 0%, #1e3a5f 60%, #1a4a6e 100%)',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: -60, right: -60, width: 360, height: 360, borderRadius: '50%', background: 'rgba(96,165,250,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -30, left: 180, width: 240, height: 240, borderRadius: '50%', background: 'rgba(52,211,153,0.06)' }} />

        {/* Type badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginBottom: 20,
            background: `${badgeColor}22`,
            border: `1.5px solid ${badgeColor}55`,
            borderRadius: 100,
            padding: '6px 18px',
            width: 'fit-content',
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 600, color: badgeColor, textTransform: 'capitalize', letterSpacing: '0.05em' }}>
            {type}
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 52, fontWeight: 700, color: '#ffffff', lineHeight: 1.15, margin: 0, marginBottom: 16, maxWidth: 860 }}>
          {title}
        </h1>

        {/* Description */}
        <p style={{ fontSize: 20, color: 'rgba(186,230,253,0.8)', margin: 0, marginBottom: 32, maxWidth: 720, lineHeight: 1.5 }}>
          {desc}
        </p>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{author}</span>
          <span style={{ fontSize: 16, color: 'rgba(96,165,250,0.7)', fontFamily: 'monospace' }}>greengatemena.com</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
