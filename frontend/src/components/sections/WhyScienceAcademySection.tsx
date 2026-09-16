import React from 'react';
import { CheckCircle2, ShieldCheck, Award, Zap, BarChart2, HeartHandshake } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const WhyScienceAcademySection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Deep Concept Building',
      desc: 'First-principles explanation of physical laws, chemical mechanisms, and mathematical proofs.',
      icon: <Zap className="w-5 h-5 text-cyan-600" />,
      bg: 'bg-cyan-50',
    },
    {
      num: '02',
      title: 'Graded Numerical Practice',
      desc: 'Handcrafted problem sets escalating from basic applications to complex multi-step problems.',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50',
    },
    {
      num: '03',
      title: 'Regular Topic Assessment',
      desc: 'Simulated examination papers scheduled every week to build stamina and speed.',
      icon: <BarChart2 className="w-5 h-5 text-indigo-600" />,
      bg: 'bg-indigo-50',
    },
    {
      num: '04',
      title: 'Granular Performance Analysis',
      desc: 'Detailed feedback highlighting specific weak areas, speed bottlenecks, and calculation errors.',
      icon: <Award className="w-5 h-5 text-gold-600" />,
      bg: 'bg-gold-50',
    },
    {
      num: '05',
      title: 'Targeted Remedial Revision',
      desc: 'Customized revision strategies and re-tests focused on correcting conceptual mistakes.',
      icon: <ShieldCheck className="w-5 h-5 text-rose-600" />,
      bg: 'bg-rose-50',
    },
    {
      num: '06',
      title: '1:1 Personal Mentorship',
      desc: 'Dedicated one-on-one time with faculty to resolve individual doubts without hesitation.',
      icon: <HeartHandshake className="w-5 h-5 text-violet-600" />,
      bg: 'bg-violet-50',
    },
  ];

  return (
    <section className="px-6 md:px-12 py-16 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
          <Badge variant="royal">Why Science Academy</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
            The 6 Pillars of Academic Consistency
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We don't rely on shortcuts or unverified statistics. Our learning methodology is a repeatable, structured system designed to bring consistency to every student's preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="p-6 rounded-[24px] bg-slate-50/80 border border-slate-200/80 flex flex-col gap-4 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-full ${pillar.bg} flex items-center justify-center`}>
                  {pillar.icon}
                </div>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                  STAGE {pillar.num}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-navy-900">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
