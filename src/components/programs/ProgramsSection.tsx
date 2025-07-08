
import { motion } from "framer-motion";
import { Star, Lock } from "lucide-react";
import { ProgramCard } from "@/components/ProgramCard";
import { useState, useEffect, useRef } from "react";
import { isMobileDevice } from "@/utils/mobileResponsiveness";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  
  // Check if programs should be unlocked (July 21, 2025)
  const activationDate = new Date('2025-07-21T00:00:00');
  const currentDate = new Date();
  const isLocked = currentDate < activationDate;
  
  // Extract unique categories from programs
  useEffect(() => {
    const uniqueCategories = ["all", ...Array.from(new Set(programs.map(program => program.category)))];
    setCategories(uniqueCategories);
    
    // Check for mobile device
    const checkMobile = () => setIsMobile(isMobileDevice());
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [programs]);
  
  // Filter programs by selected category
  const filteredPrograms = activeCategory === "all" 
    ? programs 
    : programs.filter(program => program.category === activeCategory);
  
  // Handle category selection and scroll into view on mobile
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    // Scroll the active category into view on mobile
    if (categoryScrollRef.current) {
      const activeElement = categoryScrollRef.current.querySelector(`[data-category="${category}"]`);
      if (activeElement && isMobile) {
        categoryScrollRef.current.scrollTo({
          left: (activeElement as HTMLElement).offsetLeft - 20,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section 
      id="programs-section" 
      aria-label="Mentorship Programs" 
      className="py-12 md:py-20 lg:py-28 px-4 bg-gradient-to-b from-white via-purple-50/30 to-white relative"
    >
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')] bg-cover bg-fixed opacity-[0.02] pointer-events-none" 
        aria-hidden="true"
      />
      <div className="container mx-auto max-w-6xl relative">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl font-extralight text-center mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800"
        >
          Choose Your Mentorship Path <Star className="inline-block w-5 h-5 sm:w-6 sm:h-6 text-purple-600 animate-pulse" aria-hidden="true" />
        </motion.h2>

        {/* Lock Notice */}
        {isLocked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <Alert className="border-orange-200 bg-orange-50/50 backdrop-blur-sm">
              <Lock className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Notice:</strong> Programs will be automatically activated on July 21, 2025. 
                Enrollment will be available starting from that date.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
        
        {/* Mobile-friendly category filter with horizontal scrolling */}
        <div 
          ref={categoryScrollRef}
          className="flex overflow-x-auto pb-4 mb-6 hide-scrollbar -mx-4 px-4 snap-x snap-mandatory"
          role="tablist"
          aria-label="Program categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              data-category={category}
              onClick={() => handleCategoryChange(category)}
              className={`flex-none px-4 py-2 mr-2 whitespace-nowrap rounded-full text-sm font-medium min-h-[40px] touch-manipulation transition-colors snap-start ${
                activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              role="tab"
              aria-selected={activeCategory === category}
              aria-controls={`panel-${category}`}
              id={`tab-${category}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Mobile-optimized grid with adjusted columns */}
        <div 
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          role="tabpanel"
          id={`panel-${activeCategory}`}
          aria-labelledby={`tab-${activeCategory}`}
        >
          {filteredPrograms.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full" // Ensure equal height cards
            >
              <ProgramCard program={program} />
            </motion.div>
          ))}
        </div>
        
        {/* Empty state when no programs match the filter */}
        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No programs found in this category.</p>
            <button
              onClick={() => setActiveCategory("all")}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors min-h-[48px] touch-manipulation"
            >
              View all programs
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
