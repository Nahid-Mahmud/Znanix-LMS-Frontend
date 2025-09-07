"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useUserInfoQuery } from "@/redux/features/user/user.api";

export default function NavConditionalButton() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const isLoggedIn = document.cookie.split(";").some((item) => item.trim().startsWith("user="));
    setIsUserLoggedIn(isLoggedIn);
  }, []); // Only run once on mount

  const { data: userInfo, isLoading } = useUserInfoQuery(undefined, {
    skip: !isUserLoggedIn, // Only fetch when user is logged in
  });

  console.log(userInfo);

  const userRole = userInfo?.data?.role;

  // Show skeleton loading while checking login status or fetching user info
  if (isUserLoggedIn === null || (isUserLoggedIn && isLoading)) {
    return (
      <div className="hidden md:flex items-center space-x-4">
        <Skeleton className="h-9 w-20" />
      </div>
    );
  }

  return isUserLoggedIn && userInfo?.data && userRole ? (
    <div className="hidden md:flex items-center space-x-4">
      <Button variant="ghost" size="sm" asChild>
        <Link href="#">Dashboard</Link>
      </Button>
    </div>
  ) : (
    <div className="hidden md:flex items-center space-x-4">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/auth/signin">Sign In</Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/auth/signup">Get Started</Link>
      </Button>
    </div>
  );
}
