"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Check, AlertCircle } from "lucide-react"

export interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  success?: boolean
  successMessage?: string
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  helperTextClassName?: string
  errorClassName?: string
  successClassName?: string
}

const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  (
    {
      className,
      type,
      label,
      helperText,
      error,
      success,
      successMessage = "Looks good!",
      icon,
      iconPosition = "left",
      containerClassName,
      labelClassName,
      inputClassName,
      helperTextClassName,
      errorClassName,
      successClassName,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = React.useState(false)
    const [filled, setFilled] = React.useState(!!props.value || !!props.defaultValue)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false)
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilled(!!e.target.value)
      props.onChange?.(e)
    }

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              "text-sm font-medium transition-colors",
              focused ? "text-primary" : "text-foreground",
              error && "text-destructive",
              labelClassName,
            )}
          >
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>
          )}

          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
              "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive focus-visible:ring-destructive",
              success && "border-green-500 focus-visible:ring-green-500",
              icon && iconPosition === "left" && "pl-10",
              icon && iconPosition === "right" && "pr-10",
              inputClassName,
            )}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />

          {icon && iconPosition === "right" && !error && !success && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>
          )}

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive"
              >
                <AlertCircle className="h-4 w-4" />
              </motion.div>
            )}

            {success && !error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
              >
                <Check className="h-4 w-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={cn("text-sm text-destructive", errorClassName)}
            >
              {error}
            </motion.p>
          )}

          {success && !error && successMessage && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={cn("text-sm text-green-500", successClassName)}
            >
              {successMessage}
            </motion.p>
          )}

          {helperText && !error && !success && (
            <p className={cn("text-sm text-muted-foreground", helperTextClassName)}>{helperText}</p>
          )}
        </AnimatePresence>
      </div>
    )
  },
)

EnhancedInput.displayName = "EnhancedInput"

export { EnhancedInput }
