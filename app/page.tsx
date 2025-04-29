import { HeroSectionEnhanced } from "@/components/hero-section-enhanced"
import { FeatureCard } from "@/components/feature-card"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { FAQSection } from "@/components/faq-section"
import { Laptop, Code, Palette, Users, Zap, Globe } from "lucide-react"
import Image from "next/image"
import { AnimatedText } from "@/components/ui/animated-text"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import Link from "next/link"

export default function Home() {
  // Sample testimonials data
  const testimonials = [
    {
      id: "1",
      quote:
        "itunda.tech has transformed how our team collaborates. The platform is intuitive and has significantly improved our workflow.",
      author: "Sarah Johnson",
      role: "Product Manager",
      company: "DesignCraft",
      avatarUrl: "/serene-woman-gaze.png",
    },
    {
      id: "2",
      quote:
        "As a developer, I appreciate the attention to detail and clean architecture. It's made our codebase more maintainable.",
      author: "Michael Chen",
      role: "Senior Developer",
      company: "CodeNexus",
      avatarUrl: "/thoughtful-man-profile.png",
    },
    {
      id: "3",
      quote: "The platform's design system has saved us countless hours. It's both beautiful and functional.",
      author: "Emily Rodriguez",
      role: "UX Designer",
      company: "VisualEdge",
      avatarUrl: "/confident-leader.png",
    },
    {
      id: "4",
      quote:
        "Implementation was seamless, and the support team has been exceptional. Highly recommended for any tech team.",
      author: "David Wilson",
      role: "CTO",
      company: "TechForward",
      avatarUrl: "/confident-businessman.png",
    },
  ]

  // Sample FAQ data
  const faqs = [
    {
      question: "How can itunda.tech help my development team?",
      answer:
        "Our platform streamlines collaboration between developers and designers, providing tools for better communication, asset sharing, and workflow management. This leads to faster development cycles and higher quality products.",
    },
    {
      question: "Is itunda.tech suitable for small teams?",
      answer:
        "Absolutely! We've designed our platform to be scalable for teams of all sizes. Small teams particularly benefit from our streamlined workflows and integrated tools that eliminate the need for multiple separate solutions.",
    },
    {
      question: "How does the onboarding process work?",
      answer:
        "Our onboarding is simple and guided. After signing up, you'll be walked through setting up your workspace, inviting team members, and configuring your preferences. Our support team is available to help at every step.",
    },
    {
      question: "Can I integrate itunda.tech with my existing tools?",
      answer:
        "Yes, we offer integrations with popular development and design tools including GitHub, Figma, Slack, and many more. Our API also allows for custom integrations with your internal systems.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We provide comprehensive support including detailed documentation, video tutorials, email support, and live chat during business hours. Enterprise plans include dedicated support managers and custom training sessions.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSectionEnhanced
        title="Bridging the gap between design and development"
        subtitle="Welcome to itunda.tech"
        description="We help teams create beautiful, functional products faster by streamlining collaboration between designers and developers."
        ctaText="Get started"
        ctaLink="/auth"
        secondaryCtaText="See how it works"
        secondaryCtaLink="/about"
      />

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-16">
            <AnimatedText
              text="Powerful features for modern teams"
              className="text-3xl md:text-4xl font-bold mb-4"
              type="word"
              highlightWords={["Powerful", "modern"]}
              highlightColor="text-primary"
            />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to streamline your workflow and enhance collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Seamless Integration"
              description="Connect with your favorite tools and services for a unified workflow experience."
              icon={<Laptop className="h-6 w-6" />}
              index={0}
            />
            <FeatureCard
              title="Developer Tools"
              description="Specialized tools and resources to enhance your development process."
              icon={<Code className="h-6 w-6" />}
              index={1}
            />
            <FeatureCard
              title="Design Resources"
              description="Access design assets, templates, and guidelines to maintain consistency."
              icon={<Palette className="h-6 w-6" />}
              index={2}
            />
            <FeatureCard
              title="Team Collaboration"
              description="Work together seamlessly with real-time updates and communication."
              icon={<Users className="h-6 w-6" />}
              index={3}
            />
            <FeatureCard
              title="Performance Optimization"
              description="Tools to analyze and improve your application's performance."
              icon={<Zap className="h-6 w-6" />}
              index={4}
            />
            <FeatureCard
              title="Global Accessibility"
              description="Ensure your products are accessible to users worldwide."
              icon={<Globe className="h-6 w-6" />}
              index={5}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why choose itunda.tech?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We understand the challenges of modern development and design workflows. Our platform is built by
                professionals who have experienced these pain points firsthand.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                With itunda.tech, you'll spend less time managing tools and more time creating exceptional products that
                delight your users.
              </p>
              <EnhancedButton variant="gradient" size="lg" rounded="full" asChild>
                <Link href="/about">Learn more about our mission</Link>
              </EnhancedButton>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/collaborative-tech-office.png"
                  alt="Team collaborating in a modern tech office"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-white text-lg font-medium">Empowering teams to build better</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection
        testimonials={testimonials}
        title="What our customers say"
        subtitle="Join hundreds of teams already using itunda.tech to improve their workflow"
      />

      {/* FAQ Section */}
      <FAQSection
        faqs={faqs}
        title="Questions? We've got answers"
        subtitle="Everything you need to know about itunda.tech"
        className="bg-muted/30"
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to transform your workflow?"
        description="Join thousands of teams already using itunda.tech to streamline their design and development process."
        primaryCta={{
          text: "Start your free trial",
          href: "/auth",
        }}
        secondaryCta={{
          text: "Schedule a demo",
          href: "/contact",
        }}
      />
    </div>
  )
}
