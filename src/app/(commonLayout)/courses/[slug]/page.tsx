"use client";

import { useEffect, useState } from "react";

import { AvatarWithFallback } from "@/components/ui/avatar-with-fallback";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetCoursesDetailBySlugQuery } from "@/redux/features/courses/courses.api";
import processMarkdown from "@/utils/processMarkdown";
import { Award, Clock, Play, Smartphone, TrendingUp, Users } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// Dynamic import for ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

// Mock course data - in real app this would come from API
export default function CourseDetailsPage() {
  const params = useParams();
  const slug = params.slug;
  console.log(slug);
  // const [purchaseCourseFn, { isLoading: isPurchasing }] = usePurchaseCourseMutation();

  // get slug from url

  const { data: courseDetails, isLoading: courseDetailLoading } = useGetCoursesDetailBySlugQuery(slug, {
    skip: !slug,
  });

  console.log(courseDetails?.data);

  const [activeTab, setActiveTab] = useState("course-details");
  const [processedDescription, setProcessedDescription] = useState("");

  useEffect(() => {
    if (courseDetails?.data?.longDescription) {
      processMarkdown(courseDetails.data.longDescription).then(setProcessedDescription);
    }
  }, [courseDetails?.data?.longDescription]);

  if (courseDetailLoading) {
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

  if (!courseDetails?.data) {
    return <div>Course not found</div>;
  }

  const courseData = courseDetails?.data; // alias for easier replacement

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">{courseData?.name}</h1>

              <p className="text-lg text-muted-foreground mb-6 text-pretty">{courseData?.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{courseData?.totalStudents} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{courseData?.courseDuration} hours</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <AvatarWithFallback
                  src={courseData?.instructor?.profilePicture}
                  alt={`${courseData?.instructor?.firstName} ${courseData?.instructor?.lastName}`}
                  firstName={courseData?.instructor?.firstName}
                  lastName={courseData?.instructor?.lastName}
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
                <div>
                  <p className="font-medium">
                    Created by {courseData?.instructor?.firstName} {courseData?.instructor?.lastName}
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Last updated: {courseData?.updatedAt ? new Date(courseData.updatedAt).toLocaleDateString() : "N/A"}
              </p>
            </div>

            {/* Course Video Preview */}
            <Card className="p-0">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <ReactPlayer
                    src={courseData.introVideo}
                    width="100%"
                    height="100%"
                    controls={true}
                    // light={courseData?.thumbnail || "/placeholder.svg"}
                    playIcon={
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Button size="lg" className="bg-white text-black hover:bg-white/90">
                          <Play className="h-6 w-6 mr-2" />
                          Preview Course
                        </Button>
                      </div>
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Course Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="course-details">Course Details</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>

              <TabsContent value="course-details" className="space-y-6">
                <Card>
                  <CardContent>
                    <div
                      className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-primary prose-pre:bg-muted prose-blockquote:border-l-primary prose-headings:font-semibold prose-p:leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: processedDescription }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-6">
                      <AvatarWithFallback
                        src={courseData.instructor?.profilePicture}
                        alt={`${courseData.instructor?.firstName} ${courseData.instructor?.lastName}`}
                        firstName={courseData.instructor?.firstName}
                        lastName={courseData.instructor?.lastName}
                        width={80}
                        height={80}
                        className="w-20 h-20"
                      />
                      <div className="flex flex-col">
                        <h3 className="text-xl font-semibold mb-1">
                          {courseData.instructor?.firstName} {courseData.instructor?.lastName}
                        </h3>{" "}
                        <p className="text-muted-foreground text-pretty">{courseData.instructor?.bio}</p>
                        <Link
                          href={`/instructor/${courseData.instructor?.uid}`}
                          className="text-sm text-primary hover:underline mt-2"
                        >
                          View Public Profile
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                  <Image
                    src={courseData?.thumbnail || "/placeholder.svg"}
                    alt={courseData?.name}
                    height={200}
                    width={200}
                    className="object-cover w-full aspect-auto"
                  />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold">${courseData?.price}</span>
                </div>

                <Button asChild className="w-full mb-4 cursor-pointer" size="lg">
                  <Link href={`/checkout?course=${courseData?.slug}`}>Enroll Now</Link>
                </Button>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{courseData?.courseDuration} hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Certificate</span>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-primary" />
                      <span>Yes</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h4 className="font-medium mb-3">This course includes:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Play className="h-4 w-4 text-muted-foreground" />
                      <span>{courseData?.courseDuration} hours on-demand video</span>
                    </li>

                    <li className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <span>Access on mobile and TV</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span>{courseData?.certificate ? "Certificate of completion" : "No certificate available"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span>Lifetime access</span>
                    </li>
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
