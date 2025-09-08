import { CourseCategories } from "@/components/home/course-categories";
import { FAQSection } from "@/components/home/faq-section";
import { FeaturedCourses } from "@/components/home/featured-courses";
import { HeroSection } from "@/components/home/hero-section";
import { InstructorsSection } from "@/components/home/instructors-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { StatsSection } from "@/components/home/stats-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { WhyChooseUs } from "@/components/home/why-choose-us";

export default function Home() {
  return (
    <div>
      <main>
        <HeroSection />
        <FeaturedCourses />
        <WhyChooseUs />
        <CourseCategories />
        <StatsSection />
        <TestimonialsSection />
        <InstructorsSection />
        {/* <PricingSection /> */}
        <FAQSection />
        <NewsletterSection />
      </main>
    </div>
  );
}
