import { HeroSection } from "@/components/hero-section"
import { SectionContainer } from "@/components/section-container"
import { SectionDivider } from "@/components/section-divider"
import { Button } from "@/components/ui/button"
import { createServerSupabaseClient } from "@/lib/supabase"
import Link from "next/link"
import Image from "next/image"

export default async function Home() {
  const supabase = createServerSupabaseClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const isAuthenticated = !!session

  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        title="Welcome to iTunda Tech"
        subtitle="Your source for technology insights and knowledge"
        ctaText={isAuthenticated ? "View Dashboard" : "Join Now"}
        ctaLink={isAuthenticated ? "/dashboard" : "/auth"}
      />

      {/* Features Section */}
      <SectionContainer className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the features and benefits of the iTunda Tech platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      <SectionDivider />

      {/* About Section */}
      <SectionContainer className="py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">About iTunda Tech</h2>
            <p className="text-muted-foreground mb-6">
              iTunda Tech is a platform dedicated to providing valuable insights and knowledge about technology. Our
              mission is to make technology accessible to everyone and help people stay updated with the latest trends.
            </p>
            <p className="text-muted-foreground mb-6">
              Whether you're a developer, designer, or tech enthusiast, iTunda Tech has something for you. Join our
              community today and be part of the technology revolution.
            </p>
            <Button asChild className="rounded-full">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image src="/collaborative-tech-office.png" alt="About iTunda Tech" fill className="object-cover" />
          </div>
        </div>
      </SectionContainer>

      <SectionDivider />

      {/* CTA Section */}
      <SectionContainer className="py-20 bg-muted/30 rounded-3xl my-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join iTunda Tech today and discover a world of technology insights and knowledge.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full">
              <Link href={isAuthenticated ? "/dashboard" : "/auth"}>
                {isAuthenticated ? "Go to Dashboard" : "Sign Up Now"}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </SectionContainer>
    </main>
  )
}

const features = [
  {
    title: "Technology Insights",
    description: "Stay updated with the latest trends and insights in the technology world.",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: "Community",
    description: "Connect with like-minded individuals and share your knowledge and experiences.",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Resources",
    description: "Access a wide range of resources to help you in your technology journey.",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
  },
]
