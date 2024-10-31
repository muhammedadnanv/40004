import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      company: "Tech Corp",
      content: "The mentorship program helped me land my dream job. The practical experience was invaluable.",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Full Stack Developer",
      company: "StartUp Inc",
      content: "Best investment in my career. The mentors are extremely knowledgeable and supportive.",
      avatar: "MC"
    },
    {
      name: "Priya Patel",
      role: "Backend Developer",
      company: "Global Systems",
      content: "The certification helped me stand out in job interviews. Highly recommended!",
      avatar: "PP"
    }
  ];

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-white">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};