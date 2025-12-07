"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import { UserRole } from "@/types/user.types";

interface MobileMenuProps {
  isOpen: boolean;
  setIsMenuOpen?: (isOpen: boolean) => void;
}

const mobileMenuStyles = `
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  .mobile-menu-enter {
    animation: slideDown 0.3s ease-out forwards;
  }

  .mobile-menu-exit {
    animation: slideUp 0.3s ease-in forwards;
  }
`;

export function MobileMenu({ isOpen, setIsMenuOpen }: MobileMenuProps) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | null>(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    const isLoggedIn = document.cookie.split(";").some((item) => item.trim().startsWith("user="));
    setIsUserLoggedIn(isLoggedIn);
  }, []);

  const { data: userInfo, isLoading } = useUserInfoQuery(undefined, {
    skip: !isUserLoggedIn,
  });

  const userRole = userInfo?.data?.role;

  const dashboardLink = () => {
    switch (userRole) {
      case UserRole.STUDENT:
        return "/student-dashboard";
      case UserRole.INSTRUCTOR:
        return "/instructor-dashboard";
      case UserRole.ADMIN:
        return "/admin-dashboard";
      case UserRole.SUPER_ADMIN:
        return "/admin-dashboard";
      case UserRole.MODERATOR:
        return "/moderator-dashboard";
      default:
        return "/";
    }
  };

  const closeMenu = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      if (setIsMenuOpen) {
        setIsMenuOpen(false);
      }
      setIsAnimatingOut(false);
    }, 300);
  };

  if (!isOpen && !isAnimatingOut) return null;

  return (
    <>
      <style>{mobileMenuStyles}</style>
      <div className={`md:hidden py-4 border-t ${isAnimatingOut ? "mobile-menu-exit" : "mobile-menu-enter"}`}>
        <nav className="flex flex-col space-y-4">
          <Link
            onClick={closeMenu}
            href="/courses"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Courses
          </Link>
          <Link
            onClick={closeMenu}
            href="/instructors"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Instructors
          </Link>
          <Link
            onClick={closeMenu}
            href="/pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            onClick={closeMenu}
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            About
          </Link>
        </nav>

        <div className="flex flex-col space-y-3 mt-4 pt-4 border-t">
          {isUserLoggedIn === null || (isUserLoggedIn && isLoading) ? (
            <Skeleton className="h-9 w-full" />
          ) : isUserLoggedIn && userInfo?.data && userRole ? (
            <Button variant="ghost" size="sm" asChild className="w-full">
              <Link onClick={closeMenu} href={dashboardLink()}>
                Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="w-full">
                <Link onClick={closeMenu} href="/auth/signin">
                  Sign In
                </Link>
              </Button>
              <Button size="sm" asChild className="w-full">
                <Link onClick={closeMenu} href="/auth/signup">
                  Get Started
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
