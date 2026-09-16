import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = 'Science Academy Ratlam — Academic Excellence & Concept Clarity',
  canonicalUrl,
}) => {
  useEffect(() => {
    document.title = `${title} | Science Academy Ratlam`;
    
    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', `${title} | Science Academy Ratlam`);

    // Update OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);
  }, [title, description, canonicalUrl]);

  return null;
};
