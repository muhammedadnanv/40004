
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { ProgramCard } from "@/components/ProgramCard";

interface Program {
  title: string;
  description: string;
  duration: string;
  skills: string[];
  category: string;
  regularPrice: number;
}

interface ProgramsSectionProps {
  programs: Program[];
}

export const ProgramsSection = ({ programs }: ProgramsSectionProps) => {
  return (
    <section 
      id="programs-section" 
      aria-label="programs" 
      className="py-12 md:py-20 lg:py-28 px-4 bg-gradient-to-b from-white via-purple-50/30 to-white relative"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')] bg-cover bg-fixed opacity-[0.02] pointer-events-none" />
      <div className="container mx-auto max-w-6xl relative">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl font-extralight text-center mb-6 sm:mb-10 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800"
        >
          Choose Your Mentorship Path <Star className="inline-block w-5 h-5 sm:w-6 sm:h-6 text-purple-600 animate-pulse" />
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProgramCard program={program} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
