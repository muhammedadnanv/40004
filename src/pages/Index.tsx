
import { HeroSection } from "@/components/HeroSection";
import { ProgramsSection } from "@/components/programs/ProgramsSection";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { MentorSection } from "@/components/MentorSection";
import { CertificationSection } from "@/components/CertificationSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ProjectIdeasSection } from "@/components/ProjectIdeasSection";
import { ReviewSection } from "@/components/ReviewSection";
import { FAQSection } from "@/components/FAQSection";
import { WhatsAppSection } from "@/components/WhatsAppSection";
import { PartnershipsSection } from "@/components/PartnershipsSection";
import { LearningPathSection } from "@/components/LearningPathSection";
import { ShareSection } from "@/components/ShareSection";
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { SEODashboard } from "@/components/SEO/SEODashboard";
import { StructuredDataManager } from "@/components/SEO/StructuredDataManager";
import { CategoryTopper } from "@/components/CategoryTopper";
import { CodeOfConductSection } from "@/components/CodeOfConductSection";
import { JusticeMessage } from "@/components/JusticeMessage";
import { Helmet } from "react-helmet";
import { LeadCollectionPopup } from "@/components/LeadCollectionPopup";
import { AlbatoAdPopup } from "@/components/AlbatoAdPopup";
import { PromotionPopup } from "@/components/PromotionPopup";

const Index = () => {
  // Sample programs data
  const programs = [
    {
      title: "Full Stack Web Development",
      description: "Master React, Node.js, and modern web technologies",
      duration: "12 weeks",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      category: "web-development",
      regularPrice: 15000
    },
    {
      title: "Frontend React Mastery",
      description: "Deep dive into React ecosystem and modern frontend",
      duration: "8 weeks",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      category: "frontend",
      regularPrice: 12000
    },
    {
      title: "Backend Development",
      description: "Build scalable APIs and server applications",
      duration: "10 weeks",
      skills: ["Node.js", "Express", "PostgreSQL", "Docker"],
      category: "backend",
      regularPrice: 13000
    }
  ];

  const mentorEarnings = 50000;

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Dev Mentor Hub",
    "description": "Expert web development training and mentorship programs",
    "url": "https://devmentorhub.com",
    "courseMode": "online",
    "availableLanguage": "English"
  };

  return (
    <>
      <Helmet>
        <title>Dev Mentor Hub - Expert Web Development Training & Mentorship</title>
        <meta name="description" content="Transform your career with expert-led web development programs. Learn React, Node.js, Python & more with 1-on-1 mentorship, real projects & job placement support." />
        <meta name="keywords" content="web development training, programming courses, React training, Node.js courses, Python development, coding mentorship, full stack development" />
        <meta property="og:title" content="Dev Mentor Hub - Expert Web Development Training" />
        <meta property="og:description" content="Master web development with expert mentorship. Real projects, personalized learning, and career support." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devmentorhub.com" />
        <link rel="canonical" href="https://devmentorhub.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Dev Mentor Hub",
            "description": "Expert web development training and mentorship programs",
            "url": "https://devmentorhub.com",
            "courseMode": "online",
            "availableLanguage": "English"
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <CategoryTopper />
        <HeroSection />
        <ProgramsSection programs={programs} />
        <FeaturesSection />
        <MentorSection mentorEarnings={mentorEarnings} />
        <CertificationSection />
        <PortfolioSection />
        <ProjectIdeasSection />
        <ReviewSection />
        <LearningPathSection />
        <FAQSection />
        <WhatsAppSection />
        <PartnershipsSection />
        <ShareSection />
        <CodeOfConductSection />
        <JusticeMessage />
        <SocialMediaFooter />
        <SEODashboard />
        <StructuredDataManager 
          type="Organization" 
          data={organizationData}
          autoImplement={true}
        />
        <LeadCollectionPopup />
        <AlbatoAdPopup />
        <PromotionPopup />
      </div>
    </>
  );
};

export default Index;
