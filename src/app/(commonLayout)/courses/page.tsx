"use client";

import CourseCard from "@/components/CourseCard";
import CourseCardSkeleton from "@/components/CourseCardSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllCoursesQuery } from "@/redux/features/courses/courses.api";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import type { StaticImageData } from "next/image";

// Course interface
interface Course {
  id: string;
  name: string;
  description: string;
  thumbnail: string | StaticImageData;
  price: number;
  originalPrice: number;
  introVideo: string;
  tags: string[];
  slug: string;
  type: string;
  instructor: {
    name: string;
    avatar: string | StaticImageData;
  };
  courseDuration: string;
  certificate: boolean;
  discount: number;
  featured: boolean;
  rating: number;
  students: number;
  category: string;
}

const categories = ["All", "Web Development", "Data Science", "Digital Marketing", "Design"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Rating", "Most Popular"];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Featured");
  const [priceFilter, setPriceFilter] = useState("All");
  const { data: coursesResponse, isLoading } = useGetAllCoursesQuery(undefined);

  // Transform API data to match component expectations
  const apiCourses: Course[] =
    coursesResponse?.data?.map((course: any) => ({
      id: course._id,
      name: course.name,
      description: course.description,
      thumbnail: course.thumbnail,
      price: course.finalPrice || course.price,
      originalPrice: course.price,
      introVideo: "", // Not provided in API
      tags: course.tags || [],
      slug: course.slug,
      type: course.type,
      instructor: {
        name: `${course.instructor.firstName} ${course.instructor.lastName}`,
        avatar: course.instructor.profilePicture,
      },
      courseDuration: `${course.courseDuration} hours`,
      certificate: course.certificate,
      discount: course.discountPercentage || 0,
      featured: course.featured,
      rating: 0, // Default to 0 as requested
      students: course.totalEnrolledStudents || 0,
      category: "General", // Default category since not provided in API
    })) || [];

  const filteredCourses = apiCourses.filter((course: Course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;

    const matchesPrice =
      priceFilter === "All" ||
      (priceFilter === "Free" && course.type === "FREE") ||
      (priceFilter === "Paid" && course.type === "PAID");

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (selectedSort) {
      case "Price: Low to High":
        return a.price - b.price;
      case "Price: High to Low":
        return b.price - a.price;
      case "Rating":
        return b.rating - a.rating;
      case "Most Popular":
        return b.students - a.students;
      default: // Featured
        return b.featured ? 1 : -1;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Explore Our Courses</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover thousands of courses from expert instructors. Learn at your own pace and advance your career.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search courses, skills, or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={isLoading}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Filter */}
            <Select value={priceFilter} onValueChange={setPriceFilter} disabled={isLoading}>
              <SelectTrigger className="w-full lg:w-32">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={selectedSort} onValueChange={setSelectedSort} disabled={isLoading}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {isLoading ? "Loading courses..." : `Showing ${sortedCourses.length} of ${apiCourses.length} courses`}
          </p>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {isLoading
            ? // Show skeleton loading cards
              Array.from({ length: 8 }).map((_, index) => <CourseCardSkeleton key={index} />)
            : // Show actual courses
              sortedCourses.map((course) => <CourseCard key={course.id} course={course} />)}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Courses
          </Button>
        </div>
      </main>
    </div>
  );
}
