import { motion } from "framer-motion";
import { Users, BookOpen, Trophy, Lightbulb, Target, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const PlatformExplanation = () => {
  const benefits = [
    {
      icon: Users,
      title: "Personalized Mentorship",
      description: "Connect with industry experts who provide 1-on-1 guidance tailored to your learning style and career goals."
    },
    {
      icon: BookOpen,
      title: "Project-Based Learning", 
      description: "Learn by building real-world projects that solve actual problems and build your professional portfolio."
    },
    {
      icon: Trophy,
      title: "Industry Recognition",
      description: "Earn certificates and build a portfolio that employers value, with projects that showcase your skills."
    },
    {
      icon: Lightbulb,
      title: "Innovation Focus",
      description: "Work on cutting-edge technologies and innovative solutions that prepare you for the future of tech."
    },
    {
      icon: Target,
      title: "Career Acceleration",
      description: "Fast-track your career with structured learning paths designed by industry professionals."
    },
    {
      icon: Heart,
      title: "Community Support",
      description: "Join a vibrant community of learners and mentors who support each other's growth and success."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50/30" id="about-platform">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            What Makes Dev Mentor Hub Different?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're not just another online learning platform. We're a revolutionary ecosystem that bridges the gap between 
            theoretical knowledge and real-world application through personalized mentorship and innovative project development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg mr-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
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
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border-0"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Why Dev Mentor Hub Exists
              </h3>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-primary">The Problem:</strong> Traditional education often leaves a gap between 
                  classroom learning and industry requirements. Students struggle to apply theoretical knowledge to real-world scenarios.
                </p>
                <p>
                  <strong className="text-primary">Our Solution:</strong> We connect passionate learners with experienced mentors 
                  who guide them through hands-on, innovative projects that mirror real industry challenges.
                </p>
                <p>
                  <strong className="text-primary">The Result:</strong> Students graduate with not just knowledge, but practical 
                  experience, a strong portfolio, and the confidence to excel in their careers.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/5 to-purple-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">For Students</h4>
                <p className="text-gray-700">
                  Get personalized mentorship, work on cutting-edge projects, and build a portfolio that stands out to employers.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-primary/5 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">For Mentors</h4>
                <p className="text-gray-700">
                  Share your expertise, shape the next generation of developers, and contribute to innovative projects while earning additional income.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">For Industry</h4>
                <p className="text-gray-700">
                  Access a pipeline of job-ready talent with proven project experience and problem-solving skills.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};