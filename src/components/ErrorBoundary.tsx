
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { toast } from "@/hooks/use-toast";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to the console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Show toast notification
    toast({
      title: "Something went wrong",
      description: "An error occurred while rendering this component.",
      variant: "destructive",
    });
    
    // You could also send to an error monitoring service here
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Return fallback UI if provided, otherwise show default error message
      return this.props.fallback || (
        <div className="p-6 rounded-lg bg-red-50 border border-red-200 text-center my-4">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Something went wrong</h2>
          <p className="text-red-700 mb-4">We encountered an error while rendering this section.</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
