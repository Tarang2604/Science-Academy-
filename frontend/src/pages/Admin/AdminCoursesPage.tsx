import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { SEOHead } from '../../components/ui/SEOHead';
import { getAdminCourses, updateAdminCourse } from '../../services/api';
import { BookOpen, CheckCircle2, ShieldCheck, Edit3 } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  slug: string;
  targetExam: string;
  eligibility: string;
  duration: string;
  description: string;
  isPopular: boolean;
  isActive: boolean;
}

export const AdminCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const res = await getAdminCourses();
      if (res.success && res.data) {
        setCourses(res.data);
      }
    } catch (err) {
      console.error('Error fetching admin courses:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const togglePopular = async (course: Course) => {
    try {
      const res = await updateAdminCourse(course.id, {
        isPopular: !course.isPopular,
      });
      if (res.success) {
        fetchCourses();
      }
    } catch (err) {
      console.error('Error updating course popularity:', err);
    }
  };

  const toggleActive = async (course: Course) => {
    try {
      const res = await updateAdminCourse(course.id, {
        isActive: !course.isActive,
      });
      if (res.success) {
        fetchCourses();
      }
    } catch (err) {
      console.error('Error updating course active status:', err);
    }
  };

  return (
    <AdminLayout
      title="Course Catalog CMS"
      subtitle="Manage academic offerings, target competitive exams, eligibility, and program visibility."
    >
      <SEOHead title="Courses CMS — Admin Control Center" />

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-xs font-semibold text-slate-500">
            Loading course catalog...
          </div>
        ) : courses.length === 0 ? (
          <div className="col-span-full p-12 text-center text-xs text-slate-500 font-medium">
            No courses found.
          </div>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {course.isPopular && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        Popular
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        course.isActive
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {course.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">{course.name}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Target: {course.targetExam}</p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-slate-100">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="block text-[10px] text-slate-400 font-medium uppercase">Duration</span>
                    <span className="font-semibold text-slate-700">{course.duration}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="block text-[10px] text-slate-400 font-medium uppercase">Eligibility</span>
                    <span className="font-semibold text-slate-700 truncate block">{course.eligibility}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-100 mt-4">
                <button
                  onClick={() => togglePopular(course)}
                  className={`flex-1 py-1.5 rounded-lg font-semibold text-xs border ${
                    course.isPopular
                      ? 'bg-amber-50 border-amber-200 text-amber-800'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  {course.isPopular ? 'Featured' : 'Make Popular'}
                </button>
                <button
                  onClick={() => toggleActive(course)}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-xs ${
                    course.isActive
                      ? 'bg-slate-900 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {course.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};
