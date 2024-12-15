import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Quote } from "lucide-react";

// Separate stories data by program
const successStoriesByProgram = {
  "Frontend Development": [
    {
      name: "David Chen",
      program: "Frontend Development",
      quote: "The weekly assignments in React and TypeScript helped me build a strong portfolio. Within 3 months of completing the program, I landed my first developer role!"
    },
    {
      name: "Sarah Miller",
      program: "Frontend Development",
      quote: "The mentor's feedback on my code was invaluable. I learned best practices in modern frontend development that I wouldn't have discovered on my own."
    }
  ],
  "Low-Code Development": [
    {
      name: "James Wilson",
      program: "Low-Code Development",
      quote: "This program helped me transition from traditional coding to low-code development. I'm now building applications 3x faster for my clients."
    },
    {
      name: "Lisa Thompson",
      program: "Low-Code Development",
      quote: "The practical assignments taught me how to leverage low-code platforms effectively. I've automated numerous business processes for my company."
    }
  ],
  "No-Code Development": [
    {
      name: "Mark Rodriguez",
      program: "No-Code Development",
      quote: "As a business owner, this program was perfect. I can now create custom applications without writing code. The ROI has been incredible!"
    },
    {
      name: "Emily Chang",
      program: "No-Code Development",
      quote: "The hands-on approach helped me master no-code tools quickly. I'm now running a successful agency building solutions for small businesses."
    }
  ],
  "Full Stack API Development": [
    {
      name: "Alex Kumar",
      program: "Full Stack API Development",
      quote: "The comprehensive coverage of API design and implementation was excellent. The real-world projects helped me understand enterprise-level development."
    },
    {
      name: "Maria Garcia",
      program: "Full Stack API Development",
      quote: "From database design to deployment, this program covered everything. The weekly feedback sessions helped me write more efficient and secure code."
    }
  ],
  "ManyChat Automation": [
    {
      name: "Sarah Johnson",
      program: "ManyChat Automation",
      quote: "The 3-day ManyChat program was transformative! I learned how to create engaging chatbots and automated flows that increased my business engagement by 300%."
    },
    {
      name: "Michael Chen",
      program: "ManyChat Automation",
      quote: "Thanks to this program, I mastered ManyChat's advanced features in just 3 days. I've automated my entire customer service workflow, saving 20+ hours weekly."
    },
    {
      name: "Emma Rodriguez",
      program: "ManyChat Automation",
      quote: "The hands-on approach was perfect. Within days of completing the program, I implemented complex automation flows that boosted our sales conversions by 150%!"
    }
  ]
};

// Separate Story component for better organization
const StoryCard = ({ story, index }: { story: { name: string; program: string; quote: string }, index: number }) => (
  <motion.div
    key={`${story.name}-${index}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    className="w-full"
  >
    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="text-center">
        <Quote className="w-8 h-8 mx-auto text-purple-400 mb-4 opacity-50" />
        <CardDescription className="text-base italic">"{story.quote}"</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <h3 className="font-medium text-lg">{story.name}</h3>
        <p className="text-sm text-purple-600">{story.program}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export const SuccessStoriesSection = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extralight text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800"
      >
        Success Stories
      </motion.h2>

      {Object.entries(successStoriesByProgram).map(([program, stories]) => (
        <div key={program} className="mb-16 last:mb-0">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-light text-center mb-8 text-purple-600"
          >
            {program}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <StoryCard key={index} story={story} index={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};