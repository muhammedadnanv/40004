import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const HeroSection = () => {
  const scrollToPrograms = () => {
    const programsSection = document.getElementById('programs-section');
    programsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Free Learning Button */}
      <div className="absolute top-0 left-0 right-0 flex justify-center">
        <a 
          href="https://www.mygreatlearning.com/academy?referrer_code=GLL44ZJATMMKQ"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-[#4A00E0] to-blue-500 text-white rounded-full hover:opacity-90 transition-opacity"
        >
          <span>Learn Everything for Free</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Welcome to Dev Mentor Hub</h1>
        <p className="text-lg sm:text-xl mb-8">Your journey to mastering the world of technology starts here.</p>
        <Button onClick={scrollToPrograms} className="bg-[#4A00E0] text-white rounded-md px-6 py-3">Explore Programs</Button>
      </div>
    </section>
  );
};
