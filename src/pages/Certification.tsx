import { Helmet } from "react-helmet-async";
import { MainNav } from "@/components/MainNav";
import { CategoryTopper } from "@/components/CategoryTopper";
import { CertificationSection } from "@/components/CertificationSection";
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { Home, ChevronRight, Award } from "lucide-react";

const Certification = () => {
  const pageUrl = "https://devmentorhub.com/certification";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Professional Developer Certification",
    "description": "Earn your industry-recognized Professional Developer Certification with Dev Mentor Hub",
    "url": pageUrl,
    "mainEntity": {
      "@type": "EducationalOccupationalCredential",
      "name": "Professional Developer Certificate",
      "description": "Industry-recognized certification for professional software developers",
      "credentialCategory": "Certificate",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Dev Mentor Hub"
      },
      "competencyRequired": [
        "Software Development",
        "Code Review",
        "Project Management",
        "Technical Problem Solving"
      ]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://devmentorhub.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Certification",
        "item": pageUrl
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Professional Developer Certification | Earn Your Industry-Recognized Certificate | Dev Mentor Hub</title>
        <meta name="description" content="Generate and download your industry-recognized Professional Developer Certification. Personalized, verifiable, and shareable certificates for completed programs. Boost your career with certified credentials." />
        <meta name="keywords" content="developer certification, professional developer certificate, programming certificate, coding certification, software development certificate, tech certification, IT certification, career certification, verifiable certificate, digital certificate" />
        <meta property="og:title" content="Professional Developer Certification | Dev Mentor Hub" />
        <meta property="og:description" content="Earn your industry-recognized Professional Developer Certification. Download personalized, verifiable certificates." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content="https://devmentorhub.com/og-certification.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Professional Developer Certification | Dev Mentor Hub" />
        <meta name="twitter:description" content="Generate and download your industry-recognized certification" />
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <header role="banner">
          <MainNav />
          <CategoryTopper />
        </header>
        <main role="main">
          <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-4">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <a href="/" className="hover:text-primary transition-colors">Home</a>
              </li>
              <ChevronRight className="w-4 h-4" />
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span className="text-primary font-medium" aria-current="page">Certification</span>
              </li>
            </ol>
          </nav>
          
          <section className="responsive-padding">
            <h1 className="responsive-heading mb-4">Professional Developer Certification</h1>
            <p className="text-fluid-lg opacity-80 mb-6">Create your personalized, industry-recognized certificate and download it instantly. Verified and shareable credentials for your professional portfolio.</p>
          </section>
          <CertificationSection />
        </main>
        <footer role="contentinfo">
          <SocialMediaFooter />
        </footer>
      </div>
    </>
  );
};

export default Certification;
