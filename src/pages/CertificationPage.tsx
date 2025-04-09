
import React from 'react';
import { CertificationSection } from "@/components/CertificationSection";
import { Helmet } from 'react-helmet';

const CertificationPage = () => {
  return (
    <>
      <Helmet>
        <title>Community Certification | Professional Developer Credentials</title>
        <meta name="description" content="Earn a recognized certificate upon completing your chosen program" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Community Certification | Professional Developer Credentials" />
        <meta property="og:description" content="Showcase your skills with our verified community certification" />
      </Helmet>
      <div className="container mx-auto py-8 max-w-7xl">
        <CertificationSection />
      </div>
    </>
  );
};

export default CertificationPage;
