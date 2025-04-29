import { Suspense } from "react"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function DashboardPage() {
  // Mock data for the dashboard stats since the real data might be causing the error
  const mockStats = {
    articleCount: 0,
    categoryCount: 0,
    tagCount: 0,
    userCount: 0,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <DashboardStats
            articleCount={mockStats.articleCount}
            categoryCount={mockStats.categoryCount}
            tagCount={mockStats.tagCount}
            userCount={mockStats.userCount}
          />

          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Personalized For You</h2>
            <Suspense fallback={<LoadingSpinner />}>
              <p className="text-muted-foreground">Your personalized content will appear here.</p>
            </Suspense>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Category Overview</h2>
              <p className="text-muted-foreground">Category data will appear here.</p>
            </div>
            <div className="bg-card rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Popular Tags</h2>
              <p className="text-muted-foreground">Tag data will appear here.</p>
            </div>
          </div>

          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Reading Activity</h2>
            <p className="text-muted-foreground">Your reading activity will appear here.</p>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Recent Articles</h2>
            <p className="text-muted-foreground">Recent articles will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
