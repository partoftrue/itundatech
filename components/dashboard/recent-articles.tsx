import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  cover_image: string
  read_time: number
  created_at: string
  author: {
    name: string
    avatar_url: string
  }
  category: {
    name: string
    slug: string
  }
}

interface RecentArticlesProps {
  articles?: Article[]
}

export function RecentArticles({ articles = [] }: RecentArticlesProps) {
  // Ensure articles is an array
  const safeArticles = Array.isArray(articles) ? articles : []

  if (safeArticles.length === 0) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No recent articles available.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Recent Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {safeArticles.map((article) => (
            <div key={article.id} className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/4 h-40 rounded-md overflow-hidden">
                <img
                  src={article.cover_image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Link href={`/categories/${article.category.slug}`}>
                    <Badge variant="outline">{article.category.name}</Badge>
                  </Link>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {article.read_time} min read
                  </div>
                </div>

                <Link href={`/articles/${article.slug}`}>
                  <h3 className="text-xl font-semibold hover:underline">{article.title}</h3>
                </Link>

                <p className="mt-2 text-muted-foreground line-clamp-2">{article.excerpt}</p>

                <div className="flex items-center mt-4">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={article.author.avatar_url || "/placeholder.svg"} alt={article.author.name} />
                    <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{article.author.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(article.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
