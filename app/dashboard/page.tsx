import { Suspense } from "react"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { CategoryOverview } from "@/components/dashboard/category-overview"
import { RecentArticles } from "@/components/dashboard/recent-articles"
import { TagCloud } from "@/components/dashboard/tag-cloud"
import { BarChart } from "@/components/dashboard/bar-chart"
import { PersonalizedRecommendations } from "@/components/personalized-recommendations"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <DashboardStats />

          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Personalized For You</h2>
            <Suspense fallback={<LoadingSpinner />}>
              <PersonalizedRecommendations />
            </Suspense>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Category Overview</h2>
              <CategoryOverview />
            </div>
            <div className="bg-card rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Popular Tags</h2>
              <TagCloud />
            </div>
          </div>

          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Reading Activity</h2>
            <BarChart />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Recent Articles</h2>
            <RecentArticles />
          </div>
        </div>
      </div>
    </div>
  )
}
