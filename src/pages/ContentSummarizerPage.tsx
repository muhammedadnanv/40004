
import ContentSummarizer from "@/components/ContentSummarizer";
import { Helmet } from "react-helmet";

const ContentSummarizerPage = () => {
  return (
    <>
      <Helmet>
        <title>Content Summarizer | AI-Powered Education Tools</title>
        <meta name="description" content="Upload PDFs, videos, or paste links to get AI-powered summaries in student-friendly formats" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#4A00E0" />
        <meta property="og:title" content="Content Summarizer | AI-Powered Education Tools" />
        <meta property="og:description" content="Get AI-powered summaries of educational content in student-friendly formats" />
      </Helmet>
      <div className="container mx-auto py-8 sm:py-10 md:py-12 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-3 md:mb-4">Content Summarizer</h1>
        <p className="text-center text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto">
          Upload PDFs, videos, or paste links to get AI-powered summaries in student-friendly formats
        </p>
        <ContentSummarizer />
      </div>
    </>
  );
};

export default ContentSummarizerPage;
