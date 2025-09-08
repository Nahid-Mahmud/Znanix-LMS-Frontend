import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header Skeleton */}
            <div>
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-2/3 mb-6" />

              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-32 mb-1" />
                </div>
              </div>

              <Skeleton className="h-4 w-48" />
            </div>

            {/* Video Preview Skeleton */}
            <Card className="p-0">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  <Skeleton className="w-full h-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Skeleton className="h-12 w-40 rounded-lg" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Skeleton */}
            <div>
              <div className="flex space-x-1 rounded-lg bg-muted p-1 mb-6">
                <Skeleton className="h-9 w-32 rounded-md" />
                <Skeleton className="h-9 w-24 rounded-md" />
              </div>

              {/* Tab Content Skeleton */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-5/6" />
                    <Skeleton className="h-6 w-4/5" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-6 w-5/6" />
                    <Skeleton className="h-6 w-2/3" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                {/* Course Image Skeleton */}
                <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                  <Skeleton className="w-full h-full" />
                </div>

                {/* Price Skeleton */}
                <div className="flex items-center gap-2 mb-4">
                  <Skeleton className="h-8 w-20" />
                </div>

                {/* Enroll Button Skeleton */}
                <Skeleton className="w-full h-11 mb-4" />

                {/* Course Details Skeleton */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                  </div>
                </div>

                {/* Course Includes Skeleton */}
                <div className="border-t pt-4 mt-4">
                  <Skeleton className="h-5 w-40 mb-3" />
                  <ul className="space-y-2">
                    {[1, 2, 3, 4].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-36" />
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
