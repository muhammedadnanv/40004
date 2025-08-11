import { Helmet } from "react-helmet";
import { MainNav } from "@/components/MainNav";
import { CategoryTopper } from "@/components/CategoryTopper";
import { CertificationSection } from "@/components/CertificationSection";
import { SocialMediaFooter } from "@/components/SocialMediaFooter";

const Certification = () => {
  const pageUrl = typeof window !== 'undefined' ? window.location.origin + "/certification" : "https://devmentorhub.com/certification";

  return (
    <>
      <Helmet>
        <title>Certification | Dev Mentor Hub</title>
        <meta name="description" content="Generate and download your Dev Mentor Hub completion certificate. Personalized, verifiable, and shareable." />
        <link rel="canonical" href={pageUrl} />
      </Helmet>

      <div className="min-h-screen">
        <header>
          <MainNav />
          <CategoryTopper />
        </header>
        <main>
          <section className="responsive-padding">
            <h1 className="responsive-heading mb-4">Certification</h1>
            <p className="text-fluid-lg opacity-80 mb-6">Create your personalized certificate and download it instantly.</p>
          </section>
          <CertificationSection />
        </main>
        <footer>
          <SocialMediaFooter />
        </footer>
      </div>
    </>
  );
};

export default Certification;
