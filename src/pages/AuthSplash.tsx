import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

const AuthSplash = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-white via-purple-50 to-white overscroll-none">
      <div className="container-fluid safe-top safe-bottom min-h-[100dvh] flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8"
        >
          <div className="text-center space-y-4 sm:space-y-6">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center"
            >
              <Shield className="h-12 w-12 sm:h-16 sm:w-16 text-primary transform-gpu" />
            </motion.div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 font-display">
              Welcome Back
            </h1>
            
            <p className="text-muted-foreground text-sm sm:text-base max-w-xs mx-auto">
              Sign in to continue to Dev Mentor Hub
            </p>
          </div>
          
          <div className="glass-card-2025 p-4 sm:p-6 md:p-8 w-full transform-gpu">
            <SignIn 
              routing="path" 
              path="/auth"
              afterSignInUrl="/"
              afterSignUpUrl="/"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none p-0",
                  headerTitle: "text-xl sm:text-2xl font-semibold font-display",
                  headerSubtitle: "text-muted-foreground text-sm sm:text-base",
                  formButtonPrimary: "bg-primary hover:bg-primary-hover text-white h-12 sm:h-14 px-4 py-2 rounded-lg transition-all duration-200 transform-gpu active:scale-95 mobile-friendly-touch w-full",
                  formFieldInput: "h-12 sm:h-14 rounded-lg border-input px-4 py-2 text-base sm:text-lg w-full focus:ring-2 focus:ring-primary/50 transition-all duration-200",
                  footerAction: "text-primary hover:text-primary-hover transition-colors",
                  formFieldLabel: "text-sm font-medium text-gray-700 mb-1.5",
                  dividerLine: "bg-gray-200",
                  dividerText: "text-gray-500 text-sm",
                  socialButtonsBlockButton: "h-12 sm:h-14 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 transform-gpu active:scale-95 mobile-friendly-touch w-full",
                  socialButtonsBlockButtonText: "text-sm sm:text-base",
                  formFieldWarning: "text-sm text-yellow-600 mt-1",
                  formFieldError: "text-sm text-red-600 mt-1",
                  alert: "rounded-lg p-4 text-sm",
                  alertText: "text-sm",
                  footer: "mt-6 space-y-4",
                  main: "w-full space-y-6",
                  formField: "space-y-1.5",
                  form: "space-y-6",
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