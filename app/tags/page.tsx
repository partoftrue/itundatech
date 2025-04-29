import { getTags } from "@/lib/articles"
import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default async function TagsPage() {
  const tags = await getTags()

  // Group tags by first letter
  const groupedTags = tags.reduce(
    (acc, tag) => {
      const firstLetter = tag.name.charAt(0).toUpperCase()
      if (!acc[firstLetter]) {
        acc[firstLetter] = []
      }
      acc[firstLetter].push(tag)
      return acc
    },
    {} as Record<string, typeof tags>,
  )

  // Sort the keys alphabetically
  const sortedLetters = Object.keys(groupedTags).sort()

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: "Tags", href: "/tags", active: true }]} className="mb-8" />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tags</h1>
        <p className="text-muted-foreground">Browse articles by tag</p>
      </div>

      <div className="space-y-8">
        {sortedLetters.map((letter) => (
          <div key={letter}>
            <h2 className="text-2xl font-bold mb-4">{letter}</h2>
            <div className="flex flex-wrap gap-3">
              {groupedTags[letter].map((tag) => (
                <Link key={tag.id} href={`/tag/${tag.slug}`}>
                  <div className="bg-muted/50 hover:bg-muted px-4 py-2 rounded-full transition-colors">
                    <span className="font-medium">#{tag.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
