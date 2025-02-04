import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { ProgramsSection } from "@/components/programs/ProgramsSection";
import { CertificationSection } from "@/components/CertificationSection";
import { FAQSection } from "@/components/FAQSection";
import { OpenWebUI } from "@/components/OpenWebUI";
import { programs } from "@/data/programs";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ProgramsSection programs={programs} />
      <OpenWebUI />
      <CertificationSection />
      <FAQSection />
    </main>
  );
};

export default Index;