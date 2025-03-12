
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from "@/components/ui/skeleton";

interface BlogSitemapEntry {
  slug: string;
  title: string;
  created_at: string;
}

export function BlogSitemap() {
  const [blogEntries, setBlogEntries] = useState<BlogSitemapEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogEntries = async () => {
      try {
        // Using directly a mock data array since we don't have a blog_articles table yet
        // This will be replaced with actual data once the blog_articles table is created
        const mockData = [
          { 
            slug: "choosing-the-right-mentor", 
            title: "How to Choose the Right Tech Mentor for Your Career Goals", 
            created_at: new Date().toISOString()
          },
          { 
            slug: "benefits-of-mentorship", 
            title: "The Key Benefits of Having a Technical Mentor for Junior Developers", 
            created_at: new Date().toISOString()
          },
          { 
            slug: "mentorship-vs-courses", 
            title: "Mentorship vs Online Courses: What's Best for Your Learning Journey", 
            created_at: new Date().toISOString()
          }
        ];
        
        setBlogEntries(mockData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog entries:", err);
        setError("Failed to load blog sitemap");
        setLoading(false);
      }
    };

    fetchBlogEntries();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        <h2 className="text-2xl font-bold">Blog Sitemap</h2>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Blog Sitemap</h2>
      <ul className="space-y-2">
        {blogEntries.map((entry) => (
          <li key={entry.slug} className="border-b pb-2">
            <a 
              href={`/blog/${entry.slug}`} 
              className="text-blue-600 hover:underline"
            >
              {entry.title}
            </a>
            <p className="text-sm text-gray-500">
              {new Date(entry.created_at).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
