import React from 'react';
import { BookOpen, Users, Award, ShieldCheck } from 'lucide-react';
import { ACADEMY_CONFIG } from '../../config/academy';
import { Card } from '../ui/Card';

export const TrustBarSection: React.FC = () => {
  return (
    <section className="px-6 md:px-12 py-8 bg-slate-50/50">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card hoverEffect={false} className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-royal-50 text-royal-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider">6 Subjects</h4>
            <p className="text-xs text-slate-500">Physics, Chem, Math, Bio, Commerce, IP</p>
          </div>
        </Card>

        <Card hoverEffect={false} className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider">Small Batches</h4>
            <p className="text-xs text-slate-500">Focused personal doubt resolution</p>
          </div>
        </Card>

        <Card hoverEffect={false} className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider">Verified Institute</h4>
            <p className="text-xs text-slate-500">Ratlam, Madhya Pradesh</p>
          </div>
        </Card>

        <Card hoverEffect={false} className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider">Verified Contact</h4>
            <p className="text-xs text-slate-500">{ACADEMY_CONFIG.verifiedContact.phoneDisplay}</p>
          </div>
        </Card>
      </div>
    </section>
  );
};
