import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const HeroSection = () => {
  const scrollToPrograms = () => {
    const programsSection = document.getElementById('programs-section');
    programsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-32 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-extralight mb-8 tracking-tight">Dev Mentor Hub</h1>
        <p className="text-lg text-gray-600 mb-16 font-light">Your journey to mastering technology starts here.</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Button 
            onClick={scrollToPrograms} 
            variant="outline"
            className="w-full sm:w-auto border-gray-200 hover:bg-gray-50 font-light"
          >
            Explore Programs
          </Button>
          
          <a 
            href="https://www.mygreatlearning.com/academy?referrer_code=GLL44ZJATMMKQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2 w-full sm:w-auto text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition-colors font-light"
          >
            Learn Free <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};