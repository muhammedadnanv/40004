import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export const WhatsAppSection = () => {
  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="space-y-2 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#4A00E0]" />
              <CardTitle className="text-base sm:text-xl md:text-2xl">Join Our Community</CardTitle>
            </div>
            <CardDescription className="text-sm sm:text-base md:text-lg mt-2">
              Connect with fellow developers and mentors in our WhatsApp group
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-sm sm:text-base md:text-lg">How to Join:</h3>
              <ol className="list-decimal pl-4 sm:pl-6 space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base">
                <li>Click the join button below to access our WhatsApp group</li>
                <li>Once in the group, introduce yourself with:
                  <ul className="list-disc pl-4 sm:pl-6 mt-1 sm:mt-2">
                    <li>Your name</li>
                    <li>Which program you enrolled in</li>
                    <li>Your development goals</li>
                  </ul>
                </li>
                <li>Share your payment confirmation screenshot</li>
                <li>Start engaging with the community!</li>
              </ol>
            </div>
            <div className="flex justify-center pt-2 sm:pt-4">
              <Button 
                className="bg-[#25D366] hover:bg-[#25D366]/90 gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base py-1.5 sm:py-2 md:py-3 px-3 sm:px-4"
                onClick={() => window.open("https://chat.whatsapp.com/COaTqrI651TKlYTPrHOYDn", "_blank")}
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                Join WhatsApp Group
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};