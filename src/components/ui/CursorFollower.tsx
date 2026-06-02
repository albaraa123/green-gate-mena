'use client'

import { useEffect, useRef, useState } from 'react'

// A small brand-mark dot that smoothly trails the mouse cursor.
// The native cursor stays visible; this is a decorative follower.
// Disabled on touch devices and for users who prefer reduced motion.
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Skip on touch devices or reduced-motion preference.
    const isTouch = window.matchMedia('(hover: none)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || reduced) return
    setEnabled(true)

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let curX = mouseX
    let curY = mouseY
    let raf = 0
    let interactive = false

    function onMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
      // Grow when hovering clickable elements.
      const el = e.target as HTMLElement | null
      interactive = !!el?.closest('a, button, [role="button"], input, textarea, select')
    }

    function loop() {
      // Ease toward the target (smooth trailing).
      curX += (mouseX - curX) * 0.18
      curY += (mouseY - curY) * 0.18
      const dot = dotRef.current
      if (dot) {
        const scale = interactive ? 1.8 : 1
        dot.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%) scale(${scale})`
        dot.style.opacity = interactive ? '0.9' : '0.65'
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9998] hidden lg:block"
      style={{ willChange: 'transform' }}
    >
      <svg width="26" height="26" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
        <g fill="#00796b">
          <path d="M609.13,800.9c85.07-10.81,85.64,117.74,3.87,110.62-64.91-5.65-65.29-102.81-3.87-110.62Z"/>
          <path d="M490.03,164.99c19.64,19.64,21.5,52.15,3.86,73.66-37.35,45.54-110.79,9.16-96-49,10.27-40.41,62.72-54.08,92.14-24.66Z"/>
          <path d="M754.05,782.02c63.12-.48,61.11,98.52-5.15,92.6-55.6-4.96-53.54-92.16,5.15-92.6Z"/>
          <path d="M472.05,783.02c60.59-.53,60.42,90.97.82,91.71-59.09.73-61.12-91.18-.82-91.71Z"/>
          <path d="M302.16,190.92c60.25-6.62,68.24,83.92,11.62,90.62-62.08,7.34-70.59-84.13-11.62-90.62Z"/>
          <path d="M586.17,190.94c59.84-5.64,67.07,85.78,8.69,90.68-60.5,5.08-67.63-85.13-8.69-90.68Z"/>
          <path d="M201.16,278.93c28.38-3.47,46.84,27.97,29.63,50.63-20.18,26.57-63.14,7.68-56.15-26.16,2.54-12.31,14.06-22.94,26.52-24.47Z"/>
          <path d="M851.14,729.9c44.33-6.5,50.68,58.42,8.63,62.63-40.05,4.01-46.78-57.03-8.63-62.63Z"/>
          <path d="M390.02,738c28.04,27.06-9.53,71.14-40.14,48.64-36.62-26.91,8.77-78.92,40.14-48.64Z"/>
          <path d="M689.16,278.93c41.7-4.43,47.21,58.26,7.61,62.6-42.19,4.63-48.16-58.3-7.61-62.6Z"/>
          <path d="M747.87,365.21c26.35-.32,31.93,36.9,7.5,44.92-33.31,10.93-43.05-44.49-7.5-44.92Z"/>
          <path d="M167.02,404.29c-23.95,24.04-57.21-20.66-26.66-36.16,24.44-12.4,44.55,18.19,26.66,36.16Z"/>
          <path d="M907.12,653.88c30.88-5.26,35.3,39.14,9.53,43.52-31.86,5.41-36.32-38.96-9.53-43.52Z"/>
          <path d="M313.14,656.91c14.88-2.15,27.06,8.99,25.15,24.15-.89,7.06-8.57,16.15-15.65,17.35-32.11,5.42-35.32-37.77-9.5-41.49Z"/>
          <path d="M951.03,600c15.5-.62,19.89,20.95,5.64,26.43-20.18,7.76-25.9-25.62-5.64-26.43Z"/>
          <path d="M765.11,442.88c21.72-3.94,21.72,30.47,0,26.53-14.2-2.58-14.2-23.96,0-26.53Z"/>
          <path d="M292.1,600.88c21.46-4.46,22.79,27.2,2.92,26.41-15.05-.6-17.26-23.43-2.92-26.41Z"/>
          <path d="M124.1,434.88c21.81-4.53,21.46,27.86,1.88,25.7-13.5-1.5-15.86-22.79-1.88-25.7Z"/>
        </g>
        <g fill="#4cae50">
          <path d="M182.17,557.95c44.45-3.36,74.4,45.81,51.03,84.02-21.63,35.36-74.53,34.47-94.99-1.65-19.97-35.25,3.8-79.33,43.96-82.37Z"/>
          <path d="M837.73,414.99c50-49.99,127.36,23.21,79.68,76.18-49.2,54.65-132-23.85-79.68-76.18Z"/>
          <path d="M213.13,422.9c62.32-7.99,70.74,84.74,11.62,90.62-59.96,5.96-68.13-83.37-11.62-90.62Z"/>
          <path d="M842.17,548.94c55.2-5.16,68.16,75.35,16.99,88.98-64.76,17.25-81.07-82.99-16.99-88.98Z"/>
          <path d="M878.03,355.29c-44.08,42.83-109.04-28.45-59.66-68.16,44.35-35.66,100.49,28.49,59.66,68.16Z"/>
          <path d="M211.14,696.9c51.29-7.39,72.92,56.53,32.56,81.56-30.76,19.08-70.75-5.08-68.19-41.2,1.31-18.4,16.97-37.68,35.63-40.36Z"/>
          <path d="M289.12,808.88c29.66-4.64,51.98,24.97,37.42,51.43-18.49,33.61-70.42,17.13-65.08-23.08,1.71-12.89,14.81-26.33,27.66-28.35Z"/>
          <path d="M761.12,188.88c52.17-8.12,50.21,71.29,1,63.52-34.61-5.46-34.37-58.33-1-63.52Z"/>
          <path d="M767.88,657.21c42.78.49,40.57,64.84-.89,64.32s-42.04-64.81.89-64.32Z"/>
          <path d="M293.17,342.91c40.07-3.66,46.4,57.5,7.63,62.65-43.17,5.73-50.08-58.76-7.63-62.65Z"/>
          <path d="M678.12,724.88c26.47-4.47,38.72,27.16,18.2,41.2-17.94,12.27-41.29-5.59-34.43-26.43,2.19-6.67,9.16-13.58,16.23-14.77Z"/>
          <path d="M667.74,184.29c-22.57-22.6,15.46-55.23,34.08-28.58,15.48,22.16-15.26,47.43-34.08,28.58Z"/>
          <path d="M378.88,301.21c27.34-.05,27.73,39.17,4.91,42.35-33.38,4.65-34.29-42.29-4.91-42.35Z"/>
          <path d="M615.1,747.88c22.45-4.67,22.73,29.08,1.88,26.7-15.17-1.73-15.34-23.9-1.88-26.7Z"/>
          <path d="M442.15,289.84c16.89-2.31,21.33,24.15,4.67,26.74-20.01,3.11-21.88-24.38-4.67-26.74Z"/>
          <path d="M616.11,131.88c19.16-3.94,22.42,25.06,4.65,26.72s-19.92-23.58-4.65-26.72Z"/>
          <path d="M388.58,888.71c22.57,22.6-15.46,55.23-34.08,28.58-15.48-22.16,15.26-47.43,34.08-28.58Z"/>
          <path d="M438.21,948.12c-19.16,3.94-22.42-25.06-4.65-26.72,16.92-1.58,19.92,23.58,4.65,26.72Z"/>
        </g>
      </svg>
    </div>
  )
}
