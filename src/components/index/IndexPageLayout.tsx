
import React from "react";
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { JusticeMessage } from "@/components/JusticeMessage";
import { AlbatoAdPopup } from "@/components/AlbatoAdPopup";

interface IndexPageLayoutProps {
  children: React.ReactNode;
}

export const IndexPageLayout = ({ children }: IndexPageLayoutProps) => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485827404703-89b55fcc595e')] bg-cover bg-center opacity-5 pointer-events-none" />
      
      <div className="relative">
        <JusticeMessage />
        <AlbatoAdPopup />
        
        {children}

        <footer className="py-16 md:py-24 lg:py-32">
          <SocialMediaFooter />
        </footer>
      </div>
    </main>
  );
};
