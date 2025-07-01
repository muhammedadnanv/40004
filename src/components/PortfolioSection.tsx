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
    <!-- Google Font -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"/>
    <!-- Tailwind CDN + Theme -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
    tailwind.config = {
    theme: {
    extend: {
    colors: {
    primary:  '#00e37f',
    secondary:'#3be8fc',
    bg:       '#000000',
    card:     '#0d0d0d',
    heading:  '#ffffff',
    body:     '#e5e5e5'
    },
    fontFamily: {
    sans:['Inter','ui-sans-serif','system-ui']
    }
    }
    }
    }
    </script>
    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css"/>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <style>
        body { 
            font-family: 'Inter', ui-sans-serif, system-ui; 
            background: #000000;
            color: #e5e5e5;
        }
        .gradient-bg {
            background: linear-gradient(135deg, #00e37f 0%, #3be8fc 100%);
        }
        .card-bg {
            background: #0d0d0d;
            border: 1px solid rgba(0, 227, 127, 0.2);
        }
        .text-gradient {
            background: linear-gradient(135deg, #00e37f 0%, #3be8fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .skill-tag {
            background: linear-gradient(135deg, #00e37f 0%, #3be8fc 100%);
            color: #000000;
            font-weight: 600;
        }
        .hover-glow:hover {
            box-shadow: 0 0 20px rgba(0, 227, 127, 0.3);
            transform: translateY(-2px);
            transition: all 0.3s ease;
        }
        .section-border {
            border-left: 4px solid #00e37f;
        }
        @media (max-width: 768px) {
            .container { padding: 1rem; }
            .text-6xl { font-size: 2.5rem; }
            .text-xl { font-size: 1.1rem; }
        }
    </style>
</head>
<body class="bg-bg text-body">
    <div class="min-h-screen">
        <!-- Hero Section -->
        <section class="gradient-bg text-center py-20 px-4">
            <div class="container mx-auto max-w-4xl" data-aos="fade-up">
                <h1 class="text-6xl font-bold text-black mb-4">${data.name}</h1>
                <p class="text-xl text-black/80 font-medium">${data.title}</p>
                <div class="mt-8 flex justify-center space-x-4">
                    ${data.github ? `
                    <a href="${data.github}" target="_blank" class="bg-black/20 hover:bg-black/30 text-black px-6 py-3 rounded-full font-semibold transition-all duration-300">
                        GitHub
                    </a>` : ''}
                    ${data.linkedin ? `
                    <a href="${data.linkedin}" target="_blank" class="bg-black/20 hover:bg-black/30 text-black px-6 py-3 rounded-full font-semibold transition-all duration-300">
                        LinkedIn
                    </a>` : ''}
                </div>
            </div>
        </section>

        <div class="container mx-auto max-w-6xl px-4 py-16 space-y-16">
            <!-- About Section -->
            <section data-aos="fade-up" data-aos-delay="100">
                <div class="card-bg rounded-2xl p-8 hover-glow">
                    <h2 class="text-3xl font-bold text-heading mb-6 section-border pl-6">About Me</h2>
                    <p class="text-lg leading-relaxed">${data.bio}</p>
                </div>
            </section>

            <!-- Skills Section -->
            <section data-aos="fade-up" data-aos-delay="200">
                <div class="card-bg rounded-2xl p-8 hover-glow">
                    <h2 class="text-3xl font-bold text-heading mb-6 section-border pl-6">Skills & Technologies</h2>
                    <div class="flex flex-wrap gap-3">
                        ${skillsArray.map(skill => `
                            <span class="skill-tag px-4 py-2 rounded-full text-sm font-semibold">
                                ${skill}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </section>

            ${projectsArray.length > 0 ? `
            <!-- Projects Section -->
            <section data-aos="fade-up" data-aos-delay="300">
                <div class="card-bg rounded-2xl p-8 hover-glow">
                    <h2 class="text-3xl font-bold text-heading mb-6 section-border pl-6">Featured Projects</h2>
                    <div class="space-y-4">
                        ${projectsArray.map((project, index) => `
                            <div class="bg-bg/50 p-6 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300" data-aos="fade-left" data-aos-delay="${400 + index * 100}">
                                <p class="text-body">${project}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
            ` : ''}

            <!-- Contact Section -->
            <section data-aos="fade-up" data-aos-delay="400">
                <div class="card-bg rounded-2xl p-8 hover-glow">
                    <h2 class="text-3xl font-bold text-heading mb-6 section-border pl-6">Get In Touch</h2>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="bg-bg/50 p-6 rounded-xl border border-secondary/20 hover:border-secondary/40 transition-all duration-300">
                            <h3 class="text-xl font-semibold text-heading mb-2">Email</h3>
                            <a href="mailto:${data.email}" class="text-secondary hover:text-secondary/80 font-medium">
                                ${data.email}
                            </a>
                        </div>
                        ${data.phone ? `
                        <div class="bg-bg/50 p-6 rounded-xl border border-secondary/20 hover:border-secondary/40 transition-all duration-300">
                            <h3 class="text-xl font-semibold text-heading mb-2">Phone</h3>
                            <a href="tel:${data.phone}" class="text-secondary hover:text-secondary/80 font-medium">
                                ${data.phone}
                            </a>
                        </div>` : ''}
                    </div>
                </div>
            </section>
        </div>

        <!-- Footer -->
        <footer class="gradient-bg text-center py-8 mt-16">
            <div class="container mx-auto px-4">
                <p class="text-black/80 font-medium">
                    Portfolio powered by <span class="font-bold">Dev Mentor Hub</span> | © ${new Date().getFullYear()}
                </p>
            </div>
        </footer>
    </div>

    <script>
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    </script>
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
                <h3 className="font-semibold text-sm sm:text-base md:text-lg">Modern Dark Theme</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  Sleek dark design with green and cyan accents, Inter font, and smooth animations
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
                  Get your portfolio as an HTML file with animations that you can host anywhere
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
              <Badge variant="secondary" className="bg-[#4A00E0]/10 text-[#4A00E0] text-[10px] sm:text-xs md:text-sm">
                Dark Theme
              </Badge>
              <Badge variant="secondary" className="bg-[#4A00E0]/10 text-[#4A00E0] text-[10px] sm:text-xs md:text-sm">
                AOS Animations
              </Badge>
              <Badge variant="secondary" className="bg-[#4A00E0]/10 text-[#4A00E0] text-[10px] sm:text-xs md:text-sm">
                Mobile Responsive
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
