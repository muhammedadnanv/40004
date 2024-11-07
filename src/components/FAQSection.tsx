import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FAQSection = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What makes this program unique?</AccordionTrigger>
            <AccordionContent>
              Our program stands out through its combination of personalized mentorship, practical project-based learning, and industry-relevant curriculum. You'll work directly with experienced professionals while building a strong portfolio of real-world projects, all at an incredibly accessible price point of ₹49.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How is the mentorship structured?</AccordionTrigger>
            <AccordionContent>
              You'll receive guidance through our WhatsApp community, where mentors provide regular feedback, code reviews, and career advice. We host weekly doubt-clearing sessions, project discussions, and one-on-one mentoring sessions to ensure your continuous growth and learning.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What career support do you provide?</AccordionTrigger>
            <AccordionContent>
              Beyond technical training, we offer comprehensive career support including resume building, interview preparation, portfolio development, and job referrals. Our network includes connections with leading tech companies, and we actively help students secure internships and job opportunities.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How valuable is the certification?</AccordionTrigger>
            <AccordionContent>
              Our certificates are recognized by industry professionals and validated through practical assessments. They demonstrate not just course completion, but actual project experience and skill mastery. Many of our alumni have successfully used these certificates to advance their careers at top tech companies.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>What ongoing support do I receive?</AccordionTrigger>
            <AccordionContent>
              You'll have lifetime access to our learning materials, community, and regular program updates. As technology evolves, we continuously update our content to ensure you stay current with industry trends. You'll also maintain access to our alumni network for ongoing networking and career opportunities.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>How do you ensure quality learning?</AccordionTrigger>
            <AccordionContent>
              Our curriculum is designed by industry experts and regularly updated to reflect current market demands. We maintain small mentor-to-student ratios, provide personalized feedback, and ensure hands-on experience through real-world projects. Our success is measured by your growth and career achievements.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};