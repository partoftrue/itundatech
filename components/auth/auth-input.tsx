import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(({ className, label, error, ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700",
          "bg-white dark:bg-gray-900",
          "text-gray-900 dark:text-gray-100",
          "placeholder:text-gray-400 dark:placeholder:text-gray-500",
          "focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent",
          "transition-all duration-200",
          error && "border-red-500 focus:ring-red-500",
          className,
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
})

AuthInput.displayName = "AuthInput"
