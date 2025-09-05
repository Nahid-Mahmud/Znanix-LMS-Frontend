import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Heart } from "lucide-react";
import Image from "next/image";
import ceoImg from "@/assets/professional-ceo-headshot.png";
import ctoImg from "@/assets/professional-cto-headshot.jpg";
import cpoImg from "@/assets/professional-cpo-headshot.jpg";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Empowering Learners Worldwide
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            At Zanix, we believe that quality education should be accessible to everyone, everywhere. We&apos;re on a
            mission to democratize learning and help millions of people achieve their goals.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2M+</div>
            <div className="text-muted-foreground">Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10K+</div>
            <div className="text-muted-foreground">Courses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Instructors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">190+</div>
            <div className="text-muted-foreground">Countries</div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-pretty">
                To make high-quality education accessible to everyone, regardless of their background, location, or
                circumstances. We strive to bridge the skills gap and empower individuals to achieve their personal and
                professional goals through learning.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                Our Values
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  • <strong>Accessibility:</strong> Education for all
                </li>
                <li>
                  • <strong>Quality:</strong> Expert-led content
                </li>
                <li>
                  • <strong>Innovation:</strong> Cutting-edge learning
                </li>
                <li>
                  • <strong>Community:</strong> Supportive environment
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Leadership</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="text-center pt-6">
                <Image
                  src={ceoImg}
                  alt="Sarah Johnson"
                  width={400}
                  height={400}
                  className="rounded-full mx-auto mb-4 aspect-square h-24 w-24"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <h3 className="font-semibold text-lg">Sarah Johnson</h3>
                <p className="text-muted-foreground mb-2">CEO & Founder</p>
                <p className="text-sm text-muted-foreground text-pretty">
                  Former VP of Education at Google, passionate about democratizing learning.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="text-center pt-6">
                <Image
                  src={ctoImg}
                  alt="Michael Chen"
                  width={96}
                  height={96}
                  className="rounded-full mx-auto mb-4"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <h3 className="font-semibold text-lg">Michael Chen</h3>
                <p className="text-muted-foreground mb-2">CTO</p>
                <p className="text-sm text-muted-foreground text-pretty">
                  Tech veteran with 15+ years building scalable education platforms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="text-center pt-6">
                <Image
                  src={cpoImg}
                  alt="Emily Rodriguez"
                  width={96}
                  height={96}
                  className="rounded-full mx-auto mb-4"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <h3 className="font-semibold text-lg">Emily Rodriguez</h3>
                <p className="text-muted-foreground mb-2">Chief Product Officer</p>
                <p className="text-sm text-muted-foreground text-pretty">
                  Product leader focused on creating intuitive learning experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
