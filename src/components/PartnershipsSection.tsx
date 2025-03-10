
import { motion } from "framer-motion";
import { Award, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { PartnershipForm } from "./PartnershipForm";

export const PartnershipsSection = () => {
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);

  const partners = [
    { name: "ComicFix", description: "Leading tech community focused on developer growth" },
    { name: "Community Developer Community", description: "Global network of developers and mentors" },
    { name: "Dev Connect", description: "Professional development and networking platform" },
    { name: "Dev2 Developers Community", description: "Innovative learning and certification provider" },
    { name: "Bugver Developer", description: "Expert community specializing in software quality and debugging" },
    { 
      name: "ManyChat Community", 
      description: "Official ManyChat community for chatbot developers and automation experts",
      link: "https://community.manychat.com/"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-white via-purple-50 to-white relative">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extralight mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
            Our Partner Communities
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            This program is conducted in collaboration with leading tech communities. Upon completion, you'll receive valuable certificates from these respected organizations.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card 
                className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => {
                  if (partner.link) {
                    window.open(partner.link, '_blank');
                  } else {
                    setSelectedPartner(partner.name);
                  }
                }}
              >
                <CardHeader className="space-y-1 p-3 sm:p-4">
                  <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="text-sm sm:text-base md:text-lg font-medium">{partner.name}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{partner.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
                  <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-purple-600">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Certificate Provider</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <PartnershipForm 
        isOpen={!!selectedPartner}
        onClose={() => setSelectedPartner(null)}
        partnerName={selectedPartner || ""}
      />
    </section>
  );
};
