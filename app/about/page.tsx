import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Lightbulb, Palette, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">About Itunda Tech</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A community-driven platform for developers, designers, and tech enthusiasts to share knowledge, insights,
            and experiences.
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="mb-4">
                Itunda Tech was founded in 2023 with a simple mission: to create a space where technology professionals
                could share their knowledge and learn from each other.
              </p>
              <p className="mb-4">
                What started as a small blog has grown into a vibrant community of developers, designers, and tech
                enthusiasts from around the world.
              </p>
              <p>
                Today, we're proud to offer a platform that connects people across the tech industry, providing valuable
                insights, tutorials, and discussions on the latest trends and technologies.
              </p>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image src="/collaborative-tech-office.png" alt="Itunda Tech Team" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="mb-16 bg-muted/30 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg mb-6">
            To empower tech professionals by providing a platform for knowledge sharing, collaboration, and growth.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Lightbulb className="h-6 w-6 text-brand flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium mb-2">Inspire Innovation</h3>
                <p className="text-muted-foreground">
                  Showcase cutting-edge technologies and creative solutions to inspire the next generation of tech
                  leaders.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Code className="h-6 w-6 text-brand flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium mb-2">Share Knowledge</h3>
                <p className="text-muted-foreground">
                  Create a space where experts can share their insights and beginners can learn from the best in the
                  industry.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Users className="h-6 w-6 text-brand flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium mb-2">Build Community</h3>
                <p className="text-muted-foreground">
                  Foster a supportive community where tech professionals can connect, collaborate, and grow together.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Palette className="h-6 w-6 text-brand flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium mb-2">Promote Diversity</h3>
                <p className="text-muted-foreground">
                  Amplify diverse voices and perspectives to create a more inclusive tech industry.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Founder & Editor-in-Chief",
                image: "/confident-tech-leader.png",
              },
              {
                name: "Sarah Chen",
                role: "Lead Developer",
                image: "/confident-female-developer.png",
              },
              {
                name: "Michael Rodriguez",
                role: "Design Director",
                image: "/confident-ux-professional.png",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Us */}
        <div className="text-center bg-muted/30 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Whether you're a seasoned professional or just starting your tech journey, there's a place for you at Itunda
            Tech.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/contribute">
                Become a Contributor
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
