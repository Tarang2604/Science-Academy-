import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, BookOpen } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SEOHead } from '../../components/ui/SEOHead';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ScientificVisual } from '../../components/ui/ScientificVisual';
import { PageLoader } from '../../components/ui/PageLoader';
import { EmptyState } from '../../components/ui/EmptyState';
import { ACADEMY_CONFIG, SubjectConfig } from '../../config/academy';
import { getCourseBySlug } from '../../services/api';

interface CourseDetailPageProps {
  onOpenEnquiryModal: () => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ onOpenEnquiryModal }) => {
  const { slug } = useParams<{ slug: string }>();
  const [subjectData, setSubjectData] = useState<SubjectConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [courseDetails, setCourseDetails] = useState<any>(null);

  useEffect(() => {
    const match = ACADEMY_CONFIG.subjects.find((s) => s.slug === slug);
    if (match) {
      setSubjectData(match);
      getCourseBySlug(match.slug)
        .then((res) => setCourseDetails(res.data))
        .catch(() => setCourseDetails(null))
        .finally(() => setLoading(false));
    } else {
      setSubjectData(null);
      setLoading(false);
    }
  }, [slug]);

  if (loading) return <PageLoader />;

  if (!subjectData) {
    return (
      <div className="py-16 px-6">
        <EmptyState
          title="Subject Course Not Found"
          description={`The requested course module '${slug}' could not be located in our active curriculum directory.`}
          actionText="Return to Courses Directory"
          onAction={() => (window.location.href = '/courses')}
        />
      </div>
    );
  }

  const syllabusModules = courseDetails?.curriculum || [
    'Fundamentals & Core Principles',
    'Guided Problem Solving & Derivations',
    'Topic Worksheets & Homework Sets',
    'Periodic Examination Drills',
    '1:1 Personal Doubt Resolution',
  ];

  return (
    <div className="flex flex-col gap-12 pb-16">
      <SEOHead
        title={`${subjectData.name} Coaching — Science Academy Ratlam`}
        description={`Comprehensive ${subjectData.name} conceptual coaching for Class 11, Class 12, and Target batches at Science Academy Ratlam.`}
      />

      <PageHeader
        category={`${subjectData.name} Program`}
        title={`${subjectData.name} Conceptual Coaching`}
        subtitle={subjectData.tagline}
        badgeVariant={subjectData.color as any}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Courses', href: '/courses' },
          { label: subjectData.name },
        ]}
      />

      <section className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Course Content */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Overview Card */}
            <Card hoverEffect={false} className="relative overflow-hidden flex flex-col gap-4">
              <div className="absolute top-2 right-2 w-48 h-48 opacity-10 pointer-events-none">
                <ScientificVisual subject={subjectData.slug} className="w-full h-full text-navy-900" />
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={subjectData.color as any}>Subject Overview</Badge>
                <Badge variant="navy">Classes 11 & 12</Badge>
              </div>

              <h2 className="text-2xl font-bold text-navy-900">Program Structure & Teaching Approach</h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                The {subjectData.name} program at Science Academy is designed to transition students from basic definitions to advanced numerical problem solving. Classes focus on first-principles understanding, derivations, and structural clarity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-navy-900">Step-by-Step Breakdown</span>
                    <span className="text-[11px] text-slate-500">Deconstructing complex problem types into logical steps.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-navy-900">Graded Worksheets</span>
                    <span className="text-[11px] text-slate-500">Practice questions ordered incrementally by difficulty.</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Syllabus Modules Breakdown */}
            <Card hoverEffect={false} className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-navy-900">Curriculum & Syllabus Modules</h3>
              <p className="text-xs text-slate-600">Aligned with board examination standards and competitive foundations.</p>

              <div className="flex flex-col gap-2 pt-2">
                {syllabusModules.map((module: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs sm:text-sm font-medium text-navy-900"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-royal-600/10 text-royal-600 font-bold text-xs flex items-center justify-center font-mono shrink-0">
                        {idx + 1}
                      </span>
                      <span>{module}</span>
                    </div>
                    <Badge variant="verify" className="shrink-0 text-[10px]">
                      Verified Module
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

          </div>

          {/* Right Sidebar Action Card */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
            <Card hoverEffect={false} className="bg-navy-900 text-white border-navy-800 p-6 flex flex-col gap-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-navy-700 pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">ENROLMENT QUERY</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-bold text-white">Join {subjectData.name} Batches</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Connect with academic advisors to check available batch timings and seat status for Class 11, Class 12, or Target batches.
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <Button variant="primary" size="lg" onClick={onOpenEnquiryModal} icon={<ArrowRight className="w-4 h-4" />}>
                  Enquire About Admission
                </Button>

                <a href={`tel:${ACADEMY_CONFIG.verifiedContact.phoneRaw}`}>
                  <Button variant="outline" size="md" className="w-full border-navy-700 text-white hover:bg-navy-800">
                    Call {ACADEMY_CONFIG.verifiedContact.phoneDisplay}
                  </Button>
                </a>
              </div>

              <div className="pt-3 border-t border-navy-800 flex items-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Institute Phone: {ACADEMY_CONFIG.verifiedContact.phoneDisplay}</span>
              </div>
            </Card>
          </div>

        </div>
      </section>
    </div>
  );
};
