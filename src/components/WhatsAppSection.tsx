import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users } from "lucide-react";
import { motion } from "framer-motion";

export const WhatsAppSection = () => {
  return (
    <section className="py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 px-3 sm:px-4 md:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="max-w-2xl mx-auto transform transition-all duration-300 hover:shadow-lg">
            <CardHeader className="space-y-1.5 sm:space-y-2 p-3 sm:p-4 md:p-6">
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-[#4A00E0] animate-pulse" />
                <CardTitle className="text-sm sm:text-base md:text-xl lg:text-2xl">Join Our Community</CardTitle>
              </div>
              <CardDescription className="text-xs sm:text-sm md:text-base lg:text-lg mt-1.5 sm:mt-2">
                Connect with fellow developers and mentors in our WhatsApp group
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6">
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <h3 className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#4A00E0]" />
                  How to Join:
                </h3>
                <ol className="list-decimal pl-3 sm:pl-4 md:pl-6 space-y-1.5 sm:space-y-2 md:space-y-3 text-[11px] sm:text-xs md:text-sm lg:text-base">
                  <li className="transition-all duration-200 hover:text-[#4A00E0]">Click the join button below to access our WhatsApp group</li>
                  <li className="transition-all duration-200 hover:text-[#4A00E0]">Once in the group, introduce yourself with:
                    <ul className="list-disc pl-3 sm:pl-4 md:pl-6 mt-1 sm:mt-1.5 md:mt-2">
                      <li>Your name</li>
                      <li>Which program you enrolled in</li>
                      <li>Your development goals</li>
                    </ul>
                  </li>
                  <li className="transition-all duration-200 hover:text-[#4A00E0]">Share your payment confirmation screenshot</li>
                  <li className="transition-all duration-200 hover:text-[#4A00E0]">Start engaging with the community!</li>
                </ol>
              </div>
              <div className="flex justify-center pt-1.5 sm:pt-2 md:pt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    className="bg-[#25D366] hover:bg-[#25D366]/90 gap-1 sm:gap-1.5 md:gap-2 text-[10px] sm:text-xs md:text-sm lg:text-base py-1 sm:py-1.5 md:py-2 lg:py-3 px-2 sm:px-3 md:px-4 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.open("https://chat.whatsapp.com/COaTqrI651TKlYTPrHOYDn", "_blank")}
                  >
                    <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    Join WhatsApp Group
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};