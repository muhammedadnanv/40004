import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  resetErrorBoundary 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Something went wrong
          </h1>
          <p className="text-muted-foreground">
            We encountered an unexpected error. Please try refreshing the page.
          </p>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg text-left">
          <p className="text-sm font-medium text-foreground mb-2">Error details:</p>
          <p className="text-xs text-muted-foreground font-mono break-all">
            {error.message}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={resetErrorBoundary}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            Refresh page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;