import { Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

export const SocialMediaFooter = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
    education: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you could send the data to your backend
    console.log("Form submitted:", formData);
    toast({
      title: "Details Saved!",
      description: "You'll be redirected to the resume builder.",
    });
    setShowForm(false);
    window.open('https://www.producthunt.com/products/705762', '_blank');
  };

  return (
    <footer className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl font-light text-gray-800 mb-6">
            Connect With Us
          </h3>
          
          <div className="flex justify-center items-center gap-4 mb-8">
            <a 
              href="https://www.facebook.com/comicfix.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#4A00E0] transition-colors p-1.5 sm:p-2 hover:bg-[#4A00E0]/5 rounded-full"
            >
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/company/comicfix/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#4A00E0] transition-colors p-1.5 sm:p-2 hover:bg-[#4A00E0]/5 rounded-full"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </a>
            <a 
              href="https://twitter.com/comicfix" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#4A00E0] transition-colors p-1.5 sm:p-2 hover:bg-[#4A00E0]/5 rounded-full"
            >
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </a>
          </div>

          {/* Resume Building Call-to-Action */}
          <div className="mb-8 p-6 bg-purple-50 rounded-lg">
            <h4 className="text-lg sm:text-xl font-medium text-purple-800 mb-2">
              Build Your Professional Resume
            </h4>
            <p className="text-sm sm:text-base text-purple-600 mb-4">
              Create an impressive resume that highlights your skills and experience. 
              Try our resume builder featured on Product Hunt!
            </p>
            <Button 
              variant="secondary"
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => setShowForm(true)}
            >
              Start Building Your Resume
            </Button>
          </div>

          {/* Product Hunt iframe */}
          <iframe 
            style={{ border: 'none' }} 
            src="https://cards.producthunt.com/cards/products/705762" 
            width="500" 
            height="405" 
            className="mx-auto mt-6 max-w-full"
            frameBorder="0" 
            scrolling="no" 
            allowFullScreen
          />

          {/* User Details Form Dialog */}
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-purple-800">Enter Your Details</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <Input
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Work Experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Skills (separated by commas)"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    required
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Education Background"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    required
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Continue to Resume Builder
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </footer>
  );
};