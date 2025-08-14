import React, { useState, useEffect } from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Menu, X, Home, Award, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isMobileDevice } from "@/utils/mobileResponsiveness";
import { Link } from "react-router-dom";

export function MainNav() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => setIsMobile(isMobileDevice());
    checkMobile();

    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent body scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Mobile menu version
  if (isMobile) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 px-4 py-3 safe-area-padding">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <span className="font-bold text-xl text-primary">Dev Mentor Hub</span>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            className="p-2 touch-manipulation relative z-50" 
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={closeMenu}>
            <div className="absolute top-0 left-0 bottom-0 w-4/5 max-w-xs bg-white shadow-xl z-50 animate-in slide-in-from-left-full safe-area-padding" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center p-4 border-b">
                <span className="font-bold text-lg text-primary">Menu</span>
                <Button variant="ghost" size="sm" onClick={closeMenu} className="p-1 touch-manipulation" aria-label="Close menu">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
                {/* Main navigation links with icons */}
                <Link to="/" className="flex items-center space-x-3 py-3 px-4 rounded-md hover:bg-gray-100 font-medium touch-manipulation transition-colors" onClick={closeMenu}>
                  <Home className="h-5 w-5 text-primary" />
                  <span>Home</span>
                </Link>
                
                {/* Programs submenu */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 px-4 font-medium text-primary">
                    <Settings className="h-5 w-5" />
                    <span>Programs</span>
                  </div>
                  <div className="ml-8 space-y-2 border-l border-gray-200 pl-4">
                    <Link to="/programs/frontend" className="block py-2 px-2 rounded-md hover:bg-gray-100 text-sm touch-manipulation transition-colors" onClick={closeMenu}>
                      Frontend Development
                    </Link>
                    <Link to="/programs/lowcode" className="block py-2 px-2 rounded-md hover:bg-gray-100 text-sm touch-manipulation transition-colors" onClick={closeMenu}>
                      Low-Code Development
                    </Link>
                    <Link to="/programs/nocode" className="block py-2 px-2 rounded-md hover:bg-gray-100 text-sm touch-manipulation transition-colors" onClick={closeMenu}>
                      No-Code Development
                    </Link>
                    <Link to="/programs/fullstack" className="block py-2 px-2 rounded-md hover:bg-gray-100 text-sm touch-manipulation transition-colors" onClick={closeMenu}>
                      Full Stack Development
                    </Link>
                    <Link to="/programs/manychat" className="block py-2 px-2 rounded-md hover:bg-gray-100 text-sm touch-manipulation transition-colors" onClick={closeMenu}>
                      ManyChat Automation
                    </Link>
                  </div>
                </div>
                
                {/* Other main links with icons */}
                <Link to="/certification" className="flex items-center space-x-3 py-3 px-4 rounded-md hover:bg-gray-100 font-medium touch-manipulation transition-colors" onClick={closeMenu}>
                  <Award className="h-5 w-5 text-primary" />
                  <span>Certification</span>
                </Link>
                <Link to="/partnerships" className="flex items-center space-x-3 py-3 px-4 rounded-md hover:bg-gray-100 font-medium touch-manipulation transition-colors" onClick={closeMenu}>
                  <Users className="h-5 w-5 text-primary" />
                  <span>Partnerships</span>
                </Link>
                <Link to="/content-summarizer" className="flex items-center space-x-3 py-3 px-4 rounded-md hover:bg-gray-100 font-medium touch-manipulation transition-colors" onClick={closeMenu}>
                  <Settings className="h-5 w-5 text-primary" />
                  <span>Content Summarizer</span>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop menu version - simplified without asChild
  return (
    <div className="hidden md:block w-full bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-primary">Dev Mentor Hub</span>
          </Link>
          
          <nav className="flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            
            <div className="relative group">
              <span className="text-sm font-medium transition-colors hover:text-primary cursor-pointer">
                Programs
              </span>
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link to="/programs/frontend" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors">
                    Frontend Development
                  </Link>
                  <Link to="/programs/lowcode" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors">
                    Low-Code Development
                  </Link>
                  <Link to="/programs/nocode" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors">
                    No-Code Development
                  </Link>
                  <Link to="/programs/fullstack" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors">
                    Full Stack Development
                  </Link>
                  <Link to="/programs/manychat" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors">
                    ManyChat Automation
                  </Link>
                </div>
              </div>
            </div>
            
            <Link to="/certification" className="text-sm font-medium transition-colors hover:text-primary">
              Certification
            </Link>
            
            <Link to="/content-summarizer" className="text-sm font-medium transition-colors hover:text-primary">
              Content Summarizer
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
