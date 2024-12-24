import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { Toaster } from "./components/ui/toaster";
import { useEffect } from "react";
import { WhatsAppWidget } from "./components/WhatsAppWidget";
import { runWebsiteTest } from "./utils/websiteValidator";
import { toast } from "./hooks/use-toast";
import { NewYearMessage } from "./components/NewYearMessage";
import { startMarketingRecommendations } from "./utils/marketingRecommendations";

function App() {
  useEffect(() => {
    // Run website validation on initial load
    runWebsiteTest();
    
    // Initialize marketing features
    const initMarketing = async () => {
      try {
        await startMarketingRecommendations();
        console.log("Marketing recommendations started successfully");
      } catch (error) {
        console.error("Error starting marketing recommendations:", error);
        toast({
          title: "Marketing Features",
          description: "Some marketing features might be temporarily unavailable.",
          variant: "destructive",
          duration: 5000,
        });
      }
    };

    initMarketing();
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
        <WhatsAppWidget />
        <NewYearMessage />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;