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
  },
  {
    title: "Backend Development",
    description: "Build scalable server-side applications",
    duration: "14 weeks",
    skills: ["Node.js", "Express", "MongoDB", "API Design"],
    category: "Web Development"
  },
  {
    title: "Mobile App Development",
    description: "Create cross-platform mobile applications",
    duration: "16 weeks",
    skills: ["React Native", "Mobile UI", "App Store"],
    category: "Mobile Development"
  },
  {
    title: "Cloud Architecture",
    description: "Design and implement cloud solutions",
    duration: "10 weeks",
    skills: ["AWS", "Azure", "Cloud Security"],
    category: "Cloud Computing"
  },
  {
    title: "DevOps Engineering",
    description: "Master modern DevOps practices",
    duration: "12 weeks",
    skills: ["Docker", "Kubernetes", "CI/CD"],
    category: "DevOps"
  },
  {
    title: "Data Science Fundamentals",
    description: "Learn essential data science skills",
    duration: "14 weeks",
    skills: ["Python", "Statistics", "Machine Learning"],
    category: "Data Science"
  },
  {
    title: "Blockchain Development",
    description: "Build decentralized applications",
    duration: "10 weeks",
    skills: ["Solidity", "Web3.js", "Smart Contracts"],
    category: "Blockchain"
  },
  {
    title: "UI/UX Design",
    description: "Create engaging user experiences",
    duration: "8 weeks",
    skills: ["Figma", "User Research", "Prototyping"],
    category: "Design"
  },
  {
    title: "Game Development",
    description: "Create interactive gaming experiences",
    duration: "16 weeks",
    skills: ["Unity", "C#", "Game Design"],
    category: "Game Dev"
  },
  {
    title: "Cybersecurity",
    description: "Master security fundamentals",
    duration: "12 weeks",
    skills: ["Network Security", "Ethical Hacking", "Security Tools"],
    category: "Security"
  },
  {
    title: "Digital Marketing",
    description: "Learn modern marketing strategies",
    duration: "8 weeks",
    skills: ["SEO", "Social Media", "Analytics"],
    category: "Marketing"
  },
  {
    title: "Full Stack JavaScript",
    description: "Master full stack development",
    duration: "20 weeks",
    skills: ["MERN Stack", "TypeScript", "GraphQL"],
    category: "Web Development"
  },
  {
    title: "AI Development",
    description: "Build AI-powered applications",
    duration: "14 weeks",
    skills: ["TensorFlow", "PyTorch", "Neural Networks"],
    category: "AI"
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
  },
  {
    title: "Python Programming",
    description: "Learn Python programming fundamentals",
    duration: "10 weeks",
    skills: ["Python", "OOP", "Data Structures"],
    category: "Programming"
  },
  {
    title: "Java Development",
    description: "Master Java programming",
    duration: "12 weeks",
    skills: ["Java", "Spring Boot", "Hibernate"],
    category: "Programming"
  },
  {
    title: "iOS Development",
    description: "Build native iOS applications",
    duration: "14 weeks",
    skills: ["Swift", "iOS SDK", "XCode"],
    category: "Mobile Development"
  },
  {
    title: "Android Development",
    description: "Create Android applications",
    duration: "14 weeks",
    skills: ["Kotlin", "Android SDK", "Material Design"],
    category: "Mobile Development"
  },
  {
    title: "Data Analytics",
    description: "Master data analysis techniques",
    duration: "10 weeks",
    skills: ["SQL", "Power BI", "Excel"],
    category: "Data"
  },
  {
    title: "Cloud Security",
    description: "Implement cloud security measures",
    duration: "8 weeks",
    skills: ["Cloud Security", "Compliance", "Risk Management"],
    category: "Security"
  },
  {
    title: "Quality Assurance",
    description: "Learn software testing fundamentals",
    duration: "8 weeks",
    skills: ["Testing", "Automation", "Test Management"],
    category: "QA"
  },
  {
    title: "Product Management",
    description: "Master product development lifecycle",
    duration: "10 weeks",
    skills: ["Product Strategy", "Agile", "User Stories"],
    category: "Management"
  },
  {
    title: "Technical Writing",
    description: "Create effective technical documentation",
    duration: "6 weeks",
    skills: ["Documentation", "API Docs", "Style Guides"],
    category: "Writing"
  },
  {
    title: "Database Administration",
    description: "Manage and optimize databases",
    duration: "10 weeks",
    skills: ["SQL", "MongoDB", "Database Design"],
    category: "Database"
  },
  {
    title: "System Administration",
    description: "Learn Linux system administration",
    duration: "12 weeks",
    skills: ["Linux", "Shell Scripting", "Networking"],
    category: "SysAdmin"
  },
  {
    title: "Network Engineering",
    description: "Master network infrastructure",
    duration: "14 weeks",
    skills: ["Networking", "Protocols", "Security"],
    category: "Networking"
  },
  {
    title: "AR/VR Development",
    description: "Create immersive experiences",
    duration: "12 weeks",
    skills: ["Unity", "AR Kit", "VR Development"],
    category: "AR/VR"
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