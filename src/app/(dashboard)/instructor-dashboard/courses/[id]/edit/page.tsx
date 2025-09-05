"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, Save, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { reactNextjsProgramming, placeholderSvg } from "@/assets";
import type { StaticImageData } from "next/image";

// Course types
enum CourseType {
  PAID = "PAID",
  FREE = "FREE",
}

enum CoursePublishStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

const editCourseSchema = z.object({
  name: z.string().min(2, { message: "Course name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.number().min(0, { message: "Price must be 0 or greater." }),
  courseDuration: z.string().optional(),
  type: z.nativeEnum(CourseType),
  certificate: z.boolean(),
  featured: z.boolean(),
  published: z.nativeEnum(CoursePublishStatus),
  tags: z.string().min(1, { message: "Please add at least one tag." }),
  thumbnail: z.union([z.string(), z.any()]).optional(),
  introVideo: z.string().optional(),
});

type EditCourseFormData = z.infer<typeof editCourseSchema>;

// Mock course data - replace with actual API call
const mockCourse = {
  id: "1",
  name: "Complete React Development",
  description:
    "Learn React from basics to advanced concepts including hooks, context, and modern patterns. This comprehensive course covers everything you need to know to become a proficient React developer.",
  price: 99.99,
  type: "PAID" as CourseType,
  published: "PUBLISHED" as CoursePublishStatus,
  certificate: true,
  featured: true,
  courseDuration: "12 weeks",
  tags: ["React", "JavaScript", "Frontend", "Web Development", "Modern JavaScript"],
  thumbnail: reactNextjsProgramming,
  introVideo: "/intro-video.mp4",
};

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const form = useForm<EditCourseFormData>({
    resolver: zodResolver(editCourseSchema),
    defaultValues: {
      name: mockCourse.name,
      description: mockCourse.description,
      price: mockCourse.price,
      courseDuration: mockCourse.courseDuration,
      type: mockCourse.type,
      certificate: mockCourse.certificate,
      featured: mockCourse.featured,
      published: mockCourse.published,
      tags: mockCourse.tags.join(", "),
      thumbnail: mockCourse.thumbnail,
      introVideo: mockCourse.introVideo,
    },
  });

  const onSubmit = async (data: EditCourseFormData) => {
    setIsLoading(true);
    try {
      // Convert tags string to array
      const tagsArray = data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const courseData = {
        ...data,
        tags: tagsArray,
        thumbnail: thumbnailFile ? URL.createObjectURL(thumbnailFile) : data.thumbnail,
        introVideo: videoFile ? URL.createObjectURL(videoFile) : data.introVideo,
      };

      console.log("Updating course:", courseData);

      // TODO: Implement API call to update course
      // await updateCourseMutation({ id: params.id, data: courseData }).unwrap();

      toast.success("Course updated successfully!");
      router.push(`/instructor-dashboard/courses/${params.id}`);
    } catch (error) {
      toast.error("Failed to update course. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Edit Course</h1>
              <p className="text-muted-foreground">Update your course information</p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Course Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe your course..." className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Course Type, Price, and Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select course type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={CourseType.PAID}>Paid</SelectItem>
                            <SelectItem value={CourseType.FREE}>Free</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (USD) *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={CoursePublishStatus.DRAFT}>Draft</SelectItem>
                            <SelectItem value={CoursePublishStatus.PUBLISHED}>Published</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Course Duration */}
                <FormField
                  control={form.control}
                  name="courseDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 8 weeks, 20 hours" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tags */}
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter tags separated by commas (e.g., web development, react, javascript)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* File Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Thumbnail Upload */}
                  <div className="space-y-2">
                    <FormLabel>Course Thumbnail</FormLabel>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      {mockCourse.thumbnail && !thumbnailFile && (
                        <div className="mb-4">
                          <Image
                            src={mockCourse.thumbnail}
                            alt="Current thumbnail"
                            width={400}
                            height={128}
                            className="w-full h-32 object-cover rounded"
                          />
                          <p className="text-sm text-muted-foreground mt-2">Current thumbnail</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                        className="hidden"
                        id="thumbnail-upload"
                      />
                      <label htmlFor="thumbnail-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          {thumbnailFile ? thumbnailFile.name : "Click to upload new thumbnail"}
                        </p>
                      </label>
                    </div>
                  </div>

                  {/* Intro Video Upload */}
                  <div className="space-y-2">
                    <FormLabel>Intro Video</FormLabel>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                        id="video-upload"
                      />
                      <label htmlFor="video-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          {videoFile ? videoFile.name : "Click to upload new intro video"}
                        </p>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="flex flex-col space-y-4">
                  <FormField
                    control={form.control}
                    name="certificate"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Certificate Available</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Students will receive a certificate upon completion
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Featured Course</FormLabel>
                          <p className="text-sm text-muted-foreground">Mark this course as featured</p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Update Course
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
