"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForgetPasswordMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [forgetPasswordFn, { isLoading }] = useForgetPasswordMutation();
  const [success, setSuccess] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const res = await forgetPasswordFn(data).unwrap();
      if (res.success) {
        toast.success("Password reset link sent to your email");
        setSuccess(true);
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log(error as any);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof error === "object" && error !== null && "statusCode" in error && (error as any).statusCode === 429) {
        toast.error("Too many requests. Please try again later.");
        return;
      }
      toast.error("Failed to send reset link. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
              <CardDescription>
                We&apos;ve sent a password reset link to <strong>{form.getValues("email")}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Didn&apos;t receive the email? Check your spam folder or try again.
              </p>
              <Button variant="outline" onClick={() => setSuccess(false)}>
                Try Again
              </Button>
            </CardContent>
            <CardFooter className="text-center">
              <Link href="/auth/signin" className="text-sm text-primary hover:underline flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Sign In
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
            <CardDescription>
              Enter your email address and we&apos;ll send you a link to reset your password
            </CardDescription>
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
                        <Input type="email" placeholder="Enter your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending reset link...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="text-center">
            <Link href="/auth/signin" className="text-sm text-primary hover:underline flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Sign In
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
