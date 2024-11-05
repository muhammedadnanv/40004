import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export const HeroSection = () => {
  const scrollToPrograms = () => {
    const programsSection = document.getElementById('programs-section');
    programsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-[#4A00E0]/10 via-[#4A00E0]/5 to-[#4A00E0]/10">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8 bg-white/80 backdrop-blur-sm py-3 px-4 rounded-lg shadow-sm">
          <Info className="w-5 h-5 text-[#4A00E0]" />
          <p className="text-sm md:text-base text-gray-700">
            The Dev Mentorship Program is not just about enhancing your technical skills; it's about investing in your future.
          </p>
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Start Your Developer Journey Today
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Get mentored by community experts and earn a certification for just ₹49
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 text-[#4A00E0] border-[#4A00E0] hover:bg-[#4A00E0]/10"
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