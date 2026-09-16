import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SEOHead } from '../../components/ui/SEOHead';
import { LocationContactSection } from '../../components/sections/LocationContactSection';

interface ContactPageProps {
  onOpenEnquiryModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenEnquiryModal }) => {
  return (
    <div className="flex flex-col gap-12 pb-16">
      <SEOHead
        title="Contact Us & Institute Location — Science Academy Ratlam"
        description="Get in touch with Science Academy Ratlam. Call verified phone +91 78281 21320 or connect on WhatsApp for course admissions."
      />

      <PageHeader
        category="Contact & Location"
        title="Get in Touch with Science Academy"
        subtitle="Our academic counselor office in Ratlam, Madhya Pradesh is available to assist with admissions, batch timings, and subject queries."
        badgeVariant="royal"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <LocationContactSection onOpenEnquiryModal={onOpenEnquiryModal} />
    </div>
  );
};
