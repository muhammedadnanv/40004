import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, Users, Target, Rocket, Shield } from "lucide-react";
import { ProgramCard } from "@/components/ProgramCard";
import { HeroSection } from "@/components/HeroSection";
import { CertificationSection } from "@/components/CertificationSection";
import { FAQSection } from "@/components/FAQSection";
import { WhatsAppSection } from "@/components/WhatsAppSection";
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { useEffect } from "react";
import { showRandomJoinNotification } from "@/utils/mockNotifications";

const Index = () => {
  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      showRandomJoinNotification();
    }, 2000);

    const interval = setInterval(() => {
      showRandomJoinNotification();
    }, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const programs = [
    {
      title: "Frontend Development",
      description: "We will mentor you to master AI-powered modern web development with React and more",
      duration: "12 weeks",
      skills: ["JavaScript", "AIScript", "CSS", "HTML"],
      category: "Web Development"
    },
    {
      title: "AI + Web Design",
      description: "We will mentor you to create AI-powered web designs and interfaces",
      duration: "10 weeks",
      skills: ["AI Tools", "UI/UX", "Web Design"],
      category: "Design"
    },
    {
      title: "AI Prompt Specialist",
      description: "We will mentor you to master the art of crafting effective AI prompts for various applications",
      duration: "8 weeks",
      skills: ["Prompt Engineering", "GPT", "DALL-E", "Midjourney"],
      category: "AI"
    },
    {
      title: "No-Code AI Tools",
      description: "We will mentor you to build AI-powered applications without coding",
      duration: "6 weeks",
      skills: ["Bubble", "Adalo", "FlutterFlow", "AI Integration"],
      category: "No-Code"
    },
    {
      title: "AI + Python Development",
      description: "We will mentor you to build AI-powered applications with Python and popular frameworks",
      duration: "14 weeks",
      skills: ["Python", "HuggingFace", "APIs", "Machine Learning"],
      category: "Programming"
    },
    {
      title: "AI Superbase Creation",
      description: "We will mentor you to build advanced AI-powered applications with Node.js and modern AI tools",
      duration: "12 weeks",
      skills: ["Node.js", "AI Integration", "Database Design", "API Development"],
      category: "Backend"
    },
    {
      title: "AI Prompt Creator",
      description: "We will mentor you to create effective and engaging AI-powered prompts for various AI models",
      duration: "8 weeks",
      skills: ["Prompt Writing", "AI Understanding", "Creative Writing", "System Design"],
      category: "AI"
    },
    {
      title: "Build AI-powered Chatbot",
      description: "We will mentor you to create intelligent AI-powered chatbots using cutting-edge AI technologies",
      duration: "10 weeks",
      skills: ["NLP", "Chatbot Design", "AI Integration", "Conversation Flow"],
      category: "AI"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4A00E0]/5 to-white">
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12">Why Choose Dev Mentorship?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Feature Cards */}
            <Card className="transform hover:scale-105 transition-all duration-300">
              <CardHeader className="space-y-2 text-center sm:text-left">
                <Award className="w-8 h-8 sm:w-12 sm:h-12 text-[#4A00E0] mx-auto sm:mx-0" />
                <CardTitle className="text-lg sm:text-xl">Industry-Recognized Certification</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Earn a prestigious certificate validated by industry experts
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="transform hover:scale-105 transition-all duration-300">
              <CardHeader className="space-y-2 text-center sm:text-left">
                <BookOpen className="w-8 h-8 sm:w-12 sm:h-12 text-[#4A00E0] mx-auto sm:mx-0" />
                <CardTitle className="text-lg sm:text-xl">Hands-on Experience</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Build real-world projects using cutting-edge technologies
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="transform hover:scale-105 transition-all duration-300">
              <CardHeader className="space-y-2 text-center sm:text-left">
                <Users className="w-8 h-8 sm:w-12 sm:h-12 text-[#4A00E0] mx-auto sm:mx-0" />
                <CardTitle className="text-lg sm:text-xl">Expert Mentorship</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Get mentored by industry professionals
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="transform hover:scale-105 transition-all duration-300">
              <CardHeader className="space-y-2 text-center sm:text-left">
                <Target className="w-8 h-8 sm:w-12 sm:h-12 text-[#4A00E0] mx-auto sm:mx-0" />
                <CardTitle className="text-lg sm:text-xl">Personalized Learning Path</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Follow a customized curriculum for your goals
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="transform hover:scale-105 transition-all duration-300">
              <CardHeader className="space-y-2 text-center sm:text-left">
                <Rocket className="w-8 h-8 sm:w-12 sm:h-12 text-[#4A00E0] mx-auto sm:mx-0" />
                <CardTitle className="text-lg sm:text-xl">Career Growth</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Access job opportunities and interview preparation
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="transform hover:scale-105 transition-all duration-300">
              <CardHeader className="space-y-2 text-center sm:text-left">
                <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-[#4A00E0] mx-auto sm:mx-0" />
                <CardTitle className="text-lg sm:text-xl">Lifetime Access</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Get unlimited access to course materials
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <CertificationSection />

      {/* Programs Section */}
      <section id="programs-section" className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#4A00E0]/5">
        <div className="container mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12">Our Programs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {programs.map((program) => (
              <ProgramCard key={program.title} program={program} />
            ))}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center">
              <p className="text-base sm:text-lg md:text-xl text-gray-600">+24 more programs (30 Programs total)</p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
      <WhatsAppSection />
      <SocialMediaFooter />
    </div>
  );
};

export default Index;