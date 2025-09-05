import { Skeleton } from "@/components/ui/skeleton";

export default function TermsLoader() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <Skeleton className="h-10 w-1/2 mb-8" />
        <div className="space-y-8">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-8 w-2/3" />
        </div>
      </main>
    </div>
  );
}
