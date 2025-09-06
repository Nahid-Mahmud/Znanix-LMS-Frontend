"use client";

import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MDXEditor } from "@/components/ui/mdx-editor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { type FileWithPreview } from "@/hooks/use-file-upload";
import { useGetCoursesDetailBySlugQuery, useUpdateCourseMutation } from "@/redux/features/courses/courses.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Course types
enum CourseType {
  PAID = "PAID",
  FREE = "FREE",
}

const editCourseSchema = z
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
    thumbnail: z.string().optional(),
    introVideo: z.string().optional(),
    discount: z.number().min(0).max(100).optional(),
    longDescription: z
      .string("Long description is required")
      .min(20, "Long description must be at least 20 characters long")
      .max(10000, "Long description must be at most 5000 characters long"),
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

type EditCourseFormData = z.infer<typeof editCourseSchema>;

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;

  // State to track deleted files
  const [deletedFiles, setDeletedFiles] = useState<string[]>([]);

  // File upload state using FileWithPreview type
  const [thumbnailFiles, setThumbnailFiles] = useState<FileWithPreview[]>([]);
  const [videoFiles, setVideoFiles] = useState<FileWithPreview[]>([]);
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  const { data: courseData, isLoading: courseDataLoading } = useGetCoursesDetailBySlugQuery(slug, {
    skip: !slug,
  });

  console.log("Course Data:", courseData);

  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();

  // Handle thumbnail file changes
  const handleThumbnailChange = (files: FileWithPreview[]) => {
    // If there was an existing thumbnail and we're replacing it, mark it as deleted
    if (files.length > 0 && courseData?.data?.thumbnail && thumbnailFiles.length === 0) {
      setDeletedFiles((prev) => [...prev, courseData.data.thumbnail]);
    }

    setThumbnailFiles(files);
    // Update form value for validation
    form.setValue("thumbnail", files.length > 0 ? files[0].file.name : "");
    // Trigger validation
    form.trigger("thumbnail");
  };

  // Handle video file changes
  const handleVideoChange = (files: FileWithPreview[]) => {
    // If there was an existing intro video and we're replacing it, mark it as deleted
    if (files.length > 0 && courseData?.data?.introVideo && videoFiles.length === 0) {
      setDeletedFiles((prev) => [...prev, courseData.data.introVideo]);
    }

    setVideoFiles(files);
    // Update form value
    form.setValue("introVideo", files.length > 0 ? files[0].file.name : "");
    // Trigger validation
    form.trigger("introVideo");
  };

  const form = useForm<EditCourseFormData>({
    resolver: zodResolver(editCourseSchema),
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
      longDescription: "",
    },
  });

  // Watch for course type changes to automatically set price
  const watchedType = form.watch("type");

  useEffect(() => {
    if (watchedType === CourseType.FREE) {
      form.setValue("price", 0);
    }
  }, [watchedType, form]);

  // Update form when course data is loaded
  useEffect(() => {
    if (courseData?.data && !isFormInitialized) {
      const course = courseData.data;
      console.log("Updating form with course data:", course);

      const formData = {
        name: course.name || "",
        description: course.description || "",
        price: course.price || 0,
        courseDuration: parseInt(course.courseDuration) || 0,
        type: course.type || CourseType.PAID,
        certificate: course.certificate || false,
        tags: Array.isArray(course.tags) ? course.tags.join(", ") : "",
        thumbnail: course.thumbnail || "",
        introVideo: course.introVideo || "",
        discount: course.discount || 0,
        longDescription: course.longDescription || "",
      };

      console.log("Form data to set:", formData);
      form.reset(formData);
      setIsFormInitialized(true);
    }
  }, [courseData, form, isFormInitialized]);

  const onSubmit = async (data: EditCourseFormData) => {
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
        deletedFiles: deletedFiles, // Include deleted files in the submission
      };

      const formdata = new FormData();
      formdata.append("data", JSON.stringify(reformedData));

      if (thumbnailFiles[0]?.file instanceof File) {
        formdata.append("thumbnail", thumbnailFiles[0].file);
      }
      if (videoFiles[0]?.file instanceof File) {
        formdata.append("introVideo", videoFiles[0].file);
      }

      console.log("Deleted files to be processed:", deletedFiles);

      const response = await updateCourse({ id: courseData?.data._id, data: formdata }).unwrap();
      if (response.success) {
        toast.success("Course updated successfully!", {
          description: `Your course "${data.name}" has been updated.`,
        });
        // Clear deleted files after successful update
        setDeletedFiles([]);
        router.push(`/instructor-dashboard/courses/${slug}`);
      }
    } catch (error) {
      toast.error("Failed to update course. Please try again.");
      console.log(error);
    }
  };

  if (courseDataLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-20" />
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>

          {/* Form Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return <div>Course not found</div>;
  }

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
                      <FormLabel>Short Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your course within one or two sentences"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="longDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Long Description *</FormLabel>
                      <FormControl>
                        {isFormInitialized ? (
                          <MDXEditor
                            key={`mdx-${courseData?.data?._id}`}
                            value={field.value || ""}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                            placeholder="Write a detailed description of your course using markdown. You can format text, add headings, lists, links, and more..."
                            className="min-h-[200px]"
                            showPreview={true}
                          />
                        ) : (
                          <div className="min-h-[200px] border rounded-md flex items-center justify-center">
                            <span className="text-muted-foreground">Loading editor...</span>
                          </div>
                        )}
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
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Thumbnail</FormLabel>
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
                        {thumbnailFiles.length === 0 &&
                          courseData?.data?.thumbnail &&
                          !deletedFiles.includes(courseData?.data?.thumbnail || "") && (
                            <p className="text-sm text-muted-foreground">
                              Current thumbnail will be preserved if not changed
                            </p>
                          )}
                        {deletedFiles.includes(courseData?.data?.thumbnail || "") && (
                          <p className="text-sm text-red-600">Current thumbnail will be deleted</p>
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
                        <FormLabel>Intro Video</FormLabel>
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
                        {videoFiles.length === 0 &&
                          courseData?.data?.introVideo &&
                          !deletedFiles.includes(courseData?.data?.introVideo || "") && (
                            <p className="text-sm text-muted-foreground">
                              Current intro video will be preserved if not changed
                            </p>
                          )}
                        {deletedFiles.includes(courseData?.data?.introVideo || "") && (
                          <p className="text-sm text-red-600">Current intro video will be deleted</p>
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
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? (
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
