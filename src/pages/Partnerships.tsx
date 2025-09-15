import { PartnershipsSection } from "@/components/PartnershipsSection";
import { MainNav } from "@/components/MainNav";
import { CategoryTopper } from "@/components/CategoryTopper";
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { Helmet } from "react-helmet";

const Partnerships = () => {
  return (
    <>
      <Helmet>
        <title>Partnerships - Dev Mentor Hub</title>
        <meta name="description" content="Partner with Dev Mentor Hub to expand your reach and grow together. Join our network of industry professionals and educational institutions." />
        <meta name="keywords" content="partnerships, collaboration, business partnerships, educational partnerships, dev mentor hub partners" />
        <meta property="og:title" content="Partnerships - Dev Mentor Hub" />
        <meta property="og:description" content="Partner with Dev Mentor Hub to expand your reach and grow together. Join our network of industry professionals and educational institutions." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://devmentorhub.com/partnerships" />
      </Helmet>
      
      <div className="min-h-screen">
        <header>
          <MainNav />
          <CategoryTopper />
        </header>
        
        <main>
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
        
        <footer>
          <SocialMediaFooter />
        </footer>
      </div>
    </>
  );
};

export default Partnerships;