import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export const SocialMediaFooter = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-white border-t border-purple-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Social Media Links */}
          
          
          <div className="text-center text-sm text-gray-500 mt-8">
            <p>© {currentYear} Dev Mentor Hub. All rights reserved.</p>
            <p className="mt-2">
              <Link to="/privacy" className="text-purple-600 hover:underline mx-2">Privacy Policy</Link>
              <Link to="/terms" className="text-purple-600 hover:underline mx-2">Terms of Service</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>;
};