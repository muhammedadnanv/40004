import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

const AuthSplash = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to continue to Dev Mentor Hub
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-6">
          <SignIn 
            routing="path" 
            path="/auth"
            afterSignInUrl="/"
            afterSignUpUrl="/"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none p-0",
                headerTitle: "text-2xl font-semibold",
                headerSubtitle: "text-muted-foreground",
                formButtonPrimary: "bg-primary hover:bg-primary-hover text-white",
                formFieldInput: "rounded border-input",
                footerAction: "text-primary hover:text-primary-hover",
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthSplash;