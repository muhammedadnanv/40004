import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export const HeroSection = () => {
  const scrollToPrograms = () => {
    const programsSection = document.getElementById('programs-section');
    programsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-r from-[#4A00E0]/10 via-[#4A00E0]/5 to-[#4A00E0]/10">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 mb-4 sm:mb-6 lg:mb-8 bg-white/80 backdrop-blur-sm py-2 sm:py-3 px-2 sm:px-3 md:px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-[#4A00E0]/10">
          <Info className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#4A00E0] animate-pulse flex-shrink-0" />
          <p className="text-xs sm:text-sm md:text-base text-gray-700">
            The Dev Mentorship Program is not just about technical skills; it's about investing in your future.
          </p>
        </div>
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A00E0]/5 to-purple-600/5 rounded-xl blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              alt="Developer Environment"
              className="absolute inset-0 w-full h-full object-cover opacity-5 rounded-xl"
            />
            <h1 className="relative text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#4A00E0] to-purple-600 drop-shadow-sm">
              Start Your Developer Journey Today
            </h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 mb-3 sm:mb-4 md:mb-6 lg:mb-8 leading-relaxed px-2 sm:px-4">
            Get mentored by community experts and earn a certification for just ₹49
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-xs sm:text-sm md:text-base lg:text-lg px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 text-[#4A00E0] border-[#4A00E0] hover:bg-[#4A00E0]/10 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
              onClick={scrollToPrograms}
            >
              View Programs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};