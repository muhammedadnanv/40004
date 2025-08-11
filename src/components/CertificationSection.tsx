import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const CertificationSection = () => {
  const { toast } = useToast();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [specialCode, setSpecialCode] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    program: "",
    completionDate: ""
  });

  // Function to generate certificate dynamically
  const generateCertificate = (name: string, program: string, date: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return null;
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    ctx.strokeStyle = '#4A00E0';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
    // Inner border
    ctx.strokeStyle = '#8B5CF6';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
    
    // Title
    ctx.fillStyle = '#4A00E0';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE', canvas.width / 2, 120);
    
    ctx.font = 'bold 32px Arial';
    ctx.fillText('OF COMPLETION', canvas.width / 2, 160);
    
    // Decorative line
    ctx.strokeStyle = '#4A00E0';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(200, 180);
    ctx.lineTo(600, 180);
    ctx.stroke();
    
    // Content
    ctx.fillStyle = '#333333';
    ctx.font = '24px Arial';
    ctx.fillText('This is to certify that', canvas.width / 2, 230);
    
    // Name
    ctx.fillStyle = '#4A00E0';
    ctx.font = 'bold 36px Arial';
    ctx.fillText(name || 'Your Name', canvas.width / 2, 280);
    
    // Program
    ctx.fillStyle = '#333333';
    ctx.font = '24px Arial';
    ctx.fillText('has successfully completed the', canvas.width / 2, 320);
    
    ctx.fillStyle = '#4A00E0';
    ctx.font = 'bold 28px Arial';
    ctx.fillText(program || 'Development Program', canvas.width / 2, 360);
    
    // Date
    ctx.fillStyle = '#333333';
    ctx.font = '20px Arial';
    ctx.fillText(`Completed on: ${date || new Date().toLocaleDateString()}`, canvas.width / 2, 420);
    
    // Signature line
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 100, 480);
    ctx.lineTo(canvas.width / 2 + 100, 480);
    ctx.stroke();
    
    // Founder signature and details
    ctx.fillStyle = '#666666';
    ctx.font = '16px Arial';
    ctx.fillText('Muhammed Adnan Vv', canvas.width / 2, 500);
    ctx.fillText('Founder & CEO', canvas.width / 2, 520);
    ctx.fillText('Dev Mentor Hub', canvas.width / 2, 540);
    
    // Verification ID
    const verificationId = Math.random().toString(36).substr(2, 9).toUpperCase();
    ctx.fillStyle = '#888888';
    ctx.font = '12px Arial';
    ctx.fillText(`Verification ID: ${verificationId}`, canvas.width / 2, 580);
    
    return canvas.toDataURL('image/png');
  };

  const handleCertificateClick = () => {
    const certificateDataUrl = generateCertificate(userInfo.name, userInfo.program, userInfo.completionDate);
    
    if (certificateDataUrl) {
      // Create a new window to display the certificate
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>Your Certificate</title>
              <style>
                body { 
                  margin: 0; 
                  padding: 20px; 
                  display: flex; 
                  justify-content: center; 
                  align-items: center; 
                  min-height: 100vh; 
                  background: #f5f5f5; 
                }
                img { 
                  max-width: 100%; 
                  height: auto; 
                  box-shadow: 0 4px 20px rgba(0,0,0,0.1); 
                }
                .download-btn {
                  position: fixed;
                  top: 20px;
                  right: 20px;
                  padding: 10px 20px;
                  background: #4A00E0;
                  color: white;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                  font-size: 14px;
                }
              </style>
            </head>
            <body>
              <img src="${certificateDataUrl}" alt="Certificate" />
              <button class="download-btn" onclick="downloadCertificate()">Download Certificate</button>
              <script>
                function downloadCertificate() {
                  const link = document.createElement('a');
                  link.download = 'certificate.png';
                  link.href = '${certificateDataUrl}';
                  link.click();
                }
              </script>
            </body>
          </html>
        `);
      }
    }
  };

  const handleUnlock = () => {
    if (specialCode === "DevCertification") {
      setIsUnlocked(true);
      toast({
        title: "Certificate Preview Unlocked! 🎉",
        description: "You can now customize and view your certificate preview.",
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid unlock code.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="responsive-padding bg-white flex items-center justify-center mobile-safe-area" id="certification-section">
      <div className="responsive-container max-w-5xl">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="responsive-heading mb-2 sm:mb-3 md:mb-4">Community Certification</h2>
          <p className="text-fluid-lg text-gray-600">Earn a personalized certificate upon completing your chosen program</p>
        </div>
        
        <div className="responsive-grid gap-4 sm:gap-6 md:gap-8 items-center" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'}}>
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#4A00E0] mt-0.5 sm:mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-fluid-base">Personalized Certificate</h3>
                <p className="text-fluid-sm text-gray-600">Each certificate is dynamically generated with your name and program details</p>
              </div>
            </div>
            
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
                Dynamic Generation
              </Badge>
              <Badge variant="secondary" className="bg-[#4A00E0]/10 text-[#4A00E0] text-[10px] sm:text-xs md:text-sm">
                Unique ID
              </Badge>
              <Badge variant="secondary" className="bg-[#4A00E0]/10 text-[#4A00E0] text-[10px] sm:text-xs md:text-sm">
                Downloadable
              </Badge>
            </div>
          </div>

          <Card className="relative group">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="relative">
                <div className="w-full h-48 sm:h-56 md:h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <Award className="w-12 h-12 md:w-16 md:h-16 text-[#4A00E0] mx-auto mb-4" />
                    <p className="text-gray-600 text-sm md:text-base">Certificate Preview</p>
                    <p className="text-gray-500 text-xs md:text-sm">Will be generated with your details</p>
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/95 p-3 sm:p-4 md:p-6 rounded-lg text-center space-y-2 sm:space-y-3 md:space-y-4 max-w-sm">
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-[#4A00E0] mx-auto" />
                    {!isUnlocked ? (
                      <>
                        <p className="font-medium text-xs sm:text-sm md:text-base text-gray-800 mb-2 sm:mb-3 md:mb-4">
                          Enter your unlock code to customize your certificate
                        </p>
                        <div className="flex flex-col gap-2">
                          <Input
                            type="text"
                            placeholder="Enter unlock code"
                            value={specialCode}
                            onChange={(e) => setSpecialCode(e.target.value)}
                            className="text-fluid-sm mobile-touch-target"
                          />
                          <Button 
                            onClick={handleUnlock}
                            className="w-full bg-[#4A00E0] hover:bg-[#4A00E0]/90 text-white mobile-touch-target text-fluid-sm touch-manipulation"
                          >
                            Unlock Preview
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="font-medium text-xs sm:text-sm md:text-base text-gray-800 mb-2 sm:mb-3 md:mb-4">
                          Customize your certificate details
                        </p>
                        <div className="space-y-2">
                          <Input
                            type="text"
                            placeholder="Your Full Name"
                            value={userInfo.name}
                            onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                            className="text-sm"
                          />
                          <Input
                            type="text"
                            placeholder="Program Name"
                            value={userInfo.program}
                            onChange={(e) => setUserInfo({...userInfo, program: e.target.value})}
                            className="text-sm"
                          />
                          <Input
                            type="date"
                            value={userInfo.completionDate}
                            onChange={(e) => setUserInfo({...userInfo, completionDate: e.target.value})}
                            className="text-sm"
                          />
                        </div>
                        <Button 
                          variant="outline" 
                          className="gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm text-[#4A00E0] border-[#4A00E0] hover:bg-[#4A00E0]/10"
                          onClick={handleCertificateClick}
                        >
                          Generate Certificate <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                        </Button>
                      </>
                    )}
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
