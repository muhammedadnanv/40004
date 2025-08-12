
import React from 'react';
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { MainNav } from "@/components/MainNav";
import { Helmet } from "react-helmet";

const Privacy = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white">
      <Helmet>
        <title>Privacy Policy | Dev Mentor Hub</title>
        <meta name="description" content="Read Dev Mentor Hub's Privacy Policy covering data collection, usage, and your rights." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + "/privacy" : "https://devmentorhub.com/privacy"} />
      </Helmet>
      
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485827404703-89b55fcc595e')] bg-cover bg-center opacity-5 pointer-events-none" />
      
      <MainNav />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-purple max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">Introduction</h2>
              <p>This Privacy Policy describes how Dev Mentor Hub ("we," "our," or "us") collects, uses, and shares your personal information in connection with our mentorship platform, certification programs, and related services.</p>
              <p>By accessing or using our services, you agree to this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">Information We Collect</h2>
              <p>We collect several types of information from and about users of our services, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and professional background when you register for our programs.</li>
                <li><strong>Profile Information:</strong> Skills, experience, projects, and educational background provided for mentorship matching.</li>
                <li><strong>Payment Information:</strong> Credit card details or other payment details when you enroll in paid programs (processed securely via third-party payment processors).</li>
                <li><strong>Communication Data:</strong> Messages between mentors and mentees, feedback, and program participation details.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies when you visit our website.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">How We Use Your Information</h2>
              <p>We use the information we collect for various purposes, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing and improving our mentorship services and certification programs</li>
                <li>Matching mentees with appropriate mentors based on skills and goals</li>
                <li>Processing payments for program enrollment</li>
                <li>Communicating with you about your account, programs, or services</li>
                <li>Providing technical support and addressing inquiries</li>
                <li>Sending promotional materials and updates (with opt-out options)</li>
                <li>Analyzing usage patterns to improve our platform and services</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">Information Sharing</h2>
              <p>We may share your information in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Between Mentors and Mentees:</strong> Information necessary for the mentorship relationship.</li>
                <li><strong>Service Providers:</strong> Third parties that help us operate our business (payment processors, cloud services, etc.).</li>
                <li><strong>Legal Requirements:</strong> When required by applicable law, court order, or governmental regulations.</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
              </ul>
              <p>We do not sell your personal information to third parties.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">Your Rights and Choices</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Accessing, correcting, or deleting your personal information</li>
                <li>Objecting to or restricting certain processing activities</li>
                <li>Withdrawing consent for optional data processing</li>
                <li>Requesting portability of your information</li>
              </ul>
              <p>To exercise these rights, please contact us at support@devmentorhub.com.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">Data Security</h2>
              <p>We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">Children's Privacy</h2>
              <p>Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">Changes to This Privacy Policy</h2>
              <p>We may update our Privacy Policy from time to time. Any changes will be posted on this page, and we will notify you of material changes as required by law.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p>Email: support@devmentorhub.com</p>
              <p>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </section>
          </div>
        </div>
      </div>
      
      <footer>
        <SocialMediaFooter />
      </footer>
    </main>
  );
};

export default Privacy;
