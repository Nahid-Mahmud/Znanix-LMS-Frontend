import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, BookOpen } from "lucide-react";
import Image from "next/image";
import instructorSarah from "@/assets/instructor-sarah.jpg";
import instructorMichael from "@/assets/instructor-michael.jpg";
import instructorAlex from "@/assets/instructor-alex.jpg";
import instructorEmma from "@/assets/instructor-emma.jpg";
import instructorJessica from "@/assets/instructor-jessica.jpg";
import instructorRobert from "@/assets/instructor-robert.jpg";

const instructors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Full-Stack Development Expert",
    avatar: instructorSarah,
    rating: 4.9,
    students: 45000,
    courses: 12,
    specialties: ["JavaScript", "React", "Node.js", "Python"],
    bio: "Former Google engineer with 10+ years of experience building scalable web applications.",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    title: "Data Science & AI Specialist",
    avatar: instructorMichael,
    rating: 4.8,
    students: 32000,
    courses: 8,
    specialties: ["Machine Learning", "Python", "TensorFlow", "Statistics"],
    bio: "PhD in Computer Science, published researcher in machine learning and artificial intelligence.",
  },
  {
    id: 3,
    name: "Alex Rodriguez",
    title: "Frontend Development Guru",
    avatar: instructorAlex,
    rating: 4.9,
    students: 28000,
    courses: 15,
    specialties: ["React", "Vue.js", "TypeScript", "CSS"],
    bio: "Senior frontend architect at Meta, passionate about modern web development.",
  },
  {
    id: 4,
    name: "Emma Wilson",
    title: "Digital Marketing Strategist",
    avatar: instructorEmma,
    rating: 4.7,
    students: 22000,
    courses: 10,
    specialties: ["SEO", "Social Media", "Analytics", "Content Marketing"],
    bio: "Marketing director with proven track record of growing startups to unicorn status.",
  },
  {
    id: 5,
    name: "Jessica Park",
    title: "UX/UI Design Expert",
    avatar: instructorJessica,
    rating: 4.8,
    students: 18000,
    courses: 7,
    specialties: ["Figma", "Design Systems", "User Research", "Prototyping"],
    bio: "Lead designer at Airbnb, advocate for user-centered design and accessibility.",
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    title: "Machine Learning Engineer",
    avatar: instructorRobert,
    rating: 4.9,
    students: 35000,
    courses: 9,
    specialties: ["Deep Learning", "Computer Vision", "NLP", "PyTorch"],
    bio: "AI researcher and engineer, former Tesla Autopilot team member.",
  },
];

export default function InstructorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Meet Our Expert Instructors</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Learn from industry leaders and experienced professionals who are passionate about sharing their knowledge.
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {instructors.map((instructor) => (
            <Card key={instructor.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <Image
                  src={instructor.avatar}
                  alt={instructor.name}
                  width={96}
                  height={96}
                  className="rounded-full mx-auto mb-4"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <CardTitle className="text-lg">{instructor.name}</CardTitle>
                <p className="text-muted-foreground text-sm">{instructor.title}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{instructor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{instructor.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{instructor.courses}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground text-center text-pretty">{instructor.bio}</p>

                <div className="flex flex-wrap gap-1 justify-center">
                  {instructor.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full bg-transparent" variant="outline">
                  View Courses
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Become an Instructor */}
        <div className="bg-muted rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Become an Instructor</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">
            Share your expertise with millions of learners worldwide. Join our community of instructors and make an
            impact.
          </p>
          <Button size="lg">Start Teaching Today</Button>
        </div>
      </main>
    </div>
  );
}
