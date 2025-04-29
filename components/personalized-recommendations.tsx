import Link from "next/link"

interface Recommendation {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
}

interface PersonalizedRecommendationsProps {
  recommendations?: Recommendation[]
}

export function PersonalizedRecommendations({ recommendations = [] }: PersonalizedRecommendationsProps) {
  // Ensure recommendations is an array
  const safeRecommendations = Array.isArray(recommendations) ? recommendations : []

  if (safeRecommendations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No personalized recommendations available yet.</p>
        <p className="mt-2 text-sm">Continue browsing to get tailored content suggestions.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {safeRecommendations.map((item) => (
        <Link key={item.id} href={`/articles/${item.slug}`}>
          <div className="group rounded-lg overflow-hidden border border-border hover:border-primary transition-colors">
            <div className="aspect-video overflow-hidden">
              <img
                src={item.coverImage || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
