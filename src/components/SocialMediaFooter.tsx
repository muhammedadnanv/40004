import { Facebook, Twitter, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export const SocialMediaFooter = () => {
  return (
    <footer className="bg-white border-t border-purple-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-700 transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-700 transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-700 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
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
            
            <a 
              href="https://www.producthunt.com/products/705762"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                variant="default"
                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium px-6 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                Start Building Your Resume
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};