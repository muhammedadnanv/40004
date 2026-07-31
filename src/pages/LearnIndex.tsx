import { Link } from "react-router-dom";
import { MainNav } from "@/components/MainNav";
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { SEO } from "@/components/SEO";
import { absoluteUrl, breadcrumbSchema } from "@/config/seo";
import { landingCategories, landingPages } from "@/data/landingPages";

const LearnIndex = () => {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dev Mentor Hub program library",
    numberOfItems: landingPages.length,
    itemListElement: landingPages.map((page, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: page.topic,
      url: absoluteUrl(page.path),
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`${landingPages.length} Mentor-Led Developer Programs | Dev Mentor Hub`}
        description={`Browse ${landingPages.length} mentor-led programs across frontend, backend, full stack, AI, mobile and career tracks. 5-week programs from ₹699, 10-week from ₹2,999.`}
        path="/learn"
        keywords="developer courses india, coding mentorship programs, web development training"
        schema={[
          itemListSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Programs", path: "/learn" },
          ]),
        ]}
      />
      <MainNav />

      <main id="main" className="flex-1 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-black uppercase leading-tight sm:text-5xl">
            {landingPages.length} mentor-led developer programs
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Every track is 1-on-1 mentored, project-based and certified. 5-week programs are ₹699;
            10-week programs are ₹2,999.
          </p>

          {landingCategories.map((category) => {
            const pages = landingPages.filter((page) => page.category === category);
            return (
              <section key={category} aria-labelledby={`cat-${category}`} className="mt-12">
                <h2 id={`cat-${category}`} className="text-2xl font-black uppercase">
                  {category} <span className="text-muted-foreground">({pages.length})</span>
                </h2>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {pages.map((page) => (
                    <li key={page.slug}>
                      <Link
                        to={page.path}
                        className="flex h-full min-h-[132px] flex-col justify-between border-2 border-foreground p-5 transition-transform hover:-translate-y-1"
                      >
                        <h3 className="text-lg font-black">{page.topic}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{page.hook}</p>
                        <p className="mt-3 text-sm font-bold">
                          {page.duration} · ₹{page.price.toLocaleString("en-IN")}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>

      <SocialMediaFooter />
    </div>
  );
};

export default LearnIndex;
