import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SEOHead } from '../../components/ui/SEOHead';
import { ToppersWallSection } from '../../components/sections/ToppersWallSection';

export const ResultsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 pb-16">
      <SEOHead
        title="Academic Results & Toppers Wall — Science Academy Ratlam"
        description="Explore board examination results framework and toppers achievement wall at Science Academy Ratlam."
      />

      <PageHeader
        category="Academic Achievements"
        title="Results & Toppers Wall"
        subtitle="Celebrating conceptual mastery, continuous testing consistency, and board examination success in Ratlam, MP."
        badgeVariant="gold"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Results' }]}
      />

      <ToppersWallSection />
    </div>
  );
};
