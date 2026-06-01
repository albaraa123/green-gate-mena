'use client'

import { useRef, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  folder: string
  label?: string
  recommended?: string
  className?: string
}

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
const MAX_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_DIMENSION = 1600 // longest edge after compression

// Compress + resize an image in the browser to keep uploads small and fast.
// SVGs are passed through untouched. Anything else becomes a JPEG ≤ ~1MB.
async function compressImage(file: File): Promise<File> {
  if (file.type === 'image/svg+xml') return file

  const dataUrl: string = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('read failed'))
    reader.readAsDataURL(file)
  })

  const img: HTMLImageElement = await new Promise((resolve, reject) => {
    const image = new window.Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('image decode failed'))
    image.src = dataUrl
  })

  let { width, height } = img
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    if (width >= height) {
      height = Math.round((height / width) * MAX_DIMENSION)
      width = MAX_DIMENSION
    } else {
      width = Math.round((width / height) * MAX_DIMENSION)
      height = MAX_DIMENSION
    }
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return file
  ctx.drawImage(img, 0, 0, width, height)

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.85)
  )
  if (!blob) return file

  const baseName = file.name.replace(/\.[^.]+$/, '') || 'image'
  return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' })
}

export function ImageUpload({
  value,
  onChange,
  folder,
  label,
  recommended,
  className = '',
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<UploadStatus>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  async function uploadFile(originalFile: File) {
    setErrorMsg(null)

    if (!ACCEPTED_TYPES.includes(originalFile.type)) {
      setStatus('error')
      setErrorMsg('صيغة الملف غير مدعومة. الصيغ المقبولة: JPG, PNG, WebP, SVG')
      return
    }

    setStatus('uploading')
    setProgress(10)

    try {
      // Compress + resize in the browser so the original file size never matters.
      let file = originalFile
      try {
        file = await compressImage(originalFile)
      } catch {
        // If compression fails, fall back to the original file.
        file = originalFile
      }

      setProgress(30)

      // Safety check after compression (compressed JPEGs are tiny, so this rarely trips).
      if (file.size > MAX_SIZE) {
        setStatus('error')
        setErrorMsg('حجم الملف كبير جداً حتى بعد الضغط. جرّب صورة أصغر.')
        setProgress(0)
        return
      }

      const supabase = createClient()
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`

      setProgress(50)

      const { error } = await supabase.storage.from('uploads').upload(path, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type,
      })

      if (error) throw error

      setProgress(85)

      const { data } = supabase.storage.from('uploads').getPublicUrl(path)
      const publicUrl = data.publicUrl

      setProgress(100)
      setStatus('success')
      onChange(publicUrl)
    } catch (err) {
      setStatus('error')
      const msg = err instanceof Error ? err.message : 'فشل الرفع. حاول مجدداً'
      setErrorMsg(`فشل الرفع: ${msg}`)
      setProgress(0)
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
    // reset input so same file can be re-selected
    e.target.value = ''
  }

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadFile(file)
  }, [folder]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave() {
    setIsDragging(false)
  }

  function handleRemove() {
    onChange('')
    setStatus('idle')
    setErrorMsg(null)
    setProgress(0)
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      {value ? (
        // Preview state
        <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="صورة محملة"
            className="w-full max-h-48 object-contain p-3"
          />
          <div className="flex gap-2 p-3 pt-0">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex-1 text-xs font-medium bg-teal-700 text-white rounded-lg px-3 py-2 hover:bg-teal-800 transition-colors"
            >
              استبدال
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="flex-1 text-xs font-medium border border-red-200 text-red-600 rounded-lg px-3 py-2 hover:bg-red-50 transition-colors"
            >
              حذف
            </button>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(',')}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        // Upload area
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => status !== 'uploading' && inputRef.current?.click()}
          className={[
            'relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-colors cursor-pointer',
            isDragging
              ? 'border-teal-500 bg-teal-50'
              : status === 'error'
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 bg-gray-50 hover:border-teal-400 hover:bg-teal-50/30',
          ].join(' ')}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(',')}
            className="hidden"
            onChange={handleFileChange}
          />

          {status === 'uploading' ? (
            <>
              <div className="w-8 h-8 rounded-full border-2 border-teal-700 border-t-transparent animate-spin" />
              <p className="text-sm text-teal-700 font-medium">جاري الرفع...</p>
              <div className="w-full max-w-xs bg-gray-200 rounded-full h-1.5 mt-1">
                <div
                  className="bg-teal-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          ) : status === 'success' ? (
            <>
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-lg">
                ✓
              </div>
              <p className="text-sm text-teal-700 font-medium">تم الرفع بنجاح</p>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-teal-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700">
                اسحب الصورة هنا أو اضغط للرفع
              </p>
              <p className="text-xs text-gray-400">JPG, PNG, WebP, SVG</p>
              <p className="text-xs text-gray-400">الحد الأقصى 10 ميغابايت</p>
            </>
          )}
        </div>
      )}

      {recommended && (
        <p className="text-xs text-gray-400">المقاس الموصى به: {recommended}</p>
      )}

      {errorMsg && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {errorMsg}
        </p>
      )}
    </div>
  )
}
