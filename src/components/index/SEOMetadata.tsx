
import React from "react";
import { GoogleSearchPreview } from "@/components/SEO/GoogleSearchPreview";
import { OnPageOptimizer } from "@/components/SEO/OnPageOptimizer";

export const SEOMetadata = () => {
  return (
    <div className="hidden">
      <GoogleSearchPreview
        title="Developer Certification with Expert Mentorship | Professional Program"
        description="Master modern development skills with personalized 1:1 expert mentorship. Get certified through our project-based professional learning program."
      />
      <OnPageOptimizer 
        pageName="Homepage" 
        targetKeywords={["developer certification", "expert mentorship", "professional development", "coding mentors"]}
        autoOptimize={true}
      />
    </div>
  );
};
