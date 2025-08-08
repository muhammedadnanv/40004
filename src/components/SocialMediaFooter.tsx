import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export const SocialMediaFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-purple-100 mobile-safe-area">
      <div className="responsive-container py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-fluid-sm text-gray-500 space-y-3">
            <p>© {currentYear} Dev Mentor Hub. All rights reserved.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <Link 
                to="/privacy" 
                className="text-purple-600 hover:underline mobile-touch-target touch-manipulation text-fluid-sm"
              >
                Privacy Policy
              </Link>
              <span className="hidden sm:inline text-gray-300">|</span>
              <Link 
                to="/terms" 
                className="text-purple-600 hover:underline mobile-touch-target touch-manipulation text-fluid-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};