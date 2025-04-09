
import React from 'react';
import { Helmet } from 'react-helmet';

interface ContentSummarizerSEOProps {
  pageTitle?: string;
  description?: string;
}

export const ContentSummarizerSEO = ({
  pageTitle = "Content Summarizer | AI-Powered Education Tools",
  description = "Upload PDFs, videos, or paste links to get AI-powered summaries in student-friendly formats"
}: ContentSummarizerSEOProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Content Summarizer",
    "description": description,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "PDF Summarization",
      "Video Content Analysis",
      "Student-Friendly Format",
      "Downloadable Summaries"
    ]
  };

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={window.location.href} />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
