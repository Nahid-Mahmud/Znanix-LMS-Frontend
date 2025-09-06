"use client";

import {
  dataSciencePythonAnalytics,
  digitalMarketingCourse,
  instructorAlex,
  instructorEmma,
  instructorSarah,
  reactNextjsProgramming,
  uiUxDesignCourse,
} from "@/assets";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CheckCircle, Clock, Pause, Play, SkipBack, SkipForward, Star } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// Dynamic import for ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

// Mock course data with video content
const courseData = {
  "1": {
    id: "1",
    title: "Complete React Development",
    instructor: "Alex Johnson",
    instructorImage: instructorAlex,
    thumbnail: reactNextjsProgramming,
    description: "Master React from basics to advanced concepts including hooks, context, and modern patterns.",
    rating: 4.8,
    totalStudents: 12450,
    totalDuration: "45 hours",
    lastUpdated: "March 2024",
    progress: 65,
    modules: [
      {
        id: "1",
        title: "Introduction to React",
        duration: "2 hours",
        videos: [
          {
            id: "1",
            title: "What is React?",
            duration: "15:30",
            url: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
            completed: true,
            description: "Learn the fundamentals of React and why it's popular for building user interfaces.",
          },
          {
            id: "2",
            title: "Setting up Development Environment",
            duration: "12:45",
            url: "https://www.youtube.com/watch?v=SqcY0GlETPk",
            completed: true,
            description: "Set up your development environment with Node.js, npm, and create-react-app.",
          },
          {
            id: "3",
            title: "Your First React Component",
            duration: "18:20",
            url: "https://www.youtube.com/watch?v=DLX62G4lc44",
            completed: false,
            description: "Create your first functional component and understand JSX syntax.",
          },
        ],
      },
      {
        id: "2",
        title: "Components and JSX",
        duration: "3 hours",
        videos: [
          {
            id: "4",
            title: "Understanding JSX",
            duration: "20:15",
            url: "https://www.youtube.com/watch?v=7fPXI_MnBOY",
            completed: false,
            description: "Deep dive into JSX syntax and how it works under the hood.",
          },
          {
            id: "5",
            title: "Props and State",
            duration: "25:30",
            url: "https://www.youtube.com/watch?v=IYvD9oBCuJI",
            completed: false,
            description: "Learn how to pass data between components and manage component state.",
          },
        ],
      },
      {
        id: "3",
        title: "React Hooks",
        duration: "4 hours",
        videos: [
          {
            id: "6",
            title: "useState Hook",
            duration: "22:10",
            url: "https://www.youtube.com/watch?v=O6P86uwfdR0",
            completed: false,
            description: "Master the useState hook for managing component state.",
          },
        ],
      },
    ],
  },
  "2": {
    id: "2",
    title: "UI/UX Design Masterclass",
    instructor: "Emma Davis",
    instructorImage: instructorEmma,
    thumbnail: uiUxDesignCourse,
    description: "Learn professional UI/UX design principles and create stunning user experiences.",
    rating: 4.9,
    totalStudents: 8750,
    totalDuration: "32 hours",
    lastUpdated: "February 2024",
    progress: 30,
    modules: [
      {
        id: "1",
        title: "Design Fundamentals",
        duration: "3 hours",
        videos: [
          {
            id: "1",
            title: "Introduction to UI/UX",
            duration: "18:45",
            url: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
            completed: true,
            description: "Understand the difference between UI and UX design.",
          },
          {
            id: "2",
            title: "Design Thinking Process",
            duration: "22:30",
            url: "https://www.youtube.com/watch?v=_r0VX-aU_T8",
            completed: false,
            description: "Learn the design thinking methodology for problem solving.",
          },
        ],
      },
      {
        id: "2",
        title: "Color Theory and Typography",
        duration: "4 hours",
        videos: [
          {
            id: "3",
            title: "Color Theory Basics",
            duration: "25:15",
            url: "https://www.youtube.com/watch?v=Qj1FK8n7WgY",
            completed: false,
            description: "Master color theory for effective UI design.",
          },
        ],
      },
    ],
  },
  "3": {
    id: "3",
    title: "Digital Marketing Strategy",
    instructor: "Sarah Wilson",
    instructorImage: instructorSarah,
    thumbnail: digitalMarketingCourse,
    description: "Master digital marketing strategies, analytics, and campaign optimization.",
    rating: 4.7,
    totalStudents: 9200,
    totalDuration: "38 hours",
    lastUpdated: "March 2024",
    progress: 90,
    modules: [
      {
        id: "1",
        title: "Marketing Fundamentals",
        duration: "3 hours",
        videos: [
          {
            id: "1",
            title: "Digital Marketing Overview",
            duration: "20:30",
            url: "https://www.youtube.com/watch?v=bixR-KIJKYM",
            completed: true,
            description: "Introduction to digital marketing channels and strategies.",
          },
          {
            id: "2",
            title: "Target Audience Research",
            duration: "18:45",
            url: "https://www.youtube.com/watch?v=nOo4L1sOcvs",
            completed: true,
            description: "Learn how to identify and research your target audience.",
          },
        ],
      },
      {
        id: "2",
        title: "Social Media Marketing",
        duration: "5 hours",
        videos: [
          {
            id: "3",
            title: "Facebook & Instagram Ads",
            duration: "32:15",
            url: "https://www.youtube.com/watch?v=lBfnGWc-y4c",
            completed: true,
            description: "Create effective Facebook and Instagram advertising campaigns.",
          },
          {
            id: "4",
            title: "Analytics & Reporting",
            duration: "28:30",
            url: "https://www.youtube.com/watch?v=gTn_VXUa_Rg",
            completed: false,
            description: "Track and analyze your marketing campaign performance.",
          },
        ],
      },
    ],
  },
  "4": {
    id: "4",
    title: "Data Science with Python",
    instructor: "Alex Johnson",
    instructorImage: instructorAlex,
    thumbnail: dataSciencePythonAnalytics,
    description: "Learn data science fundamentals using Python, pandas, and machine learning.",
    rating: 4.8,
    totalStudents: 15600,
    totalDuration: "60 hours",
    lastUpdated: "March 2024",
    progress: 15,
    modules: [
      {
        id: "1",
        title: "Python Fundamentals",
        duration: "8 hours",
        videos: [
          {
            id: "1",
            title: "Introduction to Python",
            duration: "22:45",
            url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
            completed: true,
            description: "Get started with Python programming for data science.",
          },
          {
            id: "2",
            title: "Python Data Types",
            duration: "18:30",
            url: "https://www.youtube.com/watch?v=gCCVsvgR2KU",
            completed: true,
            description: "Learn about Python data types and data structures.",
          },
          {
            id: "3",
            title: "Python Fundamentals",
            duration: "25:15",
            url: "https://www.youtube.com/watch?v=eWRfhZUzrAc",
            completed: false,
            description: "Control structures, functions, and modules in Python.",
          },
        ],
      },
      {
        id: "2",
        title: "Data Analysis with Pandas",
        duration: "10 hours",
        videos: [
          {
            id: "4",
            title: "Introduction to Pandas",
            duration: "35:20",
            url: "https://www.youtube.com/watch?v=vmEHCJofslg",
            completed: false,
            description: "Learn pandas for data manipulation and analysis.",
          },
        ],
      },
    ],
  },
};

