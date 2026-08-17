'use client'

import { useState } from 'react'

interface Props {
  text: string
  /** Collapse when the body is longer than this many characters. */
  limit?: number
  moreLabel: string
  lessLabel: string
  className?: string
  linkClassName?: string
}

// Collapsible body text with a "Read more" / "Read less" toggle,
// mirroring the ChangeNOW impact cards. Short bodies render as-is.
export function ReadMoreText({
  text,
  limit = 180,
  moreLabel,
  lessLabel,
  className,
  linkClassName,
}: Props) {
  const [expanded, setExpanded] = useState(false)
  const needsToggle = text.length > limit

  if (!needsToggle) {
    return <p className={className}>{text}</p>
  }

  // Cut at the last word boundary before the limit so we never split a word
  // (important for Arabic, where a mid-word cut is especially jarring).
  const rawCut = text.slice(0, limit)
  const lastSpace = rawCut.lastIndexOf(' ')
  const truncated = (lastSpace > limit * 0.6 ? rawCut.slice(0, lastSpace) : rawCut).trimEnd()
  const shown = expanded ? text : truncated + '…'

  return (
    <p className={className}>
      {shown}{' '}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className={linkClassName ?? 'font-medium text-teal-700 hover:text-teal-800 underline underline-offset-2'}
      >
        {expanded ? lessLabel : moreLabel}
      </button>
    </p>
  )
}
