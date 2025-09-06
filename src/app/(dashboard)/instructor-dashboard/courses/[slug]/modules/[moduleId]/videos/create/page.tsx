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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const createVideoSchema = z.object({
  title: z.string().min(2, { message: "Video title must be at least 2 characters." }),
  description: z.string().optional(),
  duration: z.string().min(1, { message: "Duration is required." }),
  videoNumber: z.number().min(1, { message: "Video number must be at least 1." }),
  url: z.string().optional(),
});

type CreateVideoFormData = z.infer<typeof createVideoSchema>;

export default function CreateVideoPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const form = useForm<CreateVideoFormData>({
    resolver: zodResolver(createVideoSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: "",
      videoNumber: 1,
      url: "",
    },
  });

  const onSubmit = async (data: CreateVideoFormData) => {
    setIsLoading(true);
    try {
      const videoData = {
        ...data,
        moduleId: params.moduleId,
        url: videoFile ? URL.createObjectURL(videoFile) : data.url,
      };

      console.log("Creating video:", videoData);

      // TODO: Implement API call to create video
      // await createVideoMutation(videoData).unwrap();

      toast.success("Video created successfully!");
      router.push(`/instructor-dashboard/courses/${params.id}/modules`);
    } catch (error) {
      toast.error("Failed to create video. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      // Auto-fill title with filename if title is empty
      if (!form.getValues("title")) {
        const filename = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
        form.setValue("title", filename);
      }
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
                {/* Video Upload */}
                <div className="space-y-2">
                  <FormLabel>Video File *</FormLabel>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg font-medium mb-2">{videoFile ? videoFile.name : "Upload Video"}</p>
                      <p className="text-sm text-gray-500">
                        {videoFile ? "Click to change video" : "Click to browse or drag and drop your video file"}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">Supported formats: MP4, MOV, AVI, WMV</p>
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

                {/* Video URL (Alternative to upload) */}
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://youtube.com/watch?v=... or other video URL" {...field} />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">
                        You can either upload a video file or provide a URL to an external video
                      </p>
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
