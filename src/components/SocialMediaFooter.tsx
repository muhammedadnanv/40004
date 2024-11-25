import { Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

export const SocialMediaFooter = () => {
  return (
    <footer className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl font-light text-gray-800 mb-6">
            Connect With Us
          </h3>
          
          <div className="flex justify-center items-center gap-4 mb-8">
            <a 
              href="https://www.facebook.com/comicfix.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#4A00E0] transition-colors p-1.5 sm:p-2 hover:bg-[#4A00E0]/5 rounded-full"
            >
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/company/comicfix/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#4A00E0] transition-colors p-1.5 sm:p-2 hover:bg-[#4A00E0]/5 rounded-full"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </a>
            <a 
              href="https://x.com/comicfixin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#4A00E0] transition-colors p-1.5 sm:p-2 hover:bg-[#4A00E0]/5 rounded-full"
            >
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </a>
          </div>

          {/* Resume Building Call-to-Action */}
          <div className="mb-8 p-6 bg-purple-50 rounded-lg">
            <h4 className="text-lg sm:text-xl font-medium text-purple-800 mb-2">
              Build Your Professional Resume
            </h4>
            <p className="text-sm sm:text-base text-purple-600 mb-4">
              Create an impressive resume that highlights your skills and experience. 
              Try our resume builder featured on Product Hunt!
            </p>
            <Button 
              variant="secondary"
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => window.open('https://www.producthunt.com/products/705762', '_blank')}
            >
              Start Building Your Resume
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};