import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoader() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section Skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-2/3 mx-auto mb-6" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
        {/* Stats Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
        {/* Team Section Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </main>
    </div>
  );
}
