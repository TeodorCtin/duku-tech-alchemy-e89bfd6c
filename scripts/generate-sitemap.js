#!/usr/bin/env node

/**
 * Sitemap Generator
 * Run: node scripts/generate-sitemap.js
 */

import { writeFileSync } from 'fs';
import { resolve } from 'path';

const domain = 'https://duku-constantin.com'; // Update with your actual domain
const pages = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/#about', changefreq: 'monthly', priority: 0.8 },
  { url: '/#projects', changefreq: 'weekly', priority: 0.9 },
  { url: '/#skills', changefreq: 'monthly', priority: 0.7 },
  { url: '/#contact', changefreq: 'monthly', priority: 0.8 },
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${domain}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const outputPath = resolve(process.cwd(), 'public', 'sitemap.xml');
  writeFileSync(outputPath, sitemap);
  console.log('✅ Sitemap generated successfully at:', outputPath);
};

generateSitemap();
