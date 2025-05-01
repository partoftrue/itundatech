import { Skeleton } from "@/components/ui/skeleton"

export function ArticleSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div className="py-6 border-b border-gray-100 dark:border-gray-800">
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4 space-y-3">
          <Skeleton className={featured ? "h-8 w-3/4" : "h-6 w-3/4"} />
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="w-24 h-24 rounded-lg shrink-0" />
      </div>
    </div>
  )
}
