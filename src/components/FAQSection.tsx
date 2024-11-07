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
              We offer comprehensive career support to help you secure your dream job. Our AI-powered resume checker meticulously reviews your resume, ensuring it meets industry standards and highlights your unique skills effectively. Beyond resume optimization, we provide personalized interview preparation using our AI-driven question bank, crafted to anticipate real interview scenarios. Our AI-powered assistant offers insights and tips to help you confidently tackle complex questions, giving you a distinct advantage. Whether you're refining your resume or preparing to make a strong impression in interviews, we're dedicated to supporting your career journey every step of the way.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How valuable is the certification in job market?</AccordionTrigger>
            <AccordionContent>
              This certification is not just a typical credential; it's a powerful and valuable testament to a developer's skills, passion, and problem-solving ability, showcasing a proactive growth mindset and readiness to take on complex challenges—qualities that are increasingly sought after by employers in the tech industry.
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