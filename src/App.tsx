import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { Toaster } from "@/components/ui/toaster";
import { startMarketingRecommendations } from "./utils/marketingRecommendations";
import { useEffect } from "react";
import { WhatsAppWidget } from "./components/WhatsAppWidget";
import { CategoryTopper } from "./components/CategoryTopper";

function App() {
  useEffect(() => {
    startMarketingRecommendations();
  }, []);

  return (
    <Router>
      <CategoryTopper />
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
      <WhatsAppWidget />
      <Toaster />
    </Router>
  );
}

export default App;