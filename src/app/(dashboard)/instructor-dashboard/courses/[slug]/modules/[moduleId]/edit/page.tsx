"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetCourseModuleByIdQuery, useUpdateCourseModuleMutation } from "@/redux/features/modules/modules.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const editModuleSchema = z.object({
  title: z.string().min(2, { message: "Module title must be at least 2 characters." }),
  duration: z.string().optional(),
  order: z.number().min(1, { message: "Order must be at least 1." }),
});

type EditModuleFormData = z.infer<typeof editModuleSchema>;

// Mock module data - replace with actual API call

export default function EditModulePage() {
  const params = useParams();
  console.log(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: moduleData, isLoading: moduleLoading } = useGetCourseModuleByIdQuery(params.moduleId);
  const [updateModule, { isLoading: isUpdating }] = useUpdateCourseModuleMutation();
  console.log(moduleData);

  const form = useForm<EditModuleFormData>({
    resolver: zodResolver(editModuleSchema),
    defaultValues: {
      title: "",
      duration: "",
      order: 0,
    },
  });

  useEffect(() => {
    form.reset({
      title: moduleData?.data?.title,
      duration: moduleData?.data?.duration,
      order: moduleData?.data?.moduleNumber,
    });
  }, [moduleData, form]);

  const onSubmit = async (data: EditModuleFormData) => {
    setIsLoading(true);
    try {
      const moduleData = {
        ...data,
        id: params.moduleId,
        courseId: params.id,
        moduleNumber: data.order, // Map order to moduleNumber for API
      };

      await updateModule({ data: moduleData, id: params.moduleId }).unwrap();

      console.log("Updating module:", moduleData);

      toast.success("Module updated successfully!");
      router.push(`/instructor-dashboard/courses/${params.slug}/modules`);
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

                {/* Module Order and Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            placeholder="Enter module order"
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
