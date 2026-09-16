import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Sparkles, ArrowRight } from 'lucide-react';

export const TeachingMethodologySection: React.FC = () => {
  const steps = [
    { stage: '01', name: 'Understand', title: 'Concept Deconstruction', detail: 'Classroom teaching breaks down every principle into clear fundamentals, physical models, and derivations.' },
    { stage: '02', name: 'Practice', title: 'Structured Numerical Worksheets', detail: 'Graded problem sets challenge students to apply theories to diverse problem types incrementally.' },
    { stage: '03', name: 'Test', title: 'Periodic Examination Drills', detail: 'Timed mock tests evaluate speed, accuracy, and stress management under actual exam constraints.' },
    { stage: '04', name: 'Analyse', title: 'Error Diagnostic Feedback', detail: 'Faculty analyze test answer sheets to pinpoint specific conceptual gaps, calculation errors, or time loss.' },
    { stage: '05', name: 'Improve', title: 'Targeted Remedial Sessions', detail: 'One-on-one doubt resolution and revised problem sets ensure complete mastery over previous mistakes.' },
    { stage: '06', name: 'Achieve', title: 'Sustained Exam Readiness', detail: 'Students enter final board and competitive exams with thorough confidence and proven problem-solving speed.' },
  ];

  return (
    <section className="px-6 md:px-12 py-16 bg-navy-900 text-white rounded-2xl md:rounded-[32px] my-6 max-w-6xl mx-auto overflow-hidden relative">
      
      {/* Background Radial Ambient Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-royal-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col gap-3 max-w-xl">
          <Badge variant="navy" className="w-fit border-navy-700 text-royal-50" icon={<Sparkles className="w-3.5 h-3.5 text-gold-500" />}>
            Pedagogical Journey
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The 6-Stage Teaching Methodology
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            A continuous cycle of concept building, rigorous practice, performance analysis, and individualized mentorship.
          </p>
        </div>

        {/* Timeline Horizontal / Vertical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={step.stage}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-navy-800/80 rounded-[24px] p-6 border border-navy-700/80 flex flex-col justify-between gap-4 hover:border-royal-600/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-royal-600/20 text-royal-50 flex items-center justify-center font-bold text-xs font-mono border border-royal-500/30">
                  {step.stage}
                </span>
                <span className="text-xs uppercase tracking-widest font-semibold text-slate-400 font-mono">
                  {step.name}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{step.detail}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-500 font-mono pt-2">
                  <span>Next: Step {steps[idx + 1].stage}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
