import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { SEOHead } from '../../components/ui/SEOHead';
import { getAdminFaculty, updateAdminFaculty } from '../../services/api';
import { Users, CheckCircle2, AlertCircle, Award } from 'lucide-react';

interface Faculty {
  id: string;
  name: string;
  subject: string;
  qualification: string;
  experienceYrs?: number;
  bio: string;
  photoUrl?: string;
  isVerified: boolean;
}

export const AdminFacultyPage: React.FC = () => {
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFaculty = async () => {
    setIsLoading(true);
    try {
      const res = await getAdminFaculty();
      if (res.success && res.data) {
        setFacultyList(res.data);
      }
    } catch (err) {
      console.error('Error fetching admin faculty:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const toggleVerification = async (faculty: Faculty) => {
    try {
      const res = await updateAdminFaculty(faculty.id, {
        isVerified: !faculty.isVerified,
      });
      if (res.success) {
        fetchFaculty();
      }
    } catch (err) {
      console.error('Error updating faculty verification:', err);
    }
  };

  return (
    <AdminLayout
      title="Faculty & Educators CMS"
      subtitle="Manage faculty credentials, academic specializations, and verified educator profiles."
    >
      <SEOHead title="Faculty CMS — Admin Control Center" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-xs font-semibold text-slate-500">
            Loading faculty profiles...
          </div>
        ) : facultyList.length === 0 ? (
          <div className="col-span-full p-12 text-center text-xs text-slate-500 font-medium">
            No faculty members recorded yet.
          </div>
        ) : (
          facultyList.map((faculty) => (
            <div
              key={faculty.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center text-slate-400">
                    {faculty.photoUrl ? (
                      <img src={faculty.photoUrl} alt={faculty.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">{faculty.name}</h4>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-100 inline-block mt-1">
                      {faculty.subject}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium">{faculty.qualification}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed pt-2 border-t border-slate-100">
                  {faculty.bio}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    {faculty.experienceYrs ? `${faculty.experienceYrs}+ Years Exp.` : 'Experience N/A'}
                  </span>
                  {faculty.isVerified ? (
                    <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-amber-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Unverified
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4">
                <button
                  onClick={() => toggleVerification(faculty)}
                  className={`w-full py-1.5 rounded-lg font-semibold text-xs border ${
                    faculty.isVerified
                      ? 'bg-slate-50 border-slate-200 text-slate-600'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  }`}
                >
                  {faculty.isVerified ? 'Mark Unverified' : 'Verify Faculty Profile'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};
