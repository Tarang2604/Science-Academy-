import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SEOHead } from '../../components/ui/SEOHead';
import { Card } from '../../components/ui/Card';
import { ACADEMY_CONFIG } from '../../config/academy';

export const TermsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 pb-16">
      <SEOHead
        title="Terms of Service — Science Academy Ratlam"
        description="Terms of service and enrollment guidelines for Science Academy Ratlam."
      />

      <PageHeader
        category="Legal Compliance"
        title="Terms of Service"
        subtitle="General terms and academic guidelines for Science Academy Ratlam."
        badgeVariant="navy"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms' }]}
      />

      <section className="px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <Card hoverEffect={false} className="p-8 flex flex-col gap-6 text-slate-700 text-sm leading-relaxed">
            
            <h3 className="text-xl font-bold text-navy-900">1. Academic Discipline</h3>
            <p>
              Students enrolled in Science Academy courses are expected to maintain regular attendance, complete guided worksheets, and participate in scheduled weekly evaluation drills.
            </p>

            <h3 className="text-xl font-bold text-navy-900">2. Authenticity Policy</h3>
            <p>
              Science Academy upholds strict academic authenticity. All course materials, syllabus structures, and verified information reflect our official institute standards in Ratlam, MP.
            </p>

            <h3 className="text-xl font-bold text-navy-900">3. Contact & Enquiries</h3>
            <p>
              All formal inquiries should be directed to our verified institute contact number: <strong>{ACADEMY_CONFIG.verifiedContact.phoneDisplay}</strong>.
            </p>

          </Card>
        </div>
      </section>
    </div>
  );
};
