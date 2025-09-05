"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  Clock,
  Users,
  Award,
  Play,
  Download,
  Globe,
  Smartphone,
  CheckCircle,
  BookOpen,
  Target,
  TrendingUp,
} from "lucide-react";

// Mock course data - in real app this would come from API
const courseData = {
  id: "1",
  name: "Complete Web Development Bootcamp",
  description:
    "Master web development from scratch with this comprehensive bootcamp. Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and become a full-stack developer ready for the job market.",
  thumbnail: "/web-development-coding.png",
  price: 89.99,
  originalPrice: 199.99,
  introVideo: "/intro-web-dev.mp4",
  tags: ["JavaScript", "React", "Node.js", "MongoDB", "HTML", "CSS"],
  slug: "complete-web-development-bootcamp",
  type: "PAID",
  instructor: {
    name: "Dr. Sarah Johnson",
    avatar: "/instructor-sarah.jpg",
    title: "Senior Full-Stack Developer",
    bio: "Former Google engineer with 10+ years of experience building scalable web applications. Passionate about teaching and helping developers grow their careers.",
    rating: 4.9,
    students: 45000,
    courses: 12,
  },
  courseDuration: "42 hours",
  certificate: true,
  discount: 55,
  featured: true,
  rating: 4.8,
  students: 12543,
  reviewsCount: 2847,
  category: "Web Development",
  level: "Beginner to Advanced",
  language: "English",
  lastUpdated: "December 2024",
  requirements: [
    "Basic computer skills and internet access",
    "No prior programming experience required",
    "Willingness to learn and practice coding",
    "A computer with any operating system",
  ],
  whatYouWillLearn: [
    "Build responsive websites with HTML, CSS, and JavaScript",
    "Create dynamic web applications with React",
    "Develop backend APIs with Node.js and Express",
    "Work with databases using MongoDB",
    "Deploy applications to production",
    "Understand modern development workflows",
    "Build a complete full-stack project portfolio",
    "Prepare for web developer job interviews",
  ],
  curriculum: [
    {
      title: "Getting Started with Web Development",
      lessons: 8,
      duration: "2h 30m",
      topics: [
        "Introduction to Web Development",
        "Setting up Development Environment",
        "HTML Fundamentals",
        "CSS Basics and Styling",
      ],
    },
    {
      title: "JavaScript Fundamentals",
      lessons: 12,
      duration: "4h 15m",
      topics: [
        "Variables and Data Types",
        "Functions and Scope",
        "DOM Manipulation",
        "Event Handling",
        "Asynchronous JavaScript",
      ],
    },
    {
      title: "React Development",
      lessons: 15,
      duration: "6h 45m",
      topics: [
        "React Components and JSX",
        "State and Props",
        "Hooks and Context",
        "Routing with React Router",
        "Building Interactive UIs",
      ],
    },
    {
      title: "Backend Development with Node.js",
      lessons: 10,
      duration: "5h 20m",
      topics: [
        "Node.js Fundamentals",
        "Express.js Framework",
        "RESTful API Design",
        "Authentication and Security",
        "Database Integration",
      ],
    },
    {
      title: "Full-Stack Project",
      lessons: 8,
      duration: "4h 30m",
      topics: [
        "Project Planning and Setup",
        "Frontend Implementation",
        "Backend Development",
        "Database Design",
        "Deployment and Testing",
      ],
    },
  ],
  reviews: [
    {
      id: 1,
      name: "Alex Chen",
      avatar: "/student-alex.jpg",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Excellent course! Sarah explains everything clearly and the projects are really practical. I landed my first developer job after completing this course.",
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      avatar: "/student-maria.jpg",
      rating: 5,
      date: "1 month ago",
      comment:
        "Best web development course I've taken. The curriculum is well-structured and covers everything you need to know. Highly recommended!",
    },
    {
      id: 3,
      name: "John Smith",
      avatar: "/student-john.jpg",
      rating: 4,
      date: "3 weeks ago",
      comment:
        "Great content and teaching style. The only minor issue is that some videos could be a bit shorter, but overall fantastic value.",
    },
  ],
};

export default function CourseDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{courseData.category}</Badge>
                {courseData.featured && (
                  <Badge className="bg-orange-500 hover:bg-orange-600 text-white">Bestseller</Badge>
                )}
                <Badge variant="outline">{courseData.level}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">{courseData.name}</h1>

              <p className="text-lg text-muted-foreground mb-6 text-pretty">{courseData.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{courseData.rating}</span>
                  <span>({courseData.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{courseData.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{courseData.courseDuration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span>{courseData.language}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={courseData.instructor.avatar || "/placeholder.svg"}
                  alt={courseData.instructor.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium">Created by {courseData.instructor.name}</p>
                  <p className="text-sm text-muted-foreground">{courseData.instructor.title}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">Last updated: {courseData.lastUpdated}</p>
            </div>

            {/* Course Video Preview */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={courseData.thumbnail || "/placeholder.svg"}
                    alt={courseData.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Button size="lg" className="bg-white text-black hover:bg-white/90">
                      <Play className="h-6 w-6 mr-2" />
                      Preview Course
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      What you&apos;ll learn
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {courseData.whatYouWillLearn.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {courseData.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-muted-foreground">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                {courseData.curriculum.map((section, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <div className="text-sm text-muted-foreground">
                          {section.lessons} lessons • {section.duration}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {section.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-center gap-2 text-sm">
                            <Play className="h-4 w-4 text-muted-foreground" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="instructor" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-6">
                      <Image
                        src={courseData.instructor.avatar || "/placeholder.svg"}
                        alt={courseData.instructor.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{courseData.instructor.name}</h3>
                        <p className="text-muted-foreground mb-3">{courseData.instructor.title}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{courseData.instructor.rating} rating</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{courseData.instructor.students.toLocaleString()} students</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{courseData.instructor.courses} courses</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-pretty">{courseData.instructor.bio}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{courseData.rating}</div>
                    <div className="flex items-center gap-1 justify-center mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.floor(courseData.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">{courseData.reviewsCount} reviews</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm w-8">{rating}★</span>
                        <Progress value={rating === 5 ? 75 : rating === 4 ? 20 : 5} className="flex-1" />
                        <span className="text-sm text-muted-foreground w-8">
                          {rating === 5 ? "75%" : rating === 4 ? "20%" : "5%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {courseData.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <Image
                            src={review.avatar || "/placeholder.svg"}
                            alt={review.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{review.name}</span>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-3 w-3 ${
                                      star <= review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <p className="text-sm text-muted-foreground text-pretty">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                  <Image
                    src={courseData.thumbnail || "/placeholder.svg"}
                    alt={courseData.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold">${courseData.price}</span>
                  <span className="text-lg text-muted-foreground line-through">${courseData.originalPrice}</span>
                  <Badge variant="destructive">{courseData.discount}% off</Badge>
                </div>

                <Button className="w-full mb-4" size="lg">
                  Enroll Now
                </Button>

                <Button variant="outline" className="w-full mb-6 bg-transparent">
                  Add to Wishlist
                </Button>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{courseData.courseDuration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <span>{courseData.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Language</span>
                    <span>{courseData.language}</span>
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
                      <span>42 hours on-demand video</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      <span>Downloadable resources</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <span>Access on mobile and TV</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span>Certificate of completion</span>
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
