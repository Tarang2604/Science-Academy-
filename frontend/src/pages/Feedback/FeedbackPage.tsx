import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SEOHead } from '../../components/ui/SEOHead';
import { TestimonialsSection } from '../../components/sections/TestimonialsSection';

export const FeedbackPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 pb-16">
      <SEOHead
        title="Student & Parent Reviews — Science Academy Ratlam"
        description="Read authentic student and parent feedback on classroom teaching, structured tests, and doubt mentorship at Science Academy Ratlam."
      />

      <PageHeader
        category="Student & Parent Feedback"
        title="Learning Experiences & Reviews"
        subtitle="Feedback on conceptual teaching, structured testing, and academic guidance at Science Academy Ratlam."
        badgeVariant="amber"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Feedback' }]}
      />

      <TestimonialsSection />
    </div>
  );
};
