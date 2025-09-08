"use client";

import { BadgeCheck, ChevronsUpDown, CreditCard, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { baseApi } from "@/redux/baseApi";
import { useAppDispatch } from "@/redux/hooks";
import { deleteCookies } from "@/service/DeleteCookies";
import { UserRole } from "@/types/user.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
    role: UserRole | string;
  };
}) {
  const { isMobile } = useSidebar();
  // const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const getProfilePageLink = () => {
    switch (user?.role) {
      case UserRole.STUDENT:
        return "/student-dashboard/profile";
      case UserRole.INSTRUCTOR:
        return "/instructor-dashboard/profile";
      case UserRole.ADMIN:
        return "/admin-dashboard/profile";
      case UserRole.SUPER_ADMIN:
        return "/admin-dashboard/profile";
      case UserRole.MODERATOR:
        return "/moderator-dashboard/profile";
      default:
        return "/";
    }
  };

  const handleLogout = async () => {
    try {
      // Remove all cookies regardless of domain and path
      const cookies = document.cookie.split(";");
      const paths = ["/", window.location.pathname];
      const domains = ["", window.location.hostname];
      cookies.forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        paths.forEach((path) => {
          domains.forEach((domain) => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};${
              domain ? ` domain=${domain};` : ""
            }`;
          });
        });
      });
      await deleteCookies(["accessToken"]);
      await deleteCookies(["refreshToken"]);

      // await logout(undefined);
      dispatch(baseApi.util.resetApiState());
      toast.success("Logged out successfully");
      router.push("/auth/signin");
    } catch (error) {
      toast.error("Failed to log out");
      console.error("Logout error:", error);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup> */}
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={getProfilePageLink()}>
                  <BadgeCheck />
                  Account
                </Link>
              </DropdownMenuItem>
              {user?.role === UserRole.STUDENT && (
                <DropdownMenuItem asChild>
                  <Link href="/#">
                    <CreditCard />
                    Billing
                  </Link>
                </DropdownMenuItem>
              )}
              {/* <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
