"use client";

import dataScienceThumb from "@/assets/data-science-python-analytics.jpg";
import digitalMarketingThumb from "@/assets/digital-marketing-course.png";
import instructorAlex from "@/assets/instructor-alex.jpg";
import instructorEmma from "@/assets/instructor-emma.jpg";
import instructorJessica from "@/assets/instructor-jessica.jpg";
import instructorMichael from "@/assets/instructor-michael.jpg";
import instructorRobert from "@/assets/instructor-robert.jpg";
import instructorSarah from "@/assets/instructor-sarah.jpg";
import mlThumb from "@/assets/machine-learning-course.png";
import reactNextThumb from "@/assets/react-nextjs-programming.jpg";
import uiuxThumb from "@/assets/ui-ux-design-course.png";
import webDevThumb from "@/assets/web-development-coding.png";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search } from "lucide-react";
import { useState } from "react";

// Mock course data based on the schema
const mockCourses = [
  {
    id: "1",
    name: "Complete Web Development Bootcamp",
    description:
      "Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB from scratch. Build real-world projects and become a full-stack developer.",
    thumbnail: webDevThumb,
    price: 89.99,
    originalPrice: 199.99,
    introVideo: "/intro-web-dev.mp4",
    tags: ["JavaScript", "React", "Node.js", "MongoDB"],
    slug: "complete-web-development-bootcamp",
    type: "PAID",
    instructor: {
      name: "Sarah Johnson",
      avatar: instructorSarah,
    },
    courseDuration: "42 hours",
    certificate: true,
    discount: 55,
    featured: true,
    rating: 4.8,
    students: 12543,
    category: "Web Development",
  },
  {
    id: "2",
    name: "Data Science with Python",
    description:
      "Master data analysis, machine learning, and visualization with Python. Work with real datasets and build predictive models.",
    thumbnail: dataScienceThumb,
    price: 79.99,
    originalPrice: 149.99,
    introVideo: "/intro-data-science.mp4",
    tags: ["Python", "Machine Learning", "Pandas", "NumPy"],
    slug: "data-science-with-python",
    type: "PAID",
    instructor: {
      name: "Dr. Michael Chen",
      avatar: instructorMichael,
    },
    courseDuration: "38 hours",
    certificate: true,
    discount: 47,
    featured: true,
    rating: 4.9,
    students: 8932,
    category: "Data Science",
  },
  {
    id: "3",
    name: "React & Next.js Masterclass",
    description:
      "Build modern web applications with React and Next.js. Learn hooks, context, server-side rendering, and deployment.",
    thumbnail: reactNextThumb,
    price: 69.99,
    originalPrice: 129.99,
    introVideo: "/intro-react.mp4",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    slug: "react-nextjs-masterclass",
    type: "PAID",
    instructor: {
      name: "Alex Rodriguez",
      avatar: instructorAlex,
    },
    courseDuration: "35 hours",
    certificate: true,
    discount: 46,
    featured: false,
    rating: 4.7,
    students: 6721,
    category: "Web Development",
  },
  {
    id: "4",
    name: "Digital Marketing Fundamentals",
    description:
      "Learn SEO, social media marketing, content strategy, and analytics. Grow your business with proven digital marketing techniques.",
    thumbnail: digitalMarketingThumb,
    price: 0,
    originalPrice: 0,
    introVideo: "/intro-marketing.mp4",
    tags: ["SEO", "Social Media", "Analytics", "Content Marketing"],
    slug: "digital-marketing-fundamentals",
    type: "FREE",
    instructor: {
      name: "Emma Wilson",
      avatar: instructorEmma,
    },
    courseDuration: "25 hours",
    certificate: true,
    discount: 0,
    featured: false,
    rating: 4.6,
    students: 15432,
    category: "Digital Marketing",
  },
  {
    id: "5",
    name: "UI/UX Design Complete Course",
    description:
      "Master user interface and user experience design. Learn Figma, design principles, prototyping, and user research methods.",
    thumbnail: uiuxThumb,
    price: 59.99,
    originalPrice: 119.99,
    introVideo: "/intro-design.mp4",
    tags: ["Figma", "Design Systems", "Prototyping", "User Research"],
    slug: "ui-ux-design-complete-course",
    type: "PAID",
    instructor: {
      name: "Jessica Park",
      avatar: instructorJessica,
    },
    courseDuration: "30 hours",
    certificate: true,
    discount: 50,
    featured: false,
    rating: 4.8,
    students: 4567,
    category: "Design",
  },
  {
    id: "6",
    name: "Machine Learning A-Z",
    description:
      "Complete machine learning course covering supervised and unsupervised learning, neural networks, and deep learning with practical projects.",
    thumbnail: mlThumb,
    price: 94.99,
    originalPrice: 179.99,
    introVideo: "/intro-ml.mp4",
    tags: ["Machine Learning", "Deep Learning", "TensorFlow", "Scikit-learn"],
    slug: "machine-learning-a-z",
    type: "PAID",
    instructor: {
      name: "Dr. Robert Kim",
      avatar: instructorRobert,
    },
    courseDuration: "45 hours",
    certificate: true,
    discount: 47,
    featured: true,
    rating: 4.9,
    students: 9876,
    category: "Data Science",
  },
];

const categories = ["All", "Web Development", "Data Science", "Digital Marketing", "Design"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Rating", "Most Popular"];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Featured");
  const [priceFilter, setPriceFilter] = useState("All");

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

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
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
            <Select value={priceFilter} onValueChange={setPriceFilter}>
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
            <Select value={selectedSort} onValueChange={setSelectedSort}>
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
            Showing {sortedCourses.length} of {mockCourses.length} courses
          </p>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sortedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
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
