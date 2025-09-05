import { Skeleton } from "@/components/ui/skeleton";

export default function PricingLoader() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
        {/* Pricing Cards Skeleton */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w/full" />
          <Skeleton className="h-64 w/full" />
        </div>
      </main>
    </div>
  );
}
