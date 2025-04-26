"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Find all headings in the article content
    const article = document.querySelector("article")
    if (!article) return

    const headingElements = article.querySelectorAll("h2, h3, h4")
    const items: TocItem[] = Array.from(headingElements).map((heading) => {
      // Ensure all headings have IDs
      if (!heading.id) {
        heading.id = heading.textContent?.toLowerCase().replace(/\s+/g, "-") || ""
      }

      return {
        id: heading.id,
        text: heading.textContent || "",
        level: Number.parseInt(heading.tagName.substring(1)),
      }
    })

    setHeadings(items)

    // Set up intersection observer to highlight active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "0px 0px -80% 0px",
      },
    )

    headingElements.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <ul className="space-y-2 text-sm">
      {headings.map((heading) => (
        <li
          key={heading.id}
          className={cn(
            "transition-colors",
            heading.level === 2 ? "ml-0" : heading.level === 3 ? "ml-4" : "ml-6",
            activeId === heading.id ? "text-itunda-purple font-medium" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <a
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector(`#${heading.id}`)?.scrollIntoView({
                behavior: "smooth",
              })
            }}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  )
}
