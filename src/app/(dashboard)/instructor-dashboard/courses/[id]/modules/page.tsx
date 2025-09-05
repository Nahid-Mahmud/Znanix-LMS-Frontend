"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Edit, Trash2, Play, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CreateModuleModal from "@/components/instructor/CreateModuleModal";

// Mock modules data
const mockModules = [
  {
    id: "1",
    moduleNumber: 1,
    title: "Introduction to React",
    duration: "2 hours",
    courseId: "1",
    videos: [
      { id: "1", videoNumber: 1, title: "What is React?", duration: "15 min", url: "" },
      { id: "2", videoNumber: 2, title: "Setting up Development Environment", duration: "20 min", url: "" },
      { id: "3", videoNumber: 3, title: "Your First React Component", duration: "25 min", url: "" },
    ],
  },
  {
    id: "2",
    moduleNumber: 2,
    title: "Components and JSX",
    duration: "3 hours",
    courseId: "1",
    videos: [
      { id: "4", videoNumber: 1, title: "Understanding JSX", duration: "30 min", url: "" },
      { id: "5", videoNumber: 2, title: "Props and State", duration: "35 min", url: "" },
      { id: "6", videoNumber: 3, title: "Event Handling", duration: "25 min", url: "" },
    ],
  },
  {
    id: "3",
    moduleNumber: 3,
    title: "State Management",
    duration: "4 hours",
    courseId: "1",
    videos: [],
  },
];

export default function ModulesManagementPage() {
  const params = useParams();
  const router = useRouter();
  const [modules, setModules] = useState(mockModules);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
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
          {modules.map((module) => (
            <Card key={module.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold">{module.moduleNumber}</span>
                    </div>
                    <div>
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                      <CardDescription>
                        {module.duration} • {module.videos.length} videos
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/instructor-dashboard/courses/${params.id}/modules/${module.id}/edit`}>
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
                {module.videos.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Module Videos</h4>
                      <Button size="sm" asChild>
                        <Link href={`/instructor-dashboard/courses/${params.id}/modules/${module.id}/videos/create`}>
                          <Plus className="w-4 h-4 mr-1" />
                          Add Video
                        </Link>
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {module.videos.map((video) => (
                        <div
                          key={video.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                              <Play className="w-4 h-4" />
                            </div>
                            <div>
                              <h5 className="font-medium">{video.title}</h5>
                              <p className="text-sm text-muted-foreground">
                                Video {video.videoNumber} • {video.duration}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link
                                href={`/instructor-dashboard/courses/${params.id}/modules/${module.id}/videos/${video.id}/edit`}
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
                      <Link href={`/instructor-dashboard/courses/${params.id}/modules/${module.id}/videos/create`}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add First Video
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
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
          courseId={params.id as string}
        />
      </div>
    </div>
  );
}
