import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Start Your Developer Journey Today
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Get mentored by industry experts and earn a certification for just ₹49
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Enroll Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              View Programs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};