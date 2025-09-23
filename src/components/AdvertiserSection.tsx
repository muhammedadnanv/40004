import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Users, Megaphone, TrendingUp } from "lucide-react";

const advertiserSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  collegeCommunityName: z.string().min(2, "College/Community name is required"),
  emailId: z.string().email("Invalid email address"),
});

type AdvertiserFormData = z.infer<typeof advertiserSchema>;

// Send advertiser data via WhatsApp
const sendAdvertiserDataViaWhatsApp = (data: AdvertiserFormData) => {
  const message = `🎯 *NEW ADVERTISER APPLICATION* 🎯%0A%0A` +
                 `👤 *Full Name:* ${data.fullName}%0A` +
                 `📱 *Phone Number:* ${data.phoneNumber}%0A` +
                 `🏛️ *College/Community:* ${data.collegeCommunityName}%0A` +
                 `📧 *Email ID:* ${data.emailId}%0A` +
                 `⏰ *Applied At:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}%0A%0A` +
                 `Please follow up with the advertiser for further assistance. 📞`;
  
  const whatsappUrl = `https://wa.me/919656778508?text=${message}`;
  window.open(whatsappUrl, '_blank');
};

export const AdvertiserSection = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AdvertiserFormData>({
    resolver: zodResolver(advertiserSchema),
  });

  const onSubmit = async (data: AdvertiserFormData) => {
    try {
      console.log("Advertiser form data:", data);
      
      // Send data via WhatsApp
      sendAdvertiserDataViaWhatsApp(data);
      
      toast({
        title: "Application Submitted! 🎉",
        description: "Your advertiser application has been sent to our team. We'll contact you soon!",
        duration: 5000,
      });
      
      // Reset form
      reset();
    } catch (error) {
      console.error("Error submitting advertiser form:", error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Become a College/Community Advertiser
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Partner with Dev Mentor Hub to promote our cutting-edge programs in your college or community. 
            Earn attractive commissions while helping students transform their tech careers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Benefits Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Why Become an Advertiser?</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Attractive Commission Structure</h4>
                  <p className="text-muted-foreground">Earn competitive commissions for every successful enrollment through your referrals.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Help Your Community</h4>
                  <p className="text-muted-foreground">Empower students in your network with world-class tech education and mentorship.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Megaphone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Marketing Support</h4>
                  <p className="text-muted-foreground">Get access to marketing materials, promotional content, and dedicated support.</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-primary mb-2">Commission Highlights</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Up to 15% commission on successful enrollments
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Monthly performance bonuses
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Fast payment processing within 7 days
                </li>
              </ul>
            </div>
          </div>

          {/* Application Form */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Apply Now</CardTitle>
              <CardDescription>
                Fill out the form below and our team will contact you within 24 hours to discuss partnership opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    {...register("fullName")}
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    {...register("phoneNumber")}
                    className={errors.phoneNumber ? "border-destructive" : ""}
                  />
                  {errors.phoneNumber && (
                    <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collegeCommunityName">College/Community Name *</Label>
                  <Input
                    id="collegeCommunityName"
                    placeholder="Enter college/community name or custom link"
                    {...register("collegeCommunityName")}
                    className={errors.collegeCommunityName ? "border-destructive" : ""}
                  />
                  {errors.collegeCommunityName && (
                    <p className="text-sm text-destructive">{errors.collegeCommunityName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emailId">Email ID *</Label>
                  <Input
                    id="emailId"
                    type="email"
                    placeholder="Enter your email address"
                    {...register("emailId")}
                    className={errors.emailId ? "border-destructive" : ""}
                  />
                  {errors.emailId && (
                    <p className="text-sm text-destructive">{errors.emailId.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  Submit Application
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our terms and conditions for partnership programs.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};