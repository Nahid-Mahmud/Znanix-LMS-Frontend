"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetMyCoursesQuery, useMyCourseStatsQuery } from "@/redux/features/user-courses/userCourses.api";
import { Award, BookOpen, CheckCircle, Clock, Play, Star, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const { data: stats, isLoading: statsLoading } = useMyCourseStatsQuery(undefined);

  const [tabs, setTabs] = useState<string>("courses");

  const { data: myCourses, isLoading: myCoursesLoading } = useGetMyCoursesQuery(undefined);
  console.log(myCourses);

  // Transform API data to match component structure
  const transformedCourses =
    myCourses?.data?.map((enrollment: any) => ({
      id: enrollment._id,
      title: enrollment.courseId.name,
      instructor: `${enrollment.courseId.instructor.firstName} ${enrollment.courseId.instructor.lastName}`,
      instructorImage: enrollment.courseId.instructor.profilePicture,
      thumbnail: enrollment.courseId.thumbnail,
      progress: enrollment.progress,
      totalModules: enrollment.courseId.courseModules?.length || 0,
      completedModules: Math.floor((enrollment.progress / 100) * (enrollment.courseId.courseModules?.length || 0)),
      totalVideos:
        enrollment.courseId.courseModules?.reduce(
          (total: number, module: any) => total + (module.videos?.length || 0),
          0
        ) || 0,
      completedVideos: Math.floor(
        (enrollment.progress / 100) *
          (enrollment.courseId.courseModules?.reduce(
            (total: number, module: any) => total + (module.videos?.length || 0),
            0
          ) || 0)
      ),
      duration: enrollment.courseId.courseDuration,
      rating: 4.8, // Default rating as it's not in API
      lastWatched: new Date(enrollment.updatedAt).toISOString().split("T")[0],
      nextVideo: enrollment.courseId.courseModules?.[0]?.videos?.[0]?.title || "Start Learning",
      certificate: enrollment.courseId.certificate,
      purchased: new Date(enrollment.enrollmentDate).toISOString().split("T")[0],
      status: enrollment.status,
      description: enrollment.courseId.description,
      price: enrollment.courseId.price,
      type: enrollment.courseId.type,
      courseId: enrollment.courseId._id,
    })) || [];

  // Use API data or fallback to default values
  const learningStats = {
    totalCourses: stats?.data?.totalEnrolledCourses || transformedCourses.length,
    completedCourses:
      stats?.data?.completedCourses || transformedCourses.filter((course: any) => course.progress === 100).length,
    inProgressCourses:
      stats?.data?.coursesInProgress ||
      transformedCourses.filter((course: any) => course.progress > 0 && course.progress < 100).length,
    totalWatchTime: `${stats?.data?.totalLearningHours || 0} hours`,
    certificatesEarned:
      stats?.data?.completedCourses ||
      transformedCourses.filter((course: any) => course.progress === 100 && course.certificate).length,
  };

  const searchParams = useSearchParams();
  console.log(searchParams.get("tab"));

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setTabs(tab);
    } else {
      setTabs("courses");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">My Learning Dashboard</h1>
            <p className="text-muted-foreground">Track your progress and continue learning</p>
          </div>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsLoading ? (
            // Loading skeleton for stats
            <>
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            // Actual stats
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{learningStats.totalCourses}</div>
                  <p className="text-xs text-muted-foreground">{learningStats.inProgressCourses} in progress</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{learningStats.completedCourses}</div>
                  <p className="text-xs text-muted-foreground">
                    {learningStats.totalCourses > 0
                      ? Math.round((learningStats.completedCourses / learningStats.totalCourses) * 100)
                      : 0}
                    % completion rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Watch Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{learningStats.totalWatchTime}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Certificates</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{learningStats.certificatesEarned}</div>
                  <p className="text-xs text-muted-foreground">Earned this year</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Main Content */}
        <Tabs value={tabs} onValueChange={setTabs} defaultValue="courses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="continue">Continue Learning</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          {/* All Courses Tab */}
          <TabsContent value="courses">
            {myCoursesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="w-full h-48" />
                    <CardHeader>
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Skeleton className="h-2 w-full" />
                        <Skeleton className="h-3 w-1/3" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Skeleton className="h-3 w-12" />
                          <Skeleton className="h-3 w-8" />
                        </div>
                        <div className="space-y-1">
                          <Skeleton className="h-3 w-12" />
                          <Skeleton className="h-3 w-8" />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Skeleton className="h-3 w-12" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : transformedCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
                <p className="text-muted-foreground">Start your learning journey by enrolling in a course</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {transformedCourses.map((course: any) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow p-0">
                    <div className="relative">
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant={course.progress === 100 ? "default" : "secondary"}>
                          {course.progress === 100 ? "Completed" : `${course.progress}%`}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <Button size="sm" asChild>
                          <Link href={`/student-dashboard/courses/${course.courseId}`}>
                            <Play className="w-4 h-4 mr-1" />
                            {course.progress > 0 ? "Continue" : "Start"}
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Image
                          src={course.instructorImage}
                          alt={course.instructor}
                          width={20}
                          height={20}
                          className="w-5 h-5 rounded-full"
                        />
                        <span>{course.instructor}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <ProgressBar value={course.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Modules</div>
                          <div className="font-medium">
                            {course.completedModules}/{course.totalModules}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Videos</div>
                          <div className="font-medium">
                            {course.completedVideos}/{course.totalVideos}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Continue Learning Tab */}
          <TabsContent value="continue">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Pick up where you left off</h2>
              {myCoursesLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <Card key={i} className="p-4">
                      <div className="flex gap-4">
                        <Skeleton className="w-30 h-20 rounded" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                          <div className="flex items-center gap-4">
                            <Skeleton className="h-2 flex-1" />
                            <Skeleton className="h-3 w-8" />
                          </div>
                        </div>
                        <Skeleton className="w-20 h-8 rounded" />
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4">
                  {transformedCourses
                    .filter((course: any) => course.progress > 0 && course.progress < 100)
                    .map((course: any) => (
                      <Card key={course.id} className="p-4">
                        <div className="flex gap-4">
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            width={120}
                            height={80}
                            className="w-30 h-20 object-cover rounded"
                          />
                          <div className="flex-1 space-y-2">
                            <h3 className="font-semibold">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">Next: {course.nextVideo}</p>
                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <ProgressBar value={course.progress} className="h-2" />
                              </div>
                              <span className="text-sm text-muted-foreground">{course.progress}%</span>
                            </div>
                          </div>
                          <Button asChild>
                            <Link href={`/student-dashboard/courses/${course.id}`}>
                              <Play className="w-4 h-4 mr-2" />
                              Continue
                            </Link>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  {transformedCourses.filter((course: any) => course.progress > 0 && course.progress < 100).length ===
                    0 &&
                    !myCoursesLoading && (
                      <div className="text-center py-12">
                        <Clock className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No courses in progress</h3>
                        <p className="text-muted-foreground">Start learning to see your progress here</p>
                      </div>
                    )}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Completed Courses Tab */}
          <TabsContent value="completed">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Completed Courses</h2>
              {myCoursesLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <Card key={i} className="p-4">
                      <div className="flex gap-4">
                        <Skeleton className="w-30 h-20 rounded" />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-5 w-16 rounded-full" />
                          </div>
                          <Skeleton className="h-3 w-1/2" />
                          <Skeleton className="h-3 w-2/3" />
                        </div>
                        <div className="flex gap-2">
                          <Skeleton className="w-16 h-8 rounded" />
                          <Skeleton className="w-24 h-8 rounded" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4">
                  {transformedCourses
                    .filter((course: any) => course.progress === 100)
                    .map((course: any) => (
                      <Card key={course.id} className="p-4">
                        <div className="flex gap-4">
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            width={120}
                            height={80}
                            className="w-30 h-20 object-cover rounded"
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{course.title}</h3>
                              <Badge variant="default">Completed</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-green-600">
                                Course completed • {course.certificate ? "Certificate available" : "No certificate"}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" asChild>
                              <Link href={`/student-dashboard/courses/${course.id}`}>Review</Link>
                            </Button>
                            {course.certificate && (
                              <Button asChild>
                                <Link href={`/student-dashboard/certificates/${course.id}`}>
                                  <Award className="w-4 h-4 mr-2" />
                                  Certificate
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  {transformedCourses.filter((course: any) => course.progress === 100).length === 0 &&
                    !myCoursesLoading && (
                      <div className="text-center py-12">
                        <Trophy className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No completed courses yet</h3>
                        <p className="text-muted-foreground">Complete your first course to see it here</p>
                      </div>
                    )}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">My Certificates</h2>
              {myCoursesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="text-center p-6">
                      <div className="mb-4">
                        <Skeleton className="w-16 h-16 mx-auto rounded" />
                      </div>
                      <Skeleton className="h-4 w-3/4 mx-auto mb-2" />
                      <Skeleton className="h-3 w-1/2 mx-auto mb-4" />
                      <Skeleton className="h-8 w-full rounded" />
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {transformedCourses
                    .filter((course: any) => course.progress === 100 && course.certificate)
                    .map((course: any) => (
                      <Card key={course.id} className="text-center p-6">
                        <div className="mb-4">
                          <Award className="w-16 h-16 mx-auto text-yellow-500" />
                        </div>
                        <h3 className="font-semibold mb-2">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Completed on {new Date(course.lastWatched).toLocaleDateString()}
                        </p>
                        <Button className="w-full" asChild>
                          <Link href={`/student-dashboard/certificates/${course.id}`}>Download Certificate</Link>
                        </Button>
                      </Card>
                    ))}
                  {transformedCourses.filter((course: any) => course.progress === 100 && course.certificate).length ===
                    0 &&
                    !myCoursesLoading && (
                      <div className="col-span-full text-center py-12">
                        <Award className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No certificates yet</h3>
                        <p className="text-muted-foreground">
                          Complete courses with certificates to earn your credentials
                        </p>
                      </div>
                    )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
