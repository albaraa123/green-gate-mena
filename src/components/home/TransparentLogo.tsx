'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  src: string
  className?: string
}

// Loads an image, removes its dark/near-black background pixels (makes them
// transparent), and renders the cleaned result on a canvas. This lets a logo
// with a black square background appear as if it were a transparent PNG.
export function TransparentLogo({ src, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0)

      try {
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const px = data.data
        for (let i = 0; i < px.length; i += 4) {
          const r = px[i]!
          const g = px[i + 1]!
          const b = px[i + 2]!
          // Treat dark pixels (the black background) as transparent.
          // Brightness threshold — tweakable. Logo colors (greens) stay opaque.
          const brightness = (r + g + b) / 3
          if (brightness < 60) {
            px[i + 3] = 0 // fully transparent
          } else if (brightness < 110) {
            // Soft edge: partially fade near-dark pixels to avoid a hard halo.
            px[i + 3] = Math.round(((brightness - 60) / 50) * 255)
          }
        }
        ctx.putImageData(data, 0, 0)
      } catch {
        // If the image is cross-origin tainted, leave it as-is.
      }
      setReady(true)
    }
    img.src = src
  }, [src])

  return (
    <motion.canvas
      ref={canvasRef}
      className={className}
      style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.4s' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 70, ease: 'linear', repeat: Infinity }}
      aria-label="Green Gate"
    />
  )
}
