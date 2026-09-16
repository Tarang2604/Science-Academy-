import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { SEOHead } from '../../components/ui/SEOHead';
import { getAdminTestimonials, updateAdminTestimonial } from '../../services/api';
import { MessageSquare, CheckCircle2, AlertCircle, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string;
  content: string;
  rating: number;
  isVerified: boolean;
  createdAt: string;
}

export const AdminTestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const res = await getAdminTestimonials();
      if (res.success && res.data) {
        setTestimonials(res.data);
      }
    } catch (err) {
      console.error('Error fetching admin testimonials:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const toggleVerification = async (item: Testimonial) => {
    try {
      const res = await updateAdminTestimonial(item.id, {
        isVerified: !item.isVerified,
      });
      if (res.success) {
        fetchTestimonials();
      }
    } catch (err) {
      console.error('Error updating testimonial verification:', err);
    }
  };

  return (
    <AdminLayout
      title="Testimonials & Reviews CMS"
      subtitle="Manage student feedback, parent testimonials, and review verification."
    >
      <SEOHead title="Testimonials CMS — Admin Control Center" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-xs font-semibold text-slate-500">
            Loading testimonials...
          </div>
        ) : testimonials.length === 0 ? (
          <div className="col-span-full p-12 text-center text-xs text-slate-500 font-medium">
            No testimonials recorded yet.
          </div>
        ) : (
          testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">{item.authorName}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">{item.authorRole}</p>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-4 leading-relaxed pt-2 border-t border-slate-100 italic">
                  "{item.content}"
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  {item.isVerified ? (
                    <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified Feedback
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
                  onClick={() => toggleVerification(item)}
                  className={`w-full py-1.5 rounded-lg font-semibold text-xs border ${
                    item.isVerified
                      ? 'bg-slate-50 border-slate-200 text-slate-600'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  }`}
                >
                  {item.isVerified ? 'Mark Unverified' : 'Verify Testimonial'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};
