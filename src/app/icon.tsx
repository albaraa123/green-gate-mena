import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

// Favicon — the Green Gate dot-ring mark on a teal background.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#00796b',
          borderRadius: 14,
        }}
      >
        <svg width="46" height="46" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
          <g fill="#ffffff">
            <circle cx="440" cy="285" r="46" />
            <circle cx="300" cy="330" r="34" />
            <circle cx="640" cy="285" r="40" />
            <circle cx="755" cy="370" r="34" />
            <circle cx="840" cy="490" r="42" />
            <circle cx="800" cy="640" r="38" />
            <circle cx="730" cy="780" r="34" />
            <circle cx="590" cy="850" r="46" />
            <circle cx="440" cy="850" r="40" />
            <circle cx="300" cy="780" r="34" />
            <circle cx="230" cy="640" r="38" />
            <circle cx="220" cy="490" r="42" />
          </g>
          <g fill="#c6e94a">
            <circle cx="540" cy="270" r="22" />
            <circle cx="690" cy="780" r="22" />
            <circle cx="370" cy="350" r="20" />
            <circle cx="850" cy="560" r="20" />
          </g>
        </svg>
      </div>
    ),
    { ...size }
  )
}
