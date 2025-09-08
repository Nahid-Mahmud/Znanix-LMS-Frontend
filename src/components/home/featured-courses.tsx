"use client";
import { placeholderSvg } from "@/assets";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { useGetFeaturedCoursesQuery } from "@/redux/features/courses/courses.api";
import Link from "next/link";
import CourseCardSkeleton from "../CourseCardSkeleton";

export function FeaturedCourses() {
  const { data, isLoading, error } = useGetFeaturedCoursesQuery(undefined);
  // Transform API data to match CourseCard props
  const apiCourses = Array.isArray(data?.data)
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.data.map((course: any) => ({
        id: course._id,
        name: course.name,
        description: course.description,
        thumbnail: course.thumbnail,
        price: course.price,
        originalPrice: course.originalPrice ?? 0,
        introVideo: course.introVideo ?? "",
        tags: course.tags,
        slug: course.slug,
        type: course.type || "General",
        instructor: {
          name: `${course.instructor.firstName ?? ""} ${course.instructor.lastName ?? ""}`.trim(),
          avatar: course.instructor.profilePicture ?? placeholderSvg,
        },
        courseDuration: course.courseDuration,
        certificate: course.certificate,
        discount: course.discountPercentage ?? course.discount ?? 0,
        featured: course.featured,
        rating: course.rating ?? 0,
        students: course.totalEnrolledStudents ?? 0,
        category: course.category ?? "General",
      }))
    : [];

  const coursesToShow = !isLoading && !error && apiCourses.length > 0 ? apiCourses : [];

  return (
    <section id="courses" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Featured Courses</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover our most popular courses taught by industry experts
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {isLoading ? (
            <>
              {/* Optionally show skeletons while loading */}
              {[1, 2, 3, 4].map((key) => (
                <CourseCardSkeleton key={key} />
              ))}
            </>
          ) : error ? (
            <div className="col-span-full text-center text-red-500">Failed to load courses.</div>
          ) : (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            coursesToShow.map((course: any) => <CourseCard key={course.id} course={course} />)
          )}
        </div>

        <div className="text-center mt-12">
          <Link href="/courses">
            <Button variant="outline" size="lg">
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
