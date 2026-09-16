import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ZoomIn, Sparkles, ChevronRight, Maximize2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { CountUpNumber } from '../ui/CountUpNumber';
import { Lightbox } from '../ui/Lightbox';

interface TopperPoster {
  id: string;
  title: string;
  category: string;
  year: string;
  examName: string;
  imageUrl: string;
  score: string;
  badge: string;
}

const TOPPER_POSTERS: TopperPoster[] = [
  {
    id: 'hall-of-fame',
    title: 'Science Academy Hall of Fame',
    category: 'HALL OF FAME',
    year: 'Multi-Year Honor Roll',
    examName: 'CBSE & MP Board Excellence',
    imageUrl: '/images/hall-of-fame-multi-year.jpg.jpeg',
    score: '96.2%',
    badge: 'Hall of Fame'
  },
  {
    id: 'result-2025',
    title: '2025 Academic Toppers Wall',
    category: '2025',
    year: '2025 Results',
    examName: 'Class 10th & 12th Board Examination',
    imageUrl: '/images/result-2025-toppers.jpg.jpeg',
    score: '96.2%',
    badge: '2025 Top Scorers'
  },
  {
    id: 'result-2024-mp',
    title: '2024 MP Board Class 12th Toppers',
    category: '2024',
    year: '2024 Results',
    examName: 'MP Board Class 12 Science Stream',
    imageUrl: '/images/result-2024-class-12-mp-board.jpg.jpeg',
    score: '95%+',
    badge: 'MP Board Class 12'
  },
  {
    id: 'result-2023-landscape',
    title: '2023 Academic Achievements & JEE Merit',
    category: '2023',
    year: '2023 Results',
    examName: 'CBSE / MP Board & JEE Main Qualified',
    imageUrl: '/images/result-2023-showcase-landscape.jpg.jpeg',
    score: '92.4% + JEE',
    badge: 'Parth Rathore & Team'
  },
  {
    id: 'result-2023-square',
    title: '2023 Topper Honor Roll Showcase',
    category: '2023',
    year: '2023 Results',
    examName: 'Class 10th & 12th Subject Top Scorers',
    imageUrl: '/images/result-2023-showcase-square.jpg.jpeg',
    score: '96.2%',
    badge: 'Merit Showcase'
  },
  {
    id: 'result-class-12-cbse',
    title: 'Class 12th CBSE Science Toppers',
    category: 'CBSE',
    year: 'CBSE 12th',
    examName: 'CBSE Class 12 Physics, Chem & Math',
    imageUrl: '/images/result-class-12-cbse-toppers.jpg.jpeg',
    score: '95%+',
    badge: 'CBSE Class 12'
  },
  {
    id: 'result-class-12-mp',
    title: 'Class 12th MP Board Science Toppers',
    category: 'MP BOARD',
    year: 'MP 12th',
    examName: 'MP Board Class 12th Merit List',
    imageUrl: '/images/result-class-12-mp-board-toppers.jpg.jpeg',
    score: '94%+',
    badge: 'MP Board Class 12'
  },
  {
    id: 'result-class-10-cbse',
    title: 'Class 10th CBSE Merit Achievers',
    category: 'CBSE',
    year: 'CBSE 10th',
    examName: 'CBSE Class 10 Foundation Batch',
    imageUrl: '/images/result-class-10-cbse-toppers.jpg.jpeg',
    score: '96.2%',
    badge: 'CBSE Class 10'
  },
  {
    id: 'result-class-10-mp',
    title: 'Class 10th MP Board Merit List',
    category: 'MP BOARD',
    year: 'MP 10th',
    examName: 'MP Board Class 10 State Merit',
    imageUrl: '/images/result-class-10-mp-board-toppers.jpg.jpeg',
    score: '95.8%',
    badge: 'MP Board Class 10'
  }
];

