import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ModuleSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="text-left">
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-18" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export function ModuleSkeletonExpanded() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="text-left">
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-18" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="w-8 h-8" />
                  <Skeleton className="w-8 h-8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
