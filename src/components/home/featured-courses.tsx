import { Button } from "@/components/ui/button";
import CourseCard from "@/components/CourseCard";
import {
  webDevelopmentCodingScreenWithHtmlCssJavasc,
  dataSciencePythonProgrammingChartsGraphsAnal,
  digitalMarketingSocialMediaAdvertisingAnalyti,
  placeholderSvg,
} from "@/assets";

const featuredCourses = [
  {
    id: "1",
    name: "Complete Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript, React, and Node.js in this comprehensive course",
    thumbnail: webDevelopmentCodingScreenWithHtmlCssJavasc,
    price: 99,
    originalPrice: 0,
    introVideo: "",
    tags: ["Web Development", "JavaScript", "React"],
    slug: "complete-web-development-bootcamp",
    type: "PAID",
    instructor: {
      name: "Sarah Johnson",
      avatar: placeholderSvg,
    },
    courseDuration: "40 hours",
    certificate: false,
    discount: 0,
    featured: true,
    rating: 4.8,
    students: 15420,
    category: "Web Development",
  },
  {
    id: "2",
    name: "Data Science with Python",
    description: "Learn data analysis, machine learning, and visualization with Python",
    thumbnail: dataSciencePythonProgrammingChartsGraphsAnal,
    price: 79,
    originalPrice: 0,
    introVideo: "",
    tags: ["Data Science", "Python", "Machine Learning"],
    slug: "data-science-with-python",
    type: "PAID",
    instructor: {
      name: "Dr. Michael Chen",
      avatar: placeholderSvg,
    },
    courseDuration: "35 hours",
    certificate: false,
    discount: 0,
    featured: true,
    rating: 4.9,
    students: 8930,
    category: "Data Science",
  },
  {
    id: "3",
    name: "Digital Marketing Mastery",
    description: "Complete guide to SEO, social media, and online advertising strategies",
    thumbnail: digitalMarketingSocialMediaAdvertisingAnalyti,
    price: 0,
    originalPrice: 0,
    introVideo: "",
    tags: ["Marketing", "SEO", "Social Media"],
    slug: "digital-marketing-mastery",
    type: "FREE",
    instructor: {
      name: "Emma Rodriguez",
      avatar: placeholderSvg,
    },
    courseDuration: "25 hours",
    certificate: false,
    discount: 0,
    featured: true,
    rating: 4.7,
    students: 12500,
    category: "Marketing",
  },
  {
    id: "4",
    name: "UI/UX Design Fundamentals",
    description: "Learn the essentials of UI/UX design, prototyping, and user research with hands-on projects.",
    thumbnail: placeholderSvg,
    price: 59,
    originalPrice: 99,
    introVideo: "",
    tags: ["Design", "UI/UX", "Prototyping"],
    slug: "ui-ux-design-fundamentals",
    type: "PAID",
    instructor: {
      name: "Jessica Park",
      avatar: placeholderSvg,
    },
    courseDuration: "28 hours",
    certificate: true,
    discount: 40,
    featured: true,
    rating: 4.8,
    students: 5100,
    category: "Design",
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

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
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
