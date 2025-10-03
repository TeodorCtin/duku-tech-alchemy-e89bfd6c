import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

const SEO = ({
  title = "Duku Constantin - Full Stack Developer, AI Engineer & Product Manager",
  description = "Building digital products at the intersection of technology, AI, and business. Full Stack Web Developer, AI Engineer, and Product Manager specializing in scalable solutions.",
  keywords = "Full Stack Developer, AI Engineer, Product Manager, Web Development, JavaScript, React, Python, Machine Learning, SEO AI",
  ogImage = "https://lovable.dev/opengraph-image-p98pqg.png",
  canonicalUrl = "https://duku-constantin.com",
  structuredData
}: SEOProps) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:type', 'website', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Structured Data (JSON-LD)
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, ogImage, canonicalUrl, structuredData]);

  return null;
};

export default SEO;

export const defaultStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Duku Constantin",
  "url": "https://duku-constantin.com",
  "jobTitle": ["Full Stack Developer", "AI Engineer", "Product Manager"],
  "description": "Building digital products at the intersection of technology, AI, and business.",
  "knowsAbout": [
    "Web Development",
    "Artificial Intelligence",
    "Machine Learning",
    "Product Management",
    "Full Stack Development",
    "React",
    "Node.js",
    "Python",
    "TypeScript",
    "SEO"
  ],
  "sameAs": [
    "https://linkedin.com/in/duku-constantin",
    "https://github.com/duku-constantin"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Joben"
  }
};
