/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
  useUpdateCourseMutation,
} from "@/redux/features/courses/courses.api";
import { format } from "date-fns";
import {
  Calendar,
  CheckCircle,
  DollarSign,
  Eye,
  FileText,
  Search,
  Send,
  Star,
  StarOff,
  Trash2,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Course {
  _id: string;
  name: string;
  description: string;
  thumbnail: string;
  price: number;
  tags: string[];
  type: "PAID" | "FREE";
  instructor: {
    firstName: string;
    lastName: string;
    uid: string;
    profilePicture: string;
  };
  courseDuration: string;
  certificate: boolean;
  discount: number;
  featured: boolean;
  published: "DRAFT" | "PUBLISHED";
  approved: boolean;
  approvalRequest: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
  totalEnrolledStudents: number;
  discountPercentage: number;
  finalPrice: number;
  isFree: boolean;
  isPublished: boolean;
}

interface CoursesResponse {
  success: boolean;
  message: string;
  data: Course[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  statusCode: number;
}

export default function ManageCourses() {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const [filters, setFilters] = useState({
    search: "",
    status: "all", // all, approved, pending, draft
    featured: "all", // all, featured, not-featured
    published: "all", // all, published, draft
  });

  // Separate state for search input (immediate UI update)
  const [searchInput, setSearchInput] = useState("");

  // State for delete confirmation modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput }));
      setParams((prev) => ({ ...prev, page: 1 })); // Reset to first page when search changes
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  // Build query params with filters
  const buildQueryParams = () => {

    const baseParams: any = { ...params };

    // Add search if present (using searchTerm to match your QueryBuilder)
    if (filters.search) {
      baseParams.searchTerm = filters.search;
    }

    // Handle status filter
    if (filters.status !== "all") {
      if (filters.status === "true") {
        // Approved courses
        baseParams.approved = true;
      } else if (filters.status === "pending") {
        // Pending approval courses
        baseParams.approved = false;
        baseParams.approvalRequest = true;
      } else if (filters.status === "draft") {
        // Draft courses
        baseParams.approved = false;
        baseParams.approvalRequest = false;
      }
    }

    // Handle featured filter
    if (filters.featured !== "all") {
      baseParams.featured = filters.featured === "true";
    }

    // Handle published filter
    if (filters.published !== "all") {
      baseParams.published = filters.published === "published" ? "PUBLISHED" : "DRAFT";
    }

    return baseParams;
  };

  const queryParams = buildQueryParams();

  const {
    data: coursesResponse,
    isLoading,
    error,
  } = useGetAllCoursesQuery(queryParams) as {
    data: CoursesResponse | undefined;
    isLoading: boolean;
    error: any;
  };

  // Mutations
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

  const courses = coursesResponse?.data || [];
  const meta = coursesResponse?.meta;

  const handlePageChange = (page: number) => {
    setParams({ ...params, page });
  };

  const handleApproveCourse = async (courseId: string) => {
    try {
      await updateCourse({
        id: courseId,
        data: {
          approved: true,
          approvalRequest: false,
        },
      }).unwrap();
      console.log("Course approved successfully");
    } catch (error) {
      console.error("Failed to approve course:", error);
    }
  };

  const handleRequestApproval = async (courseId: string) => {
    try {
      await updateCourse({
        id: courseId,
        data: {
          approvalRequest: true,
        },
      }).unwrap();
      console.log("Approval requested successfully");
    } catch (error) {
      console.error("Failed to request approval:", error);
    }
  };

  const handleToggleFeatured = async (courseId: string, currentFeatured: boolean) => {
    try {
      await updateCourse({
        id: courseId,
        data: {
          featured: !currentFeatured,
        },
      }).unwrap();
      console.log(`Course ${!currentFeatured ? "set as" : "removed from"} featured successfully`);
    } catch (error) {
      console.error("Failed to toggle featured status:", error);
    }
  };

  const handlePublishCourse = async (courseId: string, currentStatus: string) => {
    try {
      await updateCourse({
        id: courseId,
        data: {
          published: currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED",
        },
      }).unwrap();
      console.log(`Course ${currentStatus === "PUBLISHED" ? "unpublished" : "published"} successfully`);
    } catch (error) {
      console.error("Failed to toggle publish status:", error);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    setCourseToDelete(courseId);
    setDeleteModalOpen(true);
  };

  const confirmDeleteCourse = async () => {
    if (!courseToDelete) return;

    try {
      await deleteCourse(courseToDelete).unwrap();
      setDeleteModalOpen(false);
      setCourseToDelete(null);
      // Optionally show success message
    } catch (error) {
      console.error("Failed to delete course:", error);
      // Optionally show error message
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  const getStatusBadge = (course: Course) => {
    if (course.approved) {
      return (
        <Badge variant="default" className="bg-green-500">
          Approved
        </Badge>
      );
    }
    if (course.approvalRequest) {
      return (
        <Badge variant="secondary" className="bg-yellow-500">
          Pending
        </Badge>
      );
    }
    return <Badge variant="outline">Draft</Badge>;
  };

  const getPublishStatusBadge = (published: string) => {
    return published === "PUBLISHED" ? (
      <Badge variant="default" className="bg-blue-500">
        Published
      </Badge>
    ) : (
      <Badge variant="outline">Draft</Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-500">Error loading courses</div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Manage Courses</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Total: {meta?.total || 0} courses</span>
            <span>
              Page {meta?.page || 1} of {meta?.totalPages || 1}
            </span>
          </div>
        </div>
        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="flex-1">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                className="pl-10 pr-10"
              />
              {searchInput && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchInput("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              {/* Show a small indicator when search is being debounced */}
              {searchInput !== filters.search && searchInput && (
                <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-blue-500 animate-pulse" />
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Select
              value={filters.published}
              onValueChange={(value) => {
                setFilters({
                  ...filters,
                  published: value,
                  // Reset other filters when published is changed
                  status: "all",
                  featured: "all",
                });
                setParams({ ...params, page: 1 });
              }}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Published" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>{" "}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8">
                    No courses found
                  </TableCell>
                </TableRow>
              ) : (
                courses.map((course, index) => (
                  <TableRow key={course._id}>
                    <TableCell className="font-medium">
                      {((meta?.page || 1) - 1) * (meta?.limit || 10) + index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image
                          height={48}
                          width={48}
                          src={course.thumbnail}
                          alt={course.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <div>
                          <div className="font-medium">{course.name}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-48">{course.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Image
                          height={32}
                          width={32}
                          src={course.instructor.profilePicture}
                          alt={`${course.instructor.firstName} ${course.instructor.lastName}`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm">
                          {course.instructor.firstName} {course.instructor.lastName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-medium">{course.isFree ? "Free" : `$${course.finalPrice}`}</span>
                        {course.discount > 0 && (
                          <span className="text-sm text-muted-foreground line-through">${course.price}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(course)}</TableCell>
                    <TableCell>{getPublishStatusBadge(course.published)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {course.featured ? (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        ) : (
                          <StarOff className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-sm">{course.featured ? "Yes" : "No"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.totalEnrolledStudents}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{format(new Date(course.createdAt), "MMM dd, yyyy")}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              //   onClick={() => console.log("View course:", course.slug)}
                            >
                              <Link target="_blank noreferrer noopener" href={`/courses/${course.slug}`}>
                                <Eye className="w-4 h-4" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Course</p>
                          </TooltipContent>
                        </Tooltip>

                        {!course.approved && !course.approvalRequest && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRequestApproval(course._id)}
                                className="text-orange-600 hover:text-orange-700"
                                disabled={isUpdating}
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Request Approval</p>
                            </TooltipContent>
                          </Tooltip>
                        )}

                        {!course.approved && course.approvalRequest && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleApproveCourse(course._id)}
                                className="text-green-600 hover:text-green-700"
                                disabled={isUpdating}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Approve Course</p>
                            </TooltipContent>
                          </Tooltip>
                        )}

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleFeatured(course._id, course.featured)}
                              className={course.featured ? "text-yellow-600" : "text-gray-600"}
                              disabled={isUpdating}
                            >
                              {course.featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{course.featured ? "Remove from Featured" : "Set as Featured"}</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePublishCourse(course._id, course.published)}
                              className={course.published === "PUBLISHED" ? "text-blue-600" : "text-gray-600"}
                              disabled={isUpdating}
                            >
                              {course.published === "PUBLISHED" ? (
                                <FileText className="w-4 h-4" />
                              ) : (
                                <Send className="w-4 h-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{course.published === "PUBLISHED" ? "Unpublish Course" : "Publish Course"}</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteCourse(course._id)}
                              className="text-red-600 hover:text-red-700"
                              disabled={isDeleting}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete Course</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {meta && meta.totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(1, meta.page - 1))}
                    className={meta.page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {/* Page numbers */}
                {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
                  let pageNumber;
                  if (meta.totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (meta.page <= 3) {
                    pageNumber = i + 1;
                  } else if (meta.page >= meta.totalPages - 2) {
                    pageNumber = meta.totalPages - 4 + i;
                  } else {
                    pageNumber = meta.page - 2 + i;
                  }

                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNumber)}
                        isActive={pageNumber === meta.page}
                        className="cursor-pointer"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {meta.totalPages > 5 && meta.page < meta.totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(meta.totalPages, meta.page + 1))}
                    className={meta.page === meta.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={confirmDeleteCourse}
          title="Delete Course"
          description="Are you sure you want to delete this course? This action cannot be undone and will permanently remove all course content, student enrollments, and related data."
          confirmText="Delete Course"
          cancelText="Cancel"
          isLoading={isDeleting}
          variant="destructive"
        />
      </div>
    </TooltipProvider>
  );
}
