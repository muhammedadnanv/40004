import { SignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";

export const AuthSplash = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[100dvh] w-full flex items-center justify-center bg-gradient-to-br from-primary-light via-background to-primary-muted p-4 sm:p-6 md:p-8"
    >
      <div className="w-full max-w-md">
        <div className="backdrop-blur-md bg-white/80 p-6 sm:p-8 rounded-2xl shadow-premium border border-white/20">
          <div className="space-y-6 mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground font-display tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Sign in to continue to your account
            </p>
          </div>
          
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-primary hover:bg-primary-hover active:scale-[0.98] transform-gpu transition-all duration-200 h-12 rounded-lg",
                formFieldInput: 
                  "h-12 rounded-lg border-input focus:ring-2 focus:ring-primary/20 transition-shadow duration-200",
                card: "shadow-none p-0 bg-transparent",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                dividerLine: "bg-border/60",
                dividerText: "text-muted-foreground text-sm",
                footerAction: "text-sm text-muted-foreground hover:text-primary transition-colors",
                identityPreviewText: "text-sm text-muted-foreground",
                formFieldLabel: "text-sm font-medium text-foreground mb-2",
                socialButtonsBlockButton: 
                  "h-12 border-input hover:bg-accent transition-colors duration-200 rounded-lg",
                socialButtonsBlockButtonText: "text-sm font-medium",
              },
              layout: {
                socialButtonsPlacement: "bottom",
                showOptionalFields: false,
              },
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};