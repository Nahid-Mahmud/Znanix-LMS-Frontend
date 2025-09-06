"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, BookOpen, Clock, Star, CheckCircle, Trophy, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  reactNextjsProgramming,
  digitalMarketingCourse,
  dataSciencePythonAnalytics,
  uiUxDesignCourse,
  instructorAlex,
  instructorEmma,
  instructorSarah,
} from "@/assets";

// Mock purchased courses data
const purchasedCourses = [
  {
    id: "1",
    title: "Complete React Development",
    instructor: "Alex Johnson",
    instructorImage: instructorAlex,
    thumbnail: reactNextjsProgramming,
    progress: 65,
    totalModules: 12,
    completedModules: 8,
    totalVideos: 45,
    completedVideos: 29,
    duration: "12 weeks",
    rating: 4.8,
    lastWatched: "2024-03-15",
    nextVideo: "React Hooks Advanced",
    certificate: true,
    purchased: "2024-01-15",
  },
  {
    id: "2",
    title: "UI/UX Design Masterclass",
    instructor: "Emma Davis",
    instructorImage: instructorEmma,
    thumbnail: uiUxDesignCourse,
    progress: 30,
    totalModules: 8,
    completedModules: 2,
    totalVideos: 32,
    completedVideos: 10,
    duration: "8 weeks",
    rating: 4.9,
    lastWatched: "2024-03-10",
    nextVideo: "Color Theory Basics",
    certificate: true,
    purchased: "2024-02-01",
  },
  {
    id: "3",
    title: "Digital Marketing Strategy",
    instructor: "Sarah Wilson",
    instructorImage: instructorSarah,
    thumbnail: digitalMarketingCourse,
    progress: 90,
    totalModules: 10,
    completedModules: 9,
    totalVideos: 38,
    completedVideos: 34,
    duration: "10 weeks",
    rating: 4.7,
    lastWatched: "2024-03-14",
    nextVideo: "Analytics & Reporting",
    certificate: true,
    purchased: "2024-01-20",
  },
  {
    id: "4",
    title: "Data Science with Python",
    instructor: "Alex Johnson",
    instructorImage: instructorAlex,
    thumbnail: dataSciencePythonAnalytics,
    progress: 15,
    totalModules: 15,
    completedModules: 2,
    totalVideos: 60,
    completedVideos: 9,
    duration: "16 weeks",
    rating: 4.8,
    lastWatched: "2024-03-08",
    nextVideo: "Python Fundamentals",
    certificate: true,
    purchased: "2024-03-01",
  },
];

// Mock learning stats
const learningStats = {
  totalCourses: 4,
  completedCourses: 1,
  inProgressCourses: 3,
  totalWatchTime: "156 hours",
  certificatesEarned: 1,
  currentStreak: 7,
  totalPoints: 2840,
};

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">My Learning Dashboard</h1>
            <p className="text-muted-foreground">Track your progress and continue learning</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Trophy className="w-4 h-4 text-yellow-500" />
              {learningStats.totalPoints} points
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-green-500" />
              {learningStats.currentStreak} day streak
            </div>
          </div>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                {Math.round((learningStats.completedCourses / learningStats.totalCourses) * 100)}% completion rate
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
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="continue">Continue Learning</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          {/* All Courses Tab */}
          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                        <Link href={`/student-dashboard/courses/${course.id}`}>
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
          </TabsContent>

          {/* Continue Learning Tab */}
          <TabsContent value="continue">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Pick up where you left off</h2>
              <div className="grid gap-4">
                {purchasedCourses
                  .filter((course) => course.progress > 0 && course.progress < 100)
                  .map((course) => (
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
              </div>
            </div>
          </TabsContent>

          {/* Completed Courses Tab */}
          <TabsContent value="completed">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Completed Courses</h2>
              <div className="grid gap-4">
                {purchasedCourses
                  .filter((course) => course.progress === 100)
                  .map((course) => (
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
                            <span className="text-sm text-green-600">Course completed • Certificate available</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" asChild>
                            <Link href={`/student-dashboard/courses/${course.id}`}>Review</Link>
                          </Button>
                          <Button asChild>
                            <Link href={`/student-dashboard/certificates/${course.id}`}>
                              <Award className="w-4 h-4 mr-2" />
                              Certificate
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">My Certificates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedCourses
                  .filter((course) => course.progress === 100 && course.certificate)
                  .map((course) => (
                    <Card key={course.id} className="text-center p-6">
                      <div className="mb-4">
                        <Award className="w-16 h-16 mx-auto text-yellow-500" />
                      </div>
                      <h3 className="font-semibold mb-2">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Completed on {new Date(course.lastWatched).toLocaleDateString()}
                      </p>
                      <Button className="w-full">Download Certificate</Button>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
