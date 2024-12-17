import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Define the current program fee as a constant that can be easily updated
const CURRENT_PROGRAM_FEE = 10;

export const FAQSection = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Frequently Asked Questions</h2>
        <div className="text-center mb-8 p-4 bg-purple-50 rounded-lg">
          <p className="text-purple-600 font-medium">🎉 Limited Time Offer: All programs at ₹{CURRENT_PROGRAM_FEE} only!</p>
          <p className="text-sm text-purple-500">Offer valid for 10 days</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What makes this mentorship program unique?</AccordionTrigger>
            <AccordionContent>
              Our program focuses purely on task-based mentorship without traditional courses or videos. You'll receive weekly assignments with clear objectives and get personalized feedback from dedicated mentors, all at an accessible price point of ₹{CURRENT_PROGRAM_FEE}.
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

          <AccordionItem value="item-7">
            <AccordionTrigger>Who is this program for?</AccordionTrigger>
            <AccordionContent>
              This program is ideal for:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Fresher developers just starting their coding journey</li>
                <li>Self-learners who want guidance on the right learning path</li>
                <li>Anyone stuck on a coding challenge or seeking project feedback</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>How is this different from free resources online?</AccordionTrigger>
            <AccordionContent>
              While free resources are abundant, this program offers:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Direct interaction with an experienced mentor who understands your challenges</li>
                <li>Personalized guidance tailored to your specific goals and projects</li>
                <li>A chance to ask questions and receive immediate answers</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger>What if I want more sessions or 1:1 mentorship?</AccordionTrigger>
            <AccordionContent>
              After the program, you can choose to enroll in advanced mentorship options, including 1:1 sessions, starting at ₹{CURRENT_PROGRAM_FEE + 400}.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger>Can I share this program with friends?</AccordionTrigger>
            <AccordionContent>
              Of course! Feel free to share this opportunity with anyone who would benefit from it.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};