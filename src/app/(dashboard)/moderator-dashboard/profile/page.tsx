"use client";

import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  CalendarDays,
  Mail,
  MapPin,
  Edit,
  Save,
  X,
  Camera,
  GraduationCap,
  Shield,
  Users,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { useUpdateUserMutation, useUserInfoQuery } from "@/redux/features/user/user.api";
import { ProfileSkeleton } from "@/components/ProfileSkeleton";

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "INSTRUCTOR" | "ADMIN" | "USER";
  profilePicture: string;
  createdAt: string;
  uid: string;
}

interface UserProfileProps {
  user: UserData;
}

// Password validation schema
const passwordValidation = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, {
    message: "Password must contain at least one number",
  })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  });

// Profile update schema
const profileUpdateSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    profilePicture: z.string().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password || data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.password) {
        return passwordValidation.safeParse(data.password).success;
      }
      return true;
    },
    {
      message: "Password does not meet requirements",
      path: ["password"],
    }
  );

type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;

function UserProfile({ user }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updateUserFn, { isLoading }] = useUpdateUserMutation();

  const form = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      profilePicture: user.profilePicture,
      password: "",
      confirmPassword: "",
    },
  });

  const watchedValues = form.watch();
  const fullName = `${watchedValues.firstName} ${watchedValues.lastName}`;
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "INSTRUCTOR":
        return GraduationCap;
      case "ADMIN":
        return Shield;
      default:
        return Users;
    }
  };

  const RoleIcon = getRoleIcon(user.role);

  const onSubmit = async (data: ProfileUpdateFormData) => {
    try {
      const updateData: any = {
        firstName: data.firstName,
        lastName: data.lastName,
      };

      if (data.profilePicture && data.profilePicture !== user.profilePicture) {
        updateData.profilePicture = data.profilePicture;
      }

      if (data.password) {
        updateData.password = data.password;
      }

      const res = await updateUserFn({ data: updateData, id: user._id }).unwrap();

      if (res.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        // Reset password fields
        form.setValue("password", "");
        form.setValue("confirmPassword", "");
      }
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Profile update error:", error);
    }
  };

  const handleCancel = () => {
    form.reset({
      firstName: user.firstName,
      lastName: user.lastName,
      profilePicture: user.profilePicture,
      password: "",
      confirmPassword: "",
    });
    setIsEditing(false);
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        form.setValue("profilePicture", e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Profile</CardTitle>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  size="sm"
                  disabled={form.formState.isSubmitting || isLoading}
                >
                  {form.formState.isSubmitting || isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </>
                  )}
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-primary/20">
                    <AvatarImage src={watchedValues.profilePicture || "/placeholder.svg"} alt={fullName} />
                    <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
                      {watchedValues.firstName[0]}
                      {watchedValues.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="absolute bottom-0 right-0">
                      <Label htmlFor="photo-upload" className="cursor-pointer">
                        <div className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors">
                          <Camera className="w-4 h-4" />
                        </div>
                      </Label>
                      <Input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoChange}
                      />
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <h1 className="text-3xl font-bold">{fullName}</h1>
                  <Badge variant="secondary" className="mt-2 flex items-center gap-1 w-fit mx-auto">
                    <RoleIcon className="w-3 h-3" />
                    {user.role}
                  </Badge>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        {isEditing ? (
                          <FormControl>
                            <Input {...field} placeholder="Enter first name" />
                          </FormControl>
                        ) : (
                          <div className="mt-1 p-2 bg-muted rounded-md">{field.value}</div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        {isEditing ? (
                          <FormControl>
                            <Input {...field} placeholder="Enter last name" />
                          </FormControl>
                        ) : (
                          <div className="mt-1 p-2 bg-muted rounded-md">{field.value}</div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Email</Label>
                    <div className="mt-1 p-2 bg-muted rounded-md flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {user.email}
                    </div>
                  </div>

                  <div>
                    <Label>Member Since</Label>
                    <div className="mt-1 p-2 bg-muted rounded-md flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-muted-foreground" />
                      {memberSince}
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Section - Only show when editing */}
              {isEditing && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent hover:text-black dark:hover:text-white/80"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm new password"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent hover:text-black dark:hover:text-white/80"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* User Info */}
              <div className="border-t pt-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    User ID: {user.uid}
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProfilePage() {
  const { data: user, isLoading, error } = useUserInfoQuery(undefined);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <p className="text-destructive">Failed to load profile data. Please try again.</p>
        </div>
      </div>
    );
  }

  if (!user?.data) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <p className="text-muted-foreground">No profile data found.</p>
        </div>
      </div>
    );
  }

  return <UserProfile user={user.data} />;
}
