import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SEOHead } from '../../components/ui/SEOHead';
import { FAQSection } from '../../components/sections/FAQSection';

export const FAQPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 pb-16">
      <SEOHead
        title="Frequently Asked Questions — Science Academy Ratlam"
        description="Find clear answers to common questions on course programs, batch schedules, doubt solving, and admissions at Science Academy Ratlam."
      />

      <PageHeader
        category="Frequently Asked Questions"
        title="Clear Answers to Common Queries"
        subtitle="Explore key information about our 6 core subjects, small batch teaching, and consultation booking procedure."
        badgeVariant="cyan"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
      />

      <FAQSection />
    </div>
  );
};
