import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isMobileDevice } from '@/utils/mobileResponsiveness';
import { Link } from 'react-router-dom';
interface MobileNavigationProps {
  links: Array<{
    label: string;
    href: string;
    children?: Array<{ label: string; href: string }>;
  }>;
}

export const MobileNavigation = ({ links }: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(isMobileDevice());
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  if (!isMobile) return null;

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="mobile-touch-target touch-manipulation"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 touch-manipulation"
            onClick={closeMenu}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 left-0 bottom-0 w-4/5 max-w-xs bg-white shadow-xl z-50 mobile-nav-drawer-content safe-area-padding">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="font-bold text-lg">Navigation</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeMenu}
                className="mobile-touch-target touch-manipulation"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-80px)]">
              {links.map((link) => (
                <div key={link.href}>
                  <Link
                    to={link.href}
                    className="block py-3 px-4 rounded-md hover:bg-gray-100 font-medium touch-manipulation mobile-touch-target text-fluid-base"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                  
                  {link.children && (
                    <div className="ml-4 space-y-1 border-l border-gray-200 pl-4">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block py-2 px-2 rounded-md hover:bg-gray-100 text-sm touch-manipulation mobile-touch-target text-fluid-sm"
                          onClick={closeMenu}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
};