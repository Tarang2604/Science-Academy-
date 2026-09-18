import React from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, Award, Users, BookOpen, HeartHandshake, Instagram, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Phone, MapPin, Clock, ExternalLink } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SEOHead } from '../../components/ui/SEOHead';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { WhyScienceAcademySection } from '../../components/sections/WhyScienceAcademySection';
import { ACADEMY_CONFIG } from '../../config/academy';

interface AboutPageProps {
  onOpenEnquiryModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenEnquiryModal }) => {
  const legacyMetrics = [
    { label: 'Empowering Students', value: '8+ Years', desc: 'Sustained academic coaching focus in Ratlam' },
    { label: 'Students Guided', value: '1000s', desc: 'Across Physics, Chem, Math, Bio, Commerce & IP' },
    { label: 'Success Stories', value: '100s', desc: 'Class 10 & 12 Board & competitive rankers' },
    { label: 'Institute Legacy', value: '1 Trusted Name', desc: 'Known for conceptual clarity & personal care' },
  ];

  return (
    <div className="flex flex-col gap-16 pb-20">
      <SEOHead
        title="About Science Academy — Academic Philosophy, Legacy & Mentorship"
        description="Explore Science Academy Ratlam's conceptual teaching philosophy, 8-year educational legacy, small batch focus, and personal student mentorship."
      />

      {/* Page Editorial Header */}
      <PageHeader
        category="About Science Academy"
        title="Serious Academics, Engineered for Consistency"
        subtitle="Deconstructing complex scientific, mathematical, and economic principles through structured first-principles teaching and personalized doubt mentorship in Ratlam, MP."
        badgeVariant="cyan"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      />

      {/* Section A: Core Philosophy & Campus Environment */}
      <section className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <Badge variant="royal" className="w-fit">Our Academic Pedagogy</Badge>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
              Concept Building Over Rote Memorization
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              At Science Academy Ratlam, we believe true academic mastery is not achieved through memorizing formulas or cramming solutions. It is built by deconstructing physical laws, chemical mechanisms, and mathematical proofs into fundamental logical steps.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Our curriculum for Class 11, Class 12, and Target batches bridges theoretical principles with guided problem solving, ensuring every student develops the analytical speed and confidence required for board and competitive examinations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                <div className="flex items-center gap-2 font-bold text-navy-900 text-sm">
                  <Target className="w-4 h-4 text-royal-600" />
                  <span>Small Batch Focus</span>
                </div>
                <p className="text-xs text-slate-500">Ensuring individual attention and active student participation during every lecture.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                <div className="flex items-center gap-2 font-bold text-navy-900 text-sm">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>1:1 Doubt Mentorship</span>
                </div>
                <p className="text-xs text-slate-500">Dedicated daily slots where students can resolve specific doubt questions without hesitation.</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button variant="primary" onClick={onOpenEnquiryModal} icon={<ArrowRight className="w-4 h-4" />}>
                Enquire About Admissions & Batches
              </Button>
            </div>
          </motion.div>

          {/* Right Campus Overview Card */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-[28px] overflow-hidden bg-[#0B192C] text-white border border-slate-700/90 p-7 md:p-8 flex flex-col gap-6 shadow-2xl">
              {/* Subtle accent glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-royal-600/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-300 font-mono">CANONICAL CAMPUS DATA</span>
                </div>
                <Badge variant="verify">2 Verified Campuses</Badge>
              </div>

              <div className="flex flex-col gap-2 relative z-10">
                <h3 className="text-2xl font-black text-white tracking-tight">Academic Environment</h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Science Academy operates 2 verified campuses in Ratlam, maintaining a structured, quiet, and highly focused environment engineered for student success.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-1 border-t border-slate-700/80 relative z-10">
                
                {/* Verified Phone Hotline */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0F172A] border border-slate-700/80">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <Phone className="w-4.5 h-4.5 text-emerald-300" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-300">Verified Phone Hotline</span>
                    <a
                      href={`tel:${ACADEMY_CONFIG.verifiedContact.phoneRaw}`}
                      className="text-white hover:text-emerald-300 text-sm font-bold tracking-wide transition-colors"
                    >
                      {ACADEMY_CONFIG.verifiedContact.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Campus Branch 1 (Kasturba Nagar) - Clickable Map */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#0F172A] border border-slate-700/80">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4.5 h-4.5 text-cyan-300" />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-cyan-300">Campus 1 (Kasturba Nagar)</span>
                      <a
                        href={ACADEMY_CONFIG.verifiedContact.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-cyan-300 hover:text-white bg-cyan-500/20 hover:bg-cyan-500/30 px-2 py-0.5 rounded-md border border-cyan-400/30 transition-all"
                      >
                        <span>Open Map</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <a
                      href={ACADEMY_CONFIG.verifiedContact.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-cyan-300 text-xs font-bold leading-snug transition-colors group flex items-center gap-1"
                    >
                      <span>617, Gali No. 6, Central Plaza Colony, Kasturba Nagar, Ratlam (M.P.) 457001</span>
                    </a>
                  </div>
                </div>

                {/* Campus Branch 2 (Shakti Nagar) - Clickable Map */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#0F172A] border border-slate-700/80">
                  <div className="w-9 h-9 rounded-xl bg-royal-500/20 border border-royal-400/40 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4.5 h-4.5 text-royal-300" />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-royal-300">Campus 2 (Shakti Nagar)</span>
                      <a
                        href={ACADEMY_CONFIG.verifiedContact.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-royal-300 hover:text-white bg-royal-500/20 hover:bg-royal-500/30 px-2 py-0.5 rounded-md border border-royal-400/30 transition-all"
                      >
                        <span>Open Map</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <a
                      href={ACADEMY_CONFIG.verifiedContact.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-royal-300 text-xs font-bold leading-snug transition-colors group flex items-center gap-1"
                    >
                      <span>Shakti Nagar / 80 Feet Road Centre, Ratlam (M.P.) 457001</span>
                    </a>
                  </div>
                </div>

                {/* Disciplines Covered */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0F172A] border border-slate-700/80">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4.5 h-4.5 text-amber-300" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-300">Disciplines Covered</span>
                    <strong className="text-white text-xs font-bold">Physics, Chemistry, Math, Biology, Commerce & IP</strong>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Section B: Why Science Academy Section (Includes why-us-poster.png & 6 Pillars) */}
      <WhyScienceAcademySection />

      {/* Section C: Institute Legacy & Mentorship (Includes classroom-8-years.png) */}
      <section className="px-6 md:px-12 py-16 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
            <Badge variant="gold" icon={<Award className="w-3.5 h-3.5" />}>Institute Educational Legacy</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              Building Strong Foundations, Creating Successful Futures
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our classroom culture revolves around direct student-teacher interaction, step-by-step concept progression, and unwavering academic support.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Image Poster Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6"
            >
              <div className="relative rounded-[24px] overflow-hidden bg-white shadow-xl border border-slate-200/90 group">
                <img
                  src="/images/classroom-8-years.png?v=2"
                  alt="Science Academy classroom mentorship and institute legacy poster"
                  loading="eager"
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </motion.div>

            {/* Right Metrics & Legacy Story Narrative */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              
              {/* Milestone Grid */}
              <div className="grid grid-cols-2 gap-4">
                {legacyMetrics.map((item) => (
                  <div key={item.label} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">{item.value}</span>
                    <span className="text-xs font-bold text-royal-600">{item.label}</span>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Editorial Legacy Narrative */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 flex flex-col gap-3">
                <h3 className="text-base font-bold text-navy-900">Dedicated Classroom Mentorship</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Science Academy was established with a singular vision: to deliver authentic, high-quality conceptual coaching to students in Ratlam. Through systematic board exam preparation and continuous topic evaluation, our students build independent problem-solving skills across all core subjects.
                </p>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Continuous Academic Support from Class 10 to Target Batches</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Section D: Instagram Community Showcase */}
      <section className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto p-8 sm:p-12 rounded-[32px] bg-[#0B192C] text-white shadow-2xl border border-slate-700/90 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-3 max-w-xl relative z-10">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-400/30">
                <Instagram className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono font-extrabold tracking-wider uppercase text-pink-300">Official Instagram Community</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Connect With Us On Instagram
            </h3>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              Stay updated with campus announcements, student toppers, subject memory tips, and academic highlights from Science Academy Ratlam.
            </p>
          </div>

          <div className="shrink-0 relative z-10">
            <a
              href={ACADEMY_CONFIG.verifiedContact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-pink-500/25 hover:scale-105 transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @scienceacademyrtm</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

    </div>
  );
};
