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

  const shown = expanded ? text : text.slice(0, limit).trimEnd() + '…'

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
