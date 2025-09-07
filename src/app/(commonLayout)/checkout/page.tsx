"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import CheckoutSkeleton from "@/components/CheckoutSkeleton";

import { Award, CheckCircle, Clock, Lock, RefreshCcw, Shield, Star, Users } from "lucide-react";

import { useGetCoursesDetailBySlugQuery } from "@/redux/features/courses/courses.api";
import { usePurchaseCourseMutation } from "@/redux/features/user-courses/userCourses.api";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [purchaseCourseFn, { isLoading: isPurchasing }] = usePurchaseCourseMutation();

  // get slug from url
  const slug = searchParams.get("course");

  const {
    data: courseDetails,
    isLoading: courseDetailLoading,
    error,
  } = useGetCoursesDetailBySlugQuery(slug, {
    skip: !slug,
  });

  console.log("Course details response:", courseDetails);
  console.log("Loading:", courseDetailLoading);
  console.log("Error:", error);

  const courseData = courseDetails?.data || [];
  console.log("Final courseData:", courseData);

  const handlePurchase = async () => {
    try {
      const res = await purchaseCourseFn(courseData._id).unwrap();
      console.log(res);
      router.push("student-dashboard");
      toast.success("Course purchased successfully!");
    } catch (error) {
      console.error("Failed to purchase course:", error);
      toast.error("Failed to purchase course. Please try again.");
    }
  };

  // Show loading state
  if (courseDetailLoading) {
    return <CheckoutSkeleton />;
  }

  // Show error state if no slug or course not found
  if (!slug || !courseData || Object.keys(courseData).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-4">
            {!slug ? "No course specified in URL" : "The requested course could not be found"}
          </p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Complete Your Purchase</h1>
            <p className="text-muted-foreground text-lg">{"Secure checkout powered by industry-leading encryption"}</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 " />
                {"SSL Secured"}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4 " />
                {"256-bit Encryption"}
              </div>
            </div>
          </div>

          <Card className="shadow-xl border-0  backdrop-blur-sm max-w-2xl mx-auto">
            <CardHeader className="pb-4 text-center">
              <CardTitle className="text-2xl font-semibold">Order Summary</CardTitle>
              <CardDescription>{"Review your course purchase"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Course Info */}
              <div className="flex gap-6 items-start">
                <div className="relative">
                  <img
                    src={courseData.thumbnail || "/placeholder.svg"}
                    alt={courseData.name}
                    className="w-24 h-24 rounded-xl object-cover shadow-md"
                  />
                  <div className="absolute -top-2 -right-2">
                    <Badge variant="secondary" className="bg-accent -foreground">
                      Premium
                    </Badge>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl text-balance mb-2">{courseData.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-7 w-7">
                      {courseData.instructor.profilePicture && (
                        <AvatarImage src={courseData.instructor.profilePicture || "/placeholder.svg"} />
                      )}
                      <AvatarFallback>
                        {courseData.instructor.firstName[0]}
                        {courseData.instructor.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground font-medium">
                      {courseData.instructor.firstName} {courseData.instructor.lastName}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{courseData.description}</p>
                </div>
              </div>

              {/* Course Features */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-border">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 " />
                  <span className="text-sm font-medium">{courseData.courseDuration} hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 " />
                  <span className="text-sm font-medium">{courseData.totalStudents} students</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 " />
                  <span className="text-sm font-medium">Certificate</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 " />
                  <span className="text-sm font-medium">Lifetime Access</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Course Price</span>
                  <span className="font-semibold">${courseData.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Processing Fee</span>
                  <span>$0</span>
                </div>
                <Separator />
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="">${courseData.finalPrice}</span>
                </div>
              </div>

              <Button
                onClick={handlePurchase}
                className="w-full h-14 text-lg font-semibold bg-primary cursor-pointer transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                disabled={isPurchasing}
              >
                Complete Purchase - ${courseData.finalPrice}{" "}
                {isPurchasing && <RefreshCcw className="h-4 w-4 animate-spin" />}
              </Button>

              {/* Trust Badges */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium text-sm">30-Day Money Back Guarantee</span>
                </div>
                <p className="text-xs">{"Not satisfied? Get a full refund within 30 days, no questions asked."}</p>
              </div>

              <p className="text-xs text-center">
                {
                  "By completing this purchase, you agree to our Terms of Service and Privacy Policy. Your payment information is encrypted and secure."
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutContent />
    </Suspense>
  );
}
