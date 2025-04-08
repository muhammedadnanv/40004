
import { Facebook, Twitter, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export const SocialMediaFooter = () => {
  return (
    <footer className="bg-white border-t border-purple-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Social Media Links */}
          <div className="flex justify-center space-x-8 mb-8">
            <motion.a
              href="https://www.facebook.com/profile.php?id=61566845016229"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-full bg-gradient-to-br from-purple-50 to-white shadow-premium hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <Facebook className="w-6 h-6 text-[#9b87f5] group-hover:text-[#7E69AB] transition-colors" />
            </motion.a>
            
            <motion.a
              href="https://x.com/comicfixin"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-full bg-gradient-to-br from-purple-50 to-white shadow-premium hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <Twitter className="w-6 h-6 text-[#9b87f5] group-hover:text-[#7E69AB] transition-colors" />
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/company/comicfix/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-full bg-gradient-to-br from-purple-50 to-white shadow-premium hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <Linkedin className="w-6 h-6 text-[#9b87f5] group-hover:text-[#7E69AB] transition-colors" />
            </motion.a>
          </div>

          {/* SXO Resume Builder Call-to-Action */}
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
              Create an impressive ATS-friendly resume that highlights your skills and experience. 
              Try our SXO Resume Builder to increase your chances of getting hired!
            </p>
            
            <a 
              href="https://sxoresumebulider.vercel.app/"
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
