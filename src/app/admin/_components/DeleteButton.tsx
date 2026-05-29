'use client'

import { useState, useTransition } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

interface Props {
  id: string
  action: (id: string) => Promise<void>
}

export function DeleteButton({ id, action }: Props) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleDelete() {
    setError(null)
    startTransition(async () => {
      try {
        await action(id)
        setOpen(false)
      } catch {
        setError('Something went wrong. Please try again.')
      }
    })
  }

  return (
    <Dialog.Root open={open} onOpenChange={isPending ? undefined : setOpen}>
      <Dialog.Trigger asChild>
        <button className="text-red-500 hover:text-red-700 text-sm transition-colors">
          Delete
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 w-80 shadow-lg z-50">
          <Dialog.Title className="font-semibold text-gray-900 mb-2">Delete item?</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 mb-5">
            This action cannot be undone.
          </Dialog.Description>
          {error && (
            <p className="text-sm text-red-600 mb-4">{error}</p>
          )}
          <div className="flex gap-2 justify-end">
            <Dialog.Close asChild>
              <button
                disabled={isPending}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50"
            >
              {isPending ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
