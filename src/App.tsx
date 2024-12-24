import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { Toaster } from "@/components/ui/toaster";
import { startMarketingRecommendations } from "./utils/marketingRecommendations";
import { useEffect } from "react";
import { WhatsAppWidget } from "./components/WhatsAppWidget";
import { runWebsiteTest } from "./utils/websiteValidator";
import { toast } from "./hooks/use-toast";
import { NewYearMessage } from "./components/NewYearMessage";

function App() {
  useEffect(() => {
    startMarketingRecommendations();
    // Run website validation on initial load
    runWebsiteTest();
    
    // Initialize marketing features
    const initMarketing = async () => {
      try {
        await startMarketingRecommendations();
        console.log("Marketing recommendations started successfully");
      } catch (error) {
        console.error("Error starting marketing recommendations:", error);
      }
    };

    initMarketing();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
      <WhatsAppWidget />
      <NewYearMessage />
      <Toaster />
    </Router>
  );
}

export default App;