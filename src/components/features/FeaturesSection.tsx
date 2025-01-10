import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star, Brain, Target, Zap } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    { icon: Star, title: "Weekly Tasks", desc: "Structured assignments with clear objectives" },
    { icon: Brain, title: "AI-Powered Learning", desc: "Personalized learning paths and feedback" },
    { icon: Target, title: "Goal-Oriented", desc: "Focus on practical skill development" },
    { icon: Zap, title: "Rapid Progress", desc: "Accelerated learning through hands-on practice" }
  ];

  return (
    <section className="py-8 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent" />
      <div className="container mx-auto max-w-5xl relative">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl font-extralight text-center mb-6 sm:mb-8 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800"
        >
          Our Task-Based Mentorship Approach
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white/80 backdrop-blur-sm h-full">
                <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-600 group-hover:rotate-12 transition-transform duration-300" />
                  <CardTitle className="text-sm sm:text-base md:text-lg font-light">{feature.title}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{feature.desc}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};