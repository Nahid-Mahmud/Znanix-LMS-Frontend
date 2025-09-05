"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, Save, Upload, Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const editVideoSchema = z.object({
  title: z.string().min(2, { message: "Video title must be at least 2 characters." }),
  description: z.string().optional(),
  duration: z.string().min(1, { message: "Duration is required." }),
  videoNumber: z.number().min(1, { message: "Video number must be at least 1." }),
  url: z.string().optional(),
});

type EditVideoFormData = z.infer<typeof editVideoSchema>;

// Mock video data - replace with actual API call
const mockVideo = {
  id: "1",
  title: "What is React?",
  description: "An introduction to React and its core concepts",
  duration: "15 min",
  videoNumber: 1,
  url: "/sample-video.mp4",
  moduleId: "1",
};

export default function EditVideoPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const form = useForm<EditVideoFormData>({
    resolver: zodResolver(editVideoSchema),
    defaultValues: {
      title: mockVideo.title,
      description: mockVideo.description,
      duration: mockVideo.duration,
      videoNumber: mockVideo.videoNumber,
      url: mockVideo.url,
    },
  });

  const onSubmit = async (data: EditVideoFormData) => {
    setIsLoading(true);
    try {
      const videoData = {
        ...data,
        id: params.videoId,
        moduleId: params.moduleId,
        url: videoFile ? URL.createObjectURL(videoFile) : data.url,
      };

      console.log("Updating video:", videoData);

      // TODO: Implement API call to update video
      // await updateVideoMutation(videoData).unwrap();

      toast.success("Video updated successfully!");
      router.push(`/instructor-dashboard/courses/${params.id}/modules`);
    } catch (error) {
      toast.error("Failed to update video. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
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
              Back to Modules
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Edit Video</h1>
              <p className="text-muted-foreground">Update video information</p>
            </div>
          </div>
        </div>

        {/* Current Video Preview */}
        {mockVideo.url && !videoFile && (
          <Card>
            <CardHeader>
              <CardTitle>Current Video</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">Video preview not available</p>
                  <p className="text-xs text-gray-400">{mockVideo.url}</p>
                </div>
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
                <div className="space-y-2">
                  <FormLabel>Replace Video File (Optional)</FormLabel>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm font-medium mb-1">{videoFile ? videoFile.name : "Upload New Video"}</p>
                      <p className="text-xs text-gray-500">
                        {videoFile ? "Click to change video" : "Click to browse or leave empty to keep current video"}
                      </p>
                    </label>
                  </div>
                </div>

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

                {/* Video URL */}
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://youtube.com/watch?v=... or other video URL" {...field} />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">Current URL or provide a new external video URL</p>
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
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what students will learn in this video..."
                          className="min-h-[100px]"
                          {...field}
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
