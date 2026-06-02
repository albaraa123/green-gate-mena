'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'

type ToastKind = 'success' | 'error' | 'info'

interface ToastItem {
  id: number
  kind: ToastKind
  message: string
}

interface ToastContextValue {
  toast: (message: string, kind?: ToastKind) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

const STYLES = {
  success: 'bg-white border-green-200 text-green-800',
  error: 'bg-white border-red-200 text-red-700',
  info: 'bg-white border-teal-200 text-teal-800',
}

const ICON_COLORS = {
  success: 'text-green-600',
  error: 'text-red-500',
  info: 'text-teal-600',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const toast = useCallback((message: string, kind: ToastKind = 'success') => {
    const id = Date.now() + Math.random()
    setItems((prev) => [...prev, { id, kind, message }])
    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  function dismiss(id: number) {
    setItems((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 start-6 z-[100] flex flex-col gap-2 max-w-sm" dir="auto">
        <AnimatePresence>
          {items.map((t) => {
            const Icon = ICONS[t.kind]
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`flex items-start gap-3 rounded-xl border shadow-lg px-4 py-3 ${STYLES[t.kind]}`}
              >
                <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${ICON_COLORS[t.kind]}`} aria-hidden />
                <p className="text-sm font-medium leading-snug flex-1">{t.message}</p>
                <button
                  onClick={() => dismiss(t.id)}
                  className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
