import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const ConsultationTeaserSection: React.FC = () => {
  return (
    <section className="px-6 md:px-12 py-16 bg-gradient-to-r from-royal-600 via-royal-700 to-navy-900 text-white rounded-2xl md:rounded-[32px] my-6 max-w-6xl mx-auto overflow-hidden relative shadow-2xl">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-8 flex flex-col gap-4">
          <Badge variant="gold" icon={<Sparkles className="w-3.5 h-3.5" />}>
            1-on-1 Academic Mentorship
          </Badge>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Book a Personal Academic Guidance Session
          </h2>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
            Whether you are a student evaluating subject options or a parent seeking academic clarity, our 4-step consultation wizard connects you directly with faculty advisors.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-200 pt-2">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% Free Guidance
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Syllabus & Stream Mentorship
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Direct Faculty Contact
            </span>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-3">
          <Link to="/one-to-one-consultation" className="w-full">
            <Button
              variant="gold"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full justify-center text-navy-900 font-bold"
            >
              Start 4-Step Wizard
            </Button>
          </Link>
          <span className="text-[11px] text-slate-300 text-center lg:text-right font-medium">
            Takes under 60 seconds
          </span>
        </div>

      </div>
    </section>
  );
};
