import { Skeleton } from "@/components/ui/skeleton"

interface ArticleCardSkeletonProps {
  variant?: "default" | "featured"
}

export function ArticleCardSkeleton({ variant = "default" }: ArticleCardSkeletonProps) {
  if (variant === "featured") {
    return (
      <div className="rounded-2xl overflow-hidden border bg-card">
        <div className="grid md:grid-cols-2 gap-0">
          <Skeleton variant="card" className="h-64 md:h-full rounded-none" />
          <div className="p-8 flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex items-center gap-3 pt-2">
              <Skeleton variant="avatar" className="h-8 w-8" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <Skeleton variant="card" className="h-48 rounded-2xl" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <div className="flex items-center gap-2 pt-1">
        <Skeleton variant="avatar" className="h-6 w-6" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  )
}
