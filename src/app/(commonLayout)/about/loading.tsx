import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoader() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
