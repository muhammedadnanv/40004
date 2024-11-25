import { Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export const ReviewSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-purple-50/50" />
      
      <div className="container mx-auto max-w-4xl px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8 glass-effect p-12 rounded-2xl shadow-glow"
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-xl">
              <Star className="w-10 h-10 text-white" fill="currentColor" />
            </div>
          </div>

          <h2 className="text-4xl font-display font-bold premium-gradient">
            Share Your Experience
          </h2>
          
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-8 h-8 text-yellow-400 hover-scale"
                fill="currentColor"
              />
            ))}
          </div>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your feedback helps us improve and helps others discover our community. 
            Share your experience with Dev Mentor Hub!
          </p>
          
          <div className="mt-8">
            <Button
              onClick={() => window.open("https://g.page/r/CSAGjsf1TQ1uEBM/review", "_blank")}
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg group"
            >
              Write a Review
              <ExternalLink className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};