
import React from "react";
import { IndexDataProvider } from "@/components/index/IndexDataProvider";
import { IndexPageLayout } from "@/components/index/IndexPageLayout";
import { HeroWithAnnouncementBar } from "@/components/index/HeroWithAnnouncementBar";
import { MainContent } from "@/components/index/MainContent";
import { SEOMetadata } from "@/components/index/SEOMetadata";

const Index = () => {
  // Calculate mentor earnings
  const programFee = 2160;
  const platformFeePercentage = 10;
  const razorpayFeePercentage = 2;
  
  const platformFee = (programFee * platformFeePercentage) / 100;
  const razorpayFee = (programFee * razorpayFeePercentage) / 100;
  const mentorEarnings = programFee - platformFee - razorpayFee;

  // Define programs data
  const programs = [
    {
      title: "Frontend Development",
      description: "Build frontend projects with expert mentorship. Get personalized guidance and feedback as you develop practical applications. No courses - just hands-on project experience. Build projects with Mentor support.",
      duration: "1 year",
      skills: ["React", "Angular", "Vue.js", "TypeScript"],
      category: "Frontend Development",
      regularPrice: programFee
    },
    {
      title: "Low-Code Development",
      description: "Create efficient applications using low-code platforms with expert mentorship. Get personalized guidance on your projects. No courses - pure project-based experience. Build projects with Mentor support.",
      duration: "1 year",
      skills: ["Low-Code Platforms", "Visual Development", "Rapid Prototyping", "App Design"],
      category: "Low-Code Development",
      regularPrice: programFee
    },
    {
      title: "No-Code Development",
      description: "Build applications using no-code tools with expert mentorship. Get personalized guidance on your projects. No courses - just hands-on development. Build projects with Mentor support.",
      duration: "1 year",
      skills: ["No-Code Tools", "Visual Development", "Automation", "App Design"],
      category: "No-Code Development",
      regularPrice: programFee
    },
    {
      title: "Full Stack Development",
      description: "Build complete full-stack applications with expert mentorship. Work on real projects with industry best practices. No courses - pure hands-on development. Build projects with Mentor support.",
      duration: "1 year",
      skills: ["RESTful APIs", "Node.js", "Database Design", "Authentication", "Cloud Deployment"],
      category: "Full Stack Development",
      regularPrice: programFee
    },
    {
      title: "UX/UI Development",
      description: "Master the art of creating intuitive and engaging user interfaces with expert mentorship. Apply design principles, conduct user research, and create prototypes through hands-on projects. Build projects with Mentor support.",
      duration: "1 year",
      skills: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"],
      category: "Design",
      regularPrice: programFee
    },
    {
      title: "Graphic Designing",
      description: "Develop your graphic design skills with personalized mentorship. Create compelling visual content through practical projects and expert guidance. Build projects with Mentor support.",
      duration: "1 year",
      skills: ["Adobe Creative Suite", "Typography", "Brand Design", "Digital Illustration", "Layout Design"],
      category: "Design",
      regularPrice: programFee
    },
    {
      title: "Video Editing",
      description: "Master professional video editing techniques with expert mentorship. Apply industry-standard tools and storytelling through hands-on video projects. Build projects with Mentor support.",
      duration: "1 year",
      skills: ["Video Editing Software", "Color Grading", "Motion Graphics", "Sound Design", "Video Production"],
      category: "Media",
      regularPrice: programFee
    },
    {
      title: "Prompt Engineering",
      description: "Master the art of AI prompt engineering with expert guidance. Create effective prompts for various AI models and applications. Build projects with Mentor support.",
      duration: "1 year",
      skills: ["AI Models", "Natural Language Processing", "Context Design", "Output Optimization", "AI Integration"],
      category: "AI Development",
      regularPrice: programFee
    }
  ];

  return (
    <IndexDataProvider>
      <IndexPageLayout>
        <HeroWithAnnouncementBar />
        <MainContent 
          programs={programs} 
          mentorEarnings={mentorEarnings} 
        />
        <SEOMetadata />
      </IndexPageLayout>
    </IndexDataProvider>
  );
};

export default Index;
