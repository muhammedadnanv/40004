import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveGridProps {
  children: ReactNode;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ResponsiveGrid = ({ 
  children, 
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 'md',
  className 
}: ResponsiveGridProps) => {
  const getGridCols = () => {
    const cols = [];
    if (columns.xs) cols.push(`grid-cols-${columns.xs}`);
    if (columns.sm) cols.push(`sm:grid-cols-${columns.sm}`);
    if (columns.md) cols.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) cols.push(`lg:grid-cols-${columns.lg}`);
    if (columns.xl) cols.push(`xl:grid-cols-${columns.xl}`);
    return cols.join(' ');
  };

  const getGapClass = () => {
    switch (gap) {
      case 'sm': return 'gap-2 sm:gap-3';
      case 'md': return 'gap-3 sm:gap-4 md:gap-6';
      case 'lg': return 'gap-4 sm:gap-6 md:gap-8';
      case 'xl': return 'gap-6 sm:gap-8 md:gap-10';
      default: return 'gap-3 sm:gap-4 md:gap-6';
    }
  };

  return (
    <div className={cn(
      'grid',
      getGridCols(),
      getGapClass(),
      'w-full',
      className
    )}>
      {children}
    </div>
  );
};