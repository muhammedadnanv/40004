
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";

export const SocialMediaFooter = () => {
  return (
    <footer className="bg-white border-t border-purple-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 sm:space-x-8 mb-8">
            <motion.a
              href="https://www.facebook.com/profile.php?id=61566845016229"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-full bg-gradient-to-br from-purple-50 to-white shadow-premium hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Visit our Facebook page"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-[#9b87f5] group-hover:text-[#7E69AB] transition-colors" />
            </motion.a>
            
            <motion.a
              href="https://x.com/comicfixin"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-full bg-gradient-to-br from-purple-50 to-white shadow-premium hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Follow us on X/Twitter"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <Twitter className="w-5 h-5 sm:w-6 sm:h-6 text-[#9b87f5] group-hover:text-[#7E69AB] transition-colors" />
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/company/comicfix/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-full bg-gradient-to-br from-purple-50 to-white shadow-premium hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Connect with us on LinkedIn"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-[#9b87f5] group-hover:text-[#7E69AB] transition-colors" />
            </motion.a>
            
            <motion.a
              href="https://www.instagram.com/comicfixin/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-full bg-gradient-to-br from-purple-50 to-white shadow-premium hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Follow us on Instagram"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-[#9b87f5] group-hover:text-[#7E69AB] transition-colors" />
            </motion.a>
            
            <motion.a
              href="https://www.youtube.com/@comicfixchannel"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-full bg-gradient-to-br from-purple-50 to-white shadow-premium hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Subscribe to our YouTube channel"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <Youtube className="w-5 h-5 sm:w-6 sm:h-6 text-[#9b87f5] group-hover:text-[#7E69AB] transition-colors" />
            </motion.a>
          </div>
          
          <div className="text-center text-sm text-gray-500 mt-8">
            <p>© {new Date().getFullYear()} ComicFix. All rights reserved.</p>
            <p className="mt-2">
              <a href="/privacy" className="text-purple-600 hover:underline mx-2">Privacy Policy</a>
              <a href="/terms" className="text-purple-600 hover:underline mx-2">Terms of Service</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
