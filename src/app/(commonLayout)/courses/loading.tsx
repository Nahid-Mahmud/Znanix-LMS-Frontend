import { Skeleton } from "@/components/ui/skeleton";

export default function CoursesLoader() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Skeleton */}
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
        {/* Filter/Search Skeleton */}
        <div className="flex gap-4 mb-8">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-10 w-1/3" />
        </div>
        {/* Course Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-56 w-full" />
          <Skeleton className="h-56 w-full" />
          <Skeleton className="h-56 w-full" />
        </div>
      </main>
    </div>
  );
}
