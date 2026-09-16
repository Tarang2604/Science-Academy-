import React from 'react';
import { HeroSection } from '../../components/sections/HeroSection';
import { TrustBarSection } from '../../components/sections/TrustBarSection';
import { CoachingIntroSection } from '../../components/sections/CoachingIntroSection';
import { BentoCoursesSection } from '../../components/sections/BentoCoursesSection';
import { WhyScienceAcademySection } from '../../components/sections/WhyScienceAcademySection';
import { TeachingMethodologySection } from '../../components/sections/TeachingMethodologySection';
import { FacultySection } from '../../components/sections/FacultySection';
import { ToppersWallSection } from '../../components/sections/ToppersWallSection';
import { VideoInterviewsSection } from '../../components/sections/VideoInterviewsSection';
import { TestimonialsSection } from '../../components/sections/TestimonialsSection';
import { GalleryPreviewSection } from '../../components/sections/GalleryPreviewSection';
import { BatchFinderSection } from '../../components/sections/BatchFinderSection';
import { FAQSection } from '../../components/sections/FAQSection';
import { ConsultationTeaserSection } from '../../components/sections/ConsultationTeaserSection';
import { LocationContactSection } from '../../components/sections/LocationContactSection';

interface HomePageProps {
  onOpenEnquiryModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenEnquiryModal }) => {
  return (
    <div className="flex flex-col gap-0 pb-12">
      {/* 1. Hero Section */}
      <HeroSection onOpenEnquiryModal={onOpenEnquiryModal} />

      {/* 2. Trust Bar */}
      <TrustBarSection />

      {/* 3. Coaching Introduction & Pedagogy */}
      <CoachingIntroSection onOpenEnquiryModal={onOpenEnquiryModal} />

      {/* 4. Bento Courses Grid */}
      <BentoCoursesSection onOpenEnquiryModal={onOpenEnquiryModal} />

      {/* 5. Why Science Academy - 6 Academic Pillars */}
      <WhyScienceAcademySection />

      {/* 6. 6-Stage Teaching Methodology Timeline */}
      <TeachingMethodologySection />

      {/* 7. Faculty & Mentors Showcase */}
      <FacultySection onOpenEnquiryModal={onOpenEnquiryModal} />

      {/* 8. Toppers & Achievements Wall */}
      <ToppersWallSection />

      {/* 9. Video Interviews & Stories */}
      <VideoInterviewsSection />

      {/* 10. Student & Parent Reviews */}
      <TestimonialsSection />

      {/* 11. Gallery & Academic Environment Preview */}
      <GalleryPreviewSection />

      {/* 12. Interactive Batch Finder */}
      <BatchFinderSection onOpenEnquiryModal={onOpenEnquiryModal} />

      {/* 13. Accessible FAQ Accordion */}
      <FAQSection />

      {/* 14. 1-on-1 Consultation Guidance Teaser */}
      <ConsultationTeaserSection />

      {/* 15. Verified Location & Contact */}
      <LocationContactSection onOpenEnquiryModal={onOpenEnquiryModal} />
    </div>
  );
};
