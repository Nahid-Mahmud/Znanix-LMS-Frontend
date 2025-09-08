import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileSkeletonProps {
  isEditing?: boolean;
}

export function ProfileSkeleton({ isEditing = false }: ProfileSkeletonProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Profile</CardTitle>
            {!isEditing ? (
              <Skeleton className="h-9 w-32" />
            ) : (
              <div className="flex gap-2">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-24" />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {/* Avatar Skeleton */}
              <Skeleton className="w-32 h-32 rounded-full" />
              {isEditing && (
                <div className="absolute bottom-0 right-0">
                  <Skeleton className="w-8 h-8 rounded-full" />
                </div>
              )}
            </div>

            <div className="text-center">
              {/* Name Skeleton */}
              <Skeleton className="h-9 w-48 mb-2 mx-auto" />
              {/* Role Badge Skeleton */}
              <Skeleton className="h-6 w-24 mx-auto rounded-full" />
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* First Name */}
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              {/* Last Name */}
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div>
                <Skeleton className="h-4 w-12 mb-2" />
                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>

              {/* Member Since */}
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          </div>

          {/* Password Section - Only show when editing */}
          {isEditing && (
            <div className="border-t pt-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <div className="relative">
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="absolute right-3 top-3 w-4 h-4" />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <div className="relative">
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="absolute right-3 top-3 w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Info */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Alternative loading state for when the page is updating
export function ProfileUpdateSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="opacity-60">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Profile</CardTitle>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-20 animate-pulse" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 animate-spin rounded-full" />
              <span className="text-muted-foreground">Updating profile...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
