import { Skeleton } from "@/components/ui/skeleton";

export default function ChangePasswordLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Skeleton className="h-10 w-1/2 mx-auto mb-6" />
        <Skeleton className="h-6 w-2/3 mx-auto mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>
    </div>
  );
}
