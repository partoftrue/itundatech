"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href: string
  active?: boolean
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  homeHref?: string
  homeLabel?: string
  className?: string
}

export function Breadcrumbs({ items = [], homeHref = "/", homeLabel = "Home", className }: BreadcrumbsProps) {
  const pathname = usePathname()

  // If no items are provided, generate them from the pathname
  const breadcrumbItems = items.length
    ? items
    : pathname
        .split("/")
        .filter(Boolean)
        .map((segment, index, segments) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`
          return {
            label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
            href,
            active: index === segments.length - 1,
          }
        })

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm", className)}>
      <ol className="flex items-center flex-wrap">
        <li className="flex items-center">
          <Link
            href={homeHref}
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">{homeLabel}</span>
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" aria-hidden="true" />
            {item.active ? (
              <span className="font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
