import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ArticlesLoading() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground">Loading articles...</p>
      </div>
    </div>
  )
}
