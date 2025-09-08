/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetCourseModulesByCourseIdQuery } from "@/redux/features/user-courses/userCourses.api";
import { ArrowLeft, CheckCircle, Clock, Pause, Play, SkipBack, SkipForward, Star } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import processMarkdown from "@/utils/processMarkdown";

// Dynamic import for ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function StudentCoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const { data: modulesData, isLoading: moduleDataLoading } = useGetCourseModulesByCourseIdQuery(courseId, {
    skip: !courseId,
  });

  console.log(modulesData);

  // Use real data from API
  const course = modulesData?.data;

  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [processedDescription, setProcessedDescription] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [playing, setPlaying] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [completed, setCompleted] = useState(false);

  // Set initial video when data loads
  React.useEffect(() => {
    if (course?.modules?.[0]?.videos?.[0] && !currentVideo) {
      setCurrentVideo(course.modules[0].videos[0]);
    }
  }, [course, currentVideo]);

  // Process markdown description when current video changes
  useEffect(() => {
    if (currentVideo?.description) {
      processMarkdown(currentVideo.description).then(setProcessedDescription);
    } else {
      setProcessedDescription("");
    }
  }, [currentVideo?.description]);

  if (moduleDataLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header Skeleton */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-9 w-32" />
              <div>
                <Skeleton className="h-6 w-48 mb-1" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-2 w-32" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Video Player Skeleton */}
          <div className="flex-1">
            <Skeleton className="aspect-video w-full" />

            {/* Video Info Skeleton */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <div className="flex items-center gap-4 mb-4">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
                <Skeleton className="h-10 w-32" />
              </div>

              <div className="border-t pt-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="w-96 border-l bg-background">
            <div className="grid grid-cols-2 gap-1 p-1">
              <Skeleton className="h-9" />
              <Skeleton className="h-9" />
            </div>

            <div className="p-4 space-y-4">
              {[1, 2, 3].map((item) => (
                <Card key={item}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <Skeleton className="h-5 w-40" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[1, 2].map((video) => (
                      <div key={video} className="p-3 rounded-lg border">
                        <div className="flex items-start gap-3">
                          <Skeleton className="w-5 h-5 rounded-full mt-1" />
                          <div className="flex-1">
                            <Skeleton className="h-4 w-full mb-1" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Course not found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  // Handle both API data structure and mock data structure
  const courseTitle = course.courseName || course.title || "Course";
  const courseModules = course.modules || [];

  // Get instructor from the first module if available, or use course instructor
  const instructorData = courseModules[0]?.instructor?.[0] || course.instructor;
  const instructor = instructorData
    ? typeof instructorData === "string"
      ? instructorData
      : `${instructorData.firstName} ${instructorData.lastName}`
    : "Unknown Instructor";

  const courseDescription = course.description || "No description available";

  const allVideos = courseModules.flatMap((module: any) =>
    (module.videos || []).map((video: any) => ({
      ...video,
      moduleTitle: module.title,
      id: video._id || video.id,
      completed: video.completed || false,
    }))
  );

  // const currentVideoIndex = allVideos.findIndex((v: any) => v.id === currentVideo?.id);
  // const nextVideo = allVideos[currentVideoIndex + 1];
  // const prevVideo = allVideos[currentVideoIndex - 1];

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const handleVideoComplete = () => {
  //   setCompleted(true);
  //   // Mark video as completed in real implementation
  // };

  const completedVideos = allVideos.filter((v: any) => v.completed).length;
  const progressPercentage = Math.round((completedVideos / allVideos.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="font-semibold">{courseTitle}</h1>
              <p className="text-sm text-muted-foreground">by {instructor}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-medium">{progressPercentage}% Complete</div>
              <Progress value={progressPercentage} className="w-32 h-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Video Player */}
        <div className="flex-1">
          <div className="relative aspect-video bg-black">
            {currentVideo ? (
              <ReactPlayer src={currentVideo.url} width="100%" height="100%" playing={playing} controls={true} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4" />
                  <p>Select a video to start learning</p>
                </div>
              </div>
            )}
          </div>

          {/* Video Info */}
          {currentVideo && (
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{currentVideo.title}</h2>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {currentVideo.duration}
                    </div>
                    {currentVideo.completed && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {!currentVideo.completed && (
                    <Button onClick={() => setCompleted(true)}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Complete
                    </Button>
                  )}
                </div>
              </div>

              {/* Video Navigation */}
              {/* <div className="flex justify-between items-center pt-4 border-t mb-6">
                <Button variant="outline" disabled={!prevVideo} onClick={() => prevVideo && setCurrentVideo(prevVideo)}>
                  <SkipBack className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <Button variant="outline" disabled={!nextVideo} onClick={() => nextVideo && setCurrentVideo(nextVideo)}>
                  Next
                  <SkipForward className="w-4 h-4 ml-2" />
                </Button>
              </div> */}

              {/* Video Description - Moved to the end */}
              {processedDescription && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">About this video</h3>
                  <div
                    className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-primary prose-pre:bg-muted prose-blockquote:border-l-primary prose-headings:font-semibold prose-p:leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: processedDescription }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Course Content Sidebar */}
        <div className="w-96 border-l bg-background">
          <Tabs defaultValue="content" className="h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="h-full">
              <div className="h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="p-4 space-y-4">
                  {courseModules.map((module: any, moduleIndex: number) => (
                    <Card key={module._id || module.id}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                            {moduleIndex + 1}
                          </div>
                          {module.title}
                        </CardTitle>
                        <CardDescription>{module.duration}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {(module.videos || []).map((video: any) => (
                          <div
                            key={video._id || video.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              currentVideo?.id === (video._id || video.id)
                                ? "bg-primary/10 border-primary"
                                : "hover:bg-muted border-transparent"
                            }`}
                            onClick={() => setCurrentVideo({ ...video, id: video._id || video.id })}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                {video.completed ? (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                ) : currentVideo?.id === (video._id || video.id) ? (
                                  <Pause className="w-5 h-5 text-primary" />
                                ) : (
                                  <Play className="w-5 h-5 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm leading-5 mb-1">{video.title}</h4>
                                <p className="text-xs text-muted-foreground">{video.duration}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="overview" className="h-full">
              <div className="h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="p-4 space-y-6">
                  {/* Course Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {course.thumbnail && (
                        <Image
                          src={course.thumbnail}
                          alt={courseTitle}
                          width={300}
                          height={150}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      )}

                      <div className="space-y-2">
                        <h3 className="font-semibold">{courseTitle}</h3>
                        <p className="text-sm text-muted-foreground">{courseDescription}</p>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {course.rating && (
                          <div>
                            <div className="text-muted-foreground">Rating</div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              {course.rating}
                            </div>
                          </div>
                        )}
                        {course.totalStudents && (
                          <div>
                            <div className="text-muted-foreground">Students</div>
                            <div>{course.totalStudents.toLocaleString()}</div>
                          </div>
                        )}
                        {course.totalDuration && (
                          <div>
                            <div className="text-muted-foreground">Duration</div>
                            <div>{course.totalDuration}</div>
                          </div>
                        )}
                        {course.lastUpdated && (
                          <div>
                            <div className="text-muted-foreground">Updated</div>
                            <div>{course.lastUpdated}</div>
                          </div>
                        )}
                        <div>
                          <div className="text-muted-foreground">Modules</div>
                          <div>{courseModules.length}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Total Videos</div>
                          <div>{allVideos.length}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Instructor */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Instructor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        {course.instructorImage && (
                          <Image
                            src={course.instructorImage}
                            alt={instructor}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full"
                          />
                        )}
                        <div>
                          <h4 className="font-medium">{instructor}</h4>
                          <p className="text-sm text-muted-foreground">Expert Instructor</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Progress */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Overall Progress</span>
                            <span>{progressPercentage}%</span>
                          </div>
                          <Progress value={progressPercentage} />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Completed</div>
                            <div className="font-medium">
                              {completedVideos}/{allVideos.length} videos
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Remaining</div>
                            <div className="font-medium">{allVideos.length - completedVideos} videos</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
