import React from 'react';
import { Target, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface CoachingIntroSectionProps {
  onOpenEnquiryModal: () => void;
}

export const CoachingIntroSection: React.FC<CoachingIntroSectionProps> = ({ onOpenEnquiryModal }) => {
  return (
    <section className="px-6 md:px-12 py-16 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Narrative */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <Badge variant="cyan" className="w-fit">Coaching Philosophy</Badge>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight leading-tight">
            Built for Conceptual Clarity. <br />
            <span className="text-royal-600">Engineered for Academic Consistency.</span>
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            At Science Academy Ratlam, we believe academic mastery is not achieved through memorization. It is built by deconstructing complex scientific, mathematical, and economic concepts into clear, structured principles.
          </p>

          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-royal-50 text-royal-600 flex items-center justify-center shrink-0 mt-0.5">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy-900">Step-by-Step Problem Solving</h4>
                <p className="text-xs text-slate-500 mt-0.5">Breaking down numerical problems in Physics, Chemistry, and Mathematics from fundamentals to advanced applications.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy-900">Structured Class 11 & 12 Syllabus Alignment</h4>
                <p className="text-xs text-slate-500 mt-0.5">Thorough coverage aligned with board examinations and competitive exam foundations.</p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button variant="secondary" onClick={onOpenEnquiryModal} icon={<ArrowRight className="w-4 h-4" />}>
              Talk to an Academic Advisor
            </Button>
          </div>
        </div>

        {/* Right Feature Card Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-200/80 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-lg">
              01
            </div>
            <h4 className="text-lg font-bold text-navy-900">Concept Lectures</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              In-depth classroom sessions emphasizing core definitions, derivations, and structural understanding.
            </p>
          </div>

          <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-200/80 flex flex-col gap-3 sm:mt-6">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              02
            </div>
            <h4 className="text-lg font-bold text-navy-900">Guided Worksheets</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Handcrafted problem sets graded by difficulty to build confidence and speed incrementally.
            </p>
          </div>

          <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-200/80 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
              03
            </div>
            <h4 className="text-lg font-bold text-navy-900">Regular Assessments</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Weekly topic tests simulating exam patterns to track progress and identify concept gaps early.
            </p>
          </div>

          <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-200/80 flex flex-col gap-3 sm:mt-6">
            <div className="w-10 h-10 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center font-bold text-lg">
              04
            </div>
            <h4 className="text-lg font-bold text-navy-900">1:1 Mentorship</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Personalized doubt resolution sessions ensuring no student falls behind in any subject module.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
