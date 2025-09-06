"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FileUploader from "@/components/FileUploader";
import { type FileWithPreview } from "@/hooks/use-file-upload";

// Course types
enum CourseType {
  PAID = "PAID",
  FREE = "FREE",
}

const createCourseSchema = z
  .object({
    name: z.string().min(2, { message: "Course name must be at least 2 characters." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }),
    price: z.number().min(0, { message: "Price must be 0 or greater." }),
    courseDuration: z.string().optional(),
    type: z.nativeEnum(CourseType),
    certificate: z.boolean(),
    featured: z.boolean(),
    tags: z.string().min(1, { message: "Please add at least one tag." }),
    thumbnail: z.string().optional(),
    introVideo: z.string().optional(),
  })
  .refine(
    (data) => {
      // If course type is PAID, price must be greater than 0
      if (data.type === CourseType.PAID && data.price <= 0) {
        return false;
      }
      return true;
    },
    {
      message: "Paid courses must have a price greater than 0.",
      path: ["price"],
    }
  );

type CreateCourseFormData = z.infer<typeof createCourseSchema>;

export default function CreateCoursePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // File upload state using FileWithPreview type
  const [thumbnailFiles, setThumbnailFiles] = useState<FileWithPreview[]>([]);
  const [videoFiles, setVideoFiles] = useState<FileWithPreview[]>([]);

  const form = useForm<CreateCourseFormData>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      courseDuration: "",
      type: CourseType.PAID,
      certificate: false,
      featured: false,
      tags: "",
    },
  });

  // Watch for course type changes to automatically set price
  const watchedType = form.watch("type");

  useEffect(() => {
    if (watchedType === CourseType.FREE) {
      form.setValue("price", 0);
    }
  }, [watchedType, form]);

  const onSubmit = async (data: CreateCourseFormData) => {
    // Validate thumbnail is uploaded
    if (thumbnailFiles.length === 0) {
      toast.error("Please upload a course thumbnail.");
      return;
    }

    setIsLoading(true);
    try {
      // Convert tags string to array
      const tagsArray = data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      // Prepare FormData for file uploads
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      // Set price to 0 for FREE courses, otherwise use the form value
      const finalPrice = data.type === CourseType.FREE ? 0 : data.price;
      formData.append("price", finalPrice.toString());
      formData.append("type", data.type);
      formData.append("certificate", data.certificate.toString());
      formData.append("featured", data.featured.toString());
      formData.append("tags", JSON.stringify(tagsArray));

      if (data.courseDuration) {
        formData.append("courseDuration", data.courseDuration);
      }

      // Add files if they exist
      if (thumbnailFiles[0]?.file instanceof File) {
        formData.append("thumbnail", thumbnailFiles[0].file);
      }
      if (videoFiles[0]?.file instanceof File) {
        formData.append("introVideo", videoFiles[0].file);
      }

      console.log("Creating course with FormData");

      // TODO: Implement API call to create course
      // const result = await createCourseMutation(formData).unwrap();

      toast.success("Course created successfully!");
      form.reset();
      // Clear files
      setThumbnailFiles([]);
      setVideoFiles([]);
      // router.push(`/instructor-dashboard/courses/${result.id}`);
      router.push("/instructor-dashboard");
    } catch (error) {
      toast.error("Failed to create course. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
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
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Create New Course</h1>
              <p className="text-muted-foreground">Build your next amazing course</p>
            </div>
          </div>
        </div>

        {/* Create Form */}
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

                {/* Course Type and Price */}
                <div className="grid grid-cols-2 gap-4">
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
                            disabled={watchedType === CourseType.FREE}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        {watchedType === CourseType.FREE && (
                          <p className="text-sm text-muted-foreground">
                            Price is automatically set to $0 for free courses
                          </p>
                        )}
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
                    <FormLabel>Course Thumbnail *</FormLabel>
                    <FileUploader
                      maxSize={20 * 1024 * 1024}
                      accept="image/*"
                      onFilesChange={setThumbnailFiles}
                      placeholder="Upload thumbnail image"
                    />
                    {thumbnailFiles.length === 0 && (
                      <p className="text-sm text-muted-foreground">Thumbnail image is required for the course</p>
                    )}
                  </div>

                  {/* Intro Video Upload */}
                  <div className="space-y-2">
                    <FormLabel>Intro Video</FormLabel>
                    <FileUploader
                      maxSize={20 * 1024 * 1024}
                      accept="video/*"
                      onFilesChange={setVideoFiles}
                      placeholder="Upload intro video"
                    />
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
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Create Course
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
