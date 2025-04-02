
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { isMobileDevice, hasTouchCapability } from "@/utils/mobileResponsiveness";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  withPadding?: boolean;
  centered?: boolean;
  safeArea?: boolean;
  mobileOptimized?: boolean;
}

export function ResponsiveContainer({
  children,
  className,
  fullWidth = false,
  withPadding = true,
  centered = true,
  safeArea = false,
  mobileOptimized = true,
}: ResponsiveContainerProps) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if mobile on mount
    setIsMobile(isMobileDevice());
    
    // Add resize listener
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={cn(
        "w-full",
        fullWidth ? "" : "max-w-7xl mx-auto",
        withPadding ? "px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12" : "", // Adjusted padding for better mobile experience
        centered ? "text-center" : "",
        safeArea ? "safe-area-padding" : "",
        mobileOptimized && isMobile ? "mobile-optimized" : "",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ResponsiveGrid({
  children,
  className,
  columns = { default: 1, sm: 2, md: 3, lg: 4 },
  spacing = "default",
  mobileStack = true,
  mobileScrollable = false,
}: {
  children: React.ReactNode;
  className?: string;
  columns?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  spacing?: "compact" | "default" | "wide";
  mobileStack?: boolean;
  mobileScrollable?: boolean;
}) {
  const getGridCols = () => {
    const colClasses = [`grid-cols-${mobileStack ? 1 : columns.default}`];
    
    if (columns.sm) {
      colClasses.push(`sm:grid-cols-${columns.sm}`);
    }
    if (columns.md) {
      colClasses.push(`md:grid-cols-${columns.md}`);
    }
    if (columns.lg) {
      colClasses.push(`lg:grid-cols-${columns.lg}`);
    }
    if (columns.xl) {
      colClasses.push(`xl:grid-cols-${columns.xl}`);
    }
    
    return colClasses.join(' ');
  };

  const getSpacing = () => {
    if (spacing === "compact") return "gap-2 sm:gap-3 md:gap-4";
    if (spacing === "wide") return "gap-4 sm:gap-6 md:gap-8 lg:gap-10";
    return "gap-3 sm:gap-4 md:gap-6 lg:gap-8"; // Adjusted for better mobile spacing
  };

  // For mobile scrollable grids
  if (mobileScrollable) {
    return (
      <div className={cn("overflow-x-auto pb-4 -mx-4 px-4 hide-scrollbar", className)}>
        <div className={cn(
          "flex",
          spacing === "compact" ? "gap-2 sm:gap-3" : 
          spacing === "wide" ? "gap-4 sm:gap-6" : "gap-3 sm:gap-4",
          "min-w-full"
        )}>
          {React.Children.map(children, (child) => (
            <div className="flex-none" style={{ width: `calc(85% - 1rem)`, maxWidth: '300px' }}>
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid",
        getGridCols(),
        getSpacing(),
        className
      )}
    >
      {children}
    </div>
  );
}

export function ResponsiveFlex({
  children,
  className,
  direction = "row",
  align = "center",
  justify = "between",
  wrap = true,
  gap = "default",
  mobileStack = true,
  mobileReverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "row" | "col" | "row-reverse" | "col-reverse" | "responsive";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  wrap?: boolean;
  gap?: "none" | "sm" | "default" | "md" | "lg";
  mobileStack?: boolean;
  mobileReverse?: boolean;
}) {
  const getDirection = () => {
    if (direction === "responsive" || mobileStack) {
      return mobileReverse 
        ? "flex-col-reverse sm:flex-row" 
        : "flex-col sm:flex-row";
    }
    if (direction === "row") return "flex-row";
    if (direction === "col") return "flex-col";
    if (direction === "row-reverse") return "flex-row-reverse";
    return "flex-col-reverse";
  };

  const getGap = () => {
    if (gap === "none") return "";
    if (gap === "sm") return "gap-2 sm:gap-3";
    if (gap === "md") return "gap-4 sm:gap-5 md:gap-6";
    if (gap === "lg") return "gap-5 sm:gap-6 md:gap-8";
    return "gap-3 sm:gap-4"; // Adjusted for better spacing on mobile
  };

  return (
    <div
      className={cn(
        "flex",
        getDirection(),
        `items-${align}`,
        `justify-${justify}`,
        wrap ? "flex-wrap" : "flex-nowrap",
        getGap(),
        className
      )}
    >
      {children}
    </div>
  );
}

export function ResponsiveText({
  children,
  className,
  size = "default",
  as = "p",
  mobileOptimized = true,
  truncate = false,
  lines,
}: {
  children: React.ReactNode;
  className?: string;
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "2xl" | "3xl";
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  mobileOptimized?: boolean;
  truncate?: boolean;
  lines?: number;
}) {
  const Component = as;

  const getSize = () => {
    if (!mobileOptimized) {
      // Fixed sizes regardless of screen size
      if (size === "xs") return "text-xs";
      if (size === "sm") return "text-sm";
      if (size === "lg") return "text-lg";
      if (size === "xl") return "text-xl";
      if (size === "2xl") return "text-2xl";
      if (size === "3xl") return "text-3xl";
      return "text-base";
    }
    
    // Responsive sizes with better mobile scaling
    if (size === "xs") return "text-xs sm:text-sm";
    if (size === "sm") return "text-sm sm:text-base";
    if (size === "lg") return "text-base sm:text-lg md:text-xl";
    if (size === "xl") return "text-lg sm:text-xl md:text-2xl";
    if (size === "2xl") return "text-xl sm:text-2xl md:text-3xl lg:text-4xl";
    if (size === "3xl") return "text-2xl sm:text-3xl md:text-4xl lg:text-5xl";
    return "text-base";
  };

  const truncateStyles = truncate 
    ? lines 
      ? {
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: lines,
        } as React.CSSProperties
      : "truncate"
    : "";

  return (
    <Component
      className={cn(
        getSize(),
        mobileOptimized && "tracking-tight", // Tighter tracking for better mobile reading
        typeof truncateStyles === 'string' ? truncateStyles : "",
        className
      )}
      style={typeof truncateStyles === 'object' ? truncateStyles : undefined}
    >
      {children}
    </Component>
  );
}

// Enhanced version of TouchFriendlyButton with better mobile support
export function TouchFriendlyButton({
  children,
  className,
  onClick,
  disabled = false,
  type = "button",
  variant = "default",
  fullWidthOnMobile = true,
  size = "default",
  loading = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost";
  fullWidthOnMobile?: boolean;
  size?: "sm" | "default" | "lg";
  loading?: boolean;
}) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    setIsTouchDevice(hasTouchCapability());
  }, []);

  const getVariantClass = () => {
    if (variant === "primary") return "bg-primary text-white hover:bg-primary-600";
    if (variant === "secondary") return "bg-secondary text-foreground hover:bg-secondary-hover";
    if (variant === "outline") return "border border-input bg-background hover:bg-accent/10";
    if (variant === "ghost") return "hover:bg-accent/10";
    return "bg-primary text-primary-foreground hover:bg-primary/90";
  };
  
  const getSizeClass = () => {
    if (size === "sm") return "min-h-[40px] px-3 py-1.5 text-sm";
    if (size === "lg") return "min-h-[52px] px-6 py-3 text-lg";
    return "min-h-[48px] px-4 py-2"; // Default size optimized for touch
  };

  return (
    <button
      type={type}
      className={cn(
        // Base button styling
        "rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        
        // Enhanced for mobile touch targets
        getSizeClass(),
        
        // Active state feedback
        "active:scale-[0.98] touch-manipulation",
        
        // Full width on mobile if enabled
        fullWidthOnMobile && isMobileDevice() ? "w-full" : "",
        
        // Touch device optimizations
        isTouchDevice ? "touch-improved" : "",
        
        // Variant styling
        getVariantClass(),
        
        // Loading state
        loading && "opacity-70 cursor-wait",
        
        // Disabled state
        disabled && "opacity-50 cursor-not-allowed",
        
        className
      )}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-current border-b-transparent animate-spin" />
          <span>{typeof children === 'string' ? children : 'Loading...'}</span>
        </div>
      ) : children}
    </button>
  );
}

