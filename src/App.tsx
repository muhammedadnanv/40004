import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { Toaster } from "@/components/ui/toaster";
import { startMarketingRecommendations } from "./utils/marketingRecommendations";
import { useEffect } from "react";
import { WhatsAppWidget } from "./components/WhatsAppWidget";
import { runWebsiteTest } from "./utils/websiteValidator";

function App() {
  useEffect(() => {
    startMarketingRecommendations();
    // Run website validation on initial load
    runWebsiteTest();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
      <WhatsAppWidget />
      <Toaster />
    </Router>
  );
}

export default App;