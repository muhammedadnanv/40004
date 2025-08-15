import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveWrapperProps {
  children: React.ReactNode;
  className?: string;
  mobileFirst?: boolean;
  touchOptimized?: boolean;
}

export const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
  children,
  className,
  mobileFirst = true,
  touchOptimized = true,
}) => {
  return (
    <div
      className={cn(
        // Base responsive wrapper classes
        'w-full',
        
        // Mobile-first padding
        mobileFirst && 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16',
        
        // Touch optimization
        touchOptimized && 'touch-manipulation select-none',
        
        // Additional classes
        className
      )}
    >
      {children}
    </div>
  );
};

export default ResponsiveWrapper;