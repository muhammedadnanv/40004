import { Button } from "@/components/ui/button";
import { BookOpen, Upload, Sparkles, ArrowUpRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { CVUploadDialog } from "./CVUploadDialog";

export const HeroSection = () => {
  const [showCVDialog, setShowCVDialog] = useState(false);

  const scrollToPrograms = () => {
    const programsSection = document.getElementById('programs-section');
    if (programsSection) {
      const yOffset = -60;
      const y = programsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-[88vh] grain-overlay bg-background border-b-2 border-foreground overflow-hidden"
      id="hero-section"
      aria-labelledby="hero-heading"
    >
      {/* Decorative coral stripe */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 h-full w-[42%] bg-accent hidden lg:block"
        style={{ clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0% 100%)" }}
      />
      {/* Floating brutalist stickers */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, rotate: -15, y: -10 }}
        animate={{ opacity: 1, rotate: -8, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
        className="absolute top-24 right-6 lg:right-[10%] z-10 hidden sm:flex items-center gap-2 bg-background border-2 border-foreground px-3 py-1.5 shadow-brutal-sm"
      >
        <Star className="w-4 h-4 fill-accent text-foreground" />
        <span className="font-display uppercase text-xs tracking-widest">Now Hiring Mentors</span>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, rotate: 12 }}
        animate={{ opacity: 1, rotate: 6 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 120 }}
        className="absolute bottom-16 left-6 lg:left-[8%] z-10 hidden sm:block bg-secondary text-secondary-foreground border-2 border-foreground px-3 py-1.5 shadow-brutal-sm font-display uppercase text-xs tracking-widest"
      >
        v2.0 / Gen-Z Edition
      </motion.div>

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: editorial copy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="brutal-sticker"
            >
              <Sparkles className="w-3 h-3" />
              Issue 001 — Build / Ship / Repeat
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display uppercase leading-[0.88] tracking-tight text-foreground"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
            >
              Mentor
              <span className="block">
                <span className="deconstructed-underline">driven</span>{" "}
                <span className="italic text-accent" style={{ fontFamily: '"Archivo Black", serif' }}>
                  careers.
                </span>
              </span>
              <span className="block text-secondary -mt-2">
                Built loud.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-xl text-base sm:text-lg text-foreground/80 font-medium leading-relaxed"
            >
              The world's first AI-enhanced platform pairing students with industry
              mentors on absurdly real projects. No fluff. No filler. Just shipped work.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Button
                onClick={scrollToPrograms}
                className="group bg-foreground text-background hover:bg-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform border-2 border-foreground rounded-none shadow-brutal-coral font-display uppercase tracking-widest text-sm px-6 py-6"
                aria-label="Explore our mentorship programs"
              >
                <BookOpen className="w-5 h-5 mr-2" aria-hidden="true" />
                Explore Programs
                <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>

              <Button
                onClick={() => setShowCVDialog(true)}
                variant="outline"
                className="group bg-background text-foreground hover:bg-accent hover:text-accent-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform border-2 border-foreground rounded-none shadow-brutal-sm font-display uppercase tracking-widest text-sm px-6 py-6"
                aria-label="Upload your CV for job placement support"
              >
                <Upload className="w-5 h-5 mr-2" aria-hidden="true" />
                Drop Your CV
              </Button>
            </motion.div>

            {/* Stat strip */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 max-w-lg border-2 border-foreground bg-background shadow-brutal-sm divide-x-2 divide-foreground"
            >
              {[
                { v: "2.5K+", l: "Builders" },
                { v: "180+", l: "Mentors" },
                { v: "94%", l: "Placed" },
              ].map((s) => (
                <div key={s.l} className="px-4 py-3 text-center">
                  <dt className="font-display text-2xl sm:text-3xl">{s.v}</dt>
                  <dd className="text-[10px] uppercase tracking-widest text-foreground/70">{s.l}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Right: deconstructed visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative brutal-card p-6 sm:p-8 bg-background">
              <div className="flex items-center justify-between mb-4">
                <span className="brutal-tag">// LIVE</span>
                <span className="font-mono text-xs text-foreground/60">~/dmh/mentor.sh</span>
              </div>
              <pre className="font-mono text-xs sm:text-sm leading-relaxed bg-foreground text-background p-4 border-2 border-foreground overflow-x-auto">
{`> match --student "you"
  --goal "ship real product"

✓ mentor   : senior eng @ stripe
✓ project  : ai code reviewer
✓ stack    : ts · react · supabase
✓ timeline : 8 weeks → portfolio

$ npm run launch-career_`}
              </pre>
              <div className="mt-4 flex flex-wrap gap-2">
                {["React", "AI", "Supabase", "No-Code", "FullStack"].map((t, i) => (
                  <span
                    key={t}
                    className="brutal-tag"
                    style={{ transform: `rotate(${(i % 2 ? 1 : -1) * (i + 1)}deg)` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {/* Layered offset card behind */}
            <div
              aria-hidden="true"
              className="absolute -z-10 inset-0 translate-x-3 translate-y-3 bg-secondary border-2 border-foreground"
            />
          </motion.div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative z-20 bg-foreground text-background border-t-2 border-foreground overflow-hidden">
        <div className="flex gap-8 py-2.5 animate-[marquee_30s_linear_infinite] whitespace-nowrap font-display uppercase tracking-widest text-sm">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-8 shrink-0">
              {["Ship Real Projects", "★", "Mentor-Matched", "★", "AI-Enhanced", "★", "Portfolio-First", "★", "Career-Ready", "★"].map((t, j) => (
                <span key={`${i}-${j}`} className={t === "★" ? "text-accent" : ""}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <CVUploadDialog isOpen={showCVDialog} onClose={() => setShowCVDialog(false)} />

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};
