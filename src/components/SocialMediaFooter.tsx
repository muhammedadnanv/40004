import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export const SocialMediaFooter = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { to: "/programs", label: "Programs" },
    { to: "/certification", label: "Certification" },
    { to: "/partnerships", label: "Partnerships" },
    { to: "/gallery", label: "Project Gallery" },
  ];
  
  const resourceLinks = [
    { to: "/professional-development", label: "Career Tools" },
    { to: "/code-playground", label: "Code Playground" },
    { to: "/content-summarizer", label: "Content Summarizer" },
    { to: "/install", label: "Install App" },
  ];
  
  const socialLinks = [
    { href: "https://twitter.com/devmentorhub", icon: Twitter, label: "Twitter" },
    { href: "https://linkedin.com/company/devmentorhub", icon: Linkedin, label: "LinkedIn" },
    { href: "https://instagram.com/devmentorhub", icon: Instagram, label: "Instagram" },
    { href: "https://youtube.com/@devmentorhub", icon: Youtube, label: "YouTube" },
  ];
  
  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4" aria-label="Dev Mentor Hub Home">
              <span className="font-bold text-xl text-white">Dev Mentor Hub</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
              Transform your tech career with expert mentorship, hands-on projects, and industry-recognized certifications.
            </p>
            {/* Social Links */}
            <nav aria-label="Social media links">
              <ul className="flex gap-3">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors touch-manipulation"
                      aria-label={`Follow us on ${social.label}`}
                    >
                      <social.icon className="w-5 h-5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-primary-foreground/80 hover:text-white transition-colors touch-manipulation"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Resources */}
          <nav aria-label="Resources">
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-primary-foreground/80 hover:text-white transition-colors touch-manipulation"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Contact Info */}
          <address className="not-italic">
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:hello@devmentorhub.com" className="hover:text-white transition-colors">
                  hello@devmentorhub.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+919656778508" className="hover:text-white transition-colors">
                  +91 96567 78508
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Kerala, India</span>
              </li>
            </ul>
          </address>
        </div>
        
        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/70">
            <p>© {currentYear} Dev Mentor Hub. All rights reserved.</p>
            <nav aria-label="Legal links">
              <ul className="flex items-center gap-4 sm:gap-6">
                <li>
                  <Link to="/privacy" className="hover:text-white transition-colors touch-manipulation">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white transition-colors touch-manipulation">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
