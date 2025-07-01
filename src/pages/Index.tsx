
import { HeroSection } from "@/components/HeroSection";
import { ProgramsSection } from "@/components/programs/ProgramsSection";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { MentorSection } from "@/components/MentorSection";
import { CertificationSection } from "@/components/CertificationSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ProjectIdeasSection } from "@/components/ProjectIdeasSection";
import { ReviewSection } from "@/components/ReviewSection";
import { SuccessStoriesSection } from "@/components/SuccessStoriesSection";
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
        <ProgramsSection />
        <FeaturesSection />
        <MentorSection />
        <CertificationSection />
        <PortfolioSection />
        <ProjectIdeasSection />
        <ReviewSection />
        <SuccessStoriesSection />
        <LearningPathSection />
        <FAQSection />
        <WhatsAppSection />
        <PartnershipsSection />
        <ShareSection />
        <CodeOfConductSection />
        <JusticeMessage />
        <SocialMediaFooter />
        <SEODashboard />
        <StructuredDataManager />
        <LeadCollectionPopup />
        <AlbatoAdPopup />
        <PromotionPopup />
      </div>
    </>
  );
};

export default Index;
