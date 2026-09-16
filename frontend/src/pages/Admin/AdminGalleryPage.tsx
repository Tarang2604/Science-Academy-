import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { SEOHead } from '../../components/ui/SEOHead';
import { getAdminGallery, updateAdminGallery } from '../../services/api';
import { Search, Eye, EyeOff, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption?: string;
  isVerified: boolean;
  status: string;
  createdAt: string;
}

export const AdminGalleryPage: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');

  const fetchGallery = async () => {
    setIsLoading(true);
    try {
      const res = await getAdminGallery({
        category: categoryFilter || undefined,
      });
      if (res.success && res.data) {
        setGallery(res.data);
      }
    } catch (err) {
      console.error('Error fetching admin gallery:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [categoryFilter]);

  const togglePublication = async (item: GalleryItem) => {
    const newStatus = item.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      const res = await updateAdminGallery(item.id, {
        status: newStatus,
        isVerified: newStatus === 'PUBLISHED' ? true : item.isVerified,
      });
      if (res.success) {
        fetchGallery();
      }
    } catch (err) {
      console.error('Error updating gallery item:', err);
    }
  };

  const toggleVerification = async (item: GalleryItem) => {
    try {
      const res = await updateAdminGallery(item.id, {
        isVerified: !item.isVerified,
      });
      if (res.success) {
        fetchGallery();
      }
    } catch (err) {
      console.error('Error updating verification status:', err);
    }
  };

  return (
    <AdminLayout
      title="Gallery & Campus Media CMS"
      subtitle="Manage classroom photographs, achievement media, and campus gallery items."
    >
      <SEOHead title="Gallery CMS — Admin Control Center" />

      {/* Toolbar & Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-semibold focus:outline-hidden"
          >
            <option value="">All Categories</option>
            <option value="CLASSROOM">Classroom & Infrastructure</option>
            <option value="EVENTS">Events & Achievements</option>
            <option value="FACULTY">Faculty & Staff</option>
            <option value="LABS">Labs & Facilities</option>
          </select>
        </div>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-xs font-semibold text-slate-500">Loading gallery items...</div>
        ) : gallery.length === 0 ? (
          <div className="col-span-full p-12 text-center text-xs text-slate-500 font-medium">No gallery items found.</div>
        ) : (
          gallery.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
              <div className="relative aspect-video bg-slate-100 border-b border-slate-100">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                  {item.category}
                </span>
              </div>
              
              <div className="p-5 flex flex-col gap-3">
                <h4 className="text-sm font-bold text-slate-900 leading-tight">{item.title}</h4>
                {item.caption && <p className="text-xs text-slate-600 line-clamp-2">{item.caption}</p>}
                
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === 'PUBLISHED'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {item.status}
                  </span>
                  {item.isVerified ? (
                    <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-amber-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Unverified
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => toggleVerification(item)}
                    className={`flex-1 py-1.5 rounded-lg font-semibold text-xs border ${
                      item.isVerified
                        ? 'bg-slate-50 border-slate-200 text-slate-600'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}
                  >
                    {item.isVerified ? 'Unverify' : 'Verify'}
                  </button>
                  <button
                    onClick={() => togglePublication(item)}
                    className={`flex-1 py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1 ${
                      item.status === 'PUBLISHED'
                        ? 'bg-amber-50 text-amber-900 border border-amber-200'
                        : 'bg-slate-900 text-white'
                    }`}
                  >
                    {item.status === 'PUBLISHED' ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" /> Unpublish
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" /> Publish
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};
