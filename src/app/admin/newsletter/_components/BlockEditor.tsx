'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

export type Block =
  | { id: string; type: 'text'; content: string }
  | { id: string; type: 'image'; url: string; caption: string; link: string }
  | { id: string; type: 'button'; text: string; url: string }
  | { id: string; type: 'divider' }

function genId() {
  return Math.random().toString(36).slice(2, 10)
}

export function blocksToHtml(blocks: Block[]): string {
  return blocks.map(block => {
    if (block.type === 'text') {
      const safe = block.content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>')
      return `<p dir="auto" style="color:#374151;line-height:1.9;margin:0 0 16px;font-size:15px;">${safe}</p>`
    }
    if (block.type === 'image') {
      const img = `<img src="${block.url}" alt="${block.caption || ''}" style="max-width:100%;border-radius:10px;display:block;margin:0 auto;">`
      const wrapped = block.link ? `<a href="${block.link}">${img}</a>` : img
      const cap = block.caption
        ? `<p style="text-align:center;color:#9ca3af;font-size:13px;margin:8px 0 0;">${block.caption}</p>`
        : ''
      return `<div style="margin:0 0 20px;">${wrapped}${cap}</div>`
    }
    if (block.type === 'button') {
      return `<div style="text-align:center;margin:24px 0;"><a href="${block.url}" style="display:inline-block;background:#00796b;color:#fff;padding:12px 30px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">${block.text}</a></div>`
    }
    if (block.type === 'divider') {
      return `<hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">`
    }
    return ''
  }).join('\n')
}

function hasContent(blocks: Block[]) {
  return blocks.some(b => {
    if (b.type === 'text') return b.content.trim().length > 0
    if (b.type === 'image') return b.url.length > 0
    if (b.type === 'button') return b.text.trim().length > 0
    return true
  })
}

// ── Individual block editors ──────────────────────────────────────────────────

function TextBlock({ block, onChange }: { block: Extract<Block, { type: 'text' }>; onChange: (b: Block) => void }) {
  return (
    <textarea
      value={block.content}
      onChange={e => onChange({ ...block, content: e.target.value })}
      placeholder="اكتب النص هنا... / Write your text here..."
      rows={4}
      dir="auto"
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-y bg-gray-50"
    />
  )
}

function ImageBlock({ block, onChange }: { block: Extract<Block, { type: 'image' }>; onChange: (b: Block) => void }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    if (file.size > 5 * 1024 * 1024) { setError('الحد الأقصى 5MB'); return }
    if (!file.type.startsWith('image/')) { setError('يرجى رفع صورة صالحة'); return }
    setError('')
    setUploading(true)
    try {
      const supabase = createClient()
      const path = `newsletter/${Date.now()}-${file.name.replace(/\s+/g, '-')}`
      const { error: uploadErr } = await supabase.storage.from('uploads').upload(path, file, { upsert: true })
      if (uploadErr) throw uploadErr
      const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(path)
      onChange({ ...block, url: publicUrl })
    } catch {
      setError('فشل الرفع. حاول مجدداً.')
    }
    setUploading(false)
  }

  return (
    <div className="flex flex-col gap-3">
      {block.url ? (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.url} alt="preview" className="w-full max-h-48 object-cover rounded-lg border border-gray-200" />
          <button
            onClick={() => onChange({ ...block, url: '' })}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
          >✕</button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-colors"
        >
          {uploading ? (
            <p className="text-sm text-teal-600">جاري الرفع...</p>
          ) : (
            <>
              <p className="text-sm text-gray-500">اضغط لرفع صورة</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP · حد أقصى 5MB</p>
            </>
          )}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      <input
        type="text"
        value={block.caption}
        onChange={e => onChange({ ...block, caption: e.target.value })}
        placeholder="تعليق على الصورة (اختياري) / Caption (optional)"
        dir="auto"
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
      />
      <input
        type="url"
        value={block.link}
        onChange={e => onChange({ ...block, link: e.target.value })}
        placeholder="رابط عند النقر على الصورة (اختياري) / Link on click (optional)"
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
      />
    </div>
  )
}

