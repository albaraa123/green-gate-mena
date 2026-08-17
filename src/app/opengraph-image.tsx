import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Green Gate — MENA\'s Gate to Environmental Services'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Brand-colored social share card (WhatsApp / X / LinkedIn previews).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #00574d 0%, #00796b 55%, #26a69a 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* leaf mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '32px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              background: '#c6e94a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '38px',
            }}
          >
            🌿
          </div>
          <div style={{ fontSize: '34px', fontWeight: 700, letterSpacing: '-0.5px' }}>
            Green Gate
          </div>
        </div>

        <div
          style={{
            fontSize: '68px',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            maxWidth: '900px',
          }}
        >
          MENA&apos;s Gate to{' '}
          <span style={{ color: '#c6e94a' }}>Environmental Services</span>
        </div>

        <div style={{ fontSize: '28px', color: '#c9ece7', marginTop: '28px', maxWidth: '820px' }}>
          Connecting youth, NGOs & institutions with climate opportunities across the MENA region.
        </div>

        <div style={{ display: 'flex', gap: '28px', marginTop: '44px', fontSize: '24px', color: '#a7ddd6' }}>
          <span>50,000+ youth</span>
          <span>·</span>
          <span>45+ countries</span>
          <span>·</span>
          <span>greengatemena.com</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
