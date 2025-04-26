import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Filter, Lightbulb } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CaseStudiesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-12">
        <div className="grid gap-6 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Case <span className="text-primary">Studies</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Real-world examples of design and development challenges and solutions.
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
            Web Apps
          </Button>
          <Button variant="outline" size="sm">
            Mobile Apps
          </Button>
          <Button variant="outline" size="sm">
            E-commerce
          </Button>
          <Button variant="outline" size="sm">
            SaaS
          </Button>
          <Button variant="outline" size="sm">
            Performance
          </Button>
          <Button variant="outline" size="sm">
            Redesign
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-8">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-64 md:h-auto">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Featured case study"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col justify-center">
              <Badge className="w-fit mb-4">Featured</Badge>
              <h2 className="text-3xl font-bold mb-4">Redesigning the User Experience of a Financial App</h2>
              <p className="text-muted-foreground mb-6">
                How we improved user engagement by 45% through a comprehensive UX redesign and technical optimization.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Author" />
                  <AvatarFallback>OP</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Olivia Park & Team</div>
                  <div className="text-sm text-muted-foreground">Mar 15, 2023 · 15 min read</div>
                </div>
              </div>
              <Button asChild>
                <Link href="/articles/financial-app-redesign">
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Case Studies Grid */}
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <Card key={study.id} className="overflow-hidden flex flex-col h-full">
              <div className="relative h-48">
                <Image src={study.coverImage || "/placeholder.svg"} alt={study.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{study.category}</Badge>
                  <span className="text-xs text-muted-foreground">{study.date}</span>
                </div>
                <CardTitle className="line-clamp-2">{study.title}</CardTitle>
                <CardDescription className="line-clamp-2">{study.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={study.author.avatar} alt={study.author.name} />
                    <AvatarFallback>{study.author.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">{study.author.name}</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href={`/articles/${study.id}`}>
                    Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-muted/50 rounded-xl p-8 my-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-6">
            <Lightbulb className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Have a Case Study to Share?</h2>
          <p className="text-muted-foreground mb-6">
            We're always looking for interesting case studies that showcase innovative solutions to design and
            development challenges.
          </p>
          <Button size="lg" asChild>
            <Link href="/contribute">Submit Your Case Study</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

// Sample Data
const caseStudies = [
  {
    id: "1",
    title: "How We Reduced Load Time by 70% with Code Splitting",
    excerpt: "A case study on optimizing performance through advanced code splitting techniques.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "Apr 8, 2023",
    category: "Performance",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "2",
    title: "Redesigning Our Authentication Flow: Before and After",
    excerpt: "A detailed look at how we improved conversion rates by simplifying our auth process.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "Mar 25, 2023",
    category: "UX Design",
    author: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "3",
    title: "Scaling a React Native App to 1M Users",
    excerpt: "The technical and design challenges we faced when our user base grew exponentially.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "Mar 18, 2023",
    category: "Mobile Apps",
    author: {
      name: "Sarah Kim",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "4",
    title: "Building an Accessible E-commerce Experience",
    excerpt: "How we made our online store accessible to all users and improved conversion rates.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "Mar 10, 2023",
    category: "E-commerce",
    author: {
      name: "Jamie Taylor",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "5",
    title: "Migrating from Monolith to Microservices",
    excerpt: "Our journey of breaking down a legacy application into modern microservices.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "Feb 28, 2023",
    category: "Architecture",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "6",
    title: "Implementing Dark Mode: Technical and Design Considerations",
    excerpt: "A comprehensive look at how we added dark mode to our complex web application.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "Feb 15, 2023",
    category: "Web Apps",
    author: {
      name: "Olivia Park",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
]
