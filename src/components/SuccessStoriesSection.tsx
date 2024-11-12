import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

export const SuccessStoriesSection = () => {
  const stories = [
    {
      name: "Sarah Chen",
      role: "AI Developer",
      company: "TechCorp",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      quote: "The AI development mentorship program helped me transition into a new role. The practical assignments were invaluable.",
      initials: "SC"
    },
    {
      name: "Michael Rodriguez",
      role: "Frontend Engineer",
      company: "StartupX",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      quote: "The structured learning approach and weekly feedback accelerated my growth as a developer.",
      initials: "MR"
    },
    {
      name: "Emily Johnson",
      role: "Full Stack Developer",
      company: "InnovateLabs",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      quote: "The mentorship helped me build real-world projects that now power my portfolio.",
      initials: "EJ"
    }
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extralight text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800"
      >
        Success Stories
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stories.map((story, index) => (
          <motion.div
            key={story.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={story.image} alt={story.name} />
                  <AvatarFallback>{story.initials}</AvatarFallback>
                </Avatar>
                <Quote className="w-8 h-8 mx-auto text-purple-400 mb-4 opacity-50" />
                <CardDescription className="text-base italic">"{story.quote}"</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="font-medium text-lg">{story.name}</h3>
                <p className="text-sm text-gray-600">{story.role}</p>
                <p className="text-sm text-purple-600">{story.company}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};