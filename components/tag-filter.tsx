"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Tag {
  id: string
  name: string
}

const tags: Tag[] = [
  { id: "frontend", name: "Frontend" },
  { id: "server", name: "Server" },
  { id: "product-design", name: "Product Design" },
  { id: "slash24", name: "SLASH24" },
  { id: "data", name: "Data" },
  { id: "tools", name: "Tools" },
  { id: "simplicity23", name: "Simplicity23" },
  { id: "slash22", name: "SLASH22" },
  { id: "simplicity21", name: "Simplicity21" },
  { id: "slash23", name: "SLASH23" },
  { id: "slash21", name: "SLASH21" },
  { id: "ux-research", name: "UX Research" },
]

interface TagFilterProps {
  onTagSelect?: (tagId: string | null) => void
}

export function TagFilter({ onTagSelect }: TagFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const handleTagClick = (tagId: string) => {
    const newSelection = selectedTag === tagId ? null : tagId
    setSelectedTag(newSelection)
    if (onTagSelect) {
      onTagSelect(newSelection)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">태그</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Button
            key={tag.id}
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full text-xs",
              selectedTag === tag.id && "bg-primary text-white hover:bg-primary/90",
            )}
            onClick={() => handleTagClick(tag.id)}
          >
            {tag.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
