import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Tag {
  id: string
  name: string
  slug: string
  articleCount: number
}

interface TagCloudProps {
  tags: Tag[]
}

export function TagCloud({ tags }: TagCloudProps) {
  // Filter to tags with at least one article
  const activeTags = tags.filter((tag) => tag.articleCount > 0)

  // Sort by article count (descending)
  const sortedTags = [...activeTags].sort((a, b) => b.articleCount - a.articleCount)

  // Function to determine font size based on article count
  const getFontSize = (count: number) => {
    const max = Math.max(...activeTags.map((t) => t.articleCount))
    const min = Math.min(...activeTags.map((t) => t.articleCount))
    const range = max - min || 1
    const normalized = (count - min) / range
    return 0.8 + normalized * 1.2 // Font size between 0.8rem and 2rem
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Popular Tags</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {sortedTags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tags/${tag.slug}`}
              className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              style={{
                fontSize: `${getFontSize(tag.articleCount)}rem`,
                fontWeight: tag.articleCount > 1 ? 500 : 400,
              }}
            >
              {tag.name}
              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({tag.articleCount})</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
