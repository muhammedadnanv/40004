import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveSectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  fullWidth?: boolean;
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const ResponsiveSection: React.FC<ResponsiveSectionProps> = ({
  children,
  className,
  containerClassName,
  id,
  fullWidth = false,
  spacing = 'lg',
}) => {
  const spacingClasses = {
    none: '',
    sm: 'py-6 sm:py-8 md:py-10',
    md: 'py-8 sm:py-12 md:py-16',
    lg: 'py-12 sm:py-16 md:py-20 lg:py-24',
    xl: 'py-16 sm:py-20 md:py-24 lg:py-32',
  };

  return (
    <section
      id={id}
      className={cn(
        'w-full',
        spacingClasses[spacing],
        !fullWidth && 'px-3 sm:px-4 md:px-6 lg:px-8',
        className
      )}
    >
      <div
        className={cn(
          !fullWidth && 'container mx-auto max-w-7xl',
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default ResponsiveSection;
