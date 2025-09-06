"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCoursesDetailBySlugQuery } from "@/redux/features/courses/courses.api";
import { Award, BookOpen, Clock, DollarSign, Edit, Globe, Timer, Users, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function CourseDetailPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;
  console.log(slug);
  const { data: courseData, isLoading: courseDataLoading } = useGetCoursesDetailBySlugQuery(slug, {
    skip: !slug,
  });

  console.log(courseData);

  if (courseDataLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>

          {/* Course Overview Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-6" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Course Info Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-64" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="aspect-video rounded-lg mb-4" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {[...Array(4)].map((_, index) => (
                      <Skeleton key={index} className="h-4 w-24" />
                    ))}
                  </div>
                  <div className="mt-4">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <div className="flex flex-wrap gap-2">
                      {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} className="h-6 w-16" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-3">
                  {[...Array(3)].map((_, index) => (
                    <Skeleton key={index} className="h-10 w-full" />
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index}>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return <div>Loading...</div>;
  }

  const {
    name,
    description,
    thumbnail,
    price,
    tags,
    type,
    courseDuration,
    certificate,
    featured,
    published,
    approved,
    createdAt,
    updatedAt,
    totalStudents,
    totalModules,
    averageVideoDuration,
    totalModuleVideos,
  } = courseData?.data;

  console.log(thumbnail);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">{name}</h1>
              <p className="text-muted-foreground">Course Details & Management</p>
            </div>
          </div>
          {/* <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/instructor-dashboard/courses/${courseData._id}/edit`}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Course
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/instructor-dashboard/courses/${courseData._id}/modules`}>
                <BookOpen className="w-4 h-4 mr-2" />
                Manage Modules
              </Link>
            </Button>
          </div> */}
        </div>

        {/* Course Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">+0 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0</div>
              <p className="text-xs text-muted-foreground">+$0 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(totalModuleVideos)}</div>
              <p className="text-xs text-muted-foreground">This shows Total Module Videos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">video duration (AVG)</CardTitle>
              <Timer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(averageVideoDuration)} H</div>
              <p className="text-xs text-muted-foreground">This shows Average video Duration</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{name}</CardTitle>
                    <CardDescription className="mt-2">{description}</CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge
                      className={
                        published === "PUBLISHED" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {published === "PUBLISHED" ? "Published" : "Draft"}
                    </Badge>
                    {featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <Image
                    src={thumbnail}
                    alt={name}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{courseDuration} weeks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span>{totalModules} modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span>${price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-muted-foreground" />
                    <span>{certificate ? "Certificate" : "No Certificate"}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {tags?.map((tag: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href={`/instructor-dashboard/courses/${slug}/modules`}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Manage Modules
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/instructor-dashboard/courses/${slug}/edit`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Course
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href={`/courses/${slug}`} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2" />
                    Preview Course
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Course Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Course Type</label>
                  <div className="mt-1">
                    <Badge variant={type === "FREE" ? "secondary" : "default"}>{type}</Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Created</label>
                  <p className="text-sm text-muted-foreground mt-1">{new Date(createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Last Updated</label>
                  <p className="text-sm text-muted-foreground mt-1">{new Date(updatedAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <div className="mt-1">
                    <Badge
                      className={
                        published === "PUBLISHED" && approved
                          ? "bg-green-100 text-green-800"
                          : published === "PUBLISHED"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {published === "PUBLISHED" && approved
                        ? "Live"
                        : published === "PUBLISHED"
                        ? "Pending Approval"
                        : "Draft"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
