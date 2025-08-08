
import { Button } from "@/components/ui/button";
import { MentorInfoDialog } from "./mentor/MentorInfoDialog";
import { useState } from "react";

interface MentorSectionProps {
  mentorEarnings: number;
}

export const MentorSection = ({ mentorEarnings }: MentorSectionProps) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <section 
      className="py-8 sm:py-16 md:py-20 lg:py-24 responsive-padding bg-gradient-to-b from-white via-purple-50/30 to-white"
      id="become-mentor"
    >
      <div className="responsive-container max-w-4xl text-center">
        <h2 className="responsive-heading mb-6 sm:mb-8">Become a Mentor</h2>
        <p className="text-fluid-base text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Join our platform as a mentor and help aspiring developers achieve their goals while earning from your expertise.
        </p>
        <Button 
          onClick={() => setShowDialog(true)}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white mobile-touch-target responsive-padding rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-fluid-base touch-manipulation"
          aria-haspopup="dialog"
        >
          Apply as Mentor
        </Button>
        <MentorInfoDialog 
          isOpen={showDialog} 
          onClose={() => setShowDialog(false)}
          mentorEarnings={mentorEarnings}
        />
        
        <div className="mt-8 sm:mt-10 flex justify-center" aria-label="Product Hunt Badge">
          <a 
            href="https://www.producthunt.com/products/dev-mentor-hub/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-dev&#0045;mentor&#0045;hub" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-90 transition-opacity mobile-touch-target touch-manipulation"
            aria-label="View us on Product Hunt"
          >
            <img 
              src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=864570&theme=light" 
              alt="Dev Mentor Hub - Your journey to mastering technology starts here | Product Hunt" 
              style={{ width: "250px", height: "54px" }} 
              width="250" 
              height="54" 
              loading="lazy"
              className="max-w-full h-auto"
            />
          </a>
        </div>
      </div>
    </section>
  );
};
