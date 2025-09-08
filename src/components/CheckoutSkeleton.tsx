import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Shield, Lock } from "lucide-react";

export default function CheckoutSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Complete Your Purchase</h1>
            <p className="text-muted-foreground text-lg">{"Secure checkout powered by industry-leading encryption"}</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-accent" />
                {"SSL Secured"}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4 text-accent" />
                {"256-bit Encryption"}
              </div>
            </div>
          </div>

          <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm max-w-2xl mx-auto">
            <CardHeader className="pb-4 text-center">
              <CardTitle className="text-2xl font-semibold">Order Summary</CardTitle>
              <CardDescription>{"Review your course purchase"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Course Info Skeleton */}
              <div className="flex gap-6 items-start">
                <div className="relative">
                  <Skeleton className="w-24 h-24 rounded-xl" />
                  <div className="absolute -top-2 -right-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                </div>
                <div className="flex-1">
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <div className="flex items-center gap-2 mb-3">
                    <Skeleton className="h-7 w-7 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-5/6 mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>

              {/* Course Features Skeleton */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-border">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>

              {/* Pricing Skeleton */}
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <div className="flex justify-between text-sm">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-8" />
                </div>
                <Separator />
                <div className="flex justify-between text-2xl font-bold">
                  <Skeleton className="h-6 w-12" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>

              {/* Purchase Button Skeleton */}
              <Skeleton className="w-full h-14 rounded-md" />

              {/* Trust Badges Skeleton */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3 mt-1" />
              </div>

              <div className="text-center">
                <Skeleton className="h-3 w-full mx-auto" />
                <Skeleton className="h-3 w-5/6 mx-auto mt-1" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
