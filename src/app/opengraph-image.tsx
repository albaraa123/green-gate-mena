import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Green Gate MENA — MENA\'s Climate & Environment Gateway'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '64px',
          background: 'linear-gradient(135deg, #004d40 0%, #00695c 60%, #00796b 100%)',
          position: 'relative',
        }}
      >
        {/* Decorative lime blob */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(198,233,74,0.12)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -40,
            left: 200,
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: 'rgba(198,233,74,0.07)',
          }}
        />

        {/* Eyebrow */}
        <p
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: 'rgba(198,233,74,0.8)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            margin: 0,
            marginBottom: 16,
          }}
        >
          Green Gate MENA
        </p>

        {/* Heading */}
        <h1
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            margin: 0,
            marginBottom: 24,
            maxWidth: 820,
          }}
        >
          MENA&apos;s Climate &amp; Environment Gateway
        </h1>

        {/* Subhead */}
        <p
          style={{
            fontSize: 24,
            color: 'rgba(178,223,219,0.85)',
            margin: 0,
            marginBottom: 40,
            maxWidth: 680,
            lineHeight: 1.4,
          }}
        >
          Connecting youth, NGOs, and institutions with climate opportunities across 22 MENA countries.
        </p>

        {/* Pills */}
        <div style={{ display: 'flex', gap: 12 }}>
          {['22 Countries', '500+ Youth', '32+ Opportunities', 'Free to join'].map((label) => (
            <div
              key={label}
              style={{
                borderRadius: 100,
                border: '1.5px solid rgba(255,255,255,0.2)',
                padding: '8px 20px',
                fontSize: 16,
                color: 'rgba(255,255,255,0.75)',
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* URL */}
        <p
          style={{
            position: 'absolute',
            top: 48,
            right: 64,
            fontSize: 18,
            color: 'rgba(198,233,74,0.7)',
            fontFamily: 'monospace',
            margin: 0,
          }}
        >
          greengate-mena.org
        </p>
      </div>
    ),
    { ...size }
  )
}
