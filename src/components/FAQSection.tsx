import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FAQSection = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is the program fee?</AccordionTrigger>
            <AccordionContent>
              All our programs are available at an affordable price of ₹49. This includes lifetime access to the program content, certification, and community support.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do I get started?</AccordionTrigger>
            <AccordionContent>
              Simply choose your preferred program, complete the enrollment process, and join our WhatsApp community. You'll receive immediate access to the program materials and mentorship support.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What support will I receive?</AccordionTrigger>
            <AccordionContent>
              You'll get access to our WhatsApp community where you can interact with mentors and fellow learners. We provide regular guidance, doubt clearing sessions, and project feedback.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How do I get certified?</AccordionTrigger>
            <AccordionContent>
              Complete the program assignments and projects to earn your certification. Our certificates are community-recognized and can be shared on your professional profiles.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Can I access the content after completion?</AccordionTrigger>
            <AccordionContent>
              Yes, you get lifetime access to the program content and can revisit the materials anytime. You'll also remain part of our community for continued learning and networking.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};