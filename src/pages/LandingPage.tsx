import { useParams, Link, Navigate } from "react-router-dom";
import { MainNav } from "@/components/MainNav";
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { SITE_URL, absoluteUrl, breadcrumbSchema } from "@/config/seo";
import { landingPageBySlug, landingPages } from "@/data/landingPages";
import { CheckCircle2, Clock, IndianRupee, Users } from "lucide-react";

const LandingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = landingPageBySlug(slug);

  if (!page) return <Navigate to="/learn" replace />;

  const related = landingPages
    .filter((p) => p.category === page.category && p.slug !== page.slug)
    .slice(0, 4);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: page.topic,
    description: page.description,
    url: absoluteUrl(page.path),
    provider: {
      "@type": "EducationalOrganization",
      name: "Dev Mentor Hub",
      url: SITE_URL,
    },
    educationalLevel: page.weeks === 5 ? "Beginner" : "Intermediate",
    teaches: page.outcomes,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `P${page.weeks}W`,
      offers: {
        "@type": "Offer",
        price: page.price,
        priceCurrency: "INR",
        category: "Paid",
        availability: "https://schema.org/InStock",
        url: absoluteUrl(page.path),
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={page.title}
        description={page.description}
        path={page.path}
        keywords={page.keywords}
        schema={[
          courseSchema,
          faqSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Programs", path: "/learn" },
            { name: page.topic, path: page.path },
          ]),
        ]}
      />
      <MainNav />

      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="border-b-4 border-foreground px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm">
              <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link to="/learn" className="hover:underline">Programs</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-foreground font-semibold">{page.topic}</li>
              </ol>
            </nav>

            <p className="inline-block border-2 border-foreground bg-primary px-3 py-1 text-xs font-black uppercase tracking-wider text-primary-foreground">
              {page.category}
            </p>
            <h1 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight sm:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{page.hook}</p>

            <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="border-2 border-foreground p-4">
                <dt className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground">
                  <Clock className="h-4 w-4" aria-hidden="true" /> Duration
                </dt>
                <dd className="mt-1 text-xl font-black">{page.duration}</dd>
              </div>
              <div className="border-2 border-foreground p-4">
                <dt className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground">
                  <IndianRupee className="h-4 w-4" aria-hidden="true" /> Fee
                </dt>
                <dd className="mt-1 text-xl font-black">₹{page.price.toLocaleString("en-IN")}</dd>
              </div>
              <div className="border-2 border-foreground p-4">
                <dt className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground">
                  <Users className="h-4 w-4" aria-hidden="true" /> Format
                </dt>
                <dd className="mt-1 text-xl font-black">1-on-1 mentorship</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="min-h-[48px] text-base font-black uppercase">
                <Link to="/#enroll">Enroll for ₹{page.price.toLocaleString("en-IN")}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-[48px] text-base font-bold uppercase">
                <Link to="/programs">Compare all programs</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section aria-labelledby="outcomes-heading" className="px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 id="outcomes-heading" className="text-2xl font-black uppercase sm:text-3xl">
              What you walk away with
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {page.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 border-2 border-foreground p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="font-medium">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Curriculum */}
        <section aria-labelledby="curriculum-heading" className="border-y-4 border-foreground bg-muted/40 px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 id="curriculum-heading" className="text-2xl font-black uppercase sm:text-3xl">
              {page.topic} curriculum
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Four mentor-reviewed modules across {page.duration}, built for {page.audience}.
            </p>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {page.modules.map((module, index) => (
                <li key={module} className="border-2 border-foreground bg-background p-5">
                  <h3 className="text-lg font-black">
                    <span className="mr-2 text-primary">{String(index + 1).padStart(2, "0")}</span>
                    {module}
                  </h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 id="faq-heading" className="text-2xl font-black uppercase sm:text-3xl">
              Frequently asked questions
            </h2>
            <div className="mt-6 space-y-4">
              {page.faqs.map((faq) => (
                <details key={faq.question} className="border-2 border-foreground p-4">
                  <summary className="cursor-pointer text-base font-bold">{faq.question}</summary>
                  <p className="mt-3 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="border-t-4 border-foreground px-4 py-12">
            <div className="mx-auto max-w-5xl">
              <h2 id="related-heading" className="text-2xl font-black uppercase sm:text-3xl">
                More {page.category} programs
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={item.path}
                      className="flex min-h-[96px] flex-col justify-between border-2 border-foreground p-4 transition-transform hover:-translate-y-1"
                    >
                      <span className="font-bold">{item.topic}</span>
                      <span className="mt-2 text-sm text-muted-foreground">{item.duration} · ₹{item.price.toLocaleString("en-IN")}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section aria-labelledby="cta-heading" className="bg-foreground px-4 py-12 text-background">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="cta-heading" className="text-2xl font-black uppercase sm:text-3xl">
              Start {page.topic} this week
            </h2>
            <p className="mt-3 opacity-90">
              Limited mentor slots per cohort. Enroll now for ₹{page.price.toLocaleString("en-IN")}.
            </p>
            <Button asChild size="lg" className="mt-6 min-h-[48px] font-black uppercase">
              <Link to="/#enroll">Claim your slot</Link>
            </Button>
          </div>
        </section>
      </main>

      <SocialMediaFooter />
    </div>
  );
};

export default LandingPage;
