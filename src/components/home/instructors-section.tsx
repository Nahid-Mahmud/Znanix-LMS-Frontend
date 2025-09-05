import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  professionalHeadshotWomanSoftwareEngineerGoog,
  professionalHeadshotManDataScientistMicrosoft,
  professionalHeadshotWomanMarketingDirectorMet,
  professionalHeadshotManUxDesignerApple,
  placeholderSvg,
} from "@/assets";

const instructors = [
  {
    name: "Sarah Johnson",
    title: "Senior Full Stack Developer",
    company: "Google",
    expertise: ["JavaScript", "React", "Node.js"],
    students: 15420,
    courses: 8,
    avatar: professionalHeadshotWomanSoftwareEngineerGoog,
  },
  {
    name: "Dr. Michael Chen",
    title: "Data Science Lead",
    company: "Microsoft",
    expertise: ["Python", "Machine Learning", "AI"],
    students: 12350,
    courses: 6,
    avatar: professionalHeadshotManDataScientistMicrosoft,
  },
  {
    name: "Emma Rodriguez",
    title: "Digital Marketing Director",
    company: "Meta",
    expertise: ["SEO", "Social Media", "Analytics"],
    students: 18900,
    courses: 12,
    avatar: professionalHeadshotWomanMarketingDirectorMet,
  },
  {
    name: "James Wilson",
    title: "UX Design Manager",
    company: "Apple",
    expertise: ["UI/UX", "Figma", "Design Systems"],
    students: 9800,
    courses: 5,
    avatar: professionalHeadshotManUxDesignerApple,
  },
];

export function InstructorsSection() {
  return (
    <section id="instructors" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Learn from Industry Experts</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Our instructors are professionals working at top tech companies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <Image
                  src={instructor.avatar || placeholderSvg}
                  alt={instructor.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                  width={96}
                  height={96}
                  style={{ objectFit: "cover", borderRadius: "9999px" }}
                />
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{instructor.name}</h3>
                  <p className="text-sm text-muted-foreground">{instructor.title}</p>
                  <p className="text-sm font-medium text-primary">{instructor.company}</p>
                </div>

                <div className="flex flex-wrap gap-1 justify-center">
                  {instructor.expertise.slice(0, 2).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>{instructor.students.toLocaleString()} students</p>
                  <p>{instructor.courses} courses</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
