import { Card, CardContent } from "@/components/ui/card";
import { Award, Clock, Users, Smartphone, Globe, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Industry Certificates",
    description: "Earn recognized certificates that boost your career prospects",
  },
  {
    icon: Clock,
    title: "Learn at Your Pace",
    description: "Self-paced learning with lifetime access to course materials",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from industry professionals with real-world experience",
  },
  {
    icon: Smartphone,
    title: "Mobile Learning",
    description: "Access courses anywhere with our mobile-friendly platform",
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Connect with learners and professionals worldwide",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Get help whenever you need it with our dedicated support team",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Why Choose Zanix?</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            We provide everything you need to succeed in your learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-none bg-transparent">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-pretty">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
