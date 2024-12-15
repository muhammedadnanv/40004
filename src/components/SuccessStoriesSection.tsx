import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Quote } from "lucide-react";

// Separate stories data by program
const successStoriesByProgram = {
  "Frontend Development": [
    {
      name: "Arun Kumar",
      program: "Frontend Development",
      quote: "Coming from Trivandrum, I was looking for structured guidance in frontend development. The weekly React and TypeScript assignments helped me secure a position at a leading tech company in Technopark!"
    },
    {
      name: "Lakshmi Menon",
      program: "Frontend Development",
      quote: "As a self-taught developer from Kochi, this program gave me the confidence to build complex web applications. The mentor's feedback was invaluable in improving my coding practices."
    }
  ],
  "Low-Code Development": [
    {
      name: "Vishnu Prasad",
      program: "Low-Code Development",
      quote: "After completing my studies in Calicut University, this program helped me transition into low-code development. Now I'm building applications efficiently for clients across Kerala."
    },
    {
      name: "Anjali Nair",
      program: "Low-Code Development",
      quote: "Being from Thrissur, I needed a flexible learning approach. The practical assignments taught me how to leverage low-code platforms effectively for local businesses."
    }
  ],
  "No-Code Development": [
    {
      name: "Mohammed Ashiq",
      program: "No-Code Development",
      quote: "As a business owner from Malappuram, this program was exactly what I needed. I can now create custom applications for my retail business without writing code!"
    },
    {
      name: "Priya Raj",
      program: "No-Code Development",
      quote: "Coming from Kollam, I was skeptical about no-code development. Now I'm successfully running a consultancy helping local businesses automate their processes."
    }
  ],
  "Full Stack API Development": [
    {
      name: "Anoop Krishnan",
      program: "Full Stack API Development",
      quote: "The comprehensive coverage of API design helped me land a job at an IT park in Kochi. The real-world projects were particularly relevant to Kerala's growing tech ecosystem."
    },
    {
      name: "Sreelakshmi K",
      program: "Full Stack API Development",
      quote: "Being from Kannur, remote learning was crucial for me. This program's practical approach helped me master full-stack development while staying connected with Kerala's tech community."
    }
  ],
  "ManyChat Automation": [
    {
      name: "Rajesh Menon",
      program: "ManyChat Automation",
      quote: "As a business owner from Kozhikode, the 3-day ManyChat program transformed how I handle customer service. My restaurant's engagement increased by 200% through automated messaging!"
    },
    {
      name: "Divya Krishnan",
      program: "ManyChat Automation",
      quote: "Coming from Palakkad, I implemented the ManyChat strategies for my textile business. The automated customer service has helped me reach customers across Kerala efficiently."
    },
    {
      name: "Sujith Kumar",
      program: "ManyChat Automation",
      quote: "Being from Alappuzha, I used ManyChat automation to boost my tourism business. The program helped me create engaging automated responses that increased bookings by 150%!"
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