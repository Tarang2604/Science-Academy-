import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/Home/HomePage';
import { AboutPage } from '../pages/About/AboutPage';
import { CoursesPage } from '../pages/Courses/CoursesPage';
import { CourseDetailPage } from '../pages/Courses/CourseDetailPage';
import { TeachersPage } from '../pages/Teachers/TeachersPage';
import { ResultsPage } from '../pages/Results/ResultsPage';
import { FeedbackPage } from '../pages/Feedback/FeedbackPage';
import { GalleryPage } from '../pages/Gallery/GalleryPage';
import { StoriesPage } from '../pages/Stories/StoriesPage';
import { AdmissionsPage } from '../pages/Admissions/AdmissionsPage';
import { ConsultationWizardPage } from '../pages/Consultation/ConsultationWizardPage';
import { ContactPage } from '../pages/Contact/ContactPage';
import { FAQPage } from '../pages/FAQ/FAQPage';
import { PrivacyPolicyPage } from '../pages/Legal/PrivacyPolicyPage';
import { TermsPage } from '../pages/Legal/TermsPage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';
import { AdminLoginPage } from '../pages/Admin/AdminLoginPage';
import { AdminDashboardPage } from '../pages/Admin/AdminDashboardPage';
import { AdminLeadsPage } from '../pages/Admin/AdminLeadsPage';
import { AdminConsultationsPage } from '../pages/Admin/AdminConsultationsPage';
import { AdminResultsPage } from '../pages/Admin/AdminResultsPage';
import { AdminGalleryPage } from '../pages/Admin/AdminGalleryPage';
import { AdminCoursesPage } from '../pages/Admin/AdminCoursesPage';
import { AdminFacultyPage } from '../pages/Admin/AdminFacultyPage';
import { AdminTestimonialsPage } from '../pages/Admin/AdminTestimonialsPage';
import { AdminStoriesPage } from '../pages/Admin/AdminStoriesPage';
import { AdminBlogPage } from '../pages/Admin/AdminBlogPage';
import { ProtectedRoute } from '../components/admin/ProtectedRoute';

interface AppRoutesProps {
  onOpenEnquiryModal: () => void;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ onOpenEnquiryModal }) => {
  return (
    <Routes>
      {/* Admin Portal Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/leads"
        element={
          <ProtectedRoute>
            <AdminLeadsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/consultations"
        element={
          <ProtectedRoute>
            <AdminConsultationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/results"
        element={
          <ProtectedRoute>
            <AdminResultsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/gallery"
        element={
          <ProtectedRoute>
            <AdminGalleryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/courses"
        element={
          <ProtectedRoute>
            <AdminCoursesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/faculty"
        element={
          <ProtectedRoute>
            <AdminFacultyPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/testimonials"
        element={
          <ProtectedRoute>
            <AdminTestimonialsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/stories"
        element={
          <ProtectedRoute>
            <AdminStoriesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/blog"
        element={
          <ProtectedRoute>
            <AdminBlogPage />
          </ProtectedRoute>
        }
      />

      {/* Public Home Route */}
      <Route path="/" element={<HomePage onOpenEnquiryModal={onOpenEnquiryModal} />} />

      {/* About & Coaching Info Routes */}
      <Route path="/about" element={<AboutPage onOpenEnquiryModal={onOpenEnquiryModal} />} />
      <Route path="/coaching-info" element={<AboutPage onOpenEnquiryModal={onOpenEnquiryModal} />} />

      {/* Courses Directory & Dynamic Single Course Route */}
      <Route path="/courses" element={<CoursesPage onOpenEnquiryModal={onOpenEnquiryModal} />} />
      <Route path="/courses/:slug" element={<CourseDetailPage onOpenEnquiryModal={onOpenEnquiryModal} />} />

      {/* Teachers / Faculty Route */}
      <Route path="/teachers" element={<TeachersPage onOpenEnquiryModal={onOpenEnquiryModal} />} />
      <Route path="/teachers/:slug" element={<TeachersPage onOpenEnquiryModal={onOpenEnquiryModal} />} />

      {/* Results / Toppers Routes */}
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/toppers" element={<ResultsPage />} />
      <Route path="/toppers/:slug" element={<ResultsPage />} />

      {/* Feedback & Student/Parent Review Routes */}
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/comments" element={<FeedbackPage />} />

      {/* Gallery Route */}
      <Route path="/gallery" element={<GalleryPage />} />

      {/* Video Stories & Interview Routes */}
      <Route path="/stories" element={<StoriesPage />} />
      <Route path="/interviews" element={<StoriesPage />} />

      {/* Admissions & Course Enrolment Route */}
      <Route path="/admissions" element={<AdmissionsPage />} />

      {/* 1-on-1 Guidance Consultation Wizard Route */}
      <Route path="/one-to-one-consultation" element={<ConsultationWizardPage />} />

      {/* Contact Route */}
      <Route path="/contact" element={<ContactPage onOpenEnquiryModal={onOpenEnquiryModal} />} />

      {/* FAQ Route */}
      <Route path="/faq" element={<FAQPage />} />

      {/* Legal Routes */}
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />

      {/* Catch-All 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
