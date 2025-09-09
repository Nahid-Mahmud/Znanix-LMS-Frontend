import { Button } from "@/components/ui/button";
import { Play, Star, Users, BookOpen } from "lucide-react";
import Image from "next/image";
import { studentsLearningOnlineWithLaptopsAndBooksIn } from "@/assets";
import Link from "next/link";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Learn Skills That <span className="text-primary">Transform</span> Your Career
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-lg">
                Join thousands of learners mastering in-demand skills through our expert-led courses. Get certified and
                advance your career with hands-on projects.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-base">
                <Link href="/courses">Explore Courses</Link>
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="lg" className="text-base bg-transparent">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View a course detail!</TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">50k+ students</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">4.9</span>
                <span className="text-sm text-muted-foreground">(2,500 reviews)</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8">
              <Image
                src={studentsLearningOnlineWithLaptopsAndBooksIn}
                alt="Students learning online"
                className="w-full h-full object-cover rounded-xl"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", borderRadius: "0.75rem" }}
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-xl shadow-lg border">
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold">500+ Courses</p>
                  <p className="text-sm text-muted-foreground">Available now</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-card p-4 rounded-xl shadow-lg border">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-accent" />
                <div>
                  <p className="font-semibold">Expert Instructors</p>
                  <p className="text-sm text-muted-foreground">Industry leaders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
