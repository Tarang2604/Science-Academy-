import React from 'react';
import { Users, ShieldCheck, UserCheck, BookOpen, Compass } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SEOHead } from '../../components/ui/SEOHead';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ACADEMY_CONFIG } from '../../config/academy';

interface TeachersPageProps {
  onOpenEnquiryModal: () => void;
}

export const TeachersPage: React.FC<TeachersPageProps> = ({ onOpenEnquiryModal }) => {
  return (
    <div className="flex flex-col gap-12 pb-16">
      <SEOHead
        title="Verified Subject Mentors & Faculty — Science Academy Ratlam"
        description="Meet the subject teaching departments at Science Academy Ratlam. Experienced mentors for Physics, Chemistry, Math, Biology, Commerce, and IP."
      />

      <PageHeader
        category="Academic Faculty"
        title="Subject Mentors & Department Structure"
        subtitle="Our teaching team focuses on first-principles understanding, guided problem solving, and 1:1 personal doubt resolution in Ratlam, MP."
        badgeVariant="emerald"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Teachers' }]}
      />

      <section className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          
          {/* Verification Notice Banner */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Authenticity Notice: Faculty profile updates are undergoing official verification. Subject mentor departments are fully active.</span>
            </div>
            <Badge variant="verify">STATUS: TODO_VERIFY</Badge>
          </div>

          {/* Department Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMY_CONFIG.subjects.map((sub) => (
              <Card key={sub.slug} className="flex flex-col gap-4 justify-between border-slate-200/90">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={sub.color as any}>{sub.name} Mentorship</Badge>
                    <Badge variant="verify">TODO_VERIFY</Badge>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center shrink-0">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-navy-900">{sub.name} Department</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">Experienced Subject Mentor</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                    Delivering structured classroom teaching, guided numerical worksheets, and individualized doubt mentorship in {sub.name}.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Department
                  </span>
                  <Button variant="ghost" size="sm" onClick={onOpenEnquiryModal}>
                    Consult Mentor
                  </Button>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
