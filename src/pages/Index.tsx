import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, Users, Target } from "lucide-react";
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
      title: "Web Development Mentorship",
      description: "Get personalized mentorship and weekly coding tasks in HTML, CSS, and JavaScript. Our mentors will review your code, provide detailed feedback, and guide you through building your first websites.",
      duration: "12 weeks",
      skills: ["HTML", "CSS", "JavaScript", "Git"],
      category: "Web Development"
    },
    {
      title: "React Mentorship Program",
      description: "Learn React through structured weekly assignments. Your mentor will guide you through component building, state management, and help you improve your code quality with regular code reviews.",
      duration: "10 weeks",
      skills: ["React", "CSS", "Component Design", "State Management"],
      category: "Frontend"
    },
    {
      title: "Backend Development Tasks",
      description: "Get weekly backend development tasks and personalized mentorship. Your mentor will help you build APIs, implement authentication, and guide you through database design with detailed feedback.",
      duration: "12 weeks",
      skills: ["Node.js", "Express", "MongoDB", "API Design"],
      category: "Backend"
    },
    {
      title: "Full Stack Mentorship",
      description: "Receive comprehensive mentorship in full stack development. Get weekly tasks to build complete applications while your mentor guides you through both frontend and backend challenges.",
      duration: "16 weeks",
      skills: ["MERN Stack", "Database Design", "Authentication", "Deployment"],
      category: "Full Stack"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-light text-center mb-16">Why Choose Our Mentorship Program?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-4">
                <Award className="w-8 h-8 text-black" />
                <CardTitle className="text-lg font-light">Weekly Tasks</CardTitle>
                <CardDescription>Get structured weekly assignments with clear learning objectives</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-4">
                <BookOpen className="w-8 h-8 text-black" />
                <CardTitle className="text-lg font-light">Code Reviews</CardTitle>
                <CardDescription>Receive detailed feedback on your code from experienced mentors</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-4">
                <Users className="w-8 h-8 text-black" />
                <CardTitle className="text-lg font-light">1-on-1 Mentorship</CardTitle>
                <CardDescription>Get personalized guidance and support throughout your journey</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="programs-section" className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-light text-center mb-16">Choose Your Mentorship Path</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {programs.map((program) => (
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