import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Zap, BarChart2, HeartHandshake, BookOpen } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const WhyScienceAcademySection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Concept-Based Learning',
      desc: 'First-principles explanation of physical laws, chemical mechanisms, and mathematical proofs over rote memorization.',
      icon: <Zap className="w-5 h-5 text-cyan-600" />,
      bg: 'bg-cyan-50 border-cyan-100',
    },
    {
      num: '02',
      title: 'Expert Faculty & 1:1 Mentorship',
      desc: 'Dedicated daily personal interaction with experienced subject mentors to clear individual doubt questions.',
      icon: <HeartHandshake className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      num: '03',
      title: 'Weekly Tests & Performance Analysis',
      desc: 'Scheduled exam-simulation tests with granular topic feedback to build problem speed and accuracy.',
      icon: <BarChart2 className="w-5 h-5 text-indigo-600" />,
      bg: 'bg-indigo-50 border-indigo-100',
    },
    {
      num: '04',
      title: 'Board Exam Focused Preparation',
      desc: 'Rigorous syllabus alignment for Class 10, 11, and 12 Board exams alongside competitive foundations.',
      icon: <BookOpen className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50 border-amber-100',
    },
    {
      num: '05',
      title: 'Small Batch Attention',
      desc: 'Restricted batch sizes to ensure every student actively participates and receives structured attention.',
      icon: <CheckCircle2 className="w-5 h-5 text-rose-600" />,
      bg: 'bg-rose-50 border-rose-100',
    },
    {
      num: '06',
      title: 'Proven Results',
      desc: 'Consistent academic rankers across Physics, Chemistry, Math, Biology, Commerce, and IP in Ratlam.',
      icon: <Award className="w-5 h-5 text-violet-600" />,
      bg: 'bg-violet-50 border-violet-100',
    },
  ];

  return (
    <section className="px-6 md:px-12 py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
          <Badge variant="royal">Why Science Academy</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Structured Academic Guidance That Delivers
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Because your potential deserves more than just coaching — it deserves the right guidance. Explore the 6 pillars behind our student consistency in Ratlam.
          </p>
        </div>

        {/* Two Column Layout: Left Poster Image | Right 6 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Official Poster Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            <div className="relative rounded-[24px] overflow-hidden bg-white shadow-xl border border-slate-200/90 group">
              <img
                src="/images/why-us-poster.png?v=2"
                alt="Science Academy Why Us educational approach poster"
                loading="eager"
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>
          </motion.div>

          {/* Right Column: 6 Core Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-5 rounded-[20px] bg-slate-50/90 border border-slate-200/80 flex flex-col gap-3 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl ${pillar.bg} border flex items-center justify-center shrink-0`}>
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider">
                    PILLAR {pillar.num}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold text-navy-900 group-hover:text-royal-600 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