export const ToppersWallSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['ALL', '2025', '2024', '2023', 'CBSE', 'MP BOARD'];

  const filteredPosters = selectedCategory === 'ALL'
    ? TOPPER_POSTERS
    : TOPPER_POSTERS.filter(p => p.category === selectedCategory || p.year.includes(selectedCategory));

  const openLightbox = (id: string) => {
    const index = TOPPER_POSTERS.findIndex(p => p.id === id);
    if (index !== -1) setActiveLightboxIndex(index);
  };

  const currentPoster = activeLightboxIndex !== null ? TOPPER_POSTERS[activeLightboxIndex] : null;

  const handleNextLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % TOPPER_POSTERS.length);
    }
  };

  const handlePrevLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + TOPPER_POSTERS.length) % TOPPER_POSTERS.length);
    }
  };

  return (
    <section className="px-6 md:px-12 py-16 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background Lighting Effects */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-royal-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[350px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col gap-10 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-800">
          <div className="flex flex-col gap-2 max-w-xl">
            <Badge variant="gold" icon={<Trophy className="w-3.5 h-3.5 text-black" />} className="text-black font-extrabold bg-amber-400 border-amber-500 shadow-md">
              Official Toppers & Achievement Wall
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Topper Posters & Result Scorecards
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Click on any result poster to inspect full high-resolution scorecards, student names, and merit ranks.
            </p>
          </div>

          {/* High-Contrast Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-navy-950 shadow-lg shadow-amber-400/20 scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* High-Impact Stat Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 backdrop-blur-xs flex flex-col gap-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
              <CountUpNumber end={96} suffix=".2%" />
            </span>
            <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">Highest Board Score</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 backdrop-blur-xs flex flex-col gap-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400">
              <CountUpNumber end={100} suffix="+" />
            </span>
            <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">Board Merit Toppers</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 backdrop-blur-xs flex flex-col gap-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
              <CountUpNumber end={100} suffix="%" />
            </span>
            <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">Concept Guidance</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 backdrop-blur-xs flex flex-col gap-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400">
              <CountUpNumber end={1} suffix=":1" />
            </span>
            <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">Doubt Resolution</span>
          </div>
        </div>

        {/* Featured Hall of Fame Spotlight Card — Image Content Focused */}
        {selectedCategory === 'ALL' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-slate-950 border border-amber-400/40 p-5 md:p-6 shadow-2xl flex flex-col lg:flex-row items-center gap-6 relative overflow-hidden group cursor-pointer"
            onClick={() => openLightbox('hall-of-fame')}
          >
            {/* Visual Poster Canvas */}
            <div className="relative w-full lg:w-3/5 rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[16/10] sm:aspect-[16/9]">
              <img
                src="/images/hall-of-fame-multi-year.jpg.jpeg"
                alt="Science Academy Hall of Fame Topper Poster"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover Inspect Overlay */}
              <div className="absolute inset-0 bg-navy-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="px-5 py-2.5 rounded-full bg-amber-400 text-navy-950 font-bold text-xs flex items-center gap-2 shadow-xl">
                  <ZoomIn className="w-4 h-4" /> Click to Inspect Full-Resolution Poster
                </div>
              </div>

              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-amber-400 text-navy-950 uppercase tracking-wider shadow-md">
                  Featured Hall of Fame
                </span>
              </div>
            </div>

            {/* Poster Quick Info */}
            <div className="w-full lg:w-2/5 flex flex-col justify-between gap-4 p-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-amber-300">Multi-Year Honor Roll</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
                  Science Academy Ratlam — Best Result Showcase
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Displaying top rankers in CBSE & MP Board 10th & 12th exams (Pratham Mittal 94.2%, Parth Rathore 92.4% JEE Qualified, Rudra Pathak 91.4%, Palak Bachchani 89.6%, Kratika Kumawat 87.6%).
                </p>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); openLightbox('hall-of-fame'); }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-navy-950 font-extrabold text-xs flex items-center justify-center gap-2 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-400/20"
              >
                <Maximize2 className="w-4 h-4" /> Enlarge & Read High-Res Poster
              </button>
            </div>
          </motion.div>
        )}

        {/* Poster Image Grid — Focused on Visual Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosters.map((poster) => (
              <div
                key={poster.id}
                onClick={() => openLightbox(poster.id)}
                className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-amber-400/60 shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Poster Image Area */}
                <div className="relative w-full aspect-[4/3] bg-black overflow-hidden flex items-center justify-center p-1">
                  <img
                    src={poster.imageUrl}
                    alt={poster.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                    loading="lazy"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-navy-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="px-4 py-2 rounded-full bg-amber-400 text-navy-950 font-extrabold text-xs flex items-center gap-2 shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-4 h-4" /> Inspect Poster
                    </div>
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-navy-900/90 text-amber-300 border border-amber-400/30 backdrop-blur-xs">
                      {poster.badge}
                    </span>
                  </div>

                  {/* Score Chip */}
                  <div className="absolute bottom-3 right-3 bg-amber-400 text-navy-950 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-extrabold shadow-md">
                    {poster.score}
                  </div>
                </div>

                {/* Poster Title Bar */}
                <div className="p-3.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">{poster.examName}</span>
                    <h4 className="text-xs font-bold text-white truncate max-w-[200px]">{poster.title}</h4>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Full-Screen High-Res Lightbox Modal */}
      {currentPoster && (
        <Lightbox
          isOpen={activeLightboxIndex !== null}
          onClose={() => setActiveLightboxIndex(null)}
          imageUrl={currentPoster.imageUrl}
          title={currentPoster.title}
          caption={`${currentPoster.examName} • Score: ${currentPoster.score}`}
          onNext={handleNextLightbox}
          onPrev={handlePrevLightbox}
        />
      )}

    </section>
  );
};
