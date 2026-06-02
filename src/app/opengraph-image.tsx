import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Green Gate — The Arab World\'s Gateway to Environmental Opportunities'
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
          flexDirection: 'row',
          alignItems: 'center',
          padding: '64px',
          background: 'linear-gradient(135deg, #004d40 0%, #00695c 55%, #00796b 100%)',
          position: 'relative',
        }}
      >
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'rgba(198,233,74,0.12)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: 120, width: 280, height: 280, borderRadius: '50%', background: 'rgba(198,233,74,0.07)' }} />

        {/* Text column */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          <p style={{ fontSize: 20, fontWeight: 600, color: 'rgba(198,233,74,0.85)', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0, marginBottom: 18 }}>
            Green Gate
          </p>
          <h1 style={{ fontSize: 60, fontWeight: 700, color: '#ffffff', lineHeight: 1.1, margin: 0, marginBottom: 24, maxWidth: 640 }}>
            The Arab World&apos;s Gateway to Environmental Opportunities
          </h1>
          <p style={{ fontSize: 24, color: 'rgba(178,223,219,0.85)', margin: 0, marginBottom: 36, maxWidth: 600, lineHeight: 1.4 }}>
            Connecting youth and organizations with climate opportunities across 22 Arab countries.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            {['22 Countries', '500+ Youth', 'Free to join'].map((label) => (
              <div key={label} style={{ borderRadius: 100, border: '1.5px solid rgba(255,255,255,0.22)', padding: '8px 20px', fontSize: 17, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Brand mark */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 340, height: 340 }}>
          <svg width="320" height="320" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
            <g fill="#ffffff">
              <circle cx="440" cy="285" r="46" /><circle cx="300" cy="330" r="34" /><circle cx="640" cy="285" r="40" />
              <circle cx="755" cy="370" r="34" /><circle cx="840" cy="490" r="42" /><circle cx="800" cy="640" r="38" />
              <circle cx="730" cy="780" r="34" /><circle cx="590" cy="850" r="46" /><circle cx="440" cy="850" r="40" />
              <circle cx="300" cy="780" r="34" /><circle cx="230" cy="640" r="38" /><circle cx="220" cy="490" r="42" />
            </g>
            <g fill="#c6e94a">
              <circle cx="540" cy="270" r="22" /><circle cx="690" cy="780" r="22" /><circle cx="370" cy="350" r="20" /><circle cx="850" cy="560" r="20" />
            </g>
          </svg>
        </div>

        {/* URL */}
        <p style={{ position: 'absolute', top: 48, right: 64, fontSize: 18, color: 'rgba(198,233,74,0.7)', fontFamily: 'monospace', margin: 0 }}>
          greengatemena.com
        </p>
      </div>
    ),
    { ...size }
  )
}
