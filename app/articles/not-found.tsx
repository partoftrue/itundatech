import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ArticleNotFound() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/articles">Browse Articles</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
