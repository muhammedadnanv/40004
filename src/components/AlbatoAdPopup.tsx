import { useEffect } from "react";

export function AlbatoAdPopup() {
  useEffect(() => {
    // Show popup after user interacts with the page
    const handleInteraction = () => {
      // Create pop-under window
      const width = 800;
      const height = 600;
      const left = window.screen.width - width;
      const top = window.screen.height - height;

      const popUnder = window.open(
        "https://albato.com?fpr=muhammad51",
        "albato_offer",
        `width=${width},height=${height},left=${left},top=${top}`
      );

      // Bring main window to front
      if (popUnder) {
        window.focus();
        
        // Remove event listener after first interaction
        document.removeEventListener('click', handleInteraction);
      }
    };

    // Add event listener for user interaction
    document.addEventListener('click', handleInteraction, { once: true });

    // Cleanup
    return () => {
      document.removeEventListener('click', handleInteraction);
    };
  }, []);

  return null; // Component doesn't render anything visually
}