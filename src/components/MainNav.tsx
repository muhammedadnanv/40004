import React, { useState, useEffect } from "react";
import { Menu, X, Home, Award, Users, Settings, FolderKanban, LayoutDashboard, Code2, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { UserMenu } from "@/components/auth/UserMenu";
import { cn } from "@/lib/utils";

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const location = useLocation();
  
  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProgramsOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  // Handle ESC key to close menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
      }
    };
    
    if (isMenuOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isMenuOpen]);
  
  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    document.body.style.overflow = newState ? 'hidden' : '';
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProgramsOpen(false);
    document.body.style.overflow = '';
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/certification", label: "Certification", icon: Award },
    { to: "/partnerships", label: "Partnerships", icon: Users },
    { to: "/content-summarizer", label: "Content Summarizer", icon: Settings },
    { to: "/professional-development", label: "Career Tools", icon: Users },
    { to: "/gallery", label: "Gallery", icon: FolderKanban },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/code-playground", label: "Code Playground", icon: Code2 },
  ];

  const programLinks = [
    { to: "/programs/frontend", label: "Frontend Development" },
    { to: "/programs/lowcode", label: "Low-Code Development" },
    { to: "/programs/nocode", label: "No-Code Development" },
    { to: "/programs/fullstack", label: "Full Stack Development" },
    { to: "/programs/manychat", label: "ManyChat Automation" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border/20 safe-area-padding">
      <nav 
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" 
        role="navigation" 
        aria-label="Main navigation"
      >
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 flex-shrink-0"
            aria-label="Dev Mentor Hub - Home"
          >
            <span className="font-bold text-lg sm:text-xl text-primary">Dev Mentor Hub</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link 
              to="/" 
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive("/") ? "text-primary bg-primary/10" : "text-foreground/80 hover:text-primary hover:bg-primary/5"
              )}
            >
              Home
            </Link>
            
            {/* Programs Dropdown */}
            <div className="relative group">
              <button 
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  location.pathname.startsWith("/programs") ? "text-primary bg-primary/10" : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                )}
                aria-expanded="false"
                aria-haspopup="true"
              >
                Programs
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
              <div 
                className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                role="menu"
              >
                <div className="bg-background rounded-lg shadow-xl border border-border/20 py-2">
                  {programLinks.map((link) => (
                    <Link 
                      key={link.to}
                      to={link.to} 
                      className={cn(
                        "block px-4 py-2.5 text-sm transition-colors",
                        isActive(link.to) ? "text-primary bg-primary/10" : "hover:bg-primary/5"
                      )}
                      role="menuitem"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-border/20 mt-2 pt-2">
                    <Link 
                      to="/programs" 
                      className="block px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5"
                      role="menuitem"
                    >
                      View All Programs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {navLinks.slice(1).map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                  isActive(link.to) ? "text-primary bg-primary/10" : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Right side - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <UserMenu />
          </div>
          
          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <UserMenu />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="h-10 w-10 touch-manipulation"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
      
      {/* Mobile Menu Panel */}
      <div 
        id="mobile-menu"
        className={cn(
          "fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-background shadow-2xl z-50 lg:hidden",
          "transform transition-transform duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/20">
          <span className="font-bold text-lg text-primary">Menu</span>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={closeMenu}
            className="h-10 w-10 touch-manipulation"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Mobile Menu Content */}
        <nav 
          className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-1"
          style={{ WebkitOverflowScrolling: 'touch', maxHeight: 'calc(100vh - 65px)' }}
        >
          {/* Home Link */}
          <Link 
            to="/" 
            onClick={closeMenu}
            className={cn(
              "flex items-center gap-3 px-4 py-3.5 rounded-lg transition-colors touch-manipulation",
              isActive("/") ? "bg-primary/10 text-primary" : "hover:bg-accent/10"
            )}
          >
            <Home className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="font-medium">Home</span>
          </Link>
          
          {/* Programs Accordion */}
          <div className="space-y-1">
            <button
              onClick={() => setIsProgramsOpen(!isProgramsOpen)}
              className={cn(
                "flex items-center justify-between w-full px-4 py-3.5 rounded-lg transition-colors touch-manipulation",
                location.pathname.startsWith("/programs") ? "bg-primary/10 text-primary" : "hover:bg-accent/10"
              )}
              aria-expanded={isProgramsOpen}
            >
              <span className="flex items-center gap-3">
                <Settings className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span className="font-medium">Programs</span>
              </span>
              <ChevronDown 
                className={cn("h-5 w-5 transition-transform", isProgramsOpen && "rotate-180")} 
                aria-hidden="true" 
              />
            </button>
            
            {isProgramsOpen && (
              <div className="ml-6 pl-4 border-l-2 border-border/30 space-y-1">
                {programLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeMenu}
                    className={cn(
                      "block px-3 py-3 rounded-lg text-sm transition-colors touch-manipulation",
                      isActive(link.to) ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent/10"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/programs"
                  onClick={closeMenu}
                  className="block px-3 py-3 rounded-lg text-sm font-semibold text-primary hover:bg-accent/10 touch-manipulation"
                >
                  View All Programs
                </Link>
              </div>
            )}
          </div>
          
          {/* Other Nav Links */}
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-lg transition-colors touch-manipulation",
                isActive(link.to) ? "bg-primary/10 text-primary" : "hover:bg-accent/10"
              )}
            >
              <link.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
          
          {/* Install App Link */}
          <Link
            to="/install"
            onClick={closeMenu}
            className={cn(
              "flex items-center gap-3 px-4 py-3.5 rounded-lg transition-colors touch-manipulation mt-4",
              "bg-primary/5 border border-primary/20",
              isActive("/install") ? "bg-primary/10 text-primary" : "hover:bg-primary/10"
            )}
          >
            <Download className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
            <span className="font-medium">Install App</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
