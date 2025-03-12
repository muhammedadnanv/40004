
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from "@/components/ui/skeleton";

interface SitemapEntry {
  path: string;
  title: string;
  updated_at: string;
}

export function DynamicSitemap() {
  const [entries, setEntries] = useState<SitemapEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSitemapEntries = async () => {
      try {
        // Using mock data for now until we implement the actual sitemap table
        const mockData = [
          { 
            path: "/", 
            title: "Home Page", 
            updated_at: new Date().toISOString()
          },
          { 
            path: "/mentors", 
            title: "Our Mentors", 
            updated_at: new Date().toISOString()
          },
          { 
            path: "/programs", 
            title: "Available Programs", 
            updated_at: new Date().toISOString()
          },
          { 
            path: "/projects", 
            title: "Project Ideas", 
            updated_at: new Date().toISOString()
          },
          { 
            path: "/faq", 
            title: "Frequently Asked Questions", 
            updated_at: new Date().toISOString()
          }
        ];
        
        setEntries(mockData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sitemap entries:", err);
        setError("Failed to load sitemap");
        setLoading(false);
      }
    };

    fetchSitemapEntries();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        <h2 className="text-2xl font-bold">Sitemap</h2>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sitemap</h2>
      <ul className="space-y-2">
        {entries.map((entry) => (
          <li key={entry.path} className="border-b pb-2">
            <a 
              href={entry.path} 
              className="text-blue-600 hover:underline"
            >
              {entry.title}
            </a>
            <p className="text-sm text-gray-500">
              {new Date(entry.updated_at).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
