import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star, Clock, Users, Award, Play } from "lucide-react";
import Image from "next/image";
import type { StaticImageData } from "next/image";

export interface CourseCardProps {
  course: {
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
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card key={course.id} className="group hover:shadow-lg transition-shadow duration-300 pt-0 flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={course.thumbnail}
            alt={course.name}
            width={600}
            height={192}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            style={{ objectFit: "cover" }}
            priority
          />
          {course.featured && (
            <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600 text-white">Bestseller</Badge>
          )}
          {course.type === "FREE" && (
            <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600 text-white">Free</Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {course.category}
          </Badge>
          {course.certificate && <Award className="h-4 w-4 text-primary" />}
        </div>

        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-balance">{course.name}</h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 text-pretty">{course.description}</p>

        <div className="flex items-center gap-2 mb-3">
          <Image
            src={course.instructor.avatar || "/placeholder.svg"}
            alt={course.instructor.name}
            width={24}
            height={24}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm text-muted-foreground">{course.instructor.name}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.courseDuration}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {course.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {course.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{course.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 mt-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {course.type === "FREE" ? (
              <span className="text-lg font-bold text-green-600">Free</span>
            ) : (
              <>
                <span className="text-lg font-bold text-foreground">${course.price}</span>
                {course.originalPrice > course.price && (
                  <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
                )}
              </>
            )}
          </div>
          <Button size="sm">View Details</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
