import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Filter, Palette } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DesignerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-12">
        <div className="grid gap-6 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Designer <span className="text-primary">Perspectives</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Explorations of UI/UX principles, design systems, and creative processes.
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
            UI Design
          </Button>
          <Button variant="outline" size="sm">
            UX Research
          </Button>
          <Button variant="outline" size="sm">
            Design Systems
          </Button>
          <Button variant="outline" size="sm">
            Typography
          </Button>
          <Button variant="outline" size="sm">
            Color Theory
          </Button>
          <Button variant="outline" size="sm">
            Accessibility
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
              <h2 className="text-3xl font-bold mb-4">The Psychology of Color in Digital Interfaces</h2>
              <p className="text-muted-foreground mb-6">
                How color choices affect user perception, emotion, and behavior in digital products.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Author" />
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Sarah Kim</div>
                  <div className="text-sm text-muted-foreground">Apr 8, 2023 · 10 min read</div>
                </div>
              </div>
              <Button asChild>
                <Link href="/articles/psychology-of-color">
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
            <Link href="/designer/all">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designerArticles.map((article) => (
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
                  <Badge variant="secondary">{article.category}</Badge>
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
              <Link href={`/designer/topics/${topic.slug}`} className="block h-full">
                <CardHeader className="p-4">
                  <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                    <Palette className="h-6 w-6 text-primary" />
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
const designerArticles = [
  {
    id: "1",
    title: "Design Systems: From Concept to Implementation",
    excerpt:
      "A comprehensive guide to creating and maintaining design systems that work for both designers and developers.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "Apr 12, 2023",
    category: "Design Systems",
    author: {
      name: "Sarah Kim",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "2",
    title: "The Art of Micro-Interactions",
    excerpt: "How small animations and feedback can significantly improve user experience.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "Apr 7, 2023",
    category: "UI Design",
    author: {
      name: "Olivia Park",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "3",
    title: "Designing for Accessibility: WCAG 2.1 Guidelines",
    excerpt: "Practical tips for making your designs accessible to all users.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "Mar 30, 2023",
    category: "Accessibility",
    author: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "4",
    title: "Typography Fundamentals for Digital Interfaces",
    excerpt: "Essential principles of typography that every UI designer should know.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "Mar 22, 2023",
    category: "Typography",
    author: {
      name: "Jamie Taylor",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "5",
    title: "User Research Methods: When to Use Each One",
    excerpt: "A guide to different research methodologies and how to choose the right one for your project.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "Mar 18, 2023",
    category: "UX Research",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "6",
    title: "Creating Effective Design Handoffs for Developers",
    excerpt: "How to ensure a smooth transition from design to development.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "Mar 10, 2023",
    category: "Collaboration",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
]

const topics = [
  { name: "UI Design", slug: "ui-design", count: 35 },
  { name: "UX Research", slug: "ux-research", count: 28 },
  { name: "Design Systems", slug: "design-systems", count: 24 },
  { name: "Typography", slug: "typography", count: 20 },
  { name: "Color Theory", slug: "color-theory", count: 18 },
  { name: "Accessibility", slug: "accessibility", count: 15 },
  { name: "Prototyping", slug: "prototyping", count: 12 },
  { name: "Design Tools", slug: "design-tools", count: 10 },
]
