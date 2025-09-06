"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const editModuleSchema = z.object({
  title: z.string().min(2, { message: "Module title must be at least 2 characters." }),
  duration: z.string().optional(),
  moduleNumber: z.number().min(1, { message: "Module number must be at least 1." }),
});

type EditModuleFormData = z.infer<typeof editModuleSchema>;

// Mock module data - replace with actual API call
const mockModule = {
  id: "1",
  title: "Introduction to React",
  duration: "2 hours",
  moduleNumber: 1,
  courseId: "1",
};

export default function EditModulePage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EditModuleFormData>({
    resolver: zodResolver(editModuleSchema),
    defaultValues: {
      title: mockModule.title,
      duration: mockModule.duration,
      moduleNumber: mockModule.moduleNumber,
    },
  });

  const onSubmit = async (data: EditModuleFormData) => {
    setIsLoading(true);
    try {
      const moduleData = {
        ...data,
        id: params.moduleId,
        courseId: params.id,
      };

      console.log("Updating module:", moduleData);

      // TODO: Implement API call to update module
      // await updateModuleMutation(moduleData).unwrap();

      toast.success("Module updated successfully!");
      router.push(`/instructor-dashboard/courses/${params.id}/modules`);
    } catch (error) {
      toast.error("Failed to update module. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Modules
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Edit Module</h1>
              <p className="text-muted-foreground">Update module information</p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Module Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Module Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Module Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter module title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Module Number and Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="moduleNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Module Number *</FormLabel>
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
                        <FormLabel>Duration (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 2 hours, 3 weeks" {...field} />
                        </FormControl>
                        <FormMessage />
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
                        Update Module
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
