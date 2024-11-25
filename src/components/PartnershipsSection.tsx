import { motion } from "framer-motion";
import { Award, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const PartnershipsSection = () => {
  const partners = [
    { name: "ComicFix", description: "Leading tech community focused on developer growth" },
    { name: "Community Developer Community", description: "Global network of developers and mentors" },
    { name: "Dev Connect", description: "Professional development and networking platform" },
    { name: "Dev2 Developers Community", description: "Innovative learning and certification provider" },
    { name: "Bugver Developer", description: "Expert community specializing in software quality and debugging" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-purple-50 to-white relative">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-extralight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
            Our Partner Communities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This program is conducted in collaboration with leading tech communities. Upon completion, you'll receive valuable certificates from these respected organizations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="space-y-1">
                  <Building2 className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="text-lg font-medium">{partner.name}</CardTitle>
                  <CardDescription>{partner.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-purple-600">
                    <Award className="w-4 h-4" />
                    <span>Certificate Provider</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
