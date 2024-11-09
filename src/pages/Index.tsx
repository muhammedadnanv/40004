import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, Users } from "lucide-react";
import { ProgramCard } from "@/components/ProgramCard";
import { HeroSection } from "@/components/HeroSection";
import { CertificationSection } from "@/components/CertificationSection";
import { FAQSection } from "@/components/FAQSection";
import { WhatsAppSection } from "@/components/WhatsAppSection";
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { useEffect } from "react";
import { showRandomJoinNotification } from "@/utils/mockNotifications";

// Separate program data into current and older programs
const currentPrograms = [
  {
    title: "Frontend Development",
    description: "Master AI-powered modern web development with React",
    duration: "12 weeks",
    skills: ["JavaScript", "AIScript", "CSS", "HTML"],
    category: "Web Development"
  },
  {
    title: "AI + Web Design",
    description: "Create AI-powered web designs and interfaces",
    duration: "10 weeks",
    skills: ["AI Tools", "UI/UX", "Web Design"],
    category: "Design"
  }
];

const olderPrograms = [
  {
    title: "AI Prompt Specialist",
    description: "Master the art of crafting effective AI prompts",
    duration: "8 weeks",
    skills: ["Prompt Engineering", "GPT", "DALL-E", "Midjourney"],
    category: "AI"
  },
  {
    title: "No-Code AI Tools",
    description: "Build AI-powered applications without coding",
    duration: "6 weeks",
    skills: ["Bubble", "Adalo", "FlutterFlow", "AI Integration"],
    category: "No-Code"
  }
];

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

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-light text-center mb-16">Why Choose Dev Mentorship?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-4">
                <Award className="w-8 h-8 text-black" />
                <CardTitle className="text-lg font-light">Industry-Recognized Certification</CardTitle>
                <CardDescription>Earn a prestigious certificate validated by industry experts</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-4">
                <BookOpen className="w-8 h-8 text-black" />
                <CardTitle className="text-lg font-light">Hands-on Experience</CardTitle>
                <CardDescription>Build real-world projects using cutting-edge technologies</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-4">
                <Users className="w-8 h-8 text-black" />
                <CardTitle className="text-lg font-light">Expert Mentorship</CardTitle>
                <CardDescription>Get mentored by industry professionals</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <CertificationSection />

      {/* Current Programs Section */}
      <section id="current-programs" className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-light text-center mb-16">Current Programs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {currentPrograms.map((program) => (
              <ProgramCard key={program.title} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* Older Programs Section */}
      <section id="older-programs" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-light text-center mb-16">Previous Programs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {olderPrograms.map((program) => (
              <ProgramCard key={program.title} program={program} />
            ))}
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