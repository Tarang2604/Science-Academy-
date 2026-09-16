import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SEOHead } from '../../components/ui/SEOHead';
import { Card } from '../../components/ui/Card';
import { ACADEMY_CONFIG } from '../../config/academy';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 pb-16">
      <SEOHead
        title="Privacy Policy — Science Academy Ratlam"
        description="Privacy policy details for Science Academy Ratlam regarding contact form submission and enquiry data handling."
      />

      <PageHeader
        category="Legal Compliance"
        title="Privacy Policy"
        subtitle="How Science Academy Ratlam handles student and parent enquiry information."
        badgeVariant="navy"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      />

      <section className="px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <Card hoverEffect={false} className="p-8 flex flex-col gap-6 text-slate-700 text-sm leading-relaxed">
            
            <h3 className="text-xl font-bold text-navy-900">1. Information Collection</h3>
            <p>
              When you submit an admission query or consultation booking on this website, we collect contact details such as your name, mobile number, target class, and subject interest to respond to your inquiry.
            </p>

            <h3 className="text-xl font-bold text-navy-900">2. Data Usage</h3>
            <p>
              Your contact details are used solely by Science Academy academic counselors for course communication and consultation scheduling. We do not sell or share student data with third-party telemarketers.
            </p>

            <h3 className="text-xl font-bold text-navy-900">3. Verified Contact Information</h3>
            <p>
              For any questions regarding your data privacy, you can reach out directly to our verified institute contact number: <strong>{ACADEMY_CONFIG.verifiedContact.phoneDisplay}</strong>.
            </p>

          </Card>
        </div>
      </section>
    </div>
  );
};
