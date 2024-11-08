import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { Toaster } from "@/components/ui/toaster";
import { startMarketingRecommendations } from "./utils/marketingRecommendations";

function App() {
  useEffect(() => {
    // Initialize marketing recommendations system
    startMarketingRecommendations();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
