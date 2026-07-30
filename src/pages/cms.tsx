import { CMSLayout } from "@/components/cms/CMSLayout";
import { SEO } from "@/components/SEO";

const CMSPage = () => {
  return (
    <>
      <SEO
        title="Content Management | Dev Mentor Hub"
        description="Internal content management workspace for Dev Mentor Hub."
        path="/cms"
        noindex
      />
      <CMSLayout />
    </>
  );
};

export default CMSPage;
