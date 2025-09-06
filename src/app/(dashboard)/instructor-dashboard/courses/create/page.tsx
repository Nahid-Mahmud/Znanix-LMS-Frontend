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
import { useCreateCourseMutation } from "@/redux/features/courses/courses.api";

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
    courseDuration: z.number().min(0, { message: "Course duration is required" }),
    type: z.nativeEnum(CourseType),
    certificate: z.boolean(),
    tags: z
      .string()
      .min(1, { message: "Please add at least one tag." })
      .refine(
        (val) => {
          const tags = val
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t.length > 0);
          return tags.length <= 5;
        },
        { message: "Please provide at most 5 tags.", path: ["tags"] }
      ),
    thumbnail: z.string().min(1, { message: "Please upload a course thumbnail." }),
    introVideo: z.string().min(1, { message: "Please upload an intro video." }),
    discount: z.number().min(0).max(100).optional(),
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

  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();

  // Handle thumbnail file changes
  const handleThumbnailChange = (files: FileWithPreview[]) => {
    setThumbnailFiles(files);
    // Update form value for validation
    form.setValue("thumbnail", files.length > 0 ? files[0].file.name : "");
    // Trigger validation
    form.trigger("thumbnail");
  };

  // Handle video file changes
  const handleVideoChange = (files: FileWithPreview[]) => {
    setVideoFiles(files);
    // Update form value
    form.setValue("introVideo", files.length > 0 ? files[0].file.name : "");
    // Trigger validation
    form.trigger("introVideo");
  };

  const form = useForm<CreateCourseFormData>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      courseDuration: 0,
      type: CourseType.PAID,
      certificate: false,
      tags: "",
      thumbnail: "",
      introVideo: "",
      discount: 0,
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
    setIsLoading(true);
    try {
      // Convert tags string to array
      const tagsArray = data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const reformedData = {
        ...data,
        tags: tagsArray,
        price: data.type === CourseType.FREE ? 0 : data.price,
      };

      const formdata = new FormData();
      formdata.append("data", JSON.stringify(reformedData));
      if (thumbnailFiles[0]?.file instanceof File) {
        formdata.append("thumbnail", thumbnailFiles[0].file);
      }
      if (videoFiles[0]?.file instanceof File) {
        formdata.append("introVideo", videoFiles[0].file);
      }

      const response = await createCourse(formdata).unwrap();
      if (response.success) {
        toast.success("Course created successfully!", {
          description: `Your course "${data.name}" has been created.`,
        });
      }
      console.log(tagsArray);
      console.log("thumbnail", thumbnailFiles);
      console.log("introVideo", videoFiles);

      // router.push("/instructor-dashboard");
    } catch (error) {
      toast.error("Failed to create course. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}

        <div className="flex items-center flex-col mx-auto">
          <h1 className="text-3xl font-bold">Create New Course</h1>
          <p className="text-muted-foreground">Build your next amazing course</p>
        </div>

        {/* Create Form */}
        <Card className="">
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
                            <SelectTrigger className="w-full">
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
                        <FormLabel>Price (BDT) *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            {...field}
                            disabled={watchedType === CourseType.FREE}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
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
                        <Input
                          type="number"
                          placeholder="e.g., 8 weeks, 20 hours"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
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
                          placeholder="Enter up to 5 tags separated by commas (e.g., web development, react, javascript)"
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
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Thumbnail *</FormLabel>
                        <FormControl>
                          <div>
                            <FileUploader
                              maxSize={20 * 1024 * 1024}
                              accept="image/*"
                              onFilesChange={handleThumbnailChange}
                              placeholder="Upload thumbnail image"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                        {thumbnailFiles.length === 0 && (
                          <p className="text-sm text-muted-foreground">Thumbnail image is required for the course</p>
                        )}
                      </FormItem>
                    )}
                  />

                  {/* Intro Video Upload */}
                  <FormField
                    control={form.control}
                    name="introVideo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Intro Video *</FormLabel>
                        <FormControl>
                          <div>
                            <FileUploader
                              maxSize={20 * 1024 * 1024}
                              accept="video/*"
                              onFilesChange={handleVideoChange}
                              placeholder="Upload intro video"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                        {videoFiles.length === 0 && (
                          <p className="text-sm text-muted-foreground">Intro video is required for the course</p>
                        )}
                      </FormItem>
                    )}
                  />
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
