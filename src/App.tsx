
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";
import { startMarketingRecommendations } from "./utils/marketingRecommendations";
import { supabase } from "@/integrations/supabase/client";
import { dataProcessor } from "./utils/dataProcessor";
import ErrorBoundary from "./components/ErrorBoundary";
import { runWebsiteTest } from "./utils/websiteValidator";
import { optimizeForDevice, addResourceHints, applySEOOptimizations, optimizeImagesForSEO, fetchAndApplySEOKeywords, generateInternalLinks } from "./utils/performanceOptimizer";
import { seoOptimizer } from "./utils/seoOptimizer";
import { MobileTestComponent } from "./components/mobile/MobileTestComponent";
import { MobileOptimizer } from "./components/mobile/MobileOptimizer";
import { PerformanceOptimizer } from "./components/PerformanceOptimizer";
import { enhanceMobileExperience } from "./utils/mobileResponsiveness";
import { autoFixAndReportLinkIssues } from "./utils/linkValidator";
import { EmailWidget } from "./components/EmailWidget";

import { LoadingSpinner } from "./components/LoadingSpinner";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { OfflineIndicator } from "./components/OfflineIndicator";
import { trackPWAInstall } from "./utils/pwaInstall";

// Lazy load pages for better initial loading performance
const Index = lazy(() => import("./pages/Index"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const ContentSummarizerPage = lazy(() => import("./pages/ContentSummarizerPage"));
const Certification = lazy(() => import("./pages/Certification"));
const Programs = lazy(() => import("./pages/Programs"));
const Partnerships = lazy(() => import("./pages/Partnerships"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProfessionalDevelopment = lazy(() => import("./pages/ProfessionalDevelopment"));
const CMS = lazy(() => import("./pages/cms"));
const ProjectGallery = lazy(() => import("./pages/ProjectGallery"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CodePlayground = lazy(() => import("./pages/CodePlayground"));
const Install = lazy(() => import("./pages/Install"));

// Loading fallback component
const LoadingFallback = () => (
  <LoadingSpinner 
    size="lg" 
    text="Loading..." 
    className="min-h-screen"
  />
);

function App() {
  const { toast } = useToast();
  
  useEffect(() => {
    // Track PWA installation events
    trackPWAInstall();
    
    const initializeApp = async () => {
      // Use requestIdleCallback for non-critical initializations
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          const deviceInfo = optimizeForDevice();
          
          // Apply performance optimizations based on device
          if (deviceInfo.isMobile || deviceInfo.isTablet) {
            enhanceMobileExperience();
          }
          
          // Add resource hints for better loading
          addResourceHints();
          
          // Apply SEO optimizations
          applySEOOptimizations();
          
          // Optimize images
          optimizeImagesForSEO('main');
        });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
          const deviceInfo = optimizeForDevice();
          if (deviceInfo.isMobile || deviceInfo.isTablet) {
            enhanceMobileExperience();
          }
          addResourceHints();
          applySEOOptimizations();
          optimizeImagesForSEO('main');
        }, 100);
      }
      
      // Critical async operations
      try {
        await Promise.all([
          // Fetch and apply SEO keywords
          fetchAndApplySEOKeywords('developer-programs', 10).catch(() => {}),
          
          // Generate internal links
          generateInternalLinks('main', 'developer-programs', 5).catch(() => {})
        ]);
      } catch (error) {
        // Silent error handling for non-critical features
      }
    };

    initializeApp();
  }, []);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        {/* Mobile Test Component - Remove in production */}
        {import.meta.env.DEV && <MobileTestComponent />}
        <MobileOptimizer />
        <PerformanceOptimizer />
        
        <Router>
        <div className="min-h-screen w-full flex flex-col">
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
            <Route path="/certification" element={
              <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary>
                  <Certification />
                </ErrorBoundary>
              </Suspense>
            } />
            <Route path="/programs" element={
              <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary>
                  <Programs />
                </ErrorBoundary>
              </Suspense>
            } />
            <Route path="/programs/:category" element={
              <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary>
                  <Programs />
                </ErrorBoundary>
              </Suspense>
            } />
            <Route path="/partnerships" element={
              <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary>
                  <Partnerships />
                </ErrorBoundary>
              </Suspense>
            } />
            <Route path="/professional-development" element={
              <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary>
                  <ProfessionalDevelopment />
                </ErrorBoundary>
              </Suspense>
            } />
            <Route path="/cms" element={
              <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary>
                  <CMS />
                </ErrorBoundary>
              </Suspense>
            } />
            <Route path="/gallery" element={
              <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary>
                  <ProjectGallery />
                </ErrorBoundary>
              </Suspense>
            } />
            <Route path="/dashboard" element={
              <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary>
                  <Dashboard />
                </ErrorBoundary>
              </Suspense>
            } />
            <Route path="/code-playground" element={
              <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary>
                  <CodePlayground />
                </ErrorBoundary>
              </Suspense>
            } />
            <Route path="/install" element={
              <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary>
                  <Install />
                </ErrorBoundary>
              </Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary>
                  <NotFound />
                </ErrorBoundary>
              </Suspense>
            } />
          </Routes>
          
          <Toaster />
          <EmailWidget />
          <PWAInstallPrompt />
          <OfflineIndicator />
        </div>
      </Router>
    </ErrorBoundary>
    </HelmetProvider>
  );
}


export default App;
