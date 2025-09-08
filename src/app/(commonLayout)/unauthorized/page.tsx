"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert, LogIn, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// If you're in the /app router, you can drop this file at: /app/unauthorized/page.tsx
// Or use it as a reusable component anywhere.

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <main className="min-h-[calc(80dvh)] grid place-items-center bg-background p-6">
      <Card className="w-full max-w-lg border-muted-foreground/10 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto h-14 w-14 rounded-2xl grid place-items-center shadow-sm border">
            <ShieldAlert className="h-7 w-7" aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl tracking-tight">401 — Unauthorized</CardTitle>
          <p className="text-sm text-muted-foreground">
            You do not have permission to access this page. Please login or try with the correct account.
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="default" asChild className="h-11 rounded-2xl">
              <Link href="/auth/signin">
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </Link>
            </Button>

            <Button variant="outline" className="h-11 rounded-2xl" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            If you believe this is a mistake, please contact support.
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
