
import { useState } from "react";
import ContentSummarizer from "@/components/ContentSummarizer";

const ContentSummarizerPage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-2">Content Summarizer</h1>
      <p className="text-center text-gray-600 mb-10">
        Upload PDFs, videos, or paste links to get AI-powered summaries in student-friendly formats
      </p>
      <ContentSummarizer />
    </div>
  );
};

export default ContentSummarizerPage;
