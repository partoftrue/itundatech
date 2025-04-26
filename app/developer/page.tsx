import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DeveloperPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-12">
        <div className="grid gap-6 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Developer <span className="text-primary">Insights</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Deep dives into coding practices, architecture decisions, and technical challenges.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant="outline" size="sm">
            All
          </Button>
          <Button variant="outline" size="sm">
            Frontend
          </Button>
          <Button variant="outline" size="sm">
            Backend
          </Button>
          <Button variant="outline" size="sm">
            DevOps
          </Button>
          <Button variant="outline" size="sm">
            Mobile
          </Button>
          <Button variant="outline" size="sm">
            Architecture
          </Button>
          <Button variant="outline" size="sm">
            Performance
          </Button>
          <Button variant="outline" size="sm">
            Security
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-8">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-64 md:h-auto">
              <Image src="/placeholder.svg?height=600&width=800" alt="Featured article" fill className="object-cover" />
            </div>
            <div className="p-6 flex flex-col justify-center">
              <Badge className="w-fit mb-4">Featured</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Microservices vs. Monoliths: Making the Right Architecture Choice
              </h2>
              <p className="text-muted-foreground mb-6">
                An in-depth analysis of when to choose microservices and when a monolithic architecture might be the
                better option.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Author" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-muted-foreground">Apr 5, 2023 · 12 min read</div>
                </div>
              </div>
              <Button asChild>
                <Link href="/articles/microservices-vs-monoliths">
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Latest Articles */}
      <section className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Latest Articles</h2>
          <Button variant="ghost" asChild>
            <Link href="/developer/all">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {developerArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden flex flex-col h-full">
              <div className="relative h-48">
                <Image
                  src={article.coverImage || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{article.category}</Badge>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={article.author.avatar} alt={article.author.name} />
                    <AvatarFallback>{article.author.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">{article.author.name}</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href={`/articles/${article.id}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8">Popular Topics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topics.map((topic) => (
            <Card key={topic.name} className="overflow-hidden">
              <Link href={`/developer/topics/${topic.slug}`} className="block h-full">
                <CardHeader className="p-4">
                  <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{topic.name}</CardTitle>
                  <CardDescription>{topic.count} articles</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

// Sample Data
const developerArticles = [
  {
    id: "1",
    title: "Building Scalable React Applications with Next.js",
    excerpt: "Learn how to structure your Next.js projects for maximum scalability and performance.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "Apr 10, 2023",
    category: "Frontend",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "2",
    title: "Optimizing Database Queries in Node.js Applications",
    excerpt: "Practical techniques to improve the performance of your database operations.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "Apr 5, 2023",
    category: "Backend",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "3",
    title: "Implementing Authentication with JWT in React and Node",
    excerpt: "A step-by-step guide to secure authentication using JSON Web Tokens.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "Mar 28, 2023",
    category: "Security",
    author: {
      name: "Jamie Taylor",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "4",
    title: "CI/CD Pipelines with GitHub Actions",
    excerpt: "Automate your deployment workflow with GitHub's powerful CI/CD solution.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "Mar 20, 2023",
    category: "DevOps",
    author: {
      name: "Sarah Kim",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "5",
    title: "State Management in React: Context API vs. Redux",
    excerpt: "Comparing different state management approaches and when to use each one.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "Mar 15, 2023",
    category: "Frontend",
    author: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "6",
    title: "Building RESTful APIs with Express.js",
    excerpt: "Best practices for designing and implementing RESTful APIs using Express.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "Mar 8, 2023",
    category: "Backend",
    author: {
      name: "Olivia Park",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
]

const topics = [
  { name: "JavaScript", slug: "javascript", count: 42 },
  { name: "React", slug: "react", count: 38 },
  { name: "Node.js", slug: "nodejs", count: 29 },
  { name: "TypeScript", slug: "typescript", count: 25 },
  { name: "GraphQL", slug: "graphql", count: 18 },
  { name: "Docker", slug: "docker", count: 15 },
  { name: "AWS", slug: "aws", count: 12 },
  { name: "Testing", slug: "testing", count: 10 },
]
