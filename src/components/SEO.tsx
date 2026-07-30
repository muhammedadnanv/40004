import { Helmet } from "react-helmet-async";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  TWITTER_HANDLE,
  absoluteUrl,
} from "@/config/seo";

interface SEOProps {
  /** Page title. Keep under ~60 characters. */
  title?: string;
  /** Meta description. Keep under ~160 characters. */
  description?: string;
  /** Route path, e.g. "/programs". Drives canonical + og:url. */
  path?: string;
  /** Absolute image URL for social previews. */
  image?: string;
  keywords?: string;
  type?: "website" | "article" | "profile";
  /** Set for private / duplicate / utility routes. */
  noindex?: boolean;
  /** One or more JSON-LD objects to embed. */
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Single source of truth for per-route head metadata.
 * Canonical and og:url always self-reference the current route.
 */
export const SEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  keywords,
  type = "website",
  noindex = false,
  schema,
}: SEOProps) => {
  const url = absoluteUrl(path);
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        }
      />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((item, index) => (
        <script type="application/ld+json" key={index}>
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
