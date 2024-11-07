import { Mail, Linkedin, Instagram, Twitter } from "lucide-react";

export const SocialMediaFooter = () => {
  return (
    <footer className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-center space-x-4 sm:space-x-6">
          <a 
            href="mailto:comicfix@f5.si" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#4A00E0] transition-colors p-2 sm:p-3 hover:bg-[#4A00E0]/5 rounded-full"
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a 
            href="https://www.linkedin.com/company/comicfix" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#4A00E0] transition-colors p-2 sm:p-3 hover:bg-[#4A00E0]/5 rounded-full"
          >
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a 
            href="https://www.instagram.com/comicfix.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#4A00E0] transition-colors p-2 sm:p-3 hover:bg-[#4A00E0]/5 rounded-full"
          >
            <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a 
            href="https://x.com/comicfixin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#4A00E0] transition-colors p-2 sm:p-3 hover:bg-[#4A00E0]/5 rounded-full"
          >
            <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};