import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Play, Pause, Volume2, VolumeX, Maximize2, Award } from 'lucide-react';
import { ACADEMY_CONFIG } from '../../config/academy';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ScientificVisual } from '../ui/ScientificVisual';

interface HeroSectionProps {
  onOpenEnquiryModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenEnquiryModal }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Video playback time update handler
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setProgress((current / total) * 100);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section className="relative pt-8 pb-16 px-6 md:px-12 bg-gradient-to-b from-slate-50/90 via-white to-white rounded-t-none lg:rounded-t-[36px] overflow-hidden border-b border-slate-100">
      
      {/* Background Scientific Orbital Graphics */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-20 pointer-events-none -mr-20 -mt-20">
        <ScientificVisual subject="physics" className="w-full h-full text-royal-600" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Editorial Narrative */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="royal" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Ratlam's Premier Academic Coaching Institute
            </Badge>
            <Badge variant="gold">Concept Clarity + Personal Guidance</Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-[1.1]">
            Serious Academics. <br />
            <span className="text-royal-600">Modern Thinking.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
            Science Academy Ratlam delivers structured conceptual mastery across Physics, Chemistry, Mathematics, Biology, Commerce, and Informatics Practices for Class 11, 12, and Target batches.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenEnquiryModal}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Courses & Admissions
            </Button>

            <a href={`tel:${ACADEMY_CONFIG.verifiedContact.phoneRaw}`}>
              <Button variant="outline" size="lg" icon={<Phone className="w-4 h-4 text-royal-600" />}>
                {ACADEMY_CONFIG.verifiedContact.phoneDisplay}
              </Button>
            </a>
          </div>

          {/* Quick Value Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-navy-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Small Batch Focus</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-navy-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Step-by-Step Concepts</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-navy-900 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>1:1 Doubt Mentorship</span>
            </div>
          </div>

          {/* Verified Contact Notice */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Verified Institute Phone: <strong className="text-navy-900">{ACADEMY_CONFIG.verifiedContact.phoneDisplay}</strong></span>
          </div>
        </motion.div>

        {/* Right Hero Visual Container — Featuring Native HTML5 Video Reel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="lg:col-span-5 relative"
        >
          {/* Ambient Video Aura Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-royal-600/30 via-cyan-500/20 to-gold-400/20 rounded-[32px] blur-2xl transform scale-105 pointer-events-none" />

          {/* Sleek Video Card Frame */}
          <div className="relative rounded-[28px] overflow-hidden bg-navy-950 text-white shadow-2xl border border-white/15 flex flex-col group">
            
            {/* Header Status Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-navy-900/90 border-b border-white/10 backdrop-blur-md z-20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono font-bold tracking-wider text-slate-200 uppercase">
                  Classroom Experience • Reel
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Admissions Open
              </span>
            </div>

            {/* Video Canvas Container */}
            <div className="relative w-full aspect-[9/16] sm:aspect-[4/5] max-h-[500px] bg-slate-950 overflow-hidden flex items-center justify-center">
              <video
                ref={videoRef}
                src="/videos/hero-reel.mp4"
                autoPlay
                muted={isMuted}
                loop
                playsInline
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Play / Pause Center Overlay Indicator */}
              <button
                onClick={togglePlay}
                className="absolute w-14 h-14 rounded-full bg-navy-900/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
                aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current translate-x-0.5" />}
              </button>

              {/* Bottom Custom Video Controls Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent flex flex-col gap-2 opacity-90 group-hover:opacity-100 transition-opacity z-20">
                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-royal-500 transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-amber-400 transition-colors"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-amber-400 transition-colors flex items-center gap-1.5"
                      title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                      <span className="text-[10px] font-mono text-slate-300">{isMuted ? 'Muted' : 'Sound On'}</span>
                    </button>
                  </div>

                  <button
                    onClick={toggleFullscreen}
                    className="text-slate-300 hover:text-white transition-colors"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Floating Academic Chips with Spring Animation */}
          <motion.div
            className="absolute -top-4 -left-4 bg-white px-3.5 py-1.5 rounded-full shadow-lg border border-slate-200 text-xs font-bold text-navy-900 flex items-center gap-1.5 animate-float-slow z-30"
          >
            <span className="text-cyan-600">⚛</span> Physics
          </motion.div>

          <motion.div
            className="absolute top-1/3 -right-6 bg-white px-3.5 py-1.5 rounded-full shadow-lg border border-slate-200 text-xs font-bold text-navy-900 flex items-center gap-1.5 animate-float-delayed z-30"
          >
            <span className="text-emerald-600">🧪</span> Chemistry
          </motion.div>

          <motion.div
            className="absolute bottom-12 -left-6 bg-white px-3.5 py-1.5 rounded-full shadow-lg border border-slate-200 text-xs font-bold text-navy-900 flex items-center gap-1.5 animate-float-slow z-30"
          >
            <span className="text-indigo-600">∑</span> Mathematics
          </motion.div>

          <motion.div
            className="absolute -bottom-4 right-8 bg-white px-3.5 py-1.5 rounded-full shadow-lg border border-slate-200 text-xs font-bold text-navy-900 flex items-center gap-1.5 animate-float-delayed z-30"
          >
            <span className="text-rose-600">🧬</span> Biology
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
