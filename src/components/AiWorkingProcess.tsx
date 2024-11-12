import { motion } from "framer-motion";
import { Brain, Code, Sparkles, Rocket } from "lucide-react";

export const AiWorkingProcess = () => {
  const steps = [
    {
      icon: Brain,
      title: "Analysis",
      description: "AI analyzes your learning style and goals",
      bgImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      icon: Code,
      title: "Customization",
      description: "Personalizes curriculum and assignments",
      bgImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    {
      icon: Sparkles,
      title: "Optimization",
      description: "Continuously adapts to your progress",
      bgImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
    },
    {
      icon: Rocket,
      title: "Acceleration",
      description: "Accelerates your learning journey",
      bgImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-white pointer-events-none"></div>
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-extralight text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800"
        >
          How Our AI Works <Sparkles className="inline-block w-6 h-6 text-purple-600 animate-pulse" />
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-white rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative p-6 text-center space-y-4">
                <div 
                  className="w-full h-32 mb-4 rounded-lg overflow-hidden"
                  style={{
                    backgroundImage: `url(${step.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="w-full h-full bg-purple-900/10 backdrop-blur-[1px] flex items-center justify-center">
                    <step.icon className="w-12 h-12 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-light text-purple-800">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};