import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-[calc(100dvh)] grid place-items-center bg-background p-6">
      <Card className="w-full max-w-lg border-muted-foreground/10 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto h-14 w-14 rounded-2xl grid place-items-center shadow-sm border">
            <SearchX className="h-7 w-7" aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl tracking-tight">404 — Page Not Found</CardTitle>
          <p className="text-sm text-muted-foreground">
            The page you are looking for doesn’t exist or may have been moved.
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="default" asChild className="h-11 rounded-2xl">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>

            <Button variant="outline" asChild className="h-11 rounded-2xl">
              <Link href="/contact">
                <ArrowLeft className="mr-2 h-4 w-4" /> Contact Support
              </Link>
            </Button>
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            If you think this is an error, please let us know.
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
