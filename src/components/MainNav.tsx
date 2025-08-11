import React, { useState, useEffect } from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
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
    return <>
        <Button variant="ghost" size="icon" onClick={toggleMenu} className="p-2 touch-manipulation" aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        
        {isMenuOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={closeMenu}>
            <div className="absolute top-0 left-0 bottom-0 w-4/5 max-w-xs bg-white shadow-xl z-50 animate-in slide-in-from-left-full" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center p-4 border-b">
                <span className="font-bold text-lg">Menu</span>
                <Button variant="ghost" size="sm" onClick={closeMenu} className="p-1 touch-manipulation" aria-label="Close menu">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <nav className="p-4 space-y-6">
                {/* Main navigation links */}
                <Link to="/" className="block py-3 px-4 rounded-md hover:bg-gray-100 font-medium touch-manipulation" onClick={closeMenu}>
                  Home
                </Link>
                
                {/* Programs submenu */}
                <div className="space-y-2">
                  <div className="px-4 font-medium">Programs</div>
                  <div className="ml-4 space-y-2 border-l border-gray-200 pl-4">
                    <Link to="/programs/frontend" className="block py-2 px-2 rounded-md hover:bg-gray-100 text-sm touch-manipulation" onClick={closeMenu}>
                      Frontend Development
                    </Link>
                    <Link to="/programs/lowcode" className="block py-2 px-2 rounded-md hover:bg-gray-100 text-sm touch-manipulation" onClick={closeMenu}>
                      Low-Code Development
                    </Link>
                    <Link to="/programs/nocode" className="block py-2 px-2 rounded-md hover:bg-gray-100 text-sm touch-manipulation" onClick={closeMenu}>
                      No-Code Development
                    </Link>
                    <Link to="/programs/fullstack" className="block py-2 px-2 rounded-md hover:bg-gray-100 text-sm touch-manipulation" onClick={closeMenu}>
                      Full Stack Development
                    </Link>
                    <Link to="/programs/manychat" className="block py-2 px-2 rounded-md hover:bg-gray-100 text-sm touch-manipulation" onClick={closeMenu}>
                      ManyChat Automation
                    </Link>
                  </div>
                </div>
                
                {/* Other main links */}
                <Link to="/certification" className="block py-3 px-4 rounded-md hover:bg-gray-100 font-medium touch-manipulation" onClick={closeMenu}>
                  Certification
                </Link>
                <Link to="/partnerships" className="block py-3 px-4 rounded-md hover:bg-gray-100 font-medium touch-manipulation" onClick={closeMenu}>
                  Partnerships
                </Link>
                <Link to="/cms" className="block py-3 px-4 rounded-md hover:bg-gray-100 font-medium touch-manipulation" onClick={closeMenu}>
                  CMS
                </Link>
              </nav>
            </div>
          </div>}
      </>;
  }

  // Desktop menu version (original)
  return <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink to="/">Home</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Programs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[400px]">
              <NavigationMenuLink to="/programs/frontend">Frontend Development</NavigationMenuLink>
              <NavigationMenuLink to="/programs/lowcode">Low-Code Development</NavigationMenuLink>
              <NavigationMenuLink to="/programs/nocode">No-Code Development</NavigationMenuLink>
              <NavigationMenuLink to="/programs/fullstack">Full Stack Development</NavigationMenuLink>
              <NavigationMenuLink to="/programs/manychat">ManyChat Automation</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink to="/certification">Certification</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          
        </NavigationMenuItem>
        <NavigationMenuItem>
          
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>;
}