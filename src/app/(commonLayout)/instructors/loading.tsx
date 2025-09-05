import { Skeleton } from "@/components/ui/skeleton";

export default function InstructorsLoader() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
        {/* Instructor Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w/full" />
          <Skeleton className="h-48 w/full" />
        </div>
      </main>
    </div>
  );
}
