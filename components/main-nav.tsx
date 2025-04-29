"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import type { Category } from "@/lib/categories"

interface MainNavProps {
  categories: Category[]
}

export function MainNav({ categories }: MainNavProps) {
  const pathname = usePathname()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdown)
    }
  }

  return (
    <nav className="flex items-center space-x-8">
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive("/") ? "text-primary" : "text-foreground",
        )}
      >
        Home
      </Link>

      {/* Categories Dropdown */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("categories")}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary",
            isActive("/category") ? "text-primary" : "text-foreground",
          )}
        >
          Categories
          <ChevronDown
            className={cn("ml-1 h-4 w-4 transition-transform", activeDropdown === "categories" && "rotate-180")}
          />
        </button>

        {activeDropdown === "categories" && (
          <div className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-background border shadow-lg p-2 animate-fade-in z-50">
            <div className="grid grid-cols-1 gap-1">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className={cn(
                    "block px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors",
                    isActive(`/category/${category.slug}`) ? "bg-muted font-medium" : "",
                  )}
                  onClick={() => setActiveDropdown(null)}
                >
                  {category.name}
                </Link>
              ))}
              <div className="border-t my-1"></div>
              <Link
                href="/categories"
                className="block px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                View All Categories
              </Link>
            </div>
          </div>
        )}
      </div>

      <Link
        href="/authors"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive("/authors") ? "text-primary" : "text-foreground",
        )}
      >
        Authors
      </Link>

      <Link
        href="/tags"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive("/tags") ? "text-primary" : "text-foreground",
        )}
      >
        Tags
      </Link>

      <Link
        href="/about"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive("/about") ? "text-primary" : "text-foreground",
        )}
      >
        About
      </Link>
    </nav>
  )
}
