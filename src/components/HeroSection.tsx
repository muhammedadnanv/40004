import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const HeroSection = () => {
  const scrollToPrograms = () => {
    const programsSection = document.getElementById('programs-section');
    programsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 via-white to-purple-100/50"></div>
      <div className="container mx-auto max-w-3xl text-center relative">
        <div className="space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800 animate-fade-in">
            Dev Mentor Hub
          </h1>
          <p className="text-lg text-gray-600 mb-16 font-light max-w-xl mx-auto animate-fade-in">
            Your journey to mastering technology starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto animate-scale-in">
            <Button 
              onClick={scrollToPrograms} 
              variant="outline"
              className="w-full sm:w-auto border-purple-200 hover:bg-purple-50 font-light text-purple-700"
            >
              Explore Programs
            </Button>
            
            <a 
              href="https://www.mygreatlearning.com/academy?referrer_code=GLL44ZJATMMKQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2 w-full sm:w-auto text-sm border border-purple-200 rounded-md hover:bg-purple-50 transition-colors font-light text-purple-700"
            >
              Learn <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};