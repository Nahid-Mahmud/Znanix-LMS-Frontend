"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetCourseStatsQuery,
  useGetDashboardStatsQuery,
  useGetEnrollmentStatsQuery,
  useGetInstructorStatsQuery,
  useGetOverallStatsQuery,
  useGetRevenueStatsQuery,
  useGetUserStatsQuery,
} from "@/redux/features/stats/stats.api";
import {
  Award,
  BookOpen,
  DollarSign,
  GraduationCap,
  Star,
  TrendingUp,
  UserCheck,
  Users
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AdminDashboard() {
  const { data: dashboardStats, isLoading: dashboardLoading } = useGetDashboardStatsQuery(undefined);
  const { data: overallStats, isLoading: overallLoading } = useGetOverallStatsQuery(undefined);
  const { data: userStats, isLoading: userLoading } = useGetUserStatsQuery(undefined);
  const { data: courseStats, isLoading: courseLoading } = useGetCourseStatsQuery(undefined);
  const { data: enrollmentStats, isLoading: enrollmentLoading } = useGetEnrollmentStatsQuery(undefined);
  const { data: revenueStats, isLoading: revenueLoading } = useGetRevenueStatsQuery(undefined);
  const { data: instructorStats, isLoading: instructorLoading } = useGetInstructorStatsQuery(undefined);

  const isLoading =
    dashboardLoading ||
    overallLoading ||
    userLoading ||
    courseLoading ||
    enrollmentLoading ||
    revenueLoading ||
    instructorLoading;

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  // Prepare data for charts
  const userRoleData = userStats?.data?.usersByRole
    ? [
        { name: "Students", value: userStats.data.usersByRole.students },
        { name: "Instructors", value: userStats.data.usersByRole.instructors },
        { name: "Admins", value: userStats.data.usersByRole.admins },
        { name: "Moderators", value: userStats.data.usersByRole.moderators },
      ]
    : [];

  const courseTypeData = courseStats?.data?.coursesByType
    ? [
        { name: "Free", value: courseStats.data.coursesByType.free },
        { name: "Paid", value: courseStats.data.coursesByType.paid },
      ]
    : [];

  const revenueStatusData = revenueStats?.data?.revenueByStatus
    ? [
        { name: "Paid", value: revenueStats.data.revenueByStatus.paid },
        { name: "Pending", value: revenueStats.data.revenueByStatus.pending },
        { name: "Failed", value: revenueStats.data.revenueByStatus.failed },
        { name: "Refunded", value: revenueStats.data.revenueByStatus.refunded },
      ]
    : [];

  interface EnrollmentTrendItem {
    date: string | Date;
    count: number;
  }

  interface EnrollmentTrendData {
    date: string;
    enrollments: number;
  }

  const enrollmentTrendData: EnrollmentTrendData[] =
    enrollmentStats?.data?.enrollmentTrend?.map((item: EnrollmentTrendItem) => ({
      date: new Date(item.date).toLocaleDateString(),
      enrollments: item.count,
    })) || [];

  interface RevenueTrendItem {
    date: string | Date;
    amount: number;
  }

  interface RevenueTrendData {
    date: string;
    revenue: number;
  }

  const revenueTrendData: RevenueTrendData[] =
    revenueStats?.data?.revenueTrend?.map((item: RevenueTrendItem) => ({
      date: new Date(item.date).toLocaleDateString(),
      revenue: item.amount,
    })) || [];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Overview of Zanix. Where learning meets innovation.</p>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            Live Data
          </Badge>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{overallStats?.data?.totalUsers || 0}</div>
                  <p className="text-xs text-muted-foreground">{userStats?.data?.activeUsers || 0} active users</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{overallStats?.data?.totalCourses || 0}</div>
                  <p className="text-xs text-muted-foreground">{courseStats?.data?.publishedCourses || 0} published</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{overallStats?.data?.totalEnrollments || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {enrollmentStats?.data?.activeEnrollments || 0} active
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold">${overallStats?.data?.totalRevenue || 0}</div>
                  <p className="text-xs text-muted-foreground">${revenueStats?.data?.monthlyRevenue || 0} this month</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>User Distribution by Role</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-64 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={userRoleData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userRoleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Course Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Course Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-64 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={courseTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Trend Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enrollment Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Trend</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-64 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={enrollmentTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="enrollments" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-64 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={revenueTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                    <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Revenue Status Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Status</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-64 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={revenueStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: $${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {revenueStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value}`} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Top Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Top Courses by Enrollment</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {enrollmentStats?.data?.topCourses?.map(
                    (
                      course: {
                        courseId: string;
                        courseName: string;
                        enrollmentCount: number;
                      },
                      index: number
                    ) => (
                      <div key={course.courseId} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{course.courseName}</p>
                            <p className="text-sm text-muted-foreground">{course.enrollmentCount} enrollments</p>
                          </div>
                        </div>
                        <Badge variant="secondary">{course.enrollmentCount}</Badge>
                      </div>
                    )
                  ) || <p className="text-center text-muted-foreground">No course data available</p>}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Top Instructors */}
        <Card>
          <CardHeader>
            <CardTitle>Top Instructors</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {instructorStats?.data?.topInstructors?.map(
                  (instructor: {
                    instructorId: string;
                    instructorName: string;
                    totalCourses: number;
                    totalEnrollments: number;
                    totalRevenue: number;
                  }) => (
                    <div key={instructor.instructorId} className="p-4 bg-muted rounded-lg">
                      <h3 className="font-semibold">{instructor.instructorName}</h3>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Courses:</span>
                          <span>{instructor.totalCourses}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Students:</span>
                          <span>{instructor.totalEnrollments}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revenue:</span>
                          <span className="text-green-600 font-medium">${instructor.totalRevenue}</span>
                        </div>
                      </div>
                    </div>
                  )
                ) || <p className="text-center text-muted-foreground col-span-full">No instructor data available</p>}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{userStats?.data?.verifiedUsers || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {userStats?.data?.totalUsers
                      ? Math.round((userStats.data.verifiedUsers / userStats.data.totalUsers) * 100)
                      : 0}
                    % verification rate
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Course Price</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold">${courseStats?.data?.averageCoursePrice || 0}</div>
                  <p className="text-xs text-muted-foreground">Average price per course</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold">${revenueStats?.data?.averageOrderValue || 0}</div>
                  <p className="text-xs text-muted-foreground">Per transaction</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Users</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{userStats?.data?.recentUsers || 0}</div>
                  <p className="text-xs text-muted-foreground">New registrations</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
