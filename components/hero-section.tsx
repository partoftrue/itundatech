"use client"

import { useEffect, useState } from "react"
import { FloatingIcon } from "./floating-icon"
import { Button } from "./ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface HeroSectionProps {
  title: string
  description: string
  showCta?: boolean
}

export function HeroSection({ title, description, showCta = true }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative bg-toss-navy text-white overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-toss-navy via-toss-navy to-toss-darkNavy opacity-90"></div>

      <div className="toss-container py-16 md:py-24 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center mb-6">
            <span className="text-3xl md:text-4xl font-semibold text-toss-blue">itunda</span>
            <span className="text-3xl md:text-4xl font-semibold">.tech</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium max-w-2xl mb-6">{title}</h1>
          <p className="text-lg text-white/70 max-w-xl mb-8">{description}</p>

          {showCta && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full bg-toss-blue hover:bg-toss-blue/90" asChild>
                <Link href="/articles">
                  Explore Articles <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/10" asChild>
                <Link href="/contribute">Contribute</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 3D Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingIcon
          src="/placeholder.svg?height=80&width=80&text=💻"
          alt="Laptop"
          size={20}
          position={{ top: "20%", left: "15%" }}
        />
        <FloatingIcon
          src="/placeholder.svg?height=80&width=80&text=📱"
          alt="Mobile"
          size={16}
          position={{ top: "30%", right: "20%" }}
          delay={1.5}
        />
        <FloatingIcon
          src="/placeholder.svg?height=80&width=80&text=☕"
          alt="Coffee"
          size={14}
          position={{ bottom: "25%", left: "25%" }}
          delay={1}
        />
        <FloatingIcon
          src="/placeholder.svg?height=80&width=80&text=🎨"
          alt="Design"
          size={18}
          position={{ bottom: "30%", right: "15%" }}
          delay={2}
        />
        <FloatingIcon
          src="/placeholder.svg?height=80&width=80&text=⚙️"
          alt="Code"
          size={16}
          position={{ top: "60%", left: "50%" }}
          delay={0.5}
        />
      </div>
    </div>
  )
}
