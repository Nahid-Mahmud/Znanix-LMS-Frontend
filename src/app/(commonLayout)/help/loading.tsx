import { Skeleton } from "@/components/ui/skeleton";

export default function HelpLoader() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
        {/* Search Skeleton */}
        <div className="max-w-2xl mx-auto mb-12">
          <Skeleton className="h-10 w-full" />
        </div>
        {/* Categories Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w/full" />
          <Skeleton className="h-32 w/full" />
          <Skeleton className="h-32 w/full" />
          <Skeleton className="h-32 w/full" />
        </div>
      </main>
    </div>
  );
}
