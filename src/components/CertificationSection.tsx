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
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Community Certification</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">Earn a recognized certificate upon completing your chosen program</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A00E0] mt-1" />
              <div>
                <h3 className="font-semibold text-base sm:text-lg">Verified Achievement</h3>
                <p className="text-sm sm:text-base text-gray-600">Each certificate includes a unique verification ID</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A00E0] mt-1" />
              <div>
                <h3 className="font-semibold text-base sm:text-lg">Showcase Your Skills</h3>
                <p className="text-sm sm:text-base text-gray-600">Share your achievement on LinkedIn and other platforms</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A00E0] mt-1" />
              <div>
                <h3 className="font-semibold text-base sm:text-lg">Community Recognition</h3>
                <p className="text-sm sm:text-base text-gray-600">Join our growing community of certified developers</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary" className="bg-[#4A00E0]/10 text-[#4A00E0] text-xs sm:text-sm">
                Digital Certificate
              </Badge>
              <Badge variant="secondary" className="bg-[#4A00E0]/10 text-[#4A00E0] text-xs sm:text-sm">
                Unique ID
              </Badge>
              <Badge variant="secondary" className="bg-[#4A00E0]/10 text-[#4A00E0] text-xs sm:text-sm">
                Lifetime Access
              </Badge>
            </div>
          </div>

          <Card className="relative group">
            <CardContent className="p-4 sm:p-6">
              <div className="relative">
                <img 
                  src="https://i.ibb.co/SRb4264/title.png" 
                  alt="Sample Certificate Preview" 
                  className="w-full rounded-lg filter blur-sm group-hover:blur-lg transition-all duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 p-4 sm:p-6 rounded-lg text-center space-y-3 sm:space-y-4">
                    <Award className="w-8 h-8 sm:w-12 sm:h-12 text-[#4A00E0] mx-auto" />
                    <p className="font-medium text-sm sm:text-base text-gray-800 mb-3 sm:mb-4">Complete the program to view your certificate</p>
                    <Button 
                      variant="outline" 
                      className="gap-2 text-xs sm:text-sm text-[#4A00E0] border-[#4A00E0] hover:bg-[#4A00E0]/10"
                      onClick={handleCertificateClick}
                    >
                      Preview Certificate <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
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