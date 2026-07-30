// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://dev-mentor-hub-39.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: string;
}

// Public, indexable routes only (no /dashboard, /cms, or 404).
const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/programs", changefreq: "weekly", priority: "0.9" },
  { path: "/programs/frontend", changefreq: "weekly", priority: "0.8" },
  { path: "/programs/fullstack", changefreq: "weekly", priority: "0.8" },
  { path: "/programs/lowcode", changefreq: "weekly", priority: "0.8" },
  { path: "/programs/ai", changefreq: "weekly", priority: "0.8" },
  { path: "/certification", changefreq: "monthly", priority: "0.8" },
  { path: "/professional-development", changefreq: "weekly", priority: "0.8" },
  { path: "/gallery", changefreq: "daily", priority: "0.7" },
  { path: "/code-playground", changefreq: "monthly", priority: "0.7" },
  { path: "/content-summarizer", changefreq: "monthly", priority: "0.6" },
  { path: "/partnerships", changefreq: "monthly", priority: "0.6" },
  { path: "/install", changefreq: "yearly", priority: "0.4" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

function generateSitemap(items: SitemapEntry[]) {
  const urls = items.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
