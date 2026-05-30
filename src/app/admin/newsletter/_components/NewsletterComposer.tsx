'use client'

import { useState } from 'react'

interface Props {
  activeCount: number
}

export function NewsletterComposer({ activeCount }: Props) {
  const [subject, setSubject] = useState('')
  const [previewText, setPreviewText] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [result, setResult] = useState<{ sent: number; failed: number } | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  async function handleSend() {
    if (!subject.trim() || !content.trim()) return
    setStatus('sending')
    setShowConfirm(false)

    try {
      const res = await fetch('/api/admin/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, previewText, content }),
      })
      const data = await res.json() as { sent: number; failed: number; error?: string }
      if (res.ok) {
        setStatus('sent')
        setResult({ sent: data.sent, failed: data.failed })
        setSubject('')
        setPreviewText('')
        setContent('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  async function handleTestSend() {
    if (!subject.trim() || !content.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/admin/newsletter/send-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, previewText, content }),
      })
      if (res.ok) {
        setStatus('idle')
        alert('Test email sent to greengate4menayouth@gmail.com')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-5">
      <h2 className="font-semibold text-lg text-gray-900">Compose Newsletter</h2>

      {status === 'sent' && result && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4">
          <p className="text-sm text-green-700 font-medium">
            ✓ Newsletter sent — {result.sent} delivered{result.failed > 0 ? `, ${result.failed} failed` : ''}
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Subject *</label>
        <input
          type="text"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="Newsletter subject line"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          dir="auto"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Preview text <span className="text-gray-400 font-normal">(optional)</span></label>
        <input
          type="text"
          value={previewText}
          onChange={e => setPreviewText(e.target.value)}
          placeholder="Short preview shown in inbox"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          dir="auto"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Content *</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write your newsletter content here..."
          rows={12}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-y"
          dir="auto"
        />
      </div>

      {showConfirm && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 flex flex-col gap-3">
          <p className="text-sm text-amber-800 font-medium">
            Send this newsletter to {activeCount} active subscriber{activeCount !== 1 ? 's' : ''}?
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleSend}
              disabled={status === 'sending'}
              className="bg-teal-700 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-teal-800 disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Confirm & Send'}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!showConfirm && (
        <div className="flex gap-3 pt-1">
          <button
            onClick={handleTestSend}
            disabled={!subject.trim() || !content.trim() || status === 'sending'}
            className="border border-gray-300 text-gray-700 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            Send Test Email
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            disabled={!subject.trim() || !content.trim() || activeCount === 0 || status === 'sending'}
            className="bg-teal-700 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-teal-800 disabled:opacity-50"
          >
            Send to {activeCount} Subscriber{activeCount !== 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  )
}
