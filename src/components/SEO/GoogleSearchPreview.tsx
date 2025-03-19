
import React, { useEffect, useState } from 'react';

interface GoogleSearchPreviewProps {
  title?: string;
  url?: string;
  description?: string;
}

export function GoogleSearchPreview({ 
  title: initialTitle, 
  url: initialUrl, 
  description: initialDescription
}: GoogleSearchPreviewProps) {
  const [title, setTitle] = useState<string>(initialTitle || '');
  const [url, setUrl] = useState<string>(initialUrl || '');
  const [description, setDescription] = useState<string>(initialDescription || '');

  useEffect(() => {
    // If no props provided, attempt to extract from page
    if (!initialTitle) {
      setTitle(document.title || 'Page Title');
    }
    
    if (!initialUrl) {
      setUrl(window.location.href || 'https://example.com/page');
    }
    
    if (!initialDescription) {
      const metaDescription = document.querySelector('meta[name="description"]');
      setDescription(
        metaDescription?.getAttribute('content') || 
        'Page description goes here. This is what users will see in search results.'
      );
    }
  }, [initialTitle, initialUrl, initialDescription]);

  return (
    <div className="max-w-2xl p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-2">Google Search Preview:</h3>
      <div className="border border-gray-200 rounded p-3 bg-white">
        <h4 className="text-xl text-blue-700 font-medium truncate">{title}</h4>
        <div className="text-sm text-green-700 truncate">{url}</div>
        <p className="text-sm text-gray-800 mt-1 line-clamp-2">{description}</p>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        <p>* This is a simulation of how your page might appear in Google search results</p>
      </div>
    </div>
  );
}
