import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SEOHead } from '../../components/ui/SEOHead';
import { VideoInterviewsSection } from '../../components/sections/VideoInterviewsSection';

export const StoriesPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 pb-16">
      <SEOHead
        title="Student Stories & Video Interviews — Science Academy Ratlam"
        description="Watch student, parent, and faculty interviews on conceptual learning at Science Academy Ratlam."
      />

      <PageHeader
        category="Video Conversations"
        title="Interviews & Student Stories"
        subtitle="Hear directly from students, parents, and academic mentors on structured concept building."
        badgeVariant="rose"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Stories' }]}
      />

      <VideoInterviewsSection />
    </div>
  );
};
