import React from 'react';
import { Target, Compass, BookOpen, Users, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SEOHead } from '../../components/ui/SEOHead';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { WhyScienceAcademySection } from '../../components/sections/WhyScienceAcademySection';
import { TeachingMethodologySection } from '../../components/sections/TeachingMethodologySection';
import { ACADEMY_CONFIG } from '../../config/academy';

interface AboutPageProps {
  onOpenEnquiryModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenEnquiryModal }) => {
  return (
    <div className="flex flex-col gap-12 pb-16">
      <SEOHead
        title="About Science Academy — Academic Philosophy & Pedagogy"
        description="Learn about Science Academy Ratlam's conceptual teaching methodology, small batch focus, and structured preparation across Physics, Chemistry, Math, Biology, Commerce, and IP."
      />

      <PageHeader
        category="About Science Academy"
        title="Serious Academics, Engineered for Consistency"
        subtitle="Deconstructing complex scientific, mathematical, and economic principles through structured first-principles teaching and personalized doubt mentorship in Ratlam, MP."
        badgeVariant="cyan"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Core Philosophy Section */}
      <section className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Badge variant="royal" className="w-fit">Our Academic Philosophy</Badge>
            
            <h2 className="text-3xl font-bold text-navy-900 tracking-tight leading-tight">
              Concept Building Over Rote Memorization
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              At Science Academy Ratlam, we believe true academic mastery is not achieved through memorizing formulas or cramming solutions. It is built by deconstructing physical laws, chemical mechanisms, and mathematical proofs into fundamental logical steps.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Our curriculum for Class 11, Class 12, and Target batches bridges theoretical principles with guided problem solving, ensuring every student develops the analytical speed and confidence required for board and competitive examinations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                <div className="flex items-center gap-2 font-bold text-navy-900 text-sm">
                  <Target className="w-4 h-4 text-royal-600" />
                  <span>Small Batch Focus</span>
                </div>
                <p className="text-xs text-slate-500">Ensuring individual attention and active student participation during every lecture.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                <div className="flex items-center gap-2 font-bold text-navy-900 text-sm">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>1:1 Doubt Mentorship</span>
                </div>
                <p className="text-xs text-slate-500">Dedicated daily slots where students can resolve specific doubt questions without hesitation.</p>
              </div>
            </div>

            <div className="pt-2">
              <Button variant="primary" onClick={onOpenEnquiryModal} icon={<ArrowRight className="w-4 h-4" />}>
                Enquire About Admissions & Batches
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card hoverEffect={false} className="bg-navy-900 text-white border-navy-800 p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-navy-700 pb-4">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">VERIFIED INSTITUTE DATA</span>
                <Badge variant="verify">TODO_VERIFY</Badge>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-white">Academic Environment</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Science Academy maintains a structured, quiet, and highly focused environment designed to foster academic concentration and analytical reasoning.
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified Contact: <strong>{ACADEMY_CONFIG.verifiedContact.phoneDisplay}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Location: <strong>Ratlam, Madhya Pradesh</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Disciplines: <strong>Physics, Chem, Math, Bio, Comm, IP</strong></span>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </section>

      {/* Reusable Why Science Academy 6 Pillars */}
      <WhyScienceAcademySection />

      {/* Reusable 6-Stage Teaching Methodology */}
      <TeachingMethodologySection />

    </div>
  );
};
