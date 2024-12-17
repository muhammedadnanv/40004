import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { Toaster } from "@/components/ui/toaster";
import { startMarketingRecommendations } from "./utils/marketingRecommendations";
import { useEffect } from "react";
import { WhatsAppWidget } from "./components/WhatsAppWidget";
import { runWebsiteTest } from "./utils/websiteValidator";
import { initializeAIModels } from "./utils/aiService";
import { toast } from "./components/ui/use-toast";
import { NewYearMessage } from "./components/NewYearMessage";

function App() {
  useEffect(() => {
    startMarketingRecommendations();
    // Run website validation on initial load
    runWebsiteTest();
    
    // Initialize AI models
    initializeAIModels()
      .then((success) => {
        if (success) {
          toast({
            title: "AI Models Initialized",
            description: "The AI models have been loaded successfully.",
            duration: 3000,
          });
        } else {
          toast({
            title: "AI Models Initialization Failed",
            description: "There was an error loading the AI models. Some features might not work.",
            variant: "destructive",
            duration: 5000,
          });
        }
      });
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