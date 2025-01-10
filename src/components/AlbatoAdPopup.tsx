import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AlbatoAdPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-4">
            Special Offer
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center p-4">
          <a 
            href="https://albato.com?fpr=muhammad51" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-90 transition-opacity"
          >
            <img 
              src="https://d2gdx5nv84sdx2.cloudfront.net/uploads/k8rbl7fp/marketing_asset/banner/13697/7_Albato_vs_Zapier_-_purple.png" 
              alt="Albato vs Zapier Comparison" 
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}