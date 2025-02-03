import { HeroSection } from "@/components/HeroSection";
import { ProgramsSection } from "@/components/programs/ProgramsSection";
import { SEOMetricsSection } from "@/components/SEOMetricsSection";
import { programs } from "@/data/programs";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <SEOMetricsSection />
      <ProgramsSection programs={programs} />
    </main>
  );
};

export default Index;
