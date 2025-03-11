
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
}

export const DynamicSitemap = () => {
  const [entries, setEntries] = useState<SitemapEntry[]>([]);
  const [xmlContent, setXmlContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSitemapData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch sitemap data from Supabase stored procedure
        const { data, error } = await supabase.rpc('generate_blog_sitemap');
        
        if (error) throw error;
        
        if (data) {
          const formattedEntries: SitemapEntry[] = data.map((entry: any) => ({
            url: entry.url,
            lastModified: new Date(entry.last_modified).toISOString(),
            changeFrequency: entry.change_frequency,
            priority: entry.priority
          }));
          
          setEntries(formattedEntries);
          
          // Generate XML content
          const xml = generateSitemapXML(formattedEntries);
          setXmlContent(xml);
        }
      } catch (error) {
        console.error("Error fetching sitemap data:", error);
        toast({
          title: "Error generating sitemap",
          description: "There was a problem fetching sitemap data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSitemapData();
  }, []);

  const generateSitemapXML = (entries: SitemapEntry[]): string => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    entries.forEach(entry => {
      xml += '  <url>\n';
      xml += `    <loc>${entry.url}</loc>\n`;
      xml += `    <lastmod>${entry.lastModified}</lastmod>\n`;
      xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`;
      xml += `    <priority>${entry.priority}</priority>\n`;
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    return xml;
  };

  const downloadSitemap = () => {
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Sitemap downloaded",
      description: "Your sitemap.xml file has been downloaded successfully.",
    });
  };

  const copySitemapToClipboard = () => {
    navigator.clipboard.writeText(xmlContent)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: "Sitemap XML content has been copied to clipboard.",
        });
      })
      .catch(err => {
        console.error('Failed to copy XML content:', err);
        toast({
          title: "Copy failed",
          description: "Could not copy the XML content. Please try again.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Dynamic Sitemap Generator</h2>
      
      {isLoading ? (
        <div className="py-10 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Generating sitemap...</p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap gap-3">
            <button
              onClick={downloadSitemap}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Download sitemap.xml
            </button>
            <button
              onClick={copySitemapToClipboard}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
            >
              Copy XML
            </button>
          </div>
          
          <div className="border rounded-md">
            <div className="bg-gray-50 px-4 py-2 border-b">
              <h3 className="font-medium">Sitemap Entries ({entries.length})</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {entries.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {entries.map((entry, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600 truncate max-w-xs">
                          <a href={entry.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {entry.url}
                          </a>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {new Date(entry.lastModified).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {entry.priority}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="py-8 text-center text-gray-500">No sitemap entries found.</p>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">XML Preview</h3>
            <div className="bg-gray-800 rounded-md p-4 overflow-auto max-h-96">
              <pre className="text-green-400 text-sm whitespace-pre-wrap break-all">{xmlContent}</pre>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
