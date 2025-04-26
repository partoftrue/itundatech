"use client"

import type React from "react"

import Link from "next/link"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  linkProps?: React.ComponentProps<typeof Link>
}

export function Logo({ className, size = "md", linkProps }: LogoProps) {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  const sizes = {
    sm: {
      bolt: "h-4 w-4",
      text: "text-base",
    },
    md: {
      bolt: "h-6 w-6",
      text: "text-xl",
    },
    lg: {
      bolt: "h-8 w-8",
      text: "text-2xl",
    },
  }

  const logo = (
    <div className={cn("flex items-center", className)}>
      {/* Electric Bolt SVG */}
      <svg
        viewBox="0 0 24 24"
        className={cn("mr-1", sizes[size].bolt, isDarkMode ? "text-white" : "text-brand")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 3L4 14H12L11 21L20 10H12L13 3Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={cn("font-bold", sizes[size].text, isDarkMode ? "text-white" : "text-brand")}>itunda</span>
      <span className={cn("font-bold", sizes[size].text, isDarkMode ? "text-gray-300" : "text-gray-700")}>.tech</span>
    </div>
  )

  if (linkProps) {
    return <Link {...linkProps}>{logo}</Link>
  }

  return logo
}
