import { Mail, Linkedin, Instagram, Twitter } from "lucide-react";

export const SocialMediaFooter = () => {
  return (
    <footer className="py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          <div className="mb-3 sm:mb-4">
            <h3 className="text-sm sm:text-base md:text-lg font-light text-gray-700 mb-2 sm:mb-3 text-center">We Are Partnered With</h3>
            <img 
              src="https://i.ibb.co/8MydcJj/image-removebg-preview-1.png" 
              alt="Partnership Logo" 
              className="h-5 sm:h-6 md:h-8 w-auto object-contain"
            />
          </div>

          <div className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4">
            <a 
              href="mailto:comicfix@f5.si" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#4A00E0] transition-colors p-1.5 sm:p-2 hover:bg-[#4A00E0]/5 rounded-full"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/company/comicfix" 
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

          {/* Product Hunt iframe */}
          <div className="mt-6 flex justify-center w-full">
            <iframe 
              style={{ border: 'none' }} 
              src="https://cards.producthunt.com/cards/products/705762" 
              width="500" 
              height="405" 
              frameBorder="0" 
              scrolling="no" 
              allowFullScreen 
              className="max-w-full"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};