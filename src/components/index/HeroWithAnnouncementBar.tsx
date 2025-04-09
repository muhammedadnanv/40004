
import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Wand2 } from "lucide-react";

export const HeroWithAnnouncementBar = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-3 md:mb-0">
              <Wand2 className="mr-2" />
              <span className="font-medium">NEW:</span>
              <span className="ml-2">Summarize PDFs & Videos with Gemini AI</span>
            </div>
            <Link to="/content-summarizer">
              <Button variant="secondary" size="sm" className="whitespace-nowrap">
                <FileText className="mr-2 h-4 w-4" />
                Try it now
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <HeroSection />
    </>
  );
};
