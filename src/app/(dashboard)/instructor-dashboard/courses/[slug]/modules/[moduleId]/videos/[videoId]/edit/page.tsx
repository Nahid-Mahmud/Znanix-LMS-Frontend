"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, Save, Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetModuleVideoByIdQuery,
  useUpdateModuleVideoMutation,
} from "@/redux/features/modulesVideos/modulesVideo.api";
import FileUploader from "@/components/FileUploader";
import { type FileWithPreview } from "@/hooks/use-file-upload";
import dynamic from "next/dynamic";

// Dynamically import the MDX editor to avoid SSR issues
const MDXEditor = dynamic(() => import("@/components/ui/mdx-editor").then((mod) => ({ default: mod.MDXEditor })), {
  ssr: false,
  loading: () => <div className="border rounded-md p-4 min-h-[100px] bg-muted animate-pulse" />,
});

// Dynamic import for ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const editVideoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().max(10000, { message: "Description must be at most 10000 characters" }).optional(),
  duration: z.string().min(1, { message: "Duration is required" }),
  videoNumber: z.number().min(1, { message: "Video number must be at least 1" }),
  videoFile: z.string().optional(),
});

type EditVideoFormData = z.infer<typeof editVideoSchema>;

export default function EditVideoPage() {
  const params = useParams();
  const router = useRouter();
  const videoId = params.videoId as string;

  // State to track deleted files
  const [deletedFiles, setDeletedFiles] = useState<string[]>([]);

  // File upload state using FileWithPreview type
  const [videoFiles, setVideoFiles] = useState<FileWithPreview[]>([]);
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  const { data: videoData, isLoading: videoDataLoading } = useGetModuleVideoByIdQuery(videoId, {
    skip: !videoId,
  });

  console.log("Video Data:", videoData);

  const [updateModuleVideo, { isLoading: isUpdating }] = useUpdateModuleVideoMutation();

  // Handle video file changes
  const handleVideoChange = (files: FileWithPreview[]) => {
    // If there was an existing video and we're replacing it, mark it as deleted
    if (files.length > 0 && videoData?.data?.url && videoFiles.length === 0) {
      setDeletedFiles((prev) => [...prev, videoData.data.url]);
    }

    setVideoFiles(files);
    // Update form value for validation
    form.setValue("videoFile", files.length > 0 ? files[0].file.name : "");
    // Trigger validation
    form.trigger("videoFile");
  };

  const form = useForm<EditVideoFormData>({
    resolver: zodResolver(editVideoSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: "",
      videoNumber: 1,
      videoFile: "",
    },
  });

  // Update form when video data is loaded
  useEffect(() => {
    if (videoData?.data && !isFormInitialized) {
      const video = videoData.data;
      console.log("Updating form with video data:", video);

      const formData = {
        title: video.title || "",
        description: video.description || "",
        duration: video.duration || "",
        videoNumber: video.videoNumber || 1,
        videoFile: video.url || "",
      };

      console.log("Form data to set:", formData);
      form.reset(formData);
      setIsFormInitialized(true);
    }
  }, [videoData, form, isFormInitialized]);

  const onSubmit = async (data: EditVideoFormData) => {
    try {
      const reformedData = {
        title: data.title,
        description: data.description || "",
        duration: data.duration,
        videoNumber: data.videoNumber,
        deletedFiles: deletedFiles,
        // moduleId: videoData?.data.moduleId,
      };

      const formdata = new FormData();
      formdata.append("data", JSON.stringify(reformedData));

      if (videoFiles[0]?.file instanceof File) {
        formdata.append("file", videoFiles[0].file);
      }

      console.log("Deleted files to be processed:", deletedFiles);

      const response = await updateModuleVideo({ data: formdata, videoId: videoData?.data._id }).unwrap();
      if (response.success) {
        toast.success("Video updated successfully!", {
          description: `Video "${data.title}" has been updated.`,
        });
        // Clear deleted files after successful update
        setDeletedFiles([]);
        router.back();
      }
    } catch (error) {
      toast.error("Failed to update video. Please try again.");
      console.log(error);
    }
  };

  if (videoDataLoading) {
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
              {[...Array(5)].map((_, index) => (
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

  if (!videoData) {
    return <div>Video not found</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Edit Video</h1>
              <p className="text-muted-foreground">Update video information</p>
            </div>
          </div>
        </div>

        {/* Current Video Preview */}
        {videoData?.data?.url && videoFiles.length === 0 && !deletedFiles.includes(videoData?.data?.url || "") && (
          <Card>
            <CardHeader>
              <CardTitle>Current Video</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <ReactPlayer
                  src={videoData.data.url}
                  width="100%"
                  height="100%"
                  controls={true}
                  light={true}
                  playIcon={
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button size="lg" className="bg-white text-black hover:bg-white/90">
                        <Play className="h-6 w-6 mr-2" />
                        Preview Video
                      </Button>
                    </div>
                  }
                />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                <p className="font-medium">{videoData.data.title}</p>
                <p>Duration: {videoData.data.duration}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Video Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Video Upload */}
                <FormField
                  control={form.control}
                  name="videoFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Replace Video File (Optional)</FormLabel>
                      <FormControl>
                        <div>
                          <FileUploader
                            maxSize={100 * 1024 * 1024} // 100MB max
                            accept="video/*"
                            onFilesChange={handleVideoChange}
                            placeholder="Upload new video file"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      {videoFiles.length === 0 &&
                        videoData?.data?.url &&
                        !deletedFiles.includes(videoData?.data?.url || "") && (
                          <p className="text-sm text-muted-foreground">
                            Current video will be preserved if not changed
                          </p>
                        )}
                      {deletedFiles.includes(videoData?.data?.url || "") && (
                        <p className="text-sm text-red-600">Current video will be deleted</p>
                      )}
                    </FormItem>
                  )}
                />

                {/* Video Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter video title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Video Number and Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="videoNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video Number *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="1"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 15 min, 1h 30min" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        {isFormInitialized ? (
                          <MDXEditor
                            key={`mdx-${videoData?.data?._id}`}
                            value={field.value || ""}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                            placeholder="Describe what students will learn in this video..."
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
                        Update Video
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
