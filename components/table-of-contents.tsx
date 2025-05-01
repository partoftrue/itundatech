"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Find all headings in the article
    const articleHeadings = Array.from(document.querySelectorAll("h2, h3, h4"))
      .filter((el) => el.id) // Only include headings with IDs
      .map((el) => ({
        id: el.id,
        text: el.textContent || "",
        level: Number(el.tagName.charAt(1)),
      }))

    setHeadings(articleHeadings)

    // Set up intersection observer to track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -80% 0px" },
    )

    articleHeadings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <motion.div
      className="hidden lg:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto p-4 space-y-2 text-sm"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h4 className="font-semibold mb-3">목차</h4>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              "transition-colors",
              heading.level === 2 ? "ml-0" : heading.level === 3 ? "ml-3" : "ml-6",
              activeId === heading.id ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
