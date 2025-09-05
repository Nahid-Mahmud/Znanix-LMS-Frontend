import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";
import Image from "next/image";
import {
  webDevelopmentCodingScreenWithHtmlCssJavasc,
  dataSciencePythonProgrammingChartsGraphsAnal,
  digitalMarketingSocialMediaAdvertisingAnalyti,
  placeholderSvg,
} from "@/assets";

const featuredCourses = [
  {
    id: 1,
    name: "Complete Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript, React, and Node.js in this comprehensive course",
    thumbnail: webDevelopmentCodingScreenWithHtmlCssJavasc,
    price: 99,
    instructor: "Sarah Johnson",
    courseDuration: "40 hours",
    students: 15420,
    rating: 4.8,
    tags: ["Web Development", "JavaScript", "React"],
    featured: true,
    type: "PAID",
  },
  {
    id: 2,
    name: "Data Science with Python",
    description: "Learn data analysis, machine learning, and visualization with Python",
    thumbnail: dataSciencePythonProgrammingChartsGraphsAnal,
    price: 79,
    instructor: "Dr. Michael Chen",
    courseDuration: "35 hours",
    students: 8930,
    rating: 4.9,
    tags: ["Data Science", "Python", "Machine Learning"],
    featured: true,
    type: "PAID",
  },
  {
    id: 3,
    name: "Digital Marketing Mastery",
    description: "Complete guide to SEO, social media, and online advertising strategies",
    thumbnail: digitalMarketingSocialMediaAdvertisingAnalyti,
    price: 0,
    instructor: "Emma Rodriguez",
    courseDuration: "25 hours",
    students: 12500,
    rating: 4.7,
    tags: ["Marketing", "SEO", "Social Media"],
    featured: true,
    type: "FREE",
  },
];

export function FeaturedCourses() {
  return (
    <section id="courses" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Featured Courses</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover our most popular courses taught by industry experts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative">
                  <Image
                    src={course.thumbnail || placeholderSvg}
                    alt={course.name}
                    className="w-full h-48 object-cover"
                    width={400}
                    height={192}
                    style={{ objectFit: "cover" }}
                  />
                  {course.type === "FREE" && <Badge className="absolute top-3 left-3 bg-accent">Free</Badge>}
                  {course.featured && <Badge className="absolute top-3 right-3 bg-primary">Featured</Badge>}
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-2">{course.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {course.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.courseDuration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">by {course.instructor}</p>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex items-center justify-between">
                <div className="text-2xl font-bold">{course.price === 0 ? "Free" : `$${course.price}`}</div>
                <Button>Enroll Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
