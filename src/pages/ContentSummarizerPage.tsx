
import ContentSummarizer from "@/components/ContentSummarizer";
import { SEO } from "@/components/SEO";
import { breadcrumbSchema } from "@/config/seo";

const ContentSummarizerPage = () => {
  return (
    <>
      <SEO
        title="AI Content Summarizer — Summarize PDFs & Videos Free"
        description="Upload PDFs, videos or paste links to get AI-powered, student-friendly summaries in seconds. A free study tool from Dev Mentor Hub."
        path="/content-summarizer"
        keywords="AI summarizer, PDF summarizer, video summary tool, study help, learning aid"
        schema={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "AI Content Summarizer", path: "/content-summarizer" }])}
      />
      
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          AI Content Summarizer
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Upload PDFs, videos, or paste links to get AI-powered summaries in student-friendly formats.
          Transform complex materials into clear, concise knowledge.
        </p>
        <ContentSummarizer />
      </div>
    </>
  );
};

export default ContentSummarizerPage;
