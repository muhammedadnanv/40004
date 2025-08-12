
import React from 'react';
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { MainNav } from "@/components/MainNav";
import { Helmet } from "react-helmet";

const Terms = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white">
      <Helmet>
        <title>Terms of Service | Dev Mentor Hub</title>
        <meta name="description" content="Review Dev Mentor Hub's Terms of Service for programs and platform usage." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + "/terms" : "https://devmentorhub.com/terms"} />
      </Helmet>
      
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485827404703-89b55fcc595e')] bg-cover bg-center opacity-5 pointer-events-none" />
      
      <MainNav />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-8">Terms of Service</h1>
          
          <div className="prose prose-purple max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">Introduction</h2>
              <p>Welcome to ComicFix. These Terms of Service ("Terms") govern your access to and use of our mentorship platform, certification programs, and related services. Please read these Terms carefully before using our services.</p>
              <p>By accessing or using our services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use our services.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">Using Our Services</h2>
              <h3 className="text-xl font-medium text-purple-600 mt-4">Account Registration</h3>
              <p>To access certain features of our platform, you may need to register for an account. When registering, you must provide accurate and complete information and keep this information updated. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
              
              <h3 className="text-xl font-medium text-purple-600 mt-4">Mentorship Programs</h3>
              <p>Our platform offers mentorship programs in various fields of development and design. These programs involve mentor-mentee relationships, project-based learning, and certification opportunities. By enrolling in our programs, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Participate actively and engage professionally with mentors and other platform users</li>
                <li>Submit original work for feedback and evaluation</li>
                <li>Comply with program-specific requirements and deadlines</li>
                <li>Maintain respectful communication in all platform interactions</li>
              </ul>
              
              <h3 className="text-xl font-medium text-purple-600 mt-4">Payment Terms</h3>
              <p>Certain programs and features require payment. By enrolling in a paid program, you agree to pay all fees in accordance with the pricing and terms displayed at the time of enrollment. Payments are processed through third-party payment processors subject to their terms of service.</p>
              <p>Unless otherwise stated, payments are non-refundable. Specific refund policies for individual programs will be provided at the time of enrollment.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">User Content</h2>
              <p>Our platform allows users to post, upload, or submit content, including but not limited to project work, comments, feedback, and profile information ("User Content").</p>
              <p>You retain ownership of your User Content, but you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute your User Content in connection with providing our services.</p>
              <p>You are solely responsible for your User Content and represent that you have all necessary rights to post such content. You agree not to post content that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violates any law or infringes any third-party rights</li>
                <li>Is false, misleading, defamatory, obscene, or offensive</li>
                <li>Contains malicious code or attempts to interfere with our platform</li>
                <li>Constitutes unsolicited commercial communications</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">Intellectual Property</h2>
              <p>Our platform, including its content, features, and functionality, is owned by ComicFix and is protected by copyright, trademark, and other intellectual property laws.</p>
              <p>Our mentorship materials, certification programs, and platform content are for personal, non-commercial use only. You may not modify, reproduce, distribute, create derivative works, publicly display, or perform our content without our explicit permission.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">Code of Conduct</h2>
              <p>Users of our platform must adhere to our Code of Conduct, which promotes a respectful, inclusive, and productive learning environment. Violations of this Code may result in warning, suspension, or termination of your account.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">Disclaimers</h2>
              <p>Our services are provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the reliability, accuracy, or availability of our platform.</p>
              <p>While we strive to provide high-quality mentorship and certification programs, we do not guarantee specific career outcomes or job placements as a result of participating in our programs.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, ComicFix and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">Changes to Terms</h2>
              <p>We may modify these Terms from time to time. We will notify users of material changes by posting the updated Terms on our platform. Your continued use of our services after such changes indicates your acceptance of the modified Terms.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">Termination</h2>
              <p>We may terminate or suspend your account and access to our services at our sole discretion, without prior notice, for violations of these Terms or for any other reason.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-purple-700">Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <p>Email: support@comicfix.com</p>
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

export default Terms;
