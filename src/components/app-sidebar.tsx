"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";

import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import { UserRole } from "@/types/user.types";
import { adminSidebarItems, instructorSidebarItems, moderatorsSidebarItems, studentSidebarItems } from "./sidebarItems";

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
  // const data = user?.role === UserRole.INSTRUCTOR ? instructorSidebarItems : studentSidebarItems;

  const getSidebarItemsByRole = (role: string) => {
    switch (role) {
      case UserRole.ADMIN:
        return adminSidebarItems;
      case UserRole.SUPER_ADMIN:
        return adminSidebarItems;
      case UserRole.INSTRUCTOR:
        return instructorSidebarItems;
      case UserRole.MODERATOR:
        return moderatorsSidebarItems;
      case UserRole.STUDENT:
      default:
        return studentSidebarItems;
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
      <SidebarContent>
        <NavMain items={getSidebarItemsByRole(user.role)?.navMain} />
        {/* <NavProjects projects={data?.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
