import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import {
  professionalHeadshotYoungManSoftwareDeveloper,
  professionalHeadshotWomanDataAnalyst,
  professionalHeadshotManMarketingManager,
  placeholderSvg,
} from "@/assets";

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Software Developer",
    content:
      "The web development course completely transformed my career. I went from zero coding knowledge to landing my dream job in just 6 months.",
    rating: 5,
    avatar: professionalHeadshotYoungManSoftwareDeveloper,
  },
  {
    name: "Maria Garcia",
    role: "Data Analyst",
    content:
      "The instructors are amazing and the content is always up-to-date. I've taken 3 courses here and each one exceeded my expectations.",
    rating: 5,
    avatar: professionalHeadshotWomanDataAnalyst,
  },
  {
    name: "David Kim",
    role: "Marketing Manager",
    content:
      "Zanix's digital marketing course gave me the skills I needed to advance in my career. The practical projects were incredibly valuable.",
    rating: 5,
    avatar: professionalHeadshotManMarketingManager,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">What Our Students Say</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Join thousands of successful learners who transformed their careers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.avatar || placeholderSvg}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    width={48}
                    height={48}
                    style={{ objectFit: "cover", borderRadius: "9999px" }}
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
