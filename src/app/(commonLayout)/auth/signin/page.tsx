/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { UserRole } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginFn, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const res = await loginFn(data).unwrap();
      if (res.success) {
        const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        document.cookie = `user=true; path=/; expires=${expires.toUTCString()}`;
        toast.success("Login successful!");
        // router.push("/"); // Redirect to home page

        // reload the window to fetch the user data
        await window.location.reload();

        // switch case to redirect based on role
        switch (res.data.role) {
          case UserRole.STUDENT:
            router.push("/student-dashboard");
            break;
          case UserRole.INSTRUCTOR:
            router.push("/instructor-dashboard");
            break;
          case UserRole.ADMIN:
            router.push("/admin-dashboard");
            break;
          case UserRole.SUPER_ADMIN:
            router.push("/admin-dashboard");
            break;
          case UserRole.MODERATOR:
            router.push("/moderator-dashboard");
            break;
          default:
            router.push("/");
            break;
        }
      }
    } catch (error: unknown) {
      // Check if error is an object with a 'data' property
      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        typeof (error as any).data === "object" &&
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (error as any).data !== null &&
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        "message" in (error as any).data
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        console.log((error as any).data.message);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        if ((error as any).data.message === "User is not verified") {
          // router.push("/auth/verify-email");

          toast.error("Please verify your email before logging in.", {
            duration: 8000,
          });
          return;
        }
        toast.error("Login failed. Please check your credentials.");
        console.log(error);
      } else {
        toast.error("Login failed. Please check your credentials.");
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Sign in to your account to continue learning</CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 hover:text-black dark:hover:text-white/80 top-0 h-full px-3 py-2 hover:bg-transparent"
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember" className="rounded" />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || isLoading}>
                  {form.formState.isSubmitting || isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
