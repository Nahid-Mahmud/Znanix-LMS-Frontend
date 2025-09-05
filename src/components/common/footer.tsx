import { BookOpen, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { logo } from "@/assets";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Image alt="logo" height={200} width={200} className=" h-20 w-auto" src={logo}></Image>

            <p className="text-muted-foreground text-pretty relative">
              Empowering learners worldwide with high-quality, accessible education from industry experts.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Courses</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/courses?category=Web+Development" className="hover:text-foreground">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/courses?category=Data+Science" className="hover:text-foreground">
                  Data Science
                </Link>
              </li>
              <li>
                <Link href="/courses?category=Digital+Marketing" className="hover:text-foreground">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/courses?category=Design" className="hover:text-foreground">
                  Design
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Zanix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
