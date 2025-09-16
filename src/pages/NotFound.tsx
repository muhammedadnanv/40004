import { MainNav } from "@/components/MainNav";
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Page Not Found - Dev Mentor Hub</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Dev Mentor Hub homepage or explore our programs." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <header>
          <MainNav />
        </header>
        
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg text-center">
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-primary/20">404</h1>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Page Not Found
              </h2>
              <p className="text-gray-600 mb-8">
                The page you're looking for doesn't exist or has been moved. 
                Let's get you back to exploring our programs and mentorship opportunities.
              </p>
            </div>
            
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              
              <Link to="/">
                <Button className="w-full sm:w-auto">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            <div className="mt-12">
              <p className="text-sm text-gray-500 mb-4">
                Looking for something specific? Try these popular pages:
              </p>
              <div className="space-y-2">
                <Link 
                  to="/programs" 
                  className="block text-primary hover:text-primary-600 transition-colors"
                >
                  Explore Programs
                </Link>
                <Link 
                  to="/certification" 
                  className="block text-primary hover:text-primary-600 transition-colors"
                >
                  Certification
                </Link>
                <Link 
                  to="/partnerships" 
                  className="block text-primary hover:text-primary-600 transition-colors"
                >
                  Partnerships
                </Link>
              </div>
            </div>
          </div>
        </main>
        
        <footer>
          <SocialMediaFooter />
        </footer>
      </div>
    </>
  );
};

export default NotFound;