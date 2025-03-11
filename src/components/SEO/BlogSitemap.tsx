
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
}

export function BlogSitemap() {
  const [entries, setEntries] = useState<SitemapEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSitemapData() {
      try {
        setLoading(true);
        
        // Generate blog sitemap from the database
        const { data, error } = await supabase
          .rpc('generate_blog_sitemap');
          
        if (error) throw error;
        
        // Transform the data for rendering
        const formattedEntries = data.map((entry: any) => ({
          url: entry.url,
          lastModified: new Date(entry.last_modified).toLocaleDateString(),
          changeFrequency: entry.change_frequency,
          priority: entry.priority
        }));
        
        setEntries(formattedEntries);
      } catch (err) {
        console.error('Error generating sitemap:', err);
        setError('Failed to generate sitemap. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchSitemapData();
  }, []);

  // Generate XML sitemap content for download
  const generateXmlContent = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    entries.forEach(entry => {
      xml += '  <url>\n';
      xml += `    <loc>${entry.url}</loc>\n`;
      xml += `    <lastmod>${new Date(entry.lastModified).toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`;
      xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    return xml;
  };

  const downloadSitemap = () => {
    const xml = generateXmlContent();
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blog-sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-pulse space-y-2">
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Blog Sitemap</h2>
        <button
          onClick={downloadSitemap}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Download Sitemap XML
        </button>
      </div>
      
      <Card className="p-4">
        <div className="flex justify-between text-sm font-medium text-gray-500 mb-2 px-2">
          <span className="w-1/2">URL</span>
          <span className="w-1/6 text-center">Last Modified</span>
          <span className="w-1/6 text-center">Change Frequency</span>
          <span className="w-1/6 text-center">Priority</span>
        </div>
        <Separator className="mb-4" />
        
        {entries.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No blog entries available for sitemap.</p>
        ) : (
          <div className="space-y-3">
            {entries.map((entry, index) => (
              <div key={index} className="flex justify-between items-center px-2 py-2 hover:bg-gray-50 rounded-md">
                <span className="w-1/2 text-blue-600 truncate">{entry.url}</span>
                <span className="w-1/6 text-center text-sm">{entry.lastModified}</span>
                <span className="w-1/6 text-center">
                  <Badge variant="outline">{entry.changeFrequency}</Badge>
                </span>
                <span className="w-1/6 text-center text-sm">{entry.priority.toFixed(1)}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
      
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
        <h3 className="font-medium text-blue-800 mb-2">SEO Benefits</h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li>Sitemaps help search engines discover and index your blog content</li>
          <li>Proper prioritization ensures important content gets crawled first</li>
          <li>Change frequency signals help optimize crawl efficiency</li>
          <li>Updated last-modified dates indicate fresh content to search engines</li>
        </ul>
      </div>
    </div>
  );
}
