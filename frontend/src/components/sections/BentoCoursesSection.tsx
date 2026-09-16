import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { ACADEMY_CONFIG } from '../../config/academy';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ScientificVisual } from '../ui/ScientificVisual';

interface BentoCoursesSectionProps {
  onOpenEnquiryModal: () => void;
}

export const BentoCoursesSection: React.FC<BentoCoursesSectionProps> = ({ onOpenEnquiryModal }) => {
  return (
    <section className="px-6 md:px-12 py-16 bg-slate-50/70 border-y border-slate-200/60">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2 max-w-xl">
            <Badge variant="cyan" className="w-fit" icon={<BookOpen className="w-3.5 h-3.5" />}>
              Academic Offerings
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
              Subject Courses & Program Directory
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every course at Science Academy is structured around step-by-step concept building, numerical practice, and individual doubt resolution.
            </p>
          </div>

          <Link to="/courses">
            <Button variant="outline" size="md" icon={<ArrowRight className="w-4 h-4" />}>
              View All Courses
            </Button>
          </Link>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACADEMY_CONFIG.subjects.map((sub) => (
            <Card
              key={sub.slug}
              className="relative overflow-hidden flex flex-col justify-between min-h-[250px] group border-slate-200/90"
            >
              {/* Tailored Low-Opacity Background SVG Overlay */}
              <div className="absolute top-2 right-2 w-36 h-36 opacity-15 group-hover:opacity-25 transition-opacity">
                <ScientificVisual subject={sub.slug} className="w-full h-full text-navy-900" />
              </div>

              <div className="flex flex-col gap-4 relative z-10">
                <div className="flex items-center justify-between">
                  <Badge variant={sub.color as any}>
                    {sub.name}
                  </Badge>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                    Classes 11 & 12
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold text-navy-900 group-hover:text-royal-600 transition-colors">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    {sub.tagline}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between relative z-10 mt-6">
                <Link
                  to={`/courses/${sub.slug}`}
                  className="text-xs font-semibold text-royal-600 hover:text-royal-700 transition-colors inline-flex items-center gap-1"
                >
                  <span>Syllabus & Overview</span>
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
  );
};
