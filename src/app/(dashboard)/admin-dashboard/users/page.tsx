/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { TooltipProvider } from "@/components/ui/tooltip";
import { useGetAllUsersQuery, useUpdateUserMutation } from "@/redux/features/user/user.api";
import { format } from "date-fns";
import {
  Calendar,
  CheckCircle,
  Eye,
  Mail,
  MoreHorizontal,
  Phone,
  Search,
  Shield,
  Trash2,
  UserCheck,
  UserX,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "SUPER_ADMIN" | "INSTRUCTOR" | "STUDENT" | "MODERATOR";
  isActive: "ACTIVE" | "DISABLED";
  isDeleted: boolean;
  isVerified: boolean;
  profilePicture?: string;
  phoneNumber?: string;
  discordId?: string;
  address?: string;
  authOptions: Array<{
    provider: string;
    providerId: string;
  }>;
  uid: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

interface UsersResponse {
  success: boolean;
  message: string;
  data: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  statusCode: number;
}

export default function AllUsers() {
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const [filters, setFilters] = useState({
    search: "",
    role: "all", // all, ADMIN, INSTRUCTOR, STUDENT, etc.
    isActive: "all", // all, ACTIVE, DISABLED
    isVerified: "all", // all, true, false
  });

  // Separate state for search input (immediate UI update)
  const [searchInput, setSearchInput] = useState("");

  // State for delete confirmation modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: string; name: string } | null>(null);

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

    // Handle role filter
    if (filters.role !== "all") {
      baseParams.role = filters.role;
    }

    // Handle isActive filter
    if (filters.isActive !== "all") {
      baseParams.isActive = filters.isActive;
    }

    // Handle isVerified filter
    if (filters.isVerified !== "all") {
      baseParams.isVerified = filters.isVerified === "true";
    }

    return baseParams;
  };

  const queryParams = buildQueryParams();

  const {
    data: usersResponse,
    isLoading,
    error,
  } = useGetAllUsersQuery(queryParams) as {
    data: UsersResponse | undefined;
    isLoading: boolean;
    error: any;
  };

  const users = usersResponse?.data || [];
  const meta = usersResponse?.meta;

  const handlePageChange = (page: number) => {
    setParams({ ...params, page });
  };

  const getRoleBadge = (role: string) => {
    const roleColors = {
      SUPER_ADMIN: "bg-red-500",
      ADMIN: "bg-purple-500",
      INSTRUCTOR: "bg-blue-500",
      MODERATOR: "bg-orange-500",
      STUDENT: "bg-green-500",
    };
    return (
      <Badge variant="default" className={roleColors[role as keyof typeof roleColors] || "bg-gray-500"}>
        {role}
      </Badge>
    );
  };

  const getStatusBadge = (isActive: string) => {
    return isActive === "ACTIVE" ? (
      <Badge variant="default" className="bg-green-500">
        Active
      </Badge>
    ) : (
      <Badge variant="destructive">Disabled</Badge>
    );
  };

  const getVerificationBadge = (isVerified: boolean) => {
    return isVerified ? (
      <Badge variant="default" className="bg-blue-500">
        Verified
      </Badge>
    ) : (
      <Badge variant="outline">Unverified</Badge>
    );
  };

  // Mutation handlers
  const handleToggleUserStatus = async (userId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "ACTIVE" ? "DISABLED" : "ACTIVE";
      await updateUser({
        id: userId,
        data: {
          isActive: newStatus,
        },
      }).unwrap();
      toast.success(`User ${newStatus === "ACTIVE" ? "enabled" : "disabled"} successfully`);
    } catch (error) {
      console.error("Failed to toggle user status:", error);
      toast.error("Failed to update user status");
    }
  };

  const handleVerifyUser = async (userId: string) => {
    try {
      await updateUser({
        id: userId,
        data: {
          isVerified: true,
        },
      }).unwrap();
      toast.success("User verified successfully");
    } catch (error) {
      console.error("Failed to verify user:", error);
      toast.error("Failed to verify user");
    }
  };

  // const handleUpdateUserRole = async (userId: string, newRole: string) => {
  //   try {
  //     await updateUser({
  //       id: userId,
  //       data: {
  //         role: newRole,
  //       },
  //     }).unwrap();
  //     toast.success(`User role updated to ${newRole} successfully`);
  //   } catch (error) {
  //     console.error("Failed to update user role:", error);
  //     toast.error("Failed to update user role");
  //   }
  // };

  const handleDeleteUser = async (userId: string, userName: string, isDeleted: boolean) => {
    if (isDeleted) {
      // Don't show modal for users that are already deleted
      return;
    }
    setUserToDelete({ id: userId, name: userName });
    setDeleteModalOpen(true);
  };

  const handleActivateUser = async (userId: string) => {
    try {
      await updateUser({
        id: userId,
        data: {
          isDeleted: false,
        },
      }).unwrap();
      toast.success("User activated successfully");
    } catch (error) {
      console.error("Failed to activate user:", error);
      toast.error("Failed to activate user");
    }
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await updateUser({
        id: userToDelete.id,
        data: {
          isDeleted: true,
        },
      }).unwrap();
      setDeleteModalOpen(false);
      setUserToDelete(null);
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleCopyUserId = (uid: string) => {
    navigator.clipboard.writeText(uid);
    toast.success("User ID copied to clipboard");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-500">Error loading users</div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Total: {meta?.total || 0} users</span>
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
                placeholder="Search users by name or email..."
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
              value={filters.role}
              onValueChange={(value) => {
                setFilters({
                  ...filters,
                  role: value,
                  isActive: "all",
                  isVerified: "all",
                });
                setParams({ ...params, page: 1 });
              }}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
                <SelectItem value="MODERATOR">Moderator</SelectItem>
                <SelectItem value="STUDENT">Student</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.isActive}
              onValueChange={(value) => {
                setFilters({
                  ...filters,
                  isActive: value,
                  role: "all",
                  isVerified: "all",
                });
                setParams({ ...params, page: 1 });
              }}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="DISABLED">Disabled</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.isVerified}
              onValueChange={(value) => {
                setFilters({
                  ...filters,
                  isVerified: value,
                  role: "all",
                  isActive: "all",
                });
                setParams({ ...params, page: 1 });
              }}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Verification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="true">Verified</SelectItem>
                <SelectItem value="false">Unverified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Disabled</TableHead>
                {/* deleted */}
                <TableHead>Deleted</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">
                      {((meta?.page || 1) - 1) * (meta?.limit || 10) + index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.profilePicture || "/placeholder-user.jpg"}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">UID: {user.uid}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                        {user.phoneNumber && (
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{user.phoneNumber}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.isActive)}</TableCell>
                    <TableCell>{getVerificationBadge(user.isVerified)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.authOptions.map((auth, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {auth.provider}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{format(new Date(user.createdAt), "MMM dd, yyyy")}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.isActive === "DISABLED" ? (
                        <div>
                          <Badge variant="destructive">Disabled</Badge>
                        </div>
                      ) : (
                        <div>
                          <Badge variant="outline">Enabled</Badge>
                        </div>
                      )}
                    </TableCell>

                    {/* deleted */}

                    <TableCell>
                      {user.isDeleted ? (
                        <div>
                          <Badge variant="destructive">Deleted</Badge>
                        </div>
                      ) : (
                        <div>
                          <Badge variant="outline">Active</Badge>
                        </div>
                      )}
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleCopyUserId(user.uid)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Copy User ID
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleToggleUserStatus(user._id, user.isActive)}
                            disabled={isUpdating}
                          >
                            {user.isActive === "ACTIVE" ? (
                              <>
                                <UserX className="mr-2 h-4 w-4" />
                                Disable User
                              </>
                            ) : (
                              <>
                                <UserCheck className="mr-2 h-4 w-4" />
                                Enable User
                              </>
                            )}
                          </DropdownMenuItem>
                          {!user.isVerified && (
                            <DropdownMenuItem onClick={() => handleVerifyUser(user.uid)} disabled={isUpdating}>
                              <Shield className="mr-2 h-4 w-4" />
                              Verify User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              if (user.isDeleted) {
                                handleActivateUser(user._id);
                              } else {
                                handleDeleteUser(user._id, `${user.firstName} ${user.lastName}`, user.isDeleted);
                              }
                            }}
                            className="text-red-600 focus:text-red-600"
                            disabled={isUpdating}
                          >
                            {/* <Trash2 className="mr-2 h-4 w-4" />
                            Delete User */}
                            {user.isDeleted ? (
                              <>
                                {" "}
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Active User
                              </>
                            ) : (
                              <>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete User
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
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
          onConfirm={confirmDeleteUser}
          title="Delete User"
          description={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone and will permanently remove the user account and all associated data.`}
          confirmText="Delete User"
          cancelText="Cancel"
          isLoading={isUpdating}
          variant="destructive"
        />
      </div>
    </TooltipProvider>
  );
}
