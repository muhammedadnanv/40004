import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MobileEnhancedButtonProps extends ButtonProps {
  touchFeedback?: boolean;
  mobileVariant?: 'mobile' | 'premium';
}

export const MobileEnhancedButton: React.FC<MobileEnhancedButtonProps> = ({
  children,
  className,
  touchFeedback = true,
  mobileVariant,
  variant = 'default',
  size = 'default',
  ...props
}) => {
  return (
    <Button
      variant={mobileVariant || variant}
      size={size}
      className={cn(
        // Base mobile-friendly styles
        'min-h-[48px] min-w-[48px] touch-manipulation',
        
        // Touch feedback
        touchFeedback && 'active:scale-[0.98] transition-transform duration-150',
        
        // Enhanced shadow for mobile
        'shadow-sm hover:shadow-md',
        
        // Better text size for mobile
        'text-base font-semibold',
        
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default MobileEnhancedButton;