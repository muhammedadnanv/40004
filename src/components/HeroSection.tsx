import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const scrollToPrograms = () => {
    const programsSection = document.getElementById('programs-section');
    programsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 via-white to-purple-100/50"></div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-3xl text-center relative"
      >
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center gap-2 px-4"
          >
            Dev Mentor Hub <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-purple-600 animate-pulse" />
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 lg:mb-10 font-light max-w-xl mx-auto px-4"
          >
            Your journey to mastering technology starts here.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto px-4"
          >
            <Button 
              onClick={scrollToPrograms} 
              variant="outline"
              className="w-full sm:w-auto border-purple-200 hover:bg-purple-50 font-light text-purple-700 group transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              <BookOpen className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              Explore Programs
            </Button>
            
            <a 
              href="https://www.mygreatlearning.com/academy?referrer_code=GLL44ZJATMMKQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 w-full sm:w-auto text-sm sm:text-base border border-purple-200 rounded-md hover:bg-purple-50 transition-all duration-300 hover:scale-105 font-light text-purple-700 group"
            >
              Learn <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};