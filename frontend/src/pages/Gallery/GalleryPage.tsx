import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SEOHead } from '../../components/ui/SEOHead';
import { GalleryPreviewSection } from '../../components/sections/GalleryPreviewSection';

export const GalleryPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 pb-16">
      <SEOHead
        title="Photo Gallery & Learning Space — Science Academy Ratlam"
        description="Explore classroom infrastructure, lab environments, and academic life at Science Academy Ratlam."
      />

      <PageHeader
        category="Academic Environment"
        title="Classroom Infrastructure & Photo Gallery"
        subtitle="A look inside classroom teaching spaces, learning environments, and academic life at Science Academy Ratlam."
        badgeVariant="violet"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />

      <GalleryPreviewSection />
    </div>
  );
};
