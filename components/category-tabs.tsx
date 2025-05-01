"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface Category {
  id: string
  name: string
  href: string
}

const categories: Category[] = [
  { id: "all", name: "전체", href: "/" },
  { id: "development", name: "개발", href: "/category/development" },
  { id: "data", name: "데이터/ML", href: "/category/data" },
  { id: "design", name: "디자인", href: "/category/design" },
]

export default function CategoryTabs() {
  const pathname = usePathname()
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    // Set active category based on pathname
    if (pathname === "/") {
      setActiveCategory("all")
    } else {
      const category = categories.find((cat) => pathname.includes(cat.href))
      if (category) {
        setActiveCategory(category.id)
      }
    }
  }, [pathname])

  return (
    <div className="border-b sticky top-16 bg-background z-10">
      <div className="container px-4 md:px-6">
        <nav className="flex overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className={cn(
                "relative px-6 py-4 text-base font-medium transition-colors",
                activeCategory === category.id
                  ? "font-bold"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
              )}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
              {activeCategory === category.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black dark:bg-white" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
