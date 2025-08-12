import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Flag, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const IndependenceDayBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hidden = sessionStorage.getItem("hideIndependenceBanner");
    if (hidden === "1") setVisible(false);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("hideIndependenceBanner", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <motion.aside
      aria-label="Independence Day banner"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
      role="region"
    >
      <div className="w-full bg-gradient-to-r from-primary/90 to-primary/70 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <Flag className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              <span className="font-semibold tracking-wide text-sm sm:text-base uppercase">
                Independence Day Special
              </span>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-base sm:text-lg md:text-xl font-bold leading-tight">
                Code for the Nation
              </h2>
              <p className="text-xs sm:text-sm opacity-90 hidden sm:block">
                Build skills that empower India. Join our hands-on programs and ship impactful projects.
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button asChild size="sm" variant="secondary">
                <Link to="/#programs-section" aria-label="Explore programs">
                  <Code2 className="h-4 w-4 mr-2" /> Explore Programs
                </Link>
              </Button>
              <Button size="icon" variant="outline" aria-label="Dismiss banner" onClick={dismiss}>
                ✕
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};
