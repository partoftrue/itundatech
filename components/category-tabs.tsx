"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface CategoryTabsProps {
  categories: {
    name: string
    href: string
  }[]
}

export function CategoryTabs({ categories }: CategoryTabsProps) {
  const pathname = usePathname()

  return (
    <div className="border-b">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className={cn(
                "py-4 px-6 whitespace-nowrap",
                pathname === category.href
                  ? "border-b-2 border-brand text-brand font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
