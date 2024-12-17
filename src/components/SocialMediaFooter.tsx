import { Facebook, Twitter, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden mb-8 p-8 rounded-2xl shadow-premium bg-gradient-to-br from-purple-50 via-white to-purple-50 border border-purple-100/50"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')] bg-cover bg-center opacity-[0.02]" />
            
            <h4 className="text-xl sm:text-2xl font-medium bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-3">
              Build Your Professional Resume
            </h4>
            
            <p className="text-sm sm:text-base text-purple-700/80 mb-6 max-w-lg mx-auto">
              Create an impressive resume that highlights your skills and experience. 
              Try our resume builder featured on Product Hunt!
            </p>
            
            <Button 
              variant="default"
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium px-6 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              onClick={() => window.open('https://www.producthunt.com/products/705762', '_blank')}
            >
              Start Building Your Resume
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};