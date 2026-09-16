import React, { useState } from 'react';
import { Play, Video, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { ACADEMY_CONFIG } from '../../config/academy';

export const VideoInterviewsSection: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; category: string } | null>(null);

  const interviewCards = [
    {
      id: '1',
      title: 'How Concept Clarity Transformed My Class 12 Physics Preparation',
      category: 'Student Experience',
      speaker: 'Science Academy Student',
      isVerified: false,
    },
    {
      id: '2',
      title: 'Why We Chose Science Academy Ratlam for Our Child',
      category: 'Parent Perspective',
      speaker: 'Parent of Class 11 Student',
      isVerified: false,
    },
    {
      id: '3',
      title: 'Demystifying Reaction Mechanisms in Organic Chemistry',
      category: 'Faculty Guidance',
      speaker: 'Chemistry Mentoring Team',
      isVerified: false,
    },
  ];

  return (
    <section className="px-6 md:px-12 py-16 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 max-w-xl">
          <Badge variant="rose" icon={<Video className="w-3.5 h-3.5" />}>
            Conversations & Stories
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
            Interviews & Learning Experiences
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Hear from students, parents, and faculty on the structured approach to concept mastery at Science Academy Ratlam.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {interviewCards.map((item) => (
            <Card key={item.id} hoverEffect={true} className="flex flex-col gap-4 justify-between border-slate-200/90 group">
              <div className="flex flex-col gap-3">
                
                {/* Thumbnail Container with Play Overlay */}
                <div
                  className="relative w-full h-48 rounded-2xl bg-navy-900 overflow-hidden flex items-center justify-center cursor-pointer group-hover:scale-[1.02] transition-transform"
                  onClick={() => setSelectedVideo({ title: item.title, category: item.category })}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent z-10" />
                  
                  <div className="w-12 h-12 rounded-full bg-royal-600 text-white flex items-center justify-center shadow-xl z-20 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                  </div>

                  <div className="absolute top-3 left-3 z-20">
                    <Badge variant="navy" className="border-navy-700 bg-navy-900/80 backdrop-blur-sm text-[10px]">
                      {item.category}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-semibold text-slate-500">{item.speaker}</span>
                  <Badge variant="verify">TODO_VERIFY</Badge>
                </div>

                <h3 className="text-base font-bold text-navy-900 group-hover:text-royal-600 transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Category
                </span>
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                  {ACADEMY_CONFIG.labels.todoVerify}
                </span>
              </div>
            </Card>
          ))}
        </div>

      </div>

      {/* Video Player Modal */}
      <Modal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        title={selectedVideo?.title || 'Video Interview'}
      >
        <div className="flex flex-col items-center justify-center p-6 text-center gap-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="w-16 h-16 rounded-full bg-navy-900 text-gold-500 flex items-center justify-center">
            <Video className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-navy-900">{selectedVideo?.title}</h4>
          <p className="text-xs text-slate-600 max-w-md">
            Official video assets are awaiting upload. Video interviews will be integrated once media resources are provided.
          </p>
          <Badge variant="verify" className="mt-2">
            Status: {ACADEMY_CONFIG.labels.contentPending}
          </Badge>
        </div>
      </Modal>
    </section>
  );
};