// Enhanced safe area container for all device notches and UI elements
export function SafeAreaContainer({
  children,
  className,
  top = true,
  bottom = true,
  left = true,
  right = true,
  withPadding = true,
}: {
  children: React.ReactNode;
  className?: string;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  withPadding?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative",
        top && "pt-safe-top",
        bottom && "pb-safe-bottom",
        left && "pl-safe-left",
        right && "pr-safe-right",
        withPadding && "px-4 sm:px-6 md:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}

// New component for mobile-friendly tabs with horizontal scrolling
export function MobileScrollableTabs({
  tabs,
  activeTab,
  onChange,
  className,
}: {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  // Reference for scrolling
  const tabsRef = React.useRef<HTMLDivElement>(null);
  
  // Scroll active tab into view
  React.useEffect(() => {
    if (tabsRef.current) {
      const activeElement = tabsRef.current.querySelector(`[data-tab-id="${activeTab}"]`);
      if (activeElement) {
        const container = tabsRef.current;
        const scrollLeft = activeElement.getBoundingClientRect().left - 
                          container.getBoundingClientRect().left + 
                          container.scrollLeft - 
                          16; // Add some padding
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeTab]);

  return (
    <div 
      ref={tabsRef}
      className={cn(
        "flex overflow-x-auto hide-scrollbar py-2 px-1 -mx-4 sm:mx-0 sm:px-0",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          data-tab-id={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex-none px-4 py-2 whitespace-nowrap text-sm font-medium rounded-full mr-2 last:mr-4 sm:last:mr-2 transition-colors",
            "min-h-[40px] touch-manipulation",
            activeTab === tab.id
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// New component for sticky mobile navigation
export function StickyMobileNav({
  children,
  className,
  alwaysVisible = false,
}: {
  children: React.ReactNode;
  className?: string;
  alwaysVisible?: boolean;
}) {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    if (alwaysVisible) return;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show nav when scrolling up or at the top
      if (currentScrollY <= 0 || currentScrollY < lastScrollY) {
        setVisible(true);
      } 
      // Hide nav when scrolling down and not at the top
      else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, alwaysVisible]);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 transition-transform duration-300 px-2 py-2 safe-area-padding",
        !visible && !alwaysVisible ? "translate-y-full" : "translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
}
