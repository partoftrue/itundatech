"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { Toast as ToastNotification, type ToastType } from "@/components/ui/toast-notification"
import { createPortal } from "react-dom"
import { v4 as uuidv4 } from "uuid"

interface ToastContextType {
  showToast: (props: {
    title: string
    description?: string
    type?: ToastType
    duration?: number
  }) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

interface ToastProps {
  id: string
  title: string
  description?: string
  type?: ToastType
  duration?: number
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)

  // Set up portal container on mount
  useEffect(() => {
    if (typeof document !== "undefined") {
      setPortalContainer(document.body)
    }
  }, [])

  const showToast = useCallback(
    ({
      title,
      description,
      type,
      duration,
    }: {
      title: string
      description?: string
      type?: ToastType
      duration?: number
    }) => {
      const id = uuidv4()
      setToasts((prev) => [...prev, { id, title, description, type, duration }])
    },
    [],
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {portalContainer &&
        createPortal(
          <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
            {toasts.map((toast) => (
              <ToastNotification
                key={toast.id}
                id={toast.id}
                title={toast.title}
                description={toast.description}
                type={toast.type}
                duration={toast.duration}
                onClose={removeToast}
              />
            ))}
          </div>,
          portalContainer,
        )}
    </ToastContext.Provider>
  )
}
