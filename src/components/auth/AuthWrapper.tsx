import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { isLoaded, isSignedIn, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return <>{children}</>;
};