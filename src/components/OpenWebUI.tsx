import { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";

export const OpenWebUI = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Open-WebUI
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@open-webui/core@latest/dist/open-webui.min.js';
    script.async = true;
    
    script.onload = () => {
      if (containerRef.current && (window as any).OpenWebUI) {
        (window as any).OpenWebUI.init({
          container: containerRef.current,
          theme: 'light',
          defaultModel: 'gpt-4o-mini',
          features: {
            chat: true,
            voiceInput: true,
            codeHighlighting: true,
            markdownSupport: true,
          },
          branding: {
            name: 'Dev Mentor Hub AI',
            logo: 'https://i.ibb.co/wy6KYyT/DALL-E-2024-11-07-14-58-28-A-professional-and-modern-logo-for-Dev-Mentor-a-mentorship-platform-in-te.webp'
          }
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      // Cleanup Open-WebUI instance
      if ((window as any).OpenWebUI) {
        (window as any).OpenWebUI.destroy();
      }
    };
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8 bg-white/80 backdrop-blur-sm shadow-lg">
      <CardContent className="p-6">
        <div 
          ref={containerRef} 
          className="min-h-[500px] rounded-lg"
          aria-label="AI Chat Interface"
        />
      </CardContent>
    </Card>
  );
};