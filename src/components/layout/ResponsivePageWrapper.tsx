import React from 'react';
import { cn } from '@/lib/utils';
import { MainNav } from '@/components/MainNav';

interface ResponsivePageWrapperProps {
  children: React.ReactNode;
  className?: string;
  includeNav?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
  noPadding?: boolean;
}

export const ResponsivePageWrapper: React.FC<ResponsivePageWrapperProps> = ({
  children,
  className,
  includeNav = true,
  maxWidth = '7xl',
  noPadding = false,
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      {includeNav && <MainNav />}
      <main
        className={cn(
          'flex-1 w-full',
          !noPadding && 'px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8',
          className
        )}
      >
        <div className={cn('mx-auto w-full', maxWidthClasses[maxWidth])}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default ResponsivePageWrapper;
