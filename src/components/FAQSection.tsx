import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FAQSection = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What makes this mentorship program unique?</AccordionTrigger>
            <AccordionContent>
              Our program focuses purely on task-based mentorship without traditional courses or videos. You'll receive weekly assignments with clear objectives and get personalized feedback from dedicated mentors, all at an accessible price point of ₹49.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>How is the mentorship structured?</AccordionTrigger>
            <AccordionContent>
              You'll receive guidance through our WhatsApp community, where mentors provide regular feedback on your weekly tasks, code reviews, and career advice. We focus on practical assignments rather than theoretical courses, ensuring hands-on learning with expert guidance.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>What career support do you provide?</AccordionTrigger>
            <AccordionContent>
              We offer comprehensive career support including an AI-powered resume checker and interview preparation system. Our AI assistant helps optimize your resume and provides personalized interview practice using a sophisticated question bank tailored to real interview scenarios.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>What mentorship paths are available?</AccordionTrigger>
            <AccordionContent>
              We offer four focused mentorship paths: AI Prompt Engineering Mastery (8 weeks), AI + Supabase Integration (12 weeks), No-Code Development (10 weeks), and Frontend Development with Low-Code (10 weeks). Each path includes weekly tasks and personalized mentor feedback.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>How does the community support learning?</AccordionTrigger>
            <AccordionContent>
              You'll join an active WhatsApp community where you can connect with fellow learners, share experiences, and collaborate on projects. Our community-focused approach replaces traditional industry networking with meaningful peer-to-peer interactions and mentor support.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>What happens after joining a program?</AccordionTrigger>
            <AccordionContent>
              After enrollment, you'll receive immediate access to your chosen program's WhatsApp group where you'll connect with your mentor and fellow learners. You'll start receiving weekly assignments with clear objectives, and get personalized feedback on your progress.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};