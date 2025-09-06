import { CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function StatsCardSkeleton() {
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-16 mb-2" />
        <Skeleton className="h-3 w-20" />
      </CardContent>
    </>
  );
}
