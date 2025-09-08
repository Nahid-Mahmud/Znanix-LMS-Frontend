import { BarChart3, BookOpen, GraduationCap, Home } from "lucide-react";
import { title } from "process";

const studentSidebarItems = {
  navMain: [
    // {
    //   title: "Dashboard",
    //   url: "/student-dashboard",
    //   icon: BarChart3,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "Overview",
    //       url: "/student-dashboard",
    //     },
    //     {
    //       title: "Learning Stats",
    //       url: "/student-dashboard#stats",
    //     },
    //     {
    //       title: "Progress",
    //       url: "/student-dashboard#progress",
    //     },
    //   ],
    // },
    {
      title: "My Courses",
      url: "/student-dashboard",
      icon: BookOpen,
      items: [
        {
          title: "All Courses",
          url: "/student-dashboard",
        },
        {
          title: "Continue Learning",
          url: "/student-dashboard?tab=continue",
        },
        {
          title: "Completed",
          url: "/student-dashboard?tab=completed",
        },
        {
          title: "Certificates",
          url: "/student-dashboard?tab=certificates",
        },
      ],
    },
    {
      title: "Home",
      url: "/",
      icon: Home,
      items: [
        {
          title: "Home",
          url: "/",
        },
        {
          title: "All Courses",
          url: "/courses",
        },
      ],
    },
  ],
};

const instructorSidebarItems = {
  navMain: [
    {
      title: "Dashboard",
      url: "/instructor-dashboard",
      icon: BarChart3,
      isActive: true,
      items: [
        {
          title: "All Courses",
          url: "/instructor-dashboard",
        },
      ],
    },
    {
      title: "My Courses",
      url: "/instructor-dashboard",
      icon: GraduationCap,
      items: [
        // {
        //   title: "All Courses",
        //   url: "/instructor-dashboard",
        // },
        {
          title: "Create Course",
          url: "/instructor-dashboard/courses/create",
        },
      ],
    },
    {
      title: "Home",
      url: "/",
      icon: Home,
      items: [
        {
          title: "Home",
          url: "/",
        },
        {
          title: "All Courses",
          url: "/courses",
        },
      ],
    },
  ],
};

const adminSidebarItems = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin-dashboard",
      icon: BarChart3,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/admin-dashboard",
        },
      ],
    },
    {
      title: "Manage Users",
      url: "/admin-dashboard/users",
      icon: GraduationCap,
      items: [
        {
          title: "All Users",
          url: "/admin-dashboard/users",
        },
      ],
    },
    {
      title: "Manage Courses",
      url: "/admin-dashboard/courses",
      icon: BookOpen,
      items: [
        {
          title: "All Courses",
          url: "/admin-dashboard/courses",
        },
      ],
    },
    {
      title: "Home",
      url: "/",
      icon: Home,
      items: [
        {
          title: "Home",
          url: "/",
        },
        {
          title: "All Courses",
          url: "/courses",
        },
      ],
    },
  ],
};

const moderatorsSidebarItems = {
  navMain: [
    {
      title: "Dashboard",
      url: "/moderator-dashboard",
      icon: BarChart3,
      isActive: true,
      items: [
        {
          title: "All Courses",
          url: "/moderator-dashboard",
        },
      ],
    },
    {
      title: "Home",
      url: "/",
      icon: Home,
      items: [
        {
          title: "Home",
          url: "/",
        },
        {
          title: "All Courses",
          url: "/courses",
        },
      ],
    },
  ],
};

export { instructorSidebarItems, studentSidebarItems, adminSidebarItems, moderatorsSidebarItems };