function ButtonBlock({ block, onChange }: { block: Extract<Block, { type: 'button' }>; onChange: (b: Block) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={block.text}
        onChange={e => onChange({ ...block, text: e.target.value })}
        placeholder="نص الزر / Button text"
        dir="auto"
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
      />
      <input
        type="url"
        value={block.url}
        onChange={e => onChange({ ...block, url: e.target.value })}
        placeholder="https://..."
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
      />
      {block.text && (
        <div className="flex justify-center">
          <span className="inline-block bg-teal-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold">
            {block.text}
          </span>
        </div>
      )}
    </div>
  )
}

// ── Main block editor ─────────────────────────────────────────────────────────

interface Props {
  blocks: Block[]
  onChange: (blocks: Block[]) => void
}

const BLOCK_LABELS: Record<string, string> = {
  text: 'نص',
  image: 'صورة',
  button: 'زر / رابط',
  divider: 'فاصل',
}

export function BlockEditor({ blocks, onChange }: Props) {
  function addBlock(type: Block['type']) {
    const id = genId()
    let block: Block
    if (type === 'text') block = { id, type, content: '' }
    else if (type === 'image') block = { id, type, url: '', caption: '', link: '' }
    else if (type === 'button') block = { id, type, text: '', url: '' }
    else block = { id, type: 'divider' }
    onChange([...blocks, block])
  }

  function updateBlock(idx: number, b: Block) {
    const updated = [...blocks]
    updated[idx] = b
    onChange(updated)
  }

  function removeBlock(idx: number) {
    onChange(blocks.filter((_, i) => i !== idx))
  }

  function moveBlock(idx: number, dir: -1 | 1) {
    const updated = [...blocks]
    const target = idx + dir
    if (target < 0 || target >= updated.length) return
    const tmp = updated[idx]!
    updated[idx] = updated[target]!
    updated[target] = tmp
    onChange(updated)
  }

  return (
    <div className="flex flex-col gap-3">
      {blocks.length === 0 && (
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
          <p className="text-sm text-gray-400">أضف بلوكات لبناء محتوى النشرة</p>
        </div>
      )}

      {blocks.map((block, idx) => (
        <div key={block.id} className="border border-gray-200 rounded-xl bg-white overflow-hidden">
          {/* Block header */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {BLOCK_LABELS[block.type]}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => moveBlock(idx, -1)}
                disabled={idx === 0}
                className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-200 disabled:opacity-30"
                title="Move up"
              >▲</button>
              <button
                onClick={() => moveBlock(idx, 1)}
                disabled={idx === blocks.length - 1}
                className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-200 disabled:opacity-30"
                title="Move down"
              >▼</button>
              <button
                onClick={() => removeBlock(idx)}
                className="p-1 rounded text-red-400 hover:text-red-600 hover:bg-red-50"
                title="Delete"
              >✕</button>
            </div>
          </div>

          {/* Block content */}
          <div className="p-4">
            {block.type === 'text' && <TextBlock block={block} onChange={b => updateBlock(idx, b)} />}
            {block.type === 'image' && <ImageBlock block={block} onChange={b => updateBlock(idx, b)} />}
            {block.type === 'button' && <ButtonBlock block={block} onChange={b => updateBlock(idx, b)} />}
            {block.type === 'divider' && <hr className="border-gray-300" />}
          </div>
        </div>
      ))}

      {/* Add block buttons */}
      <div className="flex flex-wrap gap-2 pt-1">
        <span className="text-xs text-gray-400 self-center me-1">أضف:</span>
        {(['text', 'image', 'button', 'divider'] as const).map(type => (
          <button
            key={type}
            onClick={() => addBlock(type)}
            className="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-600 hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50 transition-colors"
          >
            <span>+</span> {BLOCK_LABELS[type]}
          </button>
        ))}
      </div>
    </div>
  )
}

export { hasContent }
