import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const HeroSection = () => {
  const scrollToPrograms = () => {
    const programsSection = document.getElementById('programs-section');
    programsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-3xl text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-light mb-6 tracking-tight">Dev Mentor Hub</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-12">Your journey to mastering technology starts here.</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Button 
            onClick={scrollToPrograms} 
            variant="outline"
            className="w-full sm:w-auto border-gray-300 hover:bg-gray-50"
          >
            Explore Programs
          </Button>
          
          <a 
            href="https://www.mygreatlearning.com/academy?referrer_code=GLL44ZJATMMKQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2 w-full sm:w-auto text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            Learn Free <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};