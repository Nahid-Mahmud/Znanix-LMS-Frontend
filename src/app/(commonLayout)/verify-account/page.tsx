"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function VerifyAccountPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get("status");
  const email = searchParams.get("email");
  const [open, setOpen] = useState(true);

  const handleResend = () => {
    // TODO: Implement API call to resend verification email
    alert("Verification email resent to " + email);
  };

  const messages = {
    success: {
      title: "Account Verified Successfully",
      description: "Your account has been verified. You can now access all features.",
      type: "success",
    },
    missing_token: {
      title: "Verification Token Missing",
      description: "No verification token was provided. Please check your email for the correct link.",
      type: "error",
    },
    duplicate_request: {
      title: "Account Already Verified",
      description: "Your account is already verified. No further action is needed.",
      type: "info",
    },
    invalid_token: {
      title: "Invalid or Expired Token",
      description: "The verification token is invalid or has expired. Please request a new verification email.",
      type: "error",
    },
    user_not_found: {
      title: "User Not Found",
      description: "No user found with the provided email address.",
      type: "error",
    },
    false: {
      title: "Verification Failed",
      description: "Account verification failed. Please try again or contact support.",
      type: "error",
    },
    no_query: {
      title: "Are you lost?",
      description:
        "It seems you've reached this page without the necessary parameters. Please check your email for the verification link.",
      type: "info",
    },
  };

  const message = !status && !email ? messages.no_query : messages[status as keyof typeof messages] || messages.false;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        {email && (
          <div className="mb-4">
            <Button onClick={handleResend} variant="outline">
              Resend Verification Email
            </Button>
          </div>
        )}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md [&>button]:hidden">
            <DialogHeader>
              <DialogTitle
                className={
                  message.type === "success"
                    ? "text-green-600"
                    : message.type === "error"
                    ? "text-red-600"
                    : "text-blue-600"
                }
              >
                {message.title}
              </DialogTitle>
              <DialogDescription>{message.description}</DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2">
              {(status === "success" || status === "duplicate_request") && (
                <Button onClick={() => router.push("/auth/signin")} variant="default">
                  Login
                </Button>
              )}
              <Button onClick={() => router.push("/")} variant="outline">
                Go Home
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Suspense>
  );
}
