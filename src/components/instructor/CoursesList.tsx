"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Eye, Trash2, Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import InstructorCourseCard from "./InstructorCourseCard";
import { reactNextjsProgramming, webDevelopmentCodingPng, digitalMarketingCourse } from "@/assets";

// Mock course data - replace with actual API data
const mockCourses = [
  {
    id: "1",
    name: "Complete React Development",
    description: "Learn React from basics to advanced concepts",
    price: 99.99,
    type: "PAID",
    published: "PUBLISHED",
    approved: true,
    featured: true,
    certificate: true,
    courseDuration: "12 weeks",
    tags: ["React", "JavaScript", "Frontend"],
    thumbnail: reactNextjsProgramming,
    enrolledStudents: 450,
    totalModules: 12,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Node.js Backend Mastery",
    description: "Master backend development with Node.js and Express",
    price: 149.99,
    type: "PAID",
    published: "DRAFT",
    approved: false,
    featured: false,
    certificate: true,
    courseDuration: "10 weeks",
    tags: ["Node.js", "Backend", "API"],
    thumbnail: webDevelopmentCodingPng,
    enrolledStudents: 0,
    totalModules: 8,
    createdAt: "2024-02-01",
  },
  {
    id: "3",
    name: "Free JavaScript Basics",
    description: "Learn the fundamentals of JavaScript programming",
    price: 0,
    type: "FREE",
    published: "PUBLISHED",
    approved: true,
    featured: false,
    certificate: false,
    courseDuration: "6 weeks",
    tags: ["JavaScript", "Programming", "Basics"],
    thumbnail: digitalMarketingCourse,
    enrolledStudents: 1250,
    totalModules: 6,
    createdAt: "2023-12-10",
  },
];

export default function CoursesList() {
  const [courses] = useState(mockCourses);

  const getStatusBadge = (published: string, approved: boolean) => {
    if (published === "PUBLISHED" && approved) {
      return <Badge className="bg-green-100 text-green-800">Published</Badge>;
    } else if (published === "PUBLISHED" && !approved) {
      return <Badge className="bg-yellow-100 text-yellow-800">Pending Approval</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    return type === "FREE" ? <Badge variant="secondary">Free</Badge> : <Badge variant="default">Paid</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Courses</h2>
          <p className="text-muted-foreground">Manage your courses and track their performance</p>
        </div>
      </div>

      {/* Courses Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {courses.map((course) => (
          <InstructorCourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Table View */}
      <Card>
        <CardHeader>
          <CardTitle>Courses Overview</CardTitle>
          <CardDescription>Detailed view of all your courses</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{course.name}</div>
                      <div className="text-sm text-muted-foreground">{course.courseDuration}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(course.type)}</TableCell>
                  <TableCell>{getStatusBadge(course.published, course.approved)}</TableCell>
                  <TableCell>{course.enrolledStudents}</TableCell>
                  <TableCell>${(course.enrolledStudents * course.price).toLocaleString()}</TableCell>
                  <TableCell>{new Date(course.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          ⋮
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/instructor-dashboard/courses/${course.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/instructor-dashboard/courses/${course.id}/edit`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Course
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/instructor-dashboard/courses/${course.id}/modules`}>
                            <BookOpen className="w-4 h-4 mr-2" />
                            Manage Modules
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Course
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
