import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseCardSkeleton() {
  return (
    <Card className="pt-0 flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Skeleton className="w-full h-48" />
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-4" />
        </div>

        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-2" />

        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-3" />

        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-6" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-14" />
        </div>
      </CardContent>

      <CardFooter className="pt-0 mt-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
      </CardFooter>
    </Card>
  );
}
