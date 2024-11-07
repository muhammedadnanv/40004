import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export const WhatsAppSection = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-[#4A00E0]" />
              <CardTitle className="text-xl md:text-2xl">Join Our Community</CardTitle>
            </div>
            <CardDescription className="text-base md:text-lg mt-2">
              Connect with fellow developers and mentors in our WhatsApp group
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-base md:text-lg">How to Join:</h3>
              <ol className="list-decimal pl-6 space-y-3 text-sm md:text-base">
                <li>Click the join button below to access our WhatsApp group</li>
                <li>Once in the group, introduce yourself with:
                  <ul className="list-disc pl-6 mt-2">
                    <li>Your name</li>
                    <li>Which program you enrolled in</li>
                    <li>Your development goals</li>
                  </ul>
                </li>
                <li>Share your payment confirmation screenshot</li>
                <li>Start engaging with the community!</li>
              </ol>
            </div>
            <div className="flex justify-center">
              <Button 
                className="bg-[#25D366] hover:bg-[#25D366]/90 gap-2 text-sm md:text-base py-2 md:py-3"
                onClick={() => window.open("https://chat.whatsapp.com/COaTqrI651TKlYTPrHOYDn", "_blank")}
              >
                <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
                Join WhatsApp Group
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};