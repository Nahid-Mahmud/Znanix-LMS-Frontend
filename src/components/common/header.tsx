"use client";

import { logo } from "@/assets";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NavConditionalButton from "../NavConditionalButton";
import { ModeToggle } from "../ui/ModeToggle";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky p-1 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={logo} alt="Zanix Logo" width={50} height={50} />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/courses"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/instructors"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Instructors
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center justify-center gap-2">
            <div>
              <ModeToggle />
            </div>

            <NavConditionalButton />
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/courses" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Courses
              </Link>
              <Link href="/instructors" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Instructors
              </Link>
              <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                About
              </Link>
              <NavConditionalButton />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
