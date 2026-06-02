'use client'

import { useState } from 'react'
import { BlockEditor, blocksToHtml, hasContent } from './BlockEditor'
import type { Block } from './BlockEditor'

interface Props {
  activeCount: number
  headerImage?: string
}

export function NewsletterComposer({ activeCount, headerImage }: Props) {
  const [subject, setSubject] = useState('')
  const [previewText, setPreviewText] = useState('')
  const [blocks, setBlocks] = useState<Block[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [result, setResult] = useState<{ sent: number; failed: number } | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const contentHtml = blocksToHtml(blocks)
  const isReady = subject.trim().length > 0 && hasContent(blocks)

  async function handleSend() {
    if (!isReady) return
    setStatus('sending')
    setShowConfirm(false)
    try {
      const res = await fetch('/api/admin/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, previewText, content: contentHtml }),
      })
      const data = await res.json() as { sent: number; failed: number; error?: string }
      if (res.ok) {
        setStatus('sent')
        setResult({ sent: data.sent, failed: data.failed })
        setSubject('')
        setPreviewText('')
        setBlocks([])
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  async function handleTestSend() {
    if (!isReady) return
    setStatus('sending')
    try {
      const res = await fetch('/api/admin/newsletter/send-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, previewText, content: contentHtml }),
      })
      if (res.ok) {
        setStatus('idle')
        alert('✓ Test email sent to greengate4menayouth@gmail.com')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Status messages */}
      {status === 'sent' && result && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4">
          <p className="text-sm text-green-700 font-medium">
            ✓ تم الإرسال — {result.sent} وصل{result.failed > 0 ? `، ${result.failed} فشل` : ''}
          </p>
        </div>
      )}
      {status === 'error' && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-600">حدث خطأ. حاول مجدداً.</p>
        </div>
      )}

      {/* Subject + preview text */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-base text-gray-900">معلومات النشرة</h2>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">الموضوع *</label>
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="موضوع النشرة البريدية"
            dir="auto"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            نص المعاينة <span className="text-gray-400 font-normal">(يظهر في صندوق الوارد)</span>
          </label>
          <input
            type="text"
            value={previewText}
            onChange={e => setPreviewText(e.target.value)}
            placeholder="جملة قصيرة تظهر قبل فتح الإيميل..."
            dir="auto"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Block editor */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-base text-gray-900">محتوى النشرة</h2>
          {blocks.length > 0 && (
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="text-xs text-teal-700 border border-teal-200 rounded-lg px-3 py-1.5 hover:bg-teal-50 transition-colors"
            >
              {showPreview ? 'إخفاء المعاينة' : 'معاينة الإيميل'}
            </button>
          )}
        </div>

        {showPreview ? (
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 text-xs text-gray-500 font-mono">معاينة الإيميل</div>
            <div className="p-6 bg-gray-50">
              <div className="max-w-lg mx-auto">
                {headerImage ? (
                  <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={headerImage} alt="header" style={{ display: 'block', width: '100%' }} />
                    {previewText && <p style={{ color: '#6b7280', fontSize: 13, margin: '8px 0 0', textAlign: 'center' }}>{previewText}</p>}
                  </div>
                ) : (
                  <div style={{ background: '#00796b', borderRadius: 12, padding: 24, textAlign: 'center', marginBottom: 20 }}>
                    <p style={{ color: '#c6e94a', fontWeight: 700, fontSize: 18, margin: 0 }}>Green Gate</p>
                    {previewText && <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, margin: '4px 0 0' }}>{previewText}</p>}
                  </div>
                )}
                <div
                  className="bg-white rounded-xl p-6"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </div>
            </div>
          </div>
        ) : (
          <BlockEditor blocks={blocks} onChange={setBlocks} />
        )}
      </div>

      {/* Confirm dialog */}
      {showConfirm && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 flex flex-col gap-3">
          <p className="text-sm text-amber-800 font-medium">
            هل أنت متأكد من إرسال هذه النشرة إلى {activeCount} مشترك{activeCount !== 1 ? '' : ''}؟
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleSend}
              disabled={status === 'sending'}
              className="bg-teal-700 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-teal-800 disabled:opacity-50"
            >
              {status === 'sending' ? 'جاري الإرسال...' : 'تأكيد الإرسال'}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* Action buttons */}
      {!showConfirm && (
        <div className="flex gap-3">
          <button
            onClick={handleTestSend}
            disabled={!isReady || status === 'sending'}
            className="border border-gray-300 text-gray-700 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            إرسال تجريبي
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            disabled={!isReady || activeCount === 0 || status === 'sending'}
            className="bg-teal-700 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-teal-800 disabled:opacity-50 transition-colors"
          >
            إرسال إلى {activeCount} مشترك
          </button>
        </div>
      )}
    </div>
  )
}
