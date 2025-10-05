import { useState } from 'react';
import { Mail, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const EmailWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    try {
      // Send via mailto for now - can be enhanced with email service later
      window.location.href = `mailto:comicfixxx@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`;
      
      toast({
        title: "Email client opened",
        description: "Your default email client has been opened with the message.",
      });
      
      setIsOpen(false);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open email client. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 w-[60px] h-[60px] bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 z-[1000] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Send Email"
      >
        <Mail className="w-7 h-7 text-primary-foreground" />
      </button>

      {/* Email Popup */}
      {isOpen && (
        <div
          className="fixed bottom-[90px] right-5 w-[400px] max-w-[90vw] bg-background rounded-xl shadow-xl z-[999] border border-border overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
          role="dialog"
          aria-labelledby="email-title"
        >
          {/* Header */}
          <div className="bg-muted/50 px-4 py-3 flex justify-between items-center border-b border-border">
            <h3 id="email-title" className="text-sm font-semibold text-foreground">
              Send Email
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close email"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5">
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full"
              />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows={4}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-vertical"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Sending...' : 'Send Email'}
              </Button>
            </form>
          </div>

          {/* Watermark */}
          <div className="bg-muted/30 border-t border-border py-2 px-3 text-center">
            <a
              href="https://widgetify-two.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Powered by Widgetify
            </a>
          </div>
        </div>
      )}
    </>
  );
};
