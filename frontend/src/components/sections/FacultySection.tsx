import React from 'react';
import { Users, ShieldCheck, UserCheck, Instagram, ExternalLink, Quote, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ACADEMY_CONFIG } from '../../config/academy';

interface FacultySectionProps {
  onOpenEnquiryModal?: () => void;
}

export const FacultySection: React.FC<FacultySectionProps> = ({ onOpenEnquiryModal }) => {
  return (
    <section className="px-6 md:px-12 py-16 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-xl">
            <Badge variant="cyan" icon={<Users className="w-3.5 h-3.5" />}>
              Academic Mentors & Guidance
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
              Experienced Faculty & Subject Mentors
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Combining deep subject expertise with dedicated career guidance to inspire confidence and build strong academic futures.
            </p>
          </div>

          <a
            href="https://www.instagram.com/p/DbpmOkHCj_7/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 hover:bg-rose-100 transition-colors shrink-0"
          >
            <Instagram className="w-4 h-4 text-rose-600" />
            Follow @scienceacademyrtm
            <ExternalLink className="w-3 h-3 text-rose-500" />
          </a>
        </div>

        {/* Featured Instagram Mentorship Spotlight Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-navy-900 via-royal-950 to-slate-900 border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-royal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text & Mentorship Philosophy Content */}
          <div className="lg:col-span-7 p-8 md:p-10 flex flex-col gap-6 z-10">
            <div className="flex items-center gap-2">
              <Badge variant="gold" icon={<Sparkles className="w-3.5 h-3.5" />}>
                Featured Mentorship Feature
              </Badge>
              <span className="text-[11px] font-mono font-medium text-slate-400">@scienceacademyrtm</span>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                "Some teachers complete the syllabus. <br />
                <span className="text-amber-400 font-serif italic">Great mentors build futures."</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                At Science Academy, every lesson is designed to inspire confidence, sharpen minds, and prepare students for success. Because a strong career starts with the right guidance.
              </p>
            </div>

            <blockquote className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-start gap-3">
              <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-amber-200 italic leading-relaxed">
                "Bachhon ka career banana koi inse sikhe!!"
              </p>
            </blockquote>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/p/DbpmOkHCj_7/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-400 to-amber-500 text-navy-950 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-transform"
              >
                <Instagram className="w-4 h-4" /> View Post on Instagram
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {onOpenEnquiryModal && (
                <Button
                  variant="outline"
                  onClick={onOpenEnquiryModal}
                  className="text-white border-white/20 hover:bg-white/10 text-xs py-2.5"
                >
                  Book 1-on-1 Guidance Session
                </Button>
              )}
            </div>
          </div>

          {/* Right Image Showcase Frame */}
          <div className="lg:col-span-5 p-6 md:p-8 flex items-center justify-center z-10">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-white/15 shadow-2xl group bg-slate-900/60 backdrop-blur-sm">
              <a
                href="https://www.instagram.com/p/DbpmOkHCj_7/"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-[3/4] w-full bg-slate-950"
              >
                <img
                  src="/images/instagram-mentorship-banner.png"
                  alt="Science Academy Mentorship Post — Great Mentors Build Futures"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Hover Overlay with Instagram Icon */}
                <div className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-4 py-2 rounded-full bg-white/90 text-navy-900 text-xs font-bold flex items-center gap-2 shadow-lg">
                    <Instagram className="w-4 h-4 text-rose-600" />
                    Open Instagram Post
                  </div>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-navy-900/80 text-amber-300 backdrop-blur-md border border-white/20">
                    Official Post
                  </span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Department Faculty Grid with Strict Verification Badges */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold text-navy-900">Subject-Wise Mentorship Departments</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMY_CONFIG.subjects.map((sub) => (
              <Card key={sub.slug} className="flex flex-col gap-4 justify-between border-slate-200/90">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={sub.color as any}>
                      {sub.name} Mentorship
                    </Badge>
                    <Badge variant="verify">
                      TODO_VERIFY
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center shrink-0">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-navy-900">{sub.name} Department</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">Experienced Subject Mentor</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                    Dedicated instruction in {sub.name} focusing on conceptual derivations, guided problem sets, and individual doubt resolution.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Department
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                    {ACADEMY_CONFIG.labels.todoVerify}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
