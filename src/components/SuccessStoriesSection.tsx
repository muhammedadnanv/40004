import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Quote } from "lucide-react";

// Separate stories data into its own constant
const successStories = [
    {
      name: "Sarah Johnson",
      program: "ManyChat Automation",
      quote: "The 3-day ManyChat program was transformative! I learned how to create engaging chatbots and automated flows that increased my business engagement by 300%. The ROI was immediate."
    },
    {
      name: "Michael Chen",
      program: "ManyChat Automation",
      quote: "Thanks to this program, I mastered ManyChat's advanced features in just 3 days. I've automated my entire customer service workflow, saving 20+ hours weekly. The mentor's guidance was invaluable."
    },
    {
      name: "Emma Rodriguez",
      program: "ManyChat Automation",
      quote: "The hands-on approach was perfect. Within days of completing the program, I implemented complex automation flows that boosted our sales conversions by 150%. Best investment for my business!"
    },
    {
      name: "Alex Kumar",
      program: "ManyChat Automation",
      quote: "This program helped me understand ManyChat's full potential. I've created sophisticated marketing campaigns that run on autopilot. My client base has grown exponentially."
    },
    {
      name: "Jessica Lee",
      program: "ManyChat Automation",
      quote: "The practical exercises and real-time feedback were game-changing. I now confidently build advanced chatbot sequences that have revolutionized our lead generation process."
    },
    {
      name: "Tom Wilson",
      program: "ManyChat Automation",
      quote: "In just 3 days, I learned to create complex automation workflows that would have taken months to figure out on my own. The ROI has been incredible - our engagement rates are up 250%."
    }
];

// Separate Story component for better organization
const StoryCard = ({ story, index }: { story: typeof successStories[0], index: number }) => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {successStories.map((story, index) => (
          <StoryCard key={index} story={story} index={index} />
        ))}
      </div>
    </div>
  );
};