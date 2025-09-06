"use client";

import CoursesList from "@/components/instructor/CoursesList";
import StatsCardSkeleton from "@/components/StatsCardSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMyCourseStatsQuery, useMyCoursesQuery } from "@/redux/features/courses/courses.api";
import { BookOpen, Plus, Users } from "lucide-react";
import Link from "next/link";

export default function InstructorDashboard() {
  const { data: courseStatsData, isLoading: courseStatsLoading } = useGetMyCourseStatsQuery(undefined);
  const { data: myCoursesData, isLoading: myCoursesLoading } = useMyCoursesQuery(undefined);

  // Use actual API data or defaults
  const stats = {
    totalCourses: courseStatsData?.data?.totalCourses || 0,
    totalStudents: courseStatsData?.data?.totalStudents || 0,
    totalRevenue: courseStatsData?.data?.totalRevenue || 0,
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
            <p className="text-muted-foreground">Manage your courses and track your progress</p>
          </div>
          <Button asChild>
            <Link href="/instructor-dashboard/courses/create" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Course
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            {courseStatsLoading ? (
              <StatsCardSkeleton />
            ) : (
              <>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalCourses}</div>
                  <p className="text-xs text-muted-foreground">Active courses</p>
                </CardContent>
              </>
            )}
          </Card>
          <Card>
            {courseStatsLoading ? (
              <StatsCardSkeleton />
            ) : (
              <>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalStudents}</div>
                  <p className="text-xs text-muted-foreground">Enrolled students</p>
                </CardContent>
              </>
            )}
          </Card>
          <Card>
            {courseStatsLoading ? (
              <StatsCardSkeleton />
            ) : (
              <>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <span className="text-lg">$</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <span className="text-lg">$</span>
                    {stats.totalRevenue.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Total earnings</p>
                </CardContent>
              </>
            )}
          </Card>
        </div>

        <CoursesList courses={myCoursesData?.data || []} isLoading={myCoursesLoading} />
      </div>
    </div>
  );
}
