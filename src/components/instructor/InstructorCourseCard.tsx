import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Award, BookOpen, Clock, DollarSign, Edit, Eye, MoreVertical, Trash2, Users } from "lucide-react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";

export interface InstructorCourseCardProps {
  course: {
    id: string;
    name: string;
    description: string;
    thumbnail: string | StaticImageData;
    price: number;
    type: string;
    published: string;
    approved: boolean;
    featured: boolean;
    certificate: boolean;
    courseDuration: string;
    tags: string[];
    enrolledStudents: number;
    totalModules: number;
    createdAt: string;
  };
}

export default function InstructorCourseCard({ course }: InstructorCourseCardProps) {
  const getStatusBadge = (published: string, approved: boolean) => {
    if (published === "PUBLISHED" && approved) {
      return <Badge className="bg-green-100 text-green-800">Published</Badge>;
    } else if (published === "PUBLISHED" && !approved) {
      return <Badge className="bg-yellow-100 text-yellow-800">Pending Approval</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 pt-0 flex flex-col h-full">
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
          <div className="absolute top-2 right-2 flex gap-2">
            {course.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
            {getStatusBadge(course.published, course.approved)}
          </div>
          <div className="absolute top-2 left-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href={`/instructor-dashboard/courses/${course.id}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/instructor-dashboard/courses/${course.id}/edit`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Course
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/instructor-dashboard/courses/${course.id}/modules`}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Manage Modules
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Course
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={course.type === "FREE" ? "secondary" : "default"} className="text-xs">
            {course.type}
          </Badge>
          {course.certificate && <Award className="h-4 w-4 text-primary" />}
        </div>

        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-balance">{course.name}</h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 text-pretty">{course.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {course.enrolledStudents} students
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            {course.totalModules} modules
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {course.courseDuration}
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />${(course.enrolledStudents * course.price).toLocaleString()}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {course.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {course.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{course.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 mt-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{course.price === 0 ? "Free" : `$${course.price}`}</span>
            <span className="text-xs text-muted-foreground">
              Created {new Date(course.createdAt).toLocaleDateString()}
            </span>
          </div>
          <Button size="sm" asChild>
            <Link href={`/instructor-dashboard/courses/${course.id}`}>Manage</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
