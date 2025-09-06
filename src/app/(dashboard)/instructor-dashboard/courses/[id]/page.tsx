"use client";

import { reactNextjsProgramming } from "@/assets";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Award, BookOpen, Clock, DollarSign, Edit, Globe, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock course data - replace with actual API call
const mockCourse = {
  id: "1",
  name: "Complete React Development",
  description:
    "Learn React from basics to advanced concepts including hooks, context, and modern patterns. This comprehensive course covers everything you need to know to become a proficient React developer.",
  price: 99.99,
  type: "PAID",
  published: "PUBLISHED",
  approved: true,
  featured: true,
  certificate: true,
  courseDuration: "12 weeks",
  tags: ["React", "JavaScript", "Frontend", "Web Development", "Modern JavaScript"],
  thumbnail: reactNextjsProgramming,
  introVideo: "/intro-video.mp4",
  enrolledStudents: 450,
  totalModules: 12,
  completedModules: 12,
  createdAt: "2024-01-15",
  updatedAt: "2024-02-20",
  instructor: "John Doe",
  rating: 4.8,
  reviews: 123,
  totalRevenue: 44550,
};

const mockModules = [
  {
    id: "1",
    moduleNumber: 1,
    title: "Introduction to React",
    duration: "2 hours",
    videos: 5,
    completed: true,
  },
  {
    id: "2",
    moduleNumber: 2,
    title: "Components and JSX",
    duration: "3 hours",
    videos: 8,
    completed: true,
  },
  {
    id: "3",
    moduleNumber: 3,
    title: "State Management",
    duration: "4 hours",
    videos: 10,
    completed: false,
  },
];

export default function CourseDetailPage() {
  const router = useRouter();
  const [course] = useState(mockCourse);
  const [modules] = useState(mockModules);

  const completionPercentage = (course.completedModules / course.totalModules) * 100;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{course.name}</h1>
              <p className="text-muted-foreground">Course Details & Management</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/instructor-dashboard/courses/${course.id}/edit`}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Course
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/instructor-dashboard/courses/${course.id}/modules`}>
                <BookOpen className="w-4 h-4 mr-2" />
                Manage Modules
              </Link>
            </Button>
          </div>
        </div>

        {/* Course Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{course.enrolledStudents}</div>
              <p className="text-xs text-muted-foreground">+12 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${course.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+$1,180 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{course.rating}</div>
              <p className="text-xs text-muted-foreground">{course.reviews} reviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(completionPercentage)}%</div>
              <Progress value={completionPercentage} className="mt-2" />
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
                    <CardTitle className="text-xl">{course.name}</CardTitle>
                    <CardDescription className="mt-2">{course.description}</CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge
                      className={
                        course.published === "PUBLISHED" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {course.published === "PUBLISHED" ? "Published" : "Draft"}
                    </Badge>
                    {course.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <Image
                    src={course.thumbnail}
                    alt={course.name}
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
                    <span>{course.courseDuration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span>{course.totalModules} modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span>${course.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-muted-foreground" />
                    <span>{course.certificate ? "Certificate" : "No Certificate"}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modules Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Course Modules</CardTitle>
                <CardDescription>
                  {course.completedModules} of {course.totalModules} modules completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modules.map((module) => (
                    <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                          {module.moduleNumber}
                        </div>
                        <div>
                          <h4 className="font-medium">{module.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {module.duration} • {module.videos} videos
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {module.completed && <Badge className="bg-green-100 text-green-800">Completed</Badge>}
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/instructor-dashboard/courses/${course.id}/modules/${module.id}`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
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
                  <Link href={`/instructor-dashboard/courses/${course.id}/modules`}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Manage Modules
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/instructor-dashboard/courses/${course.id}/edit`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Course
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <Globe className="w-4 h-4 mr-2" />
                  Preview Course
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
                    <Badge variant={course.type === "FREE" ? "secondary" : "default"}>{course.type}</Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Created</label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Last Updated</label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(course.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <div className="mt-1">
                    <Badge
                      className={
                        course.published === "PUBLISHED" && course.approved
                          ? "bg-green-100 text-green-800"
                          : course.published === "PUBLISHED"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {course.published === "PUBLISHED" && course.approved
                        ? "Live"
                        : course.published === "PUBLISHED"
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
