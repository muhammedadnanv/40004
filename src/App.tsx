
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "./components/ui/toaster";
import { toast } from "./hooks/use-toast";
import { startMarketingRecommendations } from "./utils/marketingRecommendations";
import { supabase } from "@/integrations/supabase/client";
import { dataProcessor } from "./utils/dataProcessor";
import ErrorBoundary from "./components/ErrorBoundary";
import { runWebsiteTest } from "./utils/websiteValidator";
import { optimizeForDevice } from "./utils/performanceOptimizer";
import { seoOptimizer } from "./utils/seoOptimizer";
import { MobileTestComponent } from "./components/mobile/MobileTestComponent";
import { enhanceMobileExperience } from "./utils/mobileResponsiveness";
import { autoFixAndReportLinkIssues } from "./utils/linkValidator";

// Lazy load pages for better initial loading performance
const Index = lazy(() => import("./pages/Index"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const ContentSummarizerPage = lazy(() => import("./pages/ContentSummarizerPage"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen w-full flex items-center justify-center">
    <div className="animate-pulse">
      <div className="h-12 w-48 bg-gray-200 rounded-md mb-4"></div>
      <div className="h-4 w-32 bg-gray-200 rounded-md"></div>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check device capabilities and optimize
        const deviceCapabilities = optimizeForDevice();
        console.log("Device optimization:", deviceCapabilities);
        
        // Initialize data processor
        console.log("Initializing centralized data processing...");
        const processor = dataProcessor;
        
        // Run website validation with error handling
        try {
          await runWebsiteTest();
          console.log("Website validation completed successfully");
        } catch (error) {
          console.error("Website validation failed:", error);
        }
        
        // Run SEO optimization
        try {
          await seoOptimizer.runOptimizations({
            optimizeMetaTags: true,
            optimizeHeadings: true,
            checkTechnicalSEO: true
          });
          console.log("SEO optimization completed");
        } catch (error) {
          console.error("Error during SEO optimization:", error);
        }
        
        // Initialize marketing features
        try {
          if (typeof startMarketingRecommendations === 'function') {
            await startMarketingRecommendations();
            console.log("Marketing recommendations started successfully");
          }
        } catch (error: any) {
          console.error("Error starting marketing recommendations:", error);
        }

        // Check Supabase connection
        try {
          const { data, error } = await supabase.from('payments').select('count').limit(1);
          if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
            throw error;
          }
          console.log("Supabase connection verified");
          
          // Log initial data processing metrics
          const metrics = processor.getMetricsSummary();
          console.log("Initial data processing metrics:", metrics);
        } catch (error) {
          console.error("Supabase connection error:", error);
          toast({
            title: "Connection Issue",
            description: "There might be issues with the database connection. Some features may be limited.",
            variant: "destructive",
            duration: 5000,
          });
        }

        // Enhance mobile experience
        try {
          enhanceMobileExperience();
          autoFixAndReportLinkIssues();
          
          // Add resize event listener
          const handleResize = () => {
            clearTimeout(window.resizeTimer);
            window.resizeTimer = setTimeout(enhanceMobileExperience, 250);
          };
          
          window.addEventListener('resize', handleResize);
          
          console.log("Mobile optimizations and link validation complete");
        } catch (error) {
          console.error("Error during mobile optimization:", error);
        }

      } catch (error) {
        console.error("App initialization error:", error);
        toast({
          title: "Initialization Error",
          description: "Some features might not work correctly. Please refresh the page.",
          variant: "destructive",
          duration: 5000,
        });
      }
    };

    initializeApp();

    // Cleanup function
    return () => {
      console.log("App cleanup: removing event listeners and clearing timeouts");
      if (window.resizeTimer) {
        clearTimeout(window.resizeTimer);
      }
    };
  }, []);

  return (
    <ErrorBoundary>
        {/* Mobile Test Component - Remove in production */}
        {import.meta.env.DEV && <MobileTestComponent />}
        
        <Router>
        <div className="min-h-screen w-full">
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary>
                  <Index />
                </ErrorBoundary>
              </Suspense>
            } />
            <Route path="/privacy" element={
              <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary>
                  <Privacy />
                </ErrorBoundary>
              </Suspense>
            } />
            <Route path="/terms" element={
              <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary>
                  <Terms />
                </ErrorBoundary>
              </Suspense>
            } />
            <Route path="/content-summarizer" element={
              <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary>
                  <ContentSummarizerPage />
                </ErrorBoundary>
              </Suspense>
            } />
          </Routes>
          
          <Toaster />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

// Add the window resize timer type for TypeScript
declare global {
  interface Window {
    resizeTimer: ReturnType<typeof setTimeout>;
  }
}

export default App;
