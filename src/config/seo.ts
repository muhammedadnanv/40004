/**
 * Central SEO configuration.
 * Every canonical / og:url / JSON-LD URL in the app is derived from SITE_URL,
 * so the site never advertises a domain it does not actually serve from.
 */

export const SITE_URL = "https://dev-mentor-hub-39.lovable.app";
export const SITE_NAME = "Dev Mentor Hub";
export const TWITTER_HANDLE = "@devmentorhub";

export const DEFAULT_TITLE =
  "Dev Mentor Hub — Developer Mentorship & Certification Programs";
export const DEFAULT_DESCRIPTION =
  "Learn web development with 1-on-1 mentorship, real projects and industry-recognized certification. Programs from ₹699. Career tools, code playground and project gallery included.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/** Build an absolute URL for a route path. */
export const absoluteUrl = (path = "/"): string => {
  if (!path || path === "/") return `${SITE_URL}/`;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

/** Organization / EducationalOrganization schema used site-wide. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  alternateName: "DevMentorHub",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: DEFAULT_OG_IMAGE,
  description: DEFAULT_DESCRIPTION,
  areaServed: { "@type": "Country", name: "India" },
  sameAs: [
    "https://twitter.com/devmentorhub",
    "https://www.linkedin.com/company/devmentorhub",
    "https://github.com/devmentorhub",
  ],
};

/** WebSite schema with a sitelinks search action. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/programs?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export interface Crumb {
  name: string;
  path: string;
}

/** BreadcrumbList schema builder. */
export const breadcrumbSchema = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});
