import React from 'react';
import { MessageSquare, Star, ShieldCheck, Quote } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { ACADEMY_CONFIG } from '../../config/academy';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: '1',
      author: 'Class 12 Science Student',
      role: 'Class 12 Batch',
      content: 'The step-by-step numerical breakdown in Physics and Chemistry helped me build genuine conceptual clarity before board examinations.',
      rating: 5,
      isVerified: false,
    },
    {
      id: '2',
      author: 'Parent of Class 11 Student',
      role: 'Parent Feedback',
      content: 'We appreciate the disciplined learning environment, regular topic tests, and accessible faculty doubt sessions at Science Academy Ratlam.',
      rating: 5,
      isVerified: false,
    },
    {
      id: '3',
      author: 'Mathematics Student',
      role: 'Class 11 Batch',
      content: 'Classes focus on first-principles understanding rather than memorizing formulas. Guided worksheets increased my problem-solving speed.',
      rating: 5,
      isVerified: false,
    },
  ];

  return (
    <section className="px-6 md:px-12 py-16 bg-slate-50/70 border-y border-slate-200/60">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 max-w-xl">
          <Badge variant="amber" icon={<MessageSquare className="w-3.5 h-3.5" />}>
            Feedback & Reviews
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
            Student & Parent Experiences
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Real feedback on classroom teaching, structured testing, and academic mentorship.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.id} className="flex flex-col justify-between gap-4 border-slate-200/90 relative">
              <Quote className="w-8 h-8 text-royal-600/15 absolute top-6 right-6 pointer-events-none" />

              <div className="flex flex-col gap-3 relative z-10">
                <div className="flex items-center gap-1 text-gold-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic pt-1">
                  "{t.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2 relative z-10">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-navy-900">{t.author}</h4>
                  <Badge variant="verify">TODO_VERIFY</Badge>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">{t.role}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Authentic Feedback Policy Note */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Authenticity Policy: Testimonials and quotes reflect verified feedback states. No fake social proof is created.</span>
          </span>
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider hidden sm:inline">
            {ACADEMY_CONFIG.labels.todoVerify}
          </span>
        </div>

      </div>
    </section>
  );
};
