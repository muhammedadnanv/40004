import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
import Index from "./pages/Index";
import { Toaster } from "@/components/ui/toaster";
import { startMarketingRecommendations } from "./utils/marketingRecommendations";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
}

function App() {
  useEffect(() => {
    startMarketingRecommendations();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/sign-in/*" element={
          <div className="flex min-h-screen items-center justify-center">
            <SignIn routing="path" path="/sign-in" />
          </div>
        } />
        <Route path="/sign-up/*" element={
          <div className="flex min-h-screen items-center justify-center">
            <SignUp routing="path" path="/sign-up" />
          </div>
        } />
        <Route path="/" element={
          <PrivateRoute>
            <Index />
          </PrivateRoute>
        } />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;