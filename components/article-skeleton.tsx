import { Skeleton } from "@/components/ui/skeleton"

export function ArticleSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div className={`group relative flex flex-col gap-4 ${featured ? "pb-8 border-b mb-8" : ""}`}>
      {featured ? (
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="order-2 md:order-1 space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex items-center gap-2 mt-4">
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg order-1 md:order-2">
            <Skeleton className="aspect-[4/3] w-full" />
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex items-center gap-2 mt-2">
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="aspect-video w-full rounded-lg" />
        </>
      )}
    </div>
  )
}