export default function StudentCoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const course = courseData[courseId as keyof typeof courseData];

  const [currentVideo, setCurrentVideo] = useState(course?.modules[0]?.videos[0] || null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [playing, setPlaying] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [completed, setCompleted] = useState(false);

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

  const allVideos = course.modules.flatMap((module) =>
    module.videos.map((video) => ({ ...video, moduleTitle: module.title }))
  );

  const currentVideoIndex = allVideos.findIndex((v) => v.id === currentVideo?.id);
  const nextVideo = allVideos[currentVideoIndex + 1];
  const prevVideo = allVideos[currentVideoIndex - 1];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleVideoComplete = () => {
    setCompleted(true);
    // Mark video as completed in real implementation
  };

  const completedVideos = allVideos.filter((v) => v.completed).length;
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
              <h1 className="font-semibold">{course.title}</h1>
              <p className="text-sm text-muted-foreground">by {course.instructor}</p>
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
              <ReactPlayer
                src={currentVideo.url}
                width="100%"
                height="100%"
                playing={playing}
                controls={true}
                // {...({
                //   url: currentVideo.url,
                //   width: "100%",
                //   height: "100%",
                //   playing: playing,
                //   controls: true,
                //   onPlay: () => setPlaying(true),
                //   onPause: () => setPlaying(false),
                //   onEnded: handleVideoComplete,
                // } as any)}
              />
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
                  <p className="text-muted-foreground mb-4">{currentVideo.description}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
              <div className="flex justify-between items-center pt-4 border-t">
                <Button variant="outline" disabled={!prevVideo} onClick={() => prevVideo && setCurrentVideo(prevVideo)}>
                  <SkipBack className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <Button variant="outline" disabled={!nextVideo} onClick={() => nextVideo && setCurrentVideo(nextVideo)}>
                  Next
                  <SkipForward className="w-4 h-4 ml-2" />
                </Button>
              </div>
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
                  {course.modules.map((module, moduleIndex) => (
                    <Card key={module.id}>
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
                        {module.videos.map((video) => (
                          <div
                            key={video.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              currentVideo?.id === video.id
                                ? "bg-primary/10 border-primary"
                                : "hover:bg-muted border-transparent"
                            }`}
                            onClick={() => setCurrentVideo(video)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                {video.completed ? (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                ) : currentVideo?.id === video.id ? (
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
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        width={300}
                        height={150}
                        className="w-full h-32 object-cover rounded-lg"
                      />

                      <div className="space-y-2">
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.description}</p>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Rating</div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {course.rating}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Students</div>
                          <div>{course.totalStudents.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Duration</div>
                          <div>{course.totalDuration}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Updated</div>
                          <div>{course.lastUpdated}</div>
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
                        <Image
                          src={course.instructorImage}
                          alt={course.instructor}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h4 className="font-medium">{course.instructor}</h4>
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
