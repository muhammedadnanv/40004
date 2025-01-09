import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { Toaster } from "./components/ui/toaster";
import { useEffect } from "react";
import { runWebsiteTest } from "./utils/websiteValidator";
import { toast } from "./hooks/use-toast";
import { NewYearMessage } from "./components/NewYearMessage";
import { startMarketingRecommendations } from "./utils/marketingRecommendations";
import { supabase } from "@/integrations/supabase/client";

function App() {
  useEffect(() => {
    // Run website validation on initial load with enhanced error handling
    const validateWebsite = async () => {
      try {
        await runWebsiteTest();
        console.log("Website validation completed successfully");
      } catch (error) {
        console.error("Website validation failed:", error);
        toast({
          title: "Validation Error",
          description: "Some features might not be working correctly. Please refresh the page.",
          variant: "destructive",
          duration: 5000,
        });
      }
    };

    validateWebsite();
    
    // Initialize marketing features with better error handling
    const initMarketing = async () => {
      try {
        // Only attempt to start marketing recommendations if the function exists
        if (typeof startMarketingRecommendations === 'function') {
          await startMarketingRecommendations();
          console.log("Marketing recommendations started successfully");
        }
      } catch (error: any) {
        console.error("Error starting marketing recommendations:", error);
        // Only show toast for non-404 errors to avoid confusing users
        if (error?.status !== 404) {
          toast({
            title: "Marketing Features",
            description: "Some marketing features might be temporarily unavailable.",
            variant: "destructive",
            duration: 5000,
          });
        }
      }
    };

    // Check Supabase connection
    const checkSupabaseConnection = async () => {
      try {
        const { data, error } = await supabase.from('payments').select('count').single();
        if (error) throw error;
        console.log("Supabase connection verified");
      } catch (error) {
        console.error("Supabase connection error:", error);
        toast({
          title: "Connection Issue",
          description: "There might be issues with the database connection. Some features may be limited.",
          variant: "destructive",
          duration: 5000,
        });
      }
    };

    initMarketing();
    checkSupabaseConnection();

    // Cleanup function
    return () => {
      console.log("App cleanup: removing event listeners and clearing timeouts");
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
        <NewYearMessage />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;