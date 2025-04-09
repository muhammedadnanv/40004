
import React from 'react';
import { HeroSection } from "@/components/HeroSection";
import { FAQSection } from "@/components/FAQSection";
import { ProgramsSection } from "@/components/programs/ProgramsSection";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { ReviewSection } from "@/components/ReviewSection";
import { MentorSection } from "@/components/MentorSection";
import { SuccessStoriesSection } from "@/components/SuccessStoriesSection";
import { LearningPathSection } from "@/components/LearningPathSection";
import { CertificationSection } from "@/components/CertificationSection";
import { PartnershipsSection } from "@/components/PartnershipsSection";
import { ProjectIdeasSection } from "@/components/ProjectIdeasSection";
import { WhatsAppSection } from "@/components/WhatsAppSection";
import { CategoryTopper } from "@/components/CategoryTopper";
import { SEODashboard } from "@/components/SEO/SEODashboard";

const Index = () => {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <FeaturesSection />
      <ProgramsSection />
      <CategoryTopper />
      <MentorSection />
      <SuccessStoriesSection />
      <LearningPathSection />
      <CertificationSection />
      <ProjectIdeasSection />
      <PartnershipsSection />
      <FAQSection />
      <ReviewSection />
      <WhatsAppSection />
      <SEODashboard pageType="homepage" />
    </main>
  );
};

export default Index;
