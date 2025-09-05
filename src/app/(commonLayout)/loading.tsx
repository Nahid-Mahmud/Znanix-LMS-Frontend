import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <main>
        {/* HeroSection Skeleton */}
        <Skeleton className="h-64 w-full mb-8" />
        {/* FeaturedCourses Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
        {/* WhyChooseUs Skeleton */}
        <Skeleton className="h-32 w-full mb-8" />
        {/* CourseCategories Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        {/* StatsSection Skeleton */}
        <div className="flex gap-4 mb-8">
          <Skeleton className="h-16 w-1/4" />
          <Skeleton className="h-16 w-1/4" />
          <Skeleton className="h-16 w-1/4" />
          <Skeleton className="h-16 w-1/4" />
        </div>
        {/* TestimonialsSection Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        {/* InstructorsSection Skeleton */}
        <div className="flex gap-4 mb-8">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-24 w-24 rounded-full" />
        </div>
        {/* PricingSection Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        {/* FAQSection Skeleton */}
        <div className="space-y-4 mb-8">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-8 w-1/2" />
        </div>
        {/* NewsletterSection Skeleton */}
        <Skeleton className="h-20 w-full mb-8" />
      </main>
    </div>
  );
}
