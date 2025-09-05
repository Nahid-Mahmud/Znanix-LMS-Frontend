"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Upload } from "lucide-react";

// Course types based on your schema
enum CourseType {
  PAID = "PAID",
  FREE = "FREE",
}

const createCourseSchema = z.object({
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
});

type CreateCourseFormData = z.infer<typeof createCourseSchema>;

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCourseModal({ isOpen, onClose }: CreateCourseModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

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

  const onSubmit = async (data: CreateCourseFormData) => {
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
        thumbnail: thumbnailFile ? URL.createObjectURL(thumbnailFile) : "",
        introVideo: videoFile ? URL.createObjectURL(videoFile) : "",
      };

      console.log("Creating course:", courseData);

      // TODO: Implement API call to create course
      // await createCourseMutation(courseData).unwrap();

      toast.success("Course created successfully!");
      form.reset();
      setThumbnailFile(null);
      setVideoFile(null);
      onClose();
    } catch (error) {
      toast.error("Failed to create course. Please try again.");
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogDescription>Create a new course and start building your curriculum.</DialogDescription>
        </DialogHeader>

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
                    <Textarea placeholder="Describe your course..." className="min-h-[100px]" {...field} />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Thumbnail Upload */}
              <div className="space-y-2">
                <FormLabel>Course Thumbnail</FormLabel>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
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
                      {thumbnailFile ? thumbnailFile.name : "Click to upload thumbnail"}
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
                      {videoFile ? videoFile.name : "Click to upload intro video"}
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col space-y-3">
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
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Course"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
