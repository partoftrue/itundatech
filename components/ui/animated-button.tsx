"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { buttonHover } from "@/lib/animations"
import { Button, type ButtonProps } from "@/components/ui/button"

export interface AnimatedButtonProps extends ButtonProps {}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <motion.div {...buttonHover}>
        <Button ref={ref} className={cn(className)} variant={variant} size={size} {...props}>
          {children}
        </Button>
      </motion.div>
    )
  },
)
AnimatedButton.displayName = "AnimatedButton"

export { AnimatedButton }
