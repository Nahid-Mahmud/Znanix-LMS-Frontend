import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I get started with Zanix?",
    answer:
      "Simply create a free account and browse our course catalog. You can start with free courses immediately or upgrade to Pro for access to premium content.",
  },
  {
    question: "Are the certificates recognized by employers?",
    answer:
      "Yes! Our certificates are industry-recognized and accepted by thousands of companies worldwide. Many of our students have used them to advance their careers.",
  },
  {
    question: "Can I learn at my own pace?",
    answer:
      "All courses are self-paced, and you have lifetime access to course materials. Learn when it's convenient for you.",
  },
  {
    question: "What if I'm not satisfied with a course?",
    answer:
      "We offer a 30-day money-back guarantee on all paid courses. If you're not satisfied, we'll provide a full refund, no questions asked.",
  },
  {
    question: "Do you offer group discounts?",
    answer:
      "Yes! We offer special pricing for teams and organizations. Contact our sales team for custom pricing based on your needs.",
  },
  {
    question: "Can I access courses on mobile devices?",
    answer:
      "Yes! Our platform is fully responsive and we also have mobile apps for iOS and Android for learning on the go.",
  },
];

export function FAQSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Everything you need to know about Zanix
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
