import { motion } from "framer-motion";
import { Brain, Target, Zap, Users, BarChart, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const AIFeaturesSection = () => {
  const aiFeatures = [
    {
      icon: Brain,
      title: "Smart Learning Path",
      description: "AI analyzes your skills and goals to create a personalized roadmap for your tech career journey.",
      badge: "Powered by ChatGPT & Gemini"
    },
    {
      icon: Target,
      title: "Intelligent Mentor Matching",
      description: "Advanced algorithms match you with the perfect mentor based on your learning style and career objectives.",
      badge: "AI-Driven"
    },
    {
      icon: Zap,
      title: "Real-time Code Analysis",
      description: "Get instant feedback on your code with AI-powered analysis that helps you write better, cleaner code.",
      badge: "Instant Feedback"
    },
    {
      icon: Users,
      title: "Adaptive Project Recommendations",
      description: "AI suggests innovative project ideas tailored to your skill level and industry interests.",
      badge: "Personalized"
    },
    {
      icon: BarChart,
      title: "Progress Analytics",
      description: "Track your learning progress with AI-generated insights and performance predictions.",
      badge: "Data-Driven"
    },
    {
      icon: Lightbulb,
      title: "Smart Content Generation",
      description: "AI creates custom learning materials, exercises, and explanations adapted to your learning pace.",
      badge: "Custom Content"
    }
  ];

  const handleExploreAI = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50" id="ai-features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0 px-4 py-2">
              🤖 AI-Powered Learning
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Experience the Future of Education with AI
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our platform leverages cutting-edge AI models including ChatGPT and Gemini to deliver 
            personalized, adaptive learning experiences that evolve with your progress and goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <Badge variant="outline" className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                      {feature.badge}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Experience AI-Enhanced Learning?
            </h3>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Join thousands of students who are accelerating their careers with our AI-powered mentorship platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleExploreAI}
                size="lg" 
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3"
              >
                Explore AI Features
              </Button>
              <div className="flex items-center gap-4 text-sm text-blue-200">
                <span>Powered by:</span>
                <div className="flex gap-3">
                  <Badge variant="outline" className="border-blue-300 text-blue-100">ChatGPT</Badge>
                  <Badge variant="outline" className="border-blue-300 text-blue-100">Gemini AI</Badge>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};