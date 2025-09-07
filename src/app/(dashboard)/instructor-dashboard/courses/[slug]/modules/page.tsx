"use client";

import CreateModuleModal from "@/components/instructor/CreateModuleModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCourseModulesByCourseIdQuery } from "@/redux/features/modules/modules.api";
import { ArrowLeft, Edit, FileText, Play, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ModulesManagementPage() {
  const params = useParams();
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  // console.log(params.slug);

  const { data: modulesData, isLoading: modulesLoading } = useGetCourseModulesByCourseIdQuery(params.slug);
  console.log(modulesData);

  // Use actual modules data from backend, fallback to empty array
  const modules = modulesData?.data || [];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Manage Modules</h1>
              <p className="text-muted-foreground">Organize your course content into modules</p>
            </div>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Module
          </Button>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          {modulesLoading ? (
            <div className="text-center py-8">
              <p>Loading modules...</p>
            </div>
          ) : (
            modules.map((module: any) => (
              <Card key={module._id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-semibold">{module.order + 1}</span>
                      </div>
                      <div>
                        <CardTitle className="text-xl">{module.title}</CardTitle>
                        <CardDescription>
                          {module.duration} • {module.videos?.length || 0} videos
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/instructor-dashboard/courses/${params.slug}/modules/${module._id}/edit`}>
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {module.videos && module.videos.length > 0 ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Module Videos</h4>
                        <Button size="sm" asChild>
                          <Link
                            href={`/instructor-dashboard/courses/${params.slug}/modules/${module._id}/videos/create`}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Video
                          </Link>
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {module.videos.map((video: any, index: number) => (
                          <div
                            key={video._id || index}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                                <Play className="w-4 h-4" />
                              </div>
                              <div>
                                <h5 className="font-medium">{video.title || `Video ${index + 1}`}</h5>
                                <p className="text-sm text-muted-foreground">
                                  Video {index + 1} • {video.duration || "Duration not set"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" asChild>
                                <Link
                                  href={`/instructor-dashboard/courses/${params.slug}/modules/${module._id}/videos/${video._id}/edit`}
                                >
                                  <Edit className="w-4 h-4" />
                                </Link>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 border border-dashed rounded-lg">
                      <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h4 className="font-medium mb-2">No videos yet</h4>
                      <p className="text-sm text-muted-foreground mb-4">Start by adding videos to this module</p>
                      <Button asChild>
                        <Link href={`/instructor-dashboard/courses/${params.slug}/modules/${module._id}/videos/create`}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add First Video
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Empty State */}
        {modules.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No modules yet</h3>
              <p className="text-muted-foreground mb-6">Start building your course by creating the first module</p>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Module
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Create Module Modal */}
        <CreateModuleModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          courseId={params.slug as string}
        />
      </div>
    </div>
  );
}
