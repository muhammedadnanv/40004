
import React from "react";
import { LearningPathSection } from "@/components/LearningPathSection";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { ProgramsSection } from "@/components/programs/ProgramsSection";
import { PartnershipsSection } from "@/components/PartnershipsSection";
import { SuccessStoriesSection } from "@/components/SuccessStoriesSection";
import { ProjectIdeasSection } from "@/components/ProjectIdeasSection";
import { CertificationSection } from "@/components/CertificationSection";
import { CodeOfConductSection } from "@/components/CodeOfConductSection";
import { ReviewSection } from "@/components/ReviewSection";
import { ShareSection } from "@/components/ShareSection";
import { MentorSection } from "@/components/MentorSection";
import { FAQSection } from "@/components/FAQSection";
import { WhatsAppSection } from "@/components/WhatsAppSection";

interface Program {
  title: string;
  description: string;
  duration: string;
  skills: string[];
  category: string;
  regularPrice: number;
}

interface MainContentProps {
  programs: Program[];
  mentorEarnings: number;
}

export const MainContent = ({ programs, mentorEarnings }: MainContentProps) => {
  return (
    <>
      <LearningPathSection />
      <FeaturesSection />
      <ProgramsSection programs={programs} />
      <PartnershipsSection />
      <SuccessStoriesSection />
      <ProjectIdeasSection />
      <CertificationSection />
      <CodeOfConductSection />
      <ReviewSection />
      <ShareSection />
      <MentorSection mentorEarnings={mentorEarnings} />
      <FAQSection />
      <WhatsAppSection />
    </>
  );
};
