import { useEffect } from 'react';

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const SitemapGenerator = () => {
  useEffect(() => {
    const generateSitemap = () => {
      const baseUrl = window.location.origin;
      
      const sitemapEntries: SitemapEntry[] = [
        {
          url: `${baseUrl}/`,
          changefreq: 'daily',
          priority: 1.0,
          lastmod: new Date().toISOString().split('T')[0]
        },
        {
          url: `${baseUrl}/programs`,
          changefreq: 'weekly',
          priority: 0.9,
          lastmod: new Date().toISOString().split('T')[0]
        },
        {
          url: `${baseUrl}/programs/frontend`,
          changefreq: 'weekly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/programs/fullstack`,
          changefreq: 'weekly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/programs/lowcode`,
          changefreq: 'weekly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/programs/nocode`,
          changefreq: 'weekly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/programs/manychat`,
          changefreq: 'weekly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/certification`,
          changefreq: 'monthly',
          priority: 0.7
        },
        {
          url: `${baseUrl}/partnerships`,
          changefreq: 'monthly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/professional-development`,
          changefreq: 'weekly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/content-summarizer`,
          changefreq: 'weekly',
          priority: 0.7
        },
        {
          url: `${baseUrl}/privacy`,
          changefreq: 'yearly',
          priority: 0.3
        },
        {
          url: `${baseUrl}/terms`,
          changefreq: 'yearly',
          priority: 0.3
        }
      ];

      // Generate XML sitemap content
      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority ? `<priority>${entry.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

      console.log('Generated Sitemap:', sitemapXml);
      
      // Store in session storage for reference
      sessionStorage.setItem('generated-sitemap', sitemapXml);
    };

    generateSitemap();
  }, []);

  return null; // This is a utility component that doesn't render anything
};

export default SitemapGenerator;