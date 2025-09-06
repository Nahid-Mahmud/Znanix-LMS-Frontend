"use client";

import Link from "next/link";
import { Edit, Eye, Trash2, Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import InstructorCourseCard from "./InstructorCourseCard";

interface Course {
  _id: string;
  name: string;
  description: string;
  thumbnail: string;
  price: number;
  type: string;
  published: string;
  approved: boolean;
  featured: boolean;
  certificate: boolean;
  courseDuration: string;
  tags: string[];
  totalStudents: number;
  totalModules: number;
  createdAt: string;
}

function CoursesListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Courses</h2>
          <p className="text-muted-foreground">Loading your courses...</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="group hover:shadow-lg transition-shadow duration-300 pt-0 flex flex-col h-full">
            <CardHeader className="p-0">
              <Skeleton className="w-full h-48 rounded-t-lg" />
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-4 w-4" />
              </div>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3 mb-3" />
              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-14" />
                <Skeleton className="h-5 w-10" />
              </div>
            </CardContent>
            <CardFooter className="pt-0 mt-auto">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* Table Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
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
              {[...Array(3)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8" />
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

export default function CoursesList({ courses = [], isLoading = false }: { courses?: Course[]; isLoading?: boolean }) {
  const displayCourses = courses.length > 0 ? courses : [];

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

  if (isLoading) {
    return <CoursesListSkeleton />;
  }

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
        {displayCourses.length > 0 ? (
          displayCourses.map((course) => <InstructorCourseCard key={course._id} course={course} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No courses yet</h3>
            <p className="text-sm text-muted-foreground mb-4">Create your first course to get started</p>
            <Button asChild>
              <Link href="/instructor-dashboard/courses/create">
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Link>
            </Button>
          </div>
        )}
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
              {displayCourses.length > 0 ? (
                displayCourses.map((course) => (
                  <TableRow key={course._id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{course.name}</div>
                        <div className="text-sm text-muted-foreground">{course.courseDuration} hours</div>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(course.type)}</TableCell>
                    <TableCell>{getStatusBadge(course.published, course.approved)}</TableCell>
                    <TableCell>{course.totalStudents || 0}</TableCell>
                    <TableCell>${((course.totalStudents || 0) * course.price).toLocaleString()}</TableCell>
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
                            <Link href={`/instructor-dashboard/courses/${course._id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/instructor-dashboard/courses/${course._id}/edit`}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Course
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/instructor-dashboard/courses/${course._id}/modules`}>
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center">
                      <BookOpen className="w-8 h-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No courses found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
