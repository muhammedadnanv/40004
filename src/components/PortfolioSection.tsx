
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Globe, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { initializeDodoPayment } from "@/utils/dodoPaymentService";
import { supabase } from "@/integrations/supabase/client";

export const PortfolioSection = () => {
  const { toast } = useToast();
  const [portfolioData, setPortfolioData] = useState({
    name: "",
    title: "",
    bio: "",
    skills: "",
    projects: "",
    email: "",
    phone: "",
    github: "",
    linkedin: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const generatePortfolioHTML = (data: typeof portfolioData) => {
    const skillsArray = data.skills.split(',').map(skill => skill.trim());
    const projectsArray = data.projects.split('\n').filter(project => project.trim());
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name} - Portfolio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 60px 0; color: white; }
        .header h1 { font-size: 3rem; margin-bottom: 10px; }
        .header p { font-size: 1.2rem; opacity: 0.9; }
        .content { background: white; border-radius: 15px; padding: 40px; margin-top: -30px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .section { margin-bottom: 40px; }
        .section h2 { color: #4A00E0; margin-bottom: 20px; font-size: 2rem; border-bottom: 3px solid #4A00E0; padding-bottom: 10px; }
        .bio { font-size: 1.1rem; color: #666; line-height: 1.8; }
        .skills { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill { background: #4A00E0; color: white; padding: 8px 16px; border-radius: 25px; font-size: 0.9rem; }
        .projects { list-style: none; }
        .projects li { background: #f8f9fa; padding: 15px; margin-bottom: 10px; border-radius: 8px; border-left: 4px solid #4A00E0; }
        .contact { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
        .contact-item { background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center; }
        .contact-item a { color: #4A00E0; text-decoration: none; font-weight: bold; }
        .footer { text-align: center; margin-top: 40px; color: #666; font-size: 0.9rem; }
        @media (max-width: 768px) {
            .header h1 { font-size: 2rem; }
            .content { padding: 20px; }
            .contact { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${data.name}</h1>
            <p>${data.title}</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>About Me</h2>
                <p class="bio">${data.bio}</p>
            </div>
            
            <div class="section">
                <h2>Skills</h2>
                <div class="skills">
                    ${skillsArray.map(skill => `<span class="skill">${skill}</span>`).join('')}
                </div>
            </div>
            
            ${projectsArray.length > 0 ? `
            <div class="section">
                <h2>Projects</h2>
                <ul class="projects">
                    ${projectsArray.map(project => `<li>${project}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
            
            <div class="section">
                <h2>Contact</h2>
                <div class="contact">
                    <div class="contact-item">
                        <h3>Email</h3>
                        <a href="mailto:${data.email}">${data.email}</a>
                    </div>
                    <div class="contact-item">
                        <h3>Phone</h3>
                        <a href="tel:${data.phone}">${data.phone}</a>
                    </div>
                    ${data.github ? `
                    <div class="contact-item">
                        <h3>GitHub</h3>
                        <a href="${data.github}" target="_blank">View Profile</a>
                    </div>
                    ` : ''}
                    ${data.linkedin ? `
                    <div class="contact-item">
                        <h3>LinkedIn</h3>
                        <a href="${data.linkedin}" target="_blank">View Profile</a>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>Portfolio generated by Dev Mentor Hub | © ${new Date().getFullYear()}</p>
        </div>
    </div>
</body>
</html>`;
  };

  const handleGeneratePortfolio = async () => {
    if (!portfolioData.name || !portfolioData.title || !portfolioData.bio || !portfolioData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Title, Bio, Email).",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);

      const options = {
        key: import.meta.env.VITE_DODO_PAYMENT_PUBLIC_KEY || "VjyJF4pywuQ1M5du",
        amount: 99 * 100, // ₹99 in paise
        currency: "INR",
        name: "Dev Mentor Hub",
        description: "Dynamic Portfolio Generation Service",
        order_id: `portfolio_${Date.now()}`,
        prefill: {
          name: portfolioData.name,
          email: portfolioData.email,
          contact: portfolioData.phone,
        },
        notes: {
          service: "Portfolio Generation",
          amount: "₹99",
          recipient: "adnanmuhammad4393@okicici",
        },
        theme: {
          color: "#4A00E0",
        },
        handler: async function (response: any) {
          try {
            // Store portfolio data and payment info
            const { error } = await supabase
              .from('payments')
              .insert([{
                payment_id: response.dodo_payment_id,
                order_id: response.dodo_order_id,
                program_title: "Portfolio Generation",
                amount: 99,
                user_name: portfolioData.name,
                user_email: portfolioData.email,
                user_phone: portfolioData.phone,
                status: "completed",
                created_at: new Date().toISOString(),
              }]);

            if (error) {
              console.error("Error storing payment:", error);
            }

            // Generate and download portfolio
            const portfolioHTML = generatePortfolioHTML(portfolioData);
            const blob = new Blob([portfolioHTML], { type: 'text/html' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${portfolioData.name.replace(/\s+/g, '_')}_Portfolio.html`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            // Also open in new tab for preview
            const newWindow = window.open('', '_blank');
            if (newWindow) {
              newWindow.document.write(portfolioHTML);
            }

            toast({
              title: "Portfolio Generated! 🎉",
              description: "Your portfolio has been downloaded and opened for preview.",
            });

            setIsProcessing(false);
          } catch (error: any) {
            console.error("Error processing portfolio:", error);
            toast({
              title: "Error",
              description: "Failed to generate portfolio. Please try again.",
              variant: "destructive",
            });
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            toast({
              title: "Payment Cancelled",
              description: "Portfolio generation was cancelled.",
              variant: "destructive",
            });
          },
        },
      };

      await initializeDodoPayment(options);
    } catch (error: any) {
      console.error("Portfolio generation error:", error);
      toast({
        title: "Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-16 px-3 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">
            Dynamic Portfolio Generator
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
            Create a professional portfolio website instantly for just ₹99
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#4A00E0] mt-0.5 sm:mt-1" />
              <div>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg">Professional Design</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  Modern, responsive portfolio with gradient backgrounds and clean typography
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 sm:gap-3">
              <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#4A00E0] mt-0.5 sm:mt-1" />
              <div>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg">Fully Customizable</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  Add your personal information, skills, projects, and contact details
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 sm:gap-3">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#4A00E0] mt-0.5 sm:mt-1" />
              <div>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg">Instant Download</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  Get your portfolio as an HTML file that you can host anywhere
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
              <Badge variant="secondary" className="bg-[#4A00E0]/10 text-[#4A00E0] text-[10px] sm:text-xs md:text-sm">
                Mobile Responsive
              </Badge>
              <Badge variant="secondary" className="bg-[#4A00E0]/10 text-[#4A00E0] text-[10px] sm:text-xs md:text-sm">
                SEO Friendly
              </Badge>
              <Badge variant="secondary" className="bg-[#4A00E0]/10 text-[#4A00E0] text-[10px] sm:text-xs md:text-sm">
                Fast Loading
              </Badge>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-[#4A00E0]/20">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-lg text-[#4A00E0]">Special Price</h4>
                  <p className="text-gray-600 text-sm">Limited time offer</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#4A00E0]">₹99</div>
                  <div className="text-sm text-gray-500 line-through">₹299</div>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4 text-[#4A00E0]">Create Your Portfolio</h3>
              
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name *</label>
                    <Input
                      value={portfolioData.name}
                      onChange={(e) => setPortfolioData({...portfolioData, name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Professional Title *</label>
                    <Input
                      value={portfolioData.title}
                      onChange={(e) => setPortfolioData({...portfolioData, title: e.target.value})}
                      placeholder="Full Stack Developer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bio/About *</label>
                  <Textarea
                    value={portfolioData.bio}
                    onChange={(e) => setPortfolioData({...portfolioData, bio: e.target.value})}
                    placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Skills (comma-separated)</label>
                  <Input
                    value={portfolioData.skills}
                    onChange={(e) => setPortfolioData({...portfolioData, skills: e.target.value})}
                    placeholder="React, Node.js, Python, JavaScript, MongoDB"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Projects (one per line)</label>
                  <Textarea
                    value={portfolioData.projects}
                    onChange={(e) => setPortfolioData({...portfolioData, projects: e.target.value})}
                    placeholder="E-commerce website with React and Node.js&#10;Mobile app using React Native&#10;Data analysis project with Python"
                    rows={3}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <Input
                      type="email"
                      value={portfolioData.email}
                      onChange={(e) => setPortfolioData({...portfolioData, email: e.target.value})}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <Input
                      value={portfolioData.phone}
                      onChange={(e) => setPortfolioData({...portfolioData, phone: e.target.value})}
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">GitHub URL</label>
                    <Input
                      value={portfolioData.github}
                      onChange={(e) => setPortfolioData({...portfolioData, github: e.target.value})}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                    <Input
                      value={portfolioData.linkedin}
                      onChange={(e) => setPortfolioData({...portfolioData, linkedin: e.target.value})}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleGeneratePortfolio}
                  disabled={isProcessing}
                  className="w-full bg-[#4A00E0] hover:bg-[#4A00E0]/90 text-white py-3 text-base font-medium"
                >
                  {isProcessing ? (
                    "Processing Payment..."
                  ) : (
                    <>
                      Generate Portfolio for ₹99 <ExternalLink className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Payment will be processed securely. You'll receive your portfolio instantly after payment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
