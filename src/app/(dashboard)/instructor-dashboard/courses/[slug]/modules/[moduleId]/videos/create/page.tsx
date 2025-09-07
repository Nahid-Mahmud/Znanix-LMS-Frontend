"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, Save, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateModuleVideoMutation } from "@/redux/features/modulesVideos/modulesVideo.api";
import FileUploader from "@/components/FileUploader";
import { type FileWithPreview } from "@/hooks/use-file-upload";
import dynamic from "next/dynamic";

// Dynamically import the MDX editor to avoid SSR issues
const MDXEditor = dynamic(() => import("@/components/ui/mdx-editor").then((mod) => ({ default: mod.MDXEditor })), {
  ssr: false,
  loading: () => <div className="border rounded-md p-4 min-h-[100px] bg-muted animate-pulse" />,
});

const createVideoSchema = z
  .object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().max(10000, { message: "Description must be at most 10000 characters" }).optional(),
    duration: z.string().min(1, { message: "Duration is required" }),
    videoNumber: z.number().min(1, { message: "Video number must be at least 1" }),
    videoFile: z.string().optional(),
    youtubeVideoUrl: z.string().optional(),
    useYoutubeVideo: z.boolean().optional(),
  })
  .refine(
    (data) => {
      // If using YouTube video, YouTube URL is required
      if (data.useYoutubeVideo && (!data.youtubeVideoUrl || data.youtubeVideoUrl.trim() === "")) {
        return false;
      }
      return true;
    },
    {
      message: "YouTube video URL is required when using YouTube video.",
      path: ["youtubeVideoUrl"],
    }
  )
  .refine(
    (data) => {
      // If not using YouTube video, video file is required
      if (!data.useYoutubeVideo && (!data.videoFile || data.videoFile.trim() === "")) {
        return false;
      }
      return true;
    },
    {
      message: "Please upload a video file.",
      path: ["videoFile"],
    }
  );

type CreateVideoFormData = z.infer<typeof createVideoSchema>;

export default function CreateVideoPage() {
  const params = useParams();
  const router = useRouter();
  const [videoFiles, setVideoFiles] = useState<FileWithPreview[]>([]);

  const [createModuleVideoFn, { isLoading }] = useCreateModuleVideoMutation();

  const form = useForm<CreateVideoFormData>({
    resolver: zodResolver(createVideoSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: "",
      videoNumber: 1,
      videoFile: "",
      youtubeVideoUrl: "",
      useYoutubeVideo: false,
    },
  });

  const watchedUseYoutubeVideo = form.watch("useYoutubeVideo");

  // Clear fields when switching between YouTube and video upload
  useEffect(() => {
    if (watchedUseYoutubeVideo) {
      // Clear video file when switching to YouTube
      form.setValue("videoFile", "");
      setVideoFiles([]);
    } else {
      // Clear YouTube URL when switching to video upload
      form.setValue("youtubeVideoUrl", "");
    }
  }, [watchedUseYoutubeVideo, form]);

  // Handle video file changes
  const handleVideoChange = (files: FileWithPreview[]) => {
    setVideoFiles(files);
    // Update form value for validation
    form.setValue("videoFile", files.length > 0 ? files[0].file.name : "");

    // Auto-fill title with filename if title is empty
    if (files.length > 0 && !form.getValues("title")) {
      const filename = files[0].file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
      form.setValue("title", filename);
    }

    // Trigger validation
    form.trigger("videoFile");
  };

  const onSubmit = async (data: CreateVideoFormData) => {
    try {
      // Validate based on video type
      if (!data.useYoutubeVideo && !videoFiles[0]?.file) {
        toast.error("Please upload a video file");
        return;
      }

      if (data.useYoutubeVideo && (!data.youtubeVideoUrl || data.youtubeVideoUrl.trim() === "")) {
        toast.error("Please enter a YouTube video URL");
        return;
      }

      const formData = new FormData();

      // Prepare the video data according to backend schema
      const videoData = {
        moduleId: params.moduleId as string,
        videoNumber: data.videoNumber,
        title: data.title,
        duration: data.duration,
        description: data.description || "",
        // Only include youtubeVideoUrl if using YouTube video
        ...(data.useYoutubeVideo ? { youtubeVideoUrl: data.youtubeVideoUrl } : {}),
        // Only include useYoutubeVideo flag when it's true
        ...(data.useYoutubeVideo ? { useYoutubeVideo: data.useYoutubeVideo } : {}),
      };

      // Append the data
      formData.append("data", JSON.stringify(videoData));

      // Only append video file if not using YouTube video
      if (!data.useYoutubeVideo && videoFiles[0]?.file) {
        formData.append("file", videoFiles[0].file as File);
      }

      const response = await createModuleVideoFn(formData).unwrap();

      if (response.success) {
        toast.success("Video created successfully!", {
          description: `Video "${data.title}" has been added to the module.`,
        });
        router.back();
      }
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "status" in error && (error as any).status === 409) {
        toast.error("A video with this number already exists in the module. Please choose a different number.");
        return;
      }
      toast.error("Failed to create video. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Add Video</h1>
              <p className="text-muted-foreground">Upload a new video to this module</p>
            </div>
          </div>
        </div>

        {/* Create Form */}
        <Card>
          <CardHeader>
            <CardTitle>Video Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* YouTube Video Option */}
                <FormField
                  control={form.control}
                  name="useYoutubeVideo"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Use YouTube Video</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Use a YouTube video instead of uploading a video file
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                {/* YouTube URL Input */}
                {form.watch("useYoutubeVideo") && (
                  <FormField
                    control={form.control}
                    name="youtubeVideoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>YouTube Video URL *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter YouTube video URL (e.g., https://www.youtube.com/watch?v=...)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Video Upload - Only show if not using YouTube */}
                {!form.watch("useYoutubeVideo") && (
                  <FormField
                    control={form.control}
                    name="videoFile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video File *</FormLabel>
                        <FormControl>
                          <div>
                            <FileUploader
                              maxSize={100 * 1024 * 1024} // 100MB max
                              accept="video/*"
                              onFilesChange={handleVideoChange}
                              placeholder="Upload video file"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                        {videoFiles.length === 0 && (
                          <p className="text-sm text-muted-foreground">
                            Supported formats: MP4, MOV, AVI, WMV (Max size: 100MB)
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                )}

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
                        <MDXEditor
                          value={field.value || ""}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          placeholder="Describe what students will learn in this video..."
                          className="min-h-[200px]"
                        />
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
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Create Video
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
