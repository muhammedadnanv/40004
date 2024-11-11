import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const CertificationSection = () => {
  const { toast } = useToast();

  const handleCertificateClick = () => {
    window.open("https://i.ibb.co/SRb4264/title.png", "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-16 px-3 sm:px-4 md:px-6 lg:px-8 bg-white flex items-center justify-center min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">Community Certification</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">Earn a recognized certificate upon completing your chosen program</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#4A00E0] mt-0.5 sm:mt-1" />
              <div>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg">Verified Achievement</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Each certificate includes a unique verification ID</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 sm:gap-3">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#4A00E0] mt-0.5 sm:mt-1" />
              <div>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg">Showcase Your Skills</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Share your achievement on LinkedIn and other platforms</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 sm:gap-3">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#4A00E0] mt-0.5 sm:mt-1" />
              <div>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg">Community Recognition</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Join our growing community of certified developers</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
              <Badge variant="secondary" className="bg-[#4A00E0]/10 text-[#4A00E0] text-[10px] sm:text-xs md:text-sm">
                Digital Certificate
              </Badge>
              <Badge variant="secondary" className="bg-[#4A00E0]/10 text-[#4A00E0] text-[10px] sm:text-xs md:text-sm">
                Unique ID
              </Badge>
              <Badge variant="secondary" className="bg-[#4A00E0]/10 text-[#4A00E0] text-[10px] sm:text-xs md:text-sm">
                Lifetime Access
              </Badge>
            </div>
          </div>

          <Card className="relative group">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="relative">
                <img 
                  src="https://i.ibb.co/SRb4264/title.png" 
                  alt="Sample Certificate Preview" 
                  className="w-full rounded-lg filter blur-sm group-hover:blur-lg transition-all duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 p-3 sm:p-4 md:p-6 rounded-lg text-center space-y-2 sm:space-y-3 md:space-y-4">
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-[#4A00E0] mx-auto" />
                    <p className="font-medium text-xs sm:text-sm md:text-base text-gray-800 mb-2 sm:mb-3 md:mb-4">Complete the program to view your certificate</p>
                    <Button 
                      variant="outline" 
                      className="gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm text-[#4A00E0] border-[#4A00E0] hover:bg-[#4A00E0]/10"
                      onClick={handleCertificateClick}
                    >
                      Preview Certificate <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};