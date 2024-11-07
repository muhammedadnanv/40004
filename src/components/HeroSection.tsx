import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export const HeroSection = () => {
  const scrollToPrograms = () => {
    const programsSection = document.getElementById('programs-section');
    programsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-[#4A00E0]/10 via-[#4A00E0]/5 to-[#4A00E0]/10">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8 bg-white/80 backdrop-blur-sm py-2 sm:py-3 px-3 sm:px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-[#4A00E0]/10">
          <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A00E0] animate-pulse flex-shrink-0" />
          <p className="text-xs sm:text-sm md:text-base text-gray-700">
            The Dev Mentorship Program is not just about technical skills; it's about investing in your future.
          </p>
        </div>
        <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A00E0]/5 to-purple-600/5 rounded-xl blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              alt="Developer Environment"
              className="absolute inset-0 w-full h-full object-cover opacity-5 rounded-xl"
            />
            <h1 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#4A00E0] to-purple-600 drop-shadow-sm">
              Start Your Developer Journey Today
            </h1>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4">
            Get mentored by community experts and earn a certification for just ₹49
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 text-[#4A00E0] border-[#4A00E0] hover:bg-[#4A00E0]/10 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
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