import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export function AlbatoAdPopup() {
  useEffect(() => {
    // Function to show in-app notification
    const showInAppNotification = () => {
      toast({
        title: "Discover Albato Integration Platform",
        description: "Connect your favorite apps and automate your workflow",
        action: (
          <a
            href="https://albato.com?fpr=muhammad51"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Learn More
          </a>
        ),
        duration: 10000,
      });
    };

    // Function to request and handle push notification permission
    const requestAndShowPushNotification = async () => {
      try {
        // Check if the browser supports notifications
        if (!("Notification" in window)) {
          console.log("This browser does not support notifications");
          return;
        }

        // Request permission
        const permission = await Notification.requestPermission();
        
        if (permission === "granted") {
          // Create and show push notification
          const notification = new Notification("Discover Albato Integration Platform", {
            body: "Connect your favorite apps and automate your workflow",
            icon: "https://d2gdx5nv84sdx2.cloudfront.net/uploads/k8rbl7fp/marketing_asset/banner/13697/7_Albato_vs._Zapier_-_purple.png",
            badge: "https://d2gdx5nv84sdx2.cloudfront.net/uploads/k8rbl7fp/marketing_asset/banner/13697/7_Albato_vs._Zapier_-_purple.png",
            data: {
              url: "https://albato.com?fpr=muhammad51"
            }
          });

          // Handle notification click
          notification.onclick = function() {
            window.open(this.data.url, '_blank');
          };
        }
      } catch (error) {
        console.error("Error showing push notification:", error);
        // Fallback to in-app notification if push fails
        showInAppNotification();
      }
    };

    // Show notifications after a delay
    const timer = setTimeout(() => {
      // Try push notification first
      requestAndShowPushNotification();
      
      // Also show in-app notification
      showInAppNotification();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null; // Component doesn't render anything visually
}