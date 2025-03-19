
import React from "react";
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  withPadding?: boolean;
  centered?: boolean;
  safeArea?: boolean; // New prop for adding safe area insets
}

export function ResponsiveContainer({
  children,
  className,
  fullWidth = false,
  withPadding = true,
  centered = true,
  safeArea = false,
}: ResponsiveContainerProps) {
  return (
    <div
      className={cn(
        "w-full",
        fullWidth ? "" : "max-w-7xl mx-auto",
        withPadding ? "px-4 sm:px-6 md:px-8 lg:px-12" : "",
        centered ? "text-center" : "",
        safeArea ? "safe-area-padding" : "",
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
    if (spacing === "wide") return "gap-6 sm:gap-8 md:gap-10";
    return "gap-4 sm:gap-6 md:gap-8";
  };

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
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "row" | "col" | "row-reverse" | "col-reverse" | "responsive";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  wrap?: boolean;
  gap?: "none" | "sm" | "default" | "md" | "lg";
  mobileStack?: boolean;
}) {
  const getDirection = () => {
    if (direction === "responsive" || mobileStack) {
      return "flex-col sm:flex-row";
    }
    if (direction === "row") return "flex-row";
    if (direction === "col") return "flex-col";
    if (direction === "row-reverse") return "flex-row-reverse";
    return "flex-col-reverse";
  };

  const getGap = () => {
    if (gap === "none") return "";
    if (gap === "sm") return "gap-2 sm:gap-3";
    if (gap === "md") return "gap-4 sm:gap-6";
    if (gap === "lg") return "gap-6 sm:gap-8";
    return "gap-4";
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
}: {
  children: React.ReactNode;
  className?: string;
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "2xl" | "3xl";
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  mobileOptimized?: boolean;
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
    
    // Responsive sizes
    if (size === "xs") return "text-xs sm:text-sm";
    if (size === "sm") return "text-sm sm:text-base";
    if (size === "lg") return "text-base sm:text-lg md:text-xl";
    if (size === "xl") return "text-lg sm:text-xl md:text-2xl";
    if (size === "2xl") return "text-xl sm:text-2xl md:text-3xl lg:text-4xl";
    if (size === "3xl") return "text-2xl sm:text-3xl md:text-4xl lg:text-5xl";
    return "text-base";
  };

  return (
    <Component
      className={cn(
        getSize(),
        mobileOptimized && "tracking-tight", // Tighter tracking for better mobile reading
        className
      )}
    >
      {children}
    </Component>
  );
}

// New component specifically for mobile-friendly touch targets
export function TouchFriendlyButton({
  children,
  className,
  onClick,
  disabled = false,
  type = "button",
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost";
}) {
  const getVariantClass = () => {
    if (variant === "primary") return "bg-primary text-white hover:bg-primary-600";
    if (variant === "secondary") return "bg-secondary text-foreground hover:bg-secondary-hover";
    if (variant === "outline") return "border border-input bg-background hover:bg-accent";
    if (variant === "ghost") return "hover:bg-accent";
    return "bg-primary text-primary-foreground hover:bg-primary/90";
  };

  return (
    <button
      type={type}
      className={cn(
        // Base button styling
        "rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        
        // Enhanced for mobile touch targets
        "min-h-[48px] min-w-[48px] px-4 py-2 sm:px-5 sm:py-2.5",
        
        // Active state feedback
        "active:scale-[0.98] touch-improved",
        
        // Variant styling
        getVariantClass(),
        
        // Disabled state
        disabled && "opacity-50 cursor-not-allowed",
        
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// New component for safe area container (especially for mobile notches)
export function SafeAreaContainer({
  children,
  className,
  top = true,
  bottom = true,
  left = true,
  right = true,
}: {
  children: React.ReactNode;
  className?: string;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}) {
  return (
    <div
      className={cn(
        top && "safe-top",
        bottom && "safe-bottom",
        left && "safe-left",
        right && "safe-right",
        className
      )}
    >
      {children}
    </div>
  );
}
