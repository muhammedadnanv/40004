import { PartnershipsSection } from "@/components/PartnershipsSection";
import { MainNav } from "@/components/MainNav";
import { CategoryTopper } from "@/components/CategoryTopper";
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { Helmet } from "react-helmet";
import { Home, ChevronRight, Handshake } from "lucide-react";

const Partnerships = () => {
  const pageUrl = "https://devmentorhub.com/partnerships";
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Partnership Opportunities",
    "description": "Join Dev Mentor Hub's network of industry partners, educational institutions, and technology collaborators",
    "url": pageUrl,
    "mainEntity": {
      "@type": "Organization",
      "name": "Dev Mentor Hub Partnership Program",
      "description": "Collaborative partnership opportunities for educational institutions, technology companies, and industry professionals"
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
        "name": "Partnerships",
        "item": pageUrl
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Partnership Opportunities | Collaborate & Grow Together | Dev Mentor Hub</title>
        <meta name="description" content="Partner with Dev Mentor Hub to expand your reach and grow together. Join our network of industry professionals, educational institutions, and tech companies. Strategic partnerships for mutual success." />
        <meta name="keywords" content="partnerships, strategic partnerships, collaboration, business partnerships, educational partnerships, tech partnerships, dev mentor hub partners, B2B partnerships, affiliate program, educational collaboration, industry partnerships" />
        <meta property="og:title" content="Partnership Opportunities | Dev Mentor Hub" />
        <meta property="og:description" content="Join our network of industry professionals and educational institutions. Collaborative partnerships for mutual growth and success." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content="https://devmentorhub.com/og-partnerships.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Partnership Opportunities | Dev Mentor Hub" />
        <meta name="twitter:description" content="Join our network of partners and grow together" />
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
                <Handshake className="w-4 h-4" />
                <span className="text-primary font-medium" aria-current="page">Partnerships</span>
              </li>
            </ol>
          </nav>
          
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold mb-4 text-primary">Partnership Opportunities</h1>
              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Join our network of industry professionals, educational institutions, and technology partners. 
                Together, we can create better learning experiences and career opportunities for developers.
              </p>
            </div>
          </section>
          
          <PartnershipsSection />
        </main>
        
        <footer role="contentinfo">
          <SocialMediaFooter />
        </footer>
      </div>
    </>
  );
};

export default Partnerships;