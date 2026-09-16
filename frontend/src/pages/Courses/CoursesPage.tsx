import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SEOHead } from '../../components/ui/SEOHead';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ScientificVisual } from '../../components/ui/ScientificVisual';
import { ACADEMY_CONFIG } from '../../config/academy';

interface CoursesPageProps {
  onOpenEnquiryModal: () => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onOpenEnquiryModal }) => {
  return (
    <div className="flex flex-col gap-12 pb-16">
      <SEOHead
        title="Subject Courses Directory — Physics, Chemistry, Math, Bio, Commerce, IP"
        description="Explore Science Academy Ratlam's course programs across Physics, Chemistry, Mathematics, Biology, Commerce, and Informatics Practices for Class 11 and 12."
      />

      <PageHeader
        category="Program Directory"
        title="Subject Courses & Academic Offerings"
        subtitle="Explore detailed syllabus structures, concept building approaches, and batch schedules across our 6 core academic disciplines."
        badgeVariant="cyan"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Courses' }]}
      />

      <section className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMY_CONFIG.subjects.map((sub) => (
              <Card
                key={sub.slug}
                className="relative overflow-hidden flex flex-col justify-between min-h-[300px] border-slate-200/90 group"
              >
                {/* Tailored Background Vector Accent */}
                <div className="absolute top-2 right-2 w-40 h-40 opacity-15 group-hover:opacity-25 transition-opacity">
                  <ScientificVisual subject={sub.slug} className="w-full h-full text-navy-900" />
                </div>

                <div className="flex flex-col gap-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <Badge variant={sub.color as any}>{sub.name}</Badge>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      Class 11 & 12
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-bold text-navy-900 group-hover:text-royal-600 transition-colors">
                      {sub.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {sub.tagline}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5 pt-2 text-xs text-slate-600 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Conceptual First-Principles Approach</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Graded Worksheets & Mock Tests</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between relative z-10 mt-6">
                  <Link
                    to={`/courses/${sub.slug}`}
                    className="text-xs font-semibold text-royal-600 hover:text-royal-700 transition-colors inline-flex items-center gap-1"
                  >
                    <span>View Course Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Button variant="ghost" size="sm" onClick={onOpenEnquiryModal}>
                    Enquire
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
