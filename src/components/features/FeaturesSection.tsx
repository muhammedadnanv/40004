
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star, Brain, Target, Zap } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    { 
      icon: Star, 
      title: "Weekly Tasks", 
      desc: "Structured assignments with clear objectives and milestones" 
    },
    { 
      icon: Brain, 
      title: "AI-Powered Learning", 
      desc: "Personalized learning paths with real-time intelligent feedback" 
    },
    { 
      icon: Target, 
      title: "Goal-Oriented", 
      desc: "Focus on practical skills and industry-relevant projects" 
    },
    { 
      icon: Zap, 
      title: "Rapid Progress", 
      desc: "Accelerated learning through hands-on practice and expert guidance" 
    }
  ];

  return (
    <section 
      className="py-8 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden"
      aria-labelledby="features-heading"
      itemScope 
      itemType="https://schema.org/ItemList"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent" role="presentation" />
      <div className="container mx-auto max-w-5xl relative">
        <motion.h2 
          id="features-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl font-extralight text-center mb-6 sm:mb-8 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800"
          itemProp="name"
        >
          Our Task-Based Mentorship Approach
        </motion.h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto" itemProp="description">
          Learn by doing with our proven mentorship methodology that focuses on practical skills and real-world application.
        </p>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm h-full">
                <CardHeader className="space-y-2 sm:space-y-3 md:space-y-4 p-4 sm:p-6">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
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
