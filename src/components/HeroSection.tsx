import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const scrollToPrograms = () => {
    const programsSection = document.getElementById('programs-section');
    programsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')] bg-cover bg-center opacity-[0.02] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/30 to-white"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-4xl text-center relative"
      >
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight premium-gradient flex items-center justify-center gap-4">
              Dev Mentor Hub 
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-purple-600 animate-pulse" />
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto">
              Your journey to mastering technology starts here
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
          >
            <Button 
              onClick={scrollToPrograms} 
              className="w-full sm:w-auto bg-primary hover:bg-primary-600 text-white font-medium px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg group"
            >
              <BookOpen className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Explore Programs
            </Button>
            
            <a 
              href="https://www.mygreatlearning.com/academy?referrer_code=GLL44ZJATMMKQ"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-6 text-lg border-2 border-primary/20 rounded-xl hover:bg-primary/5 transition-all duration-300 hover:scale-105 font-medium text-primary group"
            >
              Learn More
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};