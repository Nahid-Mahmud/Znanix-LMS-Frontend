import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users } from "lucide-react";
import Image from "next/image";
import { webDevelopmentCodingPng, reactNextjsProgramming, dataSciencePythonAnalytics, placeholderSvg } from "@/assets";

const featuredCourses = [
  {
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    originalPrice: 199,
    currentPrice: 49,
    rating: 4.8,
    students: 12543,
    duration: "42 hours",
    image: webDevelopmentCodingPng,
    bestseller: true,
  },
  {
    title: "Advanced React & Next.js Masterclass",
    instructor: "Mike Chen",
    originalPrice: 149,
    currentPrice: 39,
    rating: 4.9,
    students: 8921,
    duration: "28 hours",
    image: reactNextjsProgramming,
    bestseller: false,
  },
  {
    title: "Data Science with Python",
    instructor: "Dr. Emily Rodriguez",
    originalPrice: 179,
    currentPrice: 44,
    rating: 4.7,
    students: 15632,
    duration: "35 hours",
    image: dataSciencePythonAnalytics,
    bestseller: true,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Featured Courses</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Learn from industry experts with our most popular courses
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto ">
          {featuredCourses.map((course, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={course.image || placeholderSvg}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                  width={400}
                  height={192}
                  style={{ objectFit: "cover" }}
                />
              </div>

              <CardHeader className="space-y-3">
                <h3 className="text-lg font-semibold line-clamp-2 text-balance">{course.title}</h3>
                <p className="text-sm text-muted-foreground">by {course.instructor}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-primary">${course.currentPrice}</span>
                  <span className="text-lg text-muted-foreground line-through">${course.originalPrice}</span>
                  <Badge variant="secondary" className="text-xs">
                    {Math.round((1 - course.currentPrice / course.originalPrice) * 100)}% OFF
                  </Badge>
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full">Enroll Now</Button>
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
