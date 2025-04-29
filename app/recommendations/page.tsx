import { Suspense } from "react"
import { PersonalizedRecommendations } from "@/components/personalized-recommendations"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { HeroSection } from "@/components/hero-section"

export default function RecommendationsPage() {
  return (
    <div>
      <HeroSection
        title="Personalized Recommendations"
        description="Discover articles tailored to your reading preferences"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<LoadingSpinner />}>
            <PersonalizedRecommendations />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
