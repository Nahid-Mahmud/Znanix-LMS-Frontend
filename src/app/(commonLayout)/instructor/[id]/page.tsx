"use client";

import { use } from "react";
import { useState } from "react";
import { useGetPublicInstructorProfileQuery } from "@/redux/features/user/user.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  Facebook,
  Users,
} from "lucide-react";
import Link from "next/link";

interface InstructorProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function InstructorProfilePage({ params }: InstructorProfilePageProps) {
  const { id } = use(params);
  const { data, isLoading, error } = useGetPublicInstructorProfileQuery(id);

  if (isLoading) {
    return <ProfileLoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <p className="text-destructive">Failed to load instructor profile. Please try again.</p>
        </div>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <p className="text-muted-foreground">Instructor profile not found.</p>
        </div>
      </div>
    );
  }

  const instructor = data.data;
  const fullName = `${instructor.firstName} ${instructor.lastName}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Instructor Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32 border-4 border-primary/20">
              <AvatarImage src={instructor.profilePicture || "/placeholder.svg"} alt={fullName} />
              <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
                {instructor.firstName[0]}
                {instructor.lastName[0]}
              </AvatarFallback>
            </Avatar>

            <div className="text-center">
              <h1 className="text-3xl font-bold">{fullName}</h1>
              <Badge variant="secondary" className="mt-2 flex items-center gap-1 w-fit mx-auto">
                <GraduationCap className="w-3 h-3" />
                Instructor
              </Badge>
            </div>
          </div>

          {/* Bio Section */}
          {instructor.bio && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                About
              </h3>
              <p className="text-muted-foreground leading-relaxed">{instructor.bio}</p>
            </div>
          )}

          {/* Experience Section */}
          {instructor.experience && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Experience
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{instructor.experience}</p>
            </div>
          )}

          {/* Skills Section */}
          {instructor.skills && instructor.skills.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {instructor.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Social Links Section */}
          {instructor.socialLinks &&
            (instructor.socialLinks.linkedin ||
              instructor.socialLinks.github ||
              instructor.socialLinks.twitter ||
              instructor.socialLinks.instagram ||
              instructor.socialLinks.facebook) && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Social Links</h3>
                <div className="flex flex-wrap gap-4">
                  {instructor.socialLinks.linkedin && (
                    <Link
                      href={instructor.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      <Linkedin className="w-5 h-5" />
                      LinkedIn
                    </Link>
                  )}
                  {instructor.socialLinks.github && (
                    <Link
                      href={instructor.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      <Github className="w-5 h-5" />
                      GitHub
                    </Link>
                  )}
                  {instructor.socialLinks.twitter && (
                    <Link
                      href={instructor.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      <Twitter className="w-5 h-5" />
                      Twitter
                    </Link>
                  )}
                  {instructor.socialLinks.instagram && (
                    <Link
                      href={instructor.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      <Instagram className="w-5 h-5" />
                      Instagram
                    </Link>
                  )}
                  {instructor.socialLinks.facebook && (
                    <Link
                      href={instructor.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      <Facebook className="w-5 h-5" />
                      Facebook
                    </Link>
                  )}
                </div>
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Instructor Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="w-32 h-32 rounded-full" />
            <div className="text-center space-y-2">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-6 w-24 mx-auto" />
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t pt-6 space-y-3">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-6 w-48" />
          </div>

          {/* Bio Section */}
          <div className="border-t pt-6 space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
