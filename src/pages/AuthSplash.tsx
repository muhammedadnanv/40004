import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

const AuthSplash = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-white via-purple-50 to-white">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 min-h-[100dvh] flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-6 sm:space-y-8"
        >
          <div className="text-center space-y-4">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <Shield className="h-12 w-12 sm:h-16 sm:w-16 text-primary" />
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 font-display">
              Welcome Back
            </h1>
            
            <p className="text-muted-foreground text-sm sm:text-base">
              Sign in to continue to Dev Mentor Hub
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm shadow-premium rounded-xl p-4 sm:p-6 border border-purple-100/50">
            <SignIn 
              routing="path" 
              path="/auth"
              afterSignInUrl="/"
              afterSignUpUrl="/"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none p-0",
                  headerTitle: "text-2xl font-semibold font-display",
                  headerSubtitle: "text-muted-foreground text-sm sm:text-base",
                  formButtonPrimary: "bg-primary hover:bg-primary-hover text-white h-11 sm:h-12 px-4 py-2 rounded-lg transition-colors",
                  formFieldInput: "h-11 sm:h-12 rounded-lg border-input px-4 py-2 text-base sm:text-lg",
                  footerAction: "text-primary hover:text-primary-hover transition-colors",
                  formFieldLabel: "text-sm font-medium text-gray-700",
                  dividerLine: "bg-gray-200",
                  dividerText: "text-gray-500 text-sm",
                  socialButtonsBlockButton: "h-11 sm:h-12 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors",
                  socialButtonsBlockButtonText: "text-sm sm:text-base",
                  formFieldWarning: "text-sm text-yellow-600",
                  formFieldError: "text-sm text-red-600",
                  alert: "rounded-lg p-4 text-sm",
                  alertText: "text-sm",
                  footer: "mt-6",
                  main: "w-full",
                }
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthSplash;