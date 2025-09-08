"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";

import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import { instructorSidebarItems, studentSidebarItems } from "./sidebarItems";
import { UserRole } from "@/types/user.types";

// ...existing code...

// This is sample data.
// const data = studentSidebarItems;
// const data = instructorSidebarItems;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userInfo, isLoading: isUserLoading } = useUserInfoQuery(undefined);

  console.log("User Info:", userInfo, isUserLoading);

  const user = {
    name: userInfo?.data?.firstName + " " + userInfo?.data?.lastName || "Guest User",
    email: userInfo?.data?.email || "guest@example.com",
    avatar: userInfo?.data?.profilePicture || "/avatars/placeholder.png",
    role: userInfo?.data?.role || "student",
  };

  // dynamically set sidebar items based on user role
  const data = user?.role === UserRole.INSTRUCTOR ? instructorSidebarItems : studentSidebarItems;

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
      <SidebarContent>
        <NavMain items={data?.navMain} />
        {/* <NavProjects projects={data?.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
