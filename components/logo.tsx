import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  linkProps?: React.ComponentProps<typeof Link>
}

export function Logo({ className, size = "md", linkProps }: LogoProps) {
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
        className={cn("text-brand mr-1", sizes[size].bolt)}
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
      <span className={cn("font-bold text-brand", sizes[size].text)}>itunda</span>
      <span className={cn("font-bold text-gray-700", sizes[size].text)}>.tech</span>
    </div>
  )

  if (linkProps) {
    return <Link {...linkProps}>{logo}</Link>
  }

  return logo
}
