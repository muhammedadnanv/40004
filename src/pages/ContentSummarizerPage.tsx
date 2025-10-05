
import ContentSummarizer from "@/components/ContentSummarizer";
import { Helmet } from "react-helmet-async";

const ContentSummarizerPage = () => {
  return (
    <>
      <Helmet>
        <title>AI Content Summarizer | Student-Friendly Learning Tool</title>
        <meta name="description" content="Upload PDFs, videos, or paste links to get AI-powered summaries in student-friendly formats. Make learning materials more accessible." />
        <meta name="keywords" content="AI summarizer, student tool, PDF summarizer, video summary, learning aid, study help" />
      </Helmet>
      
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
