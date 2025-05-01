"use client"

import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { toast } from "@/components/ui/use-toast" // Import the toast function

export function ToastInitializer() {
  const toastContext = useToast()

  useEffect(() => {
    // This connects our toast context to the global toast function
    if (typeof window !== "undefined" && toastContext) {
      // @ts-ignore - We know this property exists because we defined it
      if (typeof toast.setToastHandler === "function") {
        // @ts-ignore
        toast.setToastHandler(toastContext)
      }
    }
  }, [toastContext])

  return null
}
