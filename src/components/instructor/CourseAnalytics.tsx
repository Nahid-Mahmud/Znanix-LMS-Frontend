"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, Star, BookOpen, PlayCircle, Award, DollarSign } from "lucide-react";

interface CourseAnalyticsProps {
  courseId: string;
}

export default function CourseAnalytics({ courseId }: CourseAnalyticsProps) {
  // Mock analytics data - replace with actual API call
  const [analytics] = useState({
    totalEnrollments: 450,
    enrollmentGrowth: 12.5,
    averageRating: 4.8,
    totalRatings: 123,
    completionRate: 68,
    averageWatchTime: 85,
    totalRevenue: 44550,
    revenueGrowth: 8.3,
    certificatesIssued: 306,
    popularModules: [
      { title: "React Hooks Deep Dive", completionRate: 92 },
      { title: "State Management", completionRate: 88 },
      { title: "Component Patterns", completionRate: 85 },
    ],
    recentActivity: [
      { type: "enrollment", count: 15, period: "today" },
      { type: "completion", count: 8, period: "today" },
      { type: "review", count: 3, period: "today" },
    ],
  });

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalEnrollments}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />+{analytics.enrollmentGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageRating}</div>
            <p className="text-xs text-muted-foreground">{analytics.totalRatings} reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.completionRate}%</div>
            <Progress value={analytics.completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />+{analytics.revenueGrowth}% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Modules */}
        <Card>
          <CardHeader>
            <CardTitle>Most Popular Modules</CardTitle>
            <CardDescription>Modules with highest completion rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analytics.popularModules.map((module, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{module.title}</span>
                  <span className="text-sm text-muted-foreground">{module.completionRate}%</span>
                </div>
                <Progress value={module.completionRate} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Activity</CardTitle>
            <CardDescription>Recent student interactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analytics.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {activity.type === "enrollment" && <Users className="w-4 h-4 text-blue-500" />}
                  {activity.type === "completion" && <Award className="w-4 h-4 text-green-500" />}
                  {activity.type === "review" && <Star className="w-4 h-4 text-yellow-500" />}
                  <div>
                    <p className="text-sm font-medium capitalize">{activity.type}s</p>
                    <p className="text-xs text-muted-foreground">{activity.period}</p>
                  </div>
                </div>
                <Badge variant="secondary">{activity.count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Watch Time</CardTitle>
            <PlayCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageWatchTime}%</div>
            <p className="text-xs text-muted-foreground">Average completion per video</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.certificatesIssued}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((analytics.certificatesIssued / analytics.totalEnrollments) * 100)}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Student Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(((analytics.averageRating - 1) / 4) * 100)}%</div>
            <p className="text-xs text-muted-foreground">Based on {analytics.averageRating}/5 rating</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
