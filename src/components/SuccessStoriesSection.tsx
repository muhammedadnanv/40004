import { motion, useAnimation } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useEffect } from "react";

export const SuccessStoriesSection = () => {
  const controls = useAnimation();
  
  const stories = [
    {
      name: "Arjun Menon",
      program: "AI Prompt Design Mentorship",
      quote: "The AI development mentorship program helped me transition from a traditional software role to AI development. The practical assignments and weekly feedback sessions were instrumental in building my confidence."
    },
    {
      name: "Aysha Fathima",
      program: "Frontend Development",
      quote: "Thanks to the structured learning approach and real-world projects, I was able to land my dream job. The mentorship in React and TypeScript was exactly what I needed."
    },
    {
      name: "Anil Kumar",
      program: "Full Stack API Development",
      quote: "The mentorship program helped me understand complex concepts through practical applications. I now lead development teams and implement AI solutions in our projects."
    },
    {
      name: "Sarah Chen",
      program: "ChatGPT Expert Program",
      quote: "This program transformed my career. I'm now consulting for major tech companies on AI implementation strategies. The hands-on approach to learning made all the difference."
    },
    {
      name: "Mohammed Al-Rashid",
      program: "Low-Code Development",
      quote: "Within months of completing the program, I launched my own SaaS product. The mentorship in low-code development gave me the perfect balance of speed and functionality."
    },
    {
      name: "Elena Rodriguez",
      program: "AI + Supabase Integration",
      quote: "The practical knowledge gained from this program was invaluable. I've successfully integrated AI into multiple enterprise applications, increasing efficiency by 300%."
    },
    {
      name: "David Park",
      program: "No-Code Development",
      quote: "As a non-technical founder, this program was a game-changer. I built and launched my MVP in weeks, securing seed funding shortly after."
    },
    {
      name: "Priya Sharma",
      program: "Prompt Engineering Mentorship",
      quote: "The specialized focus on prompt engineering opened doors to amazing opportunities. I now work with leading AI research teams and contribute to groundbreaking projects."
    },
    {
      name: "Lisa Thompson",
      program: "AI for Business Analytics",
      quote: "The program revolutionized how I approach data analysis. I've implemented AI solutions that saved my company millions in operational costs. The ROI was immediate and substantial."
    },
    {
      name: "Marcus Johnson",
      program: "Enterprise AI Solutions",
      quote: "This mentorship helped me transition from traditional IT to AI architecture. I now lead AI initiatives across multiple Fortune 500 companies, thanks to the practical skills gained."
    },
    {
      name: "Sophia Zhang",
      program: "AI Product Management",
      quote: "The program's focus on both technical and business aspects was perfect. I successfully launched three AI products that are now market leaders in their respective categories."
    },
    {
      name: "Rafael Santos",
      program: "Computer Vision AI",
      quote: "The mentorship in computer vision AI was exceptional. I've developed solutions that are now used in major manufacturing plants, improving quality control by 85%."
    },
    {
      name: "Nina Patel",
      program: "NLP Engineering",
      quote: "The natural language processing expertise I gained was transformative. My team now develops cutting-edge language models that serve millions of users globally."
    }
  ];

  useEffect(() => {
    const startAnimation = async () => {
      await controls.start((i) => ({
        x: [0, "-100%"],
        transition: {
          duration: 30,
          delay: i * 0.1,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0
        }
      }));
    };

    startAnimation();
  }, [controls]);

  return (
    <div className="container mx-auto max-w-6xl px-4 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extralight text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800"
      >
        Success Stories
      </motion.h2>

      <div className="relative h-[200px] overflow-hidden">
        <motion.div 
          className="flex gap-8 absolute w-full"
          animate={controls}
          style={{ width: "300%" }}
        >
          {[...stories, ...stories].map((story, index) => (
            <motion.div
              key={`${story.name}-${index}`}
              custom={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
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
          ))}
        </motion.div>
      </div>
    </div>
  );
};