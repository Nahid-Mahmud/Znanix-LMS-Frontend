"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const createModuleSchema = z.object({
  title: z.string().min(2, { message: "Module title must be at least 2 characters." }),
  duration: z.string().optional(),
});

type CreateModuleFormData = z.infer<typeof createModuleSchema>;

interface CreateModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}

export default function CreateModuleModal({ isOpen, onClose, courseId }: CreateModuleModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateModuleFormData>({
    resolver: zodResolver(createModuleSchema),
    defaultValues: {
      title: "",
      duration: "",
    },
  });

  const onSubmit = async (data: CreateModuleFormData) => {
    setIsLoading(true);
    try {
      const moduleData = {
        ...data,
        courseId,
        moduleNumber: Date.now(), // In real app, calculate next module number
      };

      console.log("Creating module:", moduleData);

      // TODO: Implement API call to create module
      // await createModuleMutation(moduleData).unwrap();

      toast.success("Module created successfully!");
      form.reset();
      onClose();
    } catch (error) {
      toast.error("Failed to create module. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Module</DialogTitle>
          <DialogDescription>Add a new module to organize your course content.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            {/* Module Duration */}
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
                  "Create Module"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
